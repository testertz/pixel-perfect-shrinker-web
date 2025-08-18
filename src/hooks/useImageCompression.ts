import { useState, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import ImageCompressionEngine, { CompressionOptions, CompressionResult } from '@/components/ImageCompressionEngine';

export interface CompressedImage {
  id: string;
  original: File;
  result?: CompressionResult;
  status: 'pending' | 'compressing' | 'completed' | 'error';
  error?: string;
  preview: string;
  progress?: number;
}

export interface CompressionHistory {
  id: string;
  filename: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  timestamp: Date;
  targetSize: number;
}

const STORAGE_KEY = 'pixelshrink-history';
const MAX_HISTORY_ITEMS = 100;

export const useImageCompression = () => {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<CompressionHistory[]>([]);
  const compressionEngine = useRef(new ImageCompressionEngine());
  const { toast } = useToast();

  // Load history from localStorage on mount
  const loadHistory = useCallback(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      }
    } catch (error) {
      console.error('Failed to load compression history:', error);
    }
  }, []);

  // Save history to localStorage
  const saveHistory = useCallback((newHistory: CompressionHistory[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save compression history:', error);
    }
  }, []);

  // Add files to compression queue
  const addFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a valid image file`,
          variant: "destructive",
        });
        return false;
      }
      
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 50MB limit`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });

    const newImages: CompressedImage[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      original: file,
      status: 'pending',
      preview: URL.createObjectURL(file),
    }));

    setImages(prev => [...prev, ...newImages]);
    return newImages;
  }, [toast]);

  // Compress a single image
  const compressImage = useCallback(async (
    imageId: string, 
    options: CompressionOptions
  ) => {
    const image = images.find(img => img.id === imageId);
    if (!image) return;

    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, status: 'compressing', progress: 0 }
        : img
    ));

    try {
      const result = await compressionEngine.current.compressImage(image.original, options);
      
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, result, status: 'completed', progress: 100 }
          : img
      ));

      // Add to history
      const historyItem: CompressionHistory = {
        id: imageId,
        filename: image.original.name,
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        compressionRatio: result.compressionRatio,
        timestamp: new Date(),
        targetSize: options.targetSizeKB,
      };
      
      const newHistory = [historyItem, ...history].slice(0, MAX_HISTORY_ITEMS);
      setHistory(newHistory);
      saveHistory(newHistory);

      toast({
        title: "Compression complete!",
        description: `${image.original.name} compressed by ${result.compressionRatio.toFixed(1)}%`,
      });

    } catch (error) {
      console.error('Compression failed:', error);
      
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { 
              ...img, 
              status: 'error', 
              error: error instanceof Error ? error.message : 'Compression failed' 
            }
          : img
      ));

      toast({
        title: "Compression failed",
        description: `Failed to compress ${image.original.name}`,
        variant: "destructive",
      });
    }
  }, [images, history, saveHistory, toast]);

  // Compress multiple images with the same settings
  const compressBatch = useCallback(async (
    imageIds: string[], 
    options: CompressionOptions
  ) => {
    setIsProcessing(true);
    
    try {
      for (const imageId of imageIds) {
        await compressImage(imageId, options);
      }
    } finally {
      setIsProcessing(false);
    }
  }, [compressImage]);

  // Download a single compressed image
  const downloadImage = useCallback((imageId: string, filename?: string) => {
    const image = images.find(img => img.id === imageId);
    if (!image?.result) return;
    
    const url = URL.createObjectURL(image.result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `compressed_${image.original.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [images]);

  // Download all compressed images as individual files
  const downloadAll = useCallback(() => {
    const completedImages = images.filter(img => img.status === 'completed' && img.result);
    
    if (completedImages.length === 0) {
      toast({
        title: "No images to download",
        description: "Please wait for compression to complete",
        variant: "destructive",
      });
      return;
    }

    completedImages.forEach(image => {
      downloadImage(image.id);
    });

    toast({
      title: "Download started",
      description: `Downloading ${completedImages.length} compressed images`,
    });
  }, [images, downloadImage, toast]);

  // Remove an image from the list
  const removeImage = useCallback((imageId: string) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== imageId);
      // Clean up preview URLs
      const removed = prev.find(img => img.id === imageId);
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
  }, []);

  // Clear all images
  const clearImages = useCallback(() => {
    images.forEach(image => {
      URL.revokeObjectURL(image.preview);
    });
    setImages([]);
  }, [images]);

  // Clear compression history
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
    
    toast({
      title: "History cleared",
      description: "Compression history has been cleared",
    });
  }, [toast]);

  // Get compression statistics
  const getStats = useCallback(() => {
    const totalOriginalSize = history.reduce((sum, item) => sum + item.originalSize, 0);
    const totalCompressedSize = history.reduce((sum, item) => sum + item.compressedSize, 0);
    const totalSaved = totalOriginalSize - totalCompressedSize;
    const averageCompression = history.length > 0 
      ? history.reduce((sum, item) => sum + item.compressionRatio, 0) / history.length 
      : 0;

    return {
      totalImages: history.length,
      totalOriginalSize,
      totalCompressedSize,
      totalSaved,
      averageCompression,
    };
  }, [history]);

  // Auto-compress images when target size changes
  const autoCompressImages = useCallback((targetSizeKB: number) => {
    const pendingImages = images.filter(img => img.status === 'pending');
    pendingImages.forEach(image => {
      compressImage(image.id, { targetSizeKB });
    });
  }, [images, compressImage]);

  return {
    // State
    images,
    history,
    isProcessing,
    
    // Actions
    addFiles,
    compressImage,
    compressBatch,
    downloadImage,
    downloadAll,
    removeImage,
    clearImages,
    clearHistory,
    autoCompressImages,
    loadHistory,
    
    // Computed
    getStats,
  };
};
// Production-Ready Image Compression Engine
// Optimized for reliability, performance, and user experience

export interface CompressionOptions {
  targetSizeKB: number;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  format?: 'jpeg' | 'webp' | 'png';
  progressive?: boolean;
}

export interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  quality: number;
  format: string;
  success: boolean;
  error?: string;
}

export interface CompressionProgress {
  stage: 'loading' | 'resizing' | 'compressing' | 'optimizing' | 'complete' | 'error';
  progress: number;
  message: string;
}

class ProductionCompressionEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private readonly MAX_CANVAS_SIZE = 16384; // Maximum canvas size for most browsers

  constructor() {
    this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas 2D context not supported');
    }
    this.ctx = context;
    
    // Enable high-quality image rendering
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
  }

  /**
   * Compress an image with progress tracking
   */
  async compressImage(
    file: File, 
    options: CompressionOptions,
    onProgress?: (progress: CompressionProgress) => void
  ): Promise<CompressionResult> {
    console.log('Starting compression for:', file.name, 'Target size:', options.targetSizeKB, 'KB');
    
    try {
      // Validate input
      if (!file || !file.type.startsWith('image/')) {
        throw new Error('Invalid file type. Please provide an image file.');
      }

      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        throw new Error('File too large. Maximum size is 100MB.');
      }

      onProgress?.({ stage: 'loading', progress: 10, message: 'Loading image...' });

      // Fast path: if already under target size, return original
      const currentSizeKB = file.size / 1024;
      if (currentSizeKB <= options.targetSizeKB * 1.1) { // 10% tolerance
        console.log('Image already under target size, returning original');
        return {
          blob: file,
          originalSize: file.size,
          compressedSize: file.size,
          compressionRatio: 0,
          quality: 1,
          format: file.type.split('/')[1],
          success: true
        };
      }

      // Load and validate image
      const img = await this.loadImage(file);
      console.log('Image loaded:', img.width, 'x', img.height);

      onProgress?.({ stage: 'resizing', progress: 30, message: 'Calculating optimal dimensions...' });

      // Calculate optimal dimensions
      const { width, height } = this.calculateOptimalDimensions(
        img, 
        options.maxWidth || 2048, 
        options.maxHeight || 2048
      );

      console.log('Optimal dimensions:', width, 'x', height);

      // Setup canvas
      this.canvas.width = width;
      this.canvas.height = height;

      onProgress?.({ stage: 'compressing', progress: 50, message: 'Drawing and compressing...' });

      // Clear and draw image
      this.ctx.clearRect(0, 0, width, height);
      this.ctx.drawImage(img, 0, 0, width, height);

      // Determine optimal format
      const format = options.format || this.detectOptimalFormat(file);
      console.log('Using format:', format);

      onProgress?.({ stage: 'optimizing', progress: 70, message: 'Finding optimal quality...' });

      // Find optimal quality using binary search
      const optimalQuality = await this.findOptimalQuality(
        options.targetSizeKB, 
        format,
        onProgress
      );

      console.log('Optimal quality found:', optimalQuality);

      // Create final compressed blob
      const blob = await this.canvasToBlob(format, optimalQuality);
      
      const compressionRatio = ((file.size - blob.size) / file.size) * 100;

      onProgress?.({ stage: 'complete', progress: 100, message: 'Compression complete!' });

      console.log('Compression complete:', {
        original: file.size,
        compressed: blob.size,
        ratio: compressionRatio
      });

      return {
        blob,
        originalSize: file.size,
        compressedSize: blob.size,
        compressionRatio,
        quality: optimalQuality,
        format,
        success: true
      };

    } catch (error) {
      console.error('Compression error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown compression error';
      
      onProgress?.({ 
        stage: 'error', 
        progress: 0, 
        message: `Error: ${errorMessage}` 
      });

      return {
        blob: new Blob(),
        originalSize: file.size,
        compressedSize: 0,
        compressionRatio: 0,
        quality: 0,
        format: 'jpeg',
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Load image from file with proper error handling
   */
  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      const cleanup = () => {
        URL.revokeObjectURL(url);
      };

      img.onload = () => {
        cleanup();
        
        // Validate image dimensions
        if (img.width === 0 || img.height === 0) {
          reject(new Error('Invalid image dimensions'));
          return;
        }

        if (img.width > this.MAX_CANVAS_SIZE || img.height > this.MAX_CANVAS_SIZE) {
          reject(new Error(`Image too large. Maximum dimension is ${this.MAX_CANVAS_SIZE}px`));
          return;
        }

        resolve(img);
      };

      img.onerror = () => {
        cleanup();
        reject(new Error('Failed to load image. The file may be corrupted.'));
      };

      // Set timeout to prevent hanging
      setTimeout(() => {
        cleanup();
        reject(new Error('Image loading timeout'));
      }, 30000);

      img.src = url;
    });
  }

  /**
   * Calculate optimal dimensions while maintaining aspect ratio
   */
  private calculateOptimalDimensions(
    img: HTMLImageElement, 
    maxWidth: number, 
    maxHeight: number
  ): { width: number; height: number } {
    let { width, height } = img;
    
    // Ensure dimensions are within limits
    const scaleX = maxWidth / width;
    const scaleY = maxHeight / height;
    const scale = Math.min(scaleX, scaleY, 1); // Don't upscale
    
    width = Math.round(width * scale);
    height = Math.round(height * scale);

    // Ensure minimum dimensions
    width = Math.max(1, width);
    height = Math.max(1, height);
    
    return { width, height };
  }

  /**
   * Find optimal quality using binary search with progress tracking
   */
  private async findOptimalQuality(
    targetSizeKB: number, 
    format: string,
    onProgress?: (progress: CompressionProgress) => void
  ): Promise<number> {
    let minQuality = 0.1;
    let maxQuality = 0.95;
    let bestQuality = maxQuality;
    let bestSize = Infinity;
    
    const maxIterations = 15;
    const targetBytes = targetSizeKB * 1024;
    
    for (let i = 0; i < maxIterations; i++) {
      const quality = (minQuality + maxQuality) / 2;
      
      try {
        const blob = await this.canvasToBlob(format, quality);
        const sizeDiff = Math.abs(blob.size - targetBytes);
        
        // Update progress
        const progress = 70 + (i / maxIterations) * 25;
        onProgress?.({ 
          stage: 'optimizing', 
          progress, 
          message: `Optimizing quality... (${i + 1}/${maxIterations})` 
        });

        // Keep track of best result
        if (sizeDiff < Math.abs(bestSize - targetBytes)) {
          bestQuality = quality;
          bestSize = blob.size;
        }
        
        // Binary search logic
        if (blob.size > targetBytes) {
          maxQuality = quality;
        } else {
          minQuality = quality;
        }
        
        // Stop if we're close enough (within 5% of target)
        if (sizeDiff < targetBytes * 0.05) {
          break;
        }
      } catch (error) {
        console.warn(`Quality iteration ${i} failed:`, error);
        // Continue with next iteration
      }
    }
    
    return Math.max(0.1, Math.min(0.95, bestQuality));
  }

  /**
   * Convert canvas to blob with proper error handling
   */
  private canvasToBlob(format: string, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        this.canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob from canvas'));
              return;
            }
            
            if (blob.size === 0) {
              reject(new Error('Generated blob is empty'));
              return;
            }
            
            resolve(blob);
          },
          `image/${format}`,
          quality
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Detect optimal format for the image
   */
  detectOptimalFormat(file: File): 'jpeg' | 'webp' | 'png' {
    // Check WebP support
    if (this.supportsWebP()) {
      // Use WebP for most images as it provides better compression
      if (file.type === 'image/png' && this.hasTransparency(file)) {
        return 'webp'; // WebP supports transparency
      }
      return 'webp';
    }
    
    // Fallback logic
    if (file.type === 'image/png' && this.hasTransparency(file)) {
      return 'png'; // Preserve transparency
    }
    
    return 'jpeg'; // Default for photos
  }

  /**
   * Check WebP support
   */
  private supportsWebP(): boolean {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch {
      return false;
    }
  }

  /**
   * Simple transparency check
   */
  private hasTransparency(file: File): boolean {
    return file.type === 'image/png';
  }

  /**
   * Get compression statistics
   */
  getCompressionStats(results: CompressionResult[]): {
    totalOriginalSize: number;
    totalCompressedSize: number;
    totalSaved: number;
    averageCompressionRatio: number;
    successfulCompressions: number;
  } {
    const successful = results.filter(r => r.success);
    
    const totalOriginalSize = successful.reduce((sum, r) => sum + r.originalSize, 0);
    const totalCompressedSize = successful.reduce((sum, r) => sum + r.compressedSize, 0);
    const totalSaved = totalOriginalSize - totalCompressedSize;
    const averageCompressionRatio = successful.length > 0 
      ? successful.reduce((sum, r) => sum + r.compressionRatio, 0) / successful.length 
      : 0;

    return {
      totalOriginalSize,
      totalCompressedSize,
      totalSaved,
      averageCompressionRatio,
      successfulCompressions: successful.length
    };
  }
}

export default ProductionCompressionEngine;

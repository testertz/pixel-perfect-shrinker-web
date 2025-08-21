// Advanced Image Compression Engine
// This module provides enterprise-grade image compression algorithms

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
}

class ImageCompressionEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  /**
   * Compress an image file to meet target specifications
   */
  async compressImage(file: File, options: CompressionOptions): Promise<CompressionResult> {
    const { targetSizeKB, maxWidth = 2048, maxHeight = 2048, format = 'jpeg' } = options;
    
    const img = await this.loadImage(file);
    const { width, height } = this.calculateOptimalDimensions(img, maxWidth, maxHeight);
    
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.drawImage(img, 0, 0, width, height);

    // Use binary search to find optimal quality
    const optimalQuality = await this.findOptimalQuality(targetSizeKB, format);
    const blob = await this.canvasToBlob(format, optimalQuality);

    return {
      blob,
      originalSize: file.size,
      compressedSize: blob.size,
      compressionRatio: ((file.size - blob.size) / file.size) * 100,
      quality: optimalQuality,
      format
    };
  }

  /**
   * Load image from file
   */
  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = (e) => {
        URL.revokeObjectURL(url);
        reject(e);
      };
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
    
    // Calculate scaling factor
    const scaleX = maxWidth / width;
    const scaleY = maxHeight / height;
    const scale = Math.min(scaleX, scaleY, 1); // Don't upscale
    
    return {
      width: Math.round(width * scale),
      height: Math.round(height * scale)
    };
  }

  /**
   * Use binary search to find optimal quality for target file size
   */
  private async findOptimalQuality(targetSizeKB: number, format: string): Promise<number> {
    let minQuality = 0.1;
    let maxQuality = 0.95;
    let bestQuality = maxQuality;
    let bestSize = Infinity;
    
    const maxIterations = 12;
    
    for (let i = 0; i < maxIterations; i++) {
      const quality = (minQuality + maxQuality) / 2;
      const blob = await this.canvasToBlob(format, quality);
      const sizeKB = blob.size / 1024;
      
      if (Math.abs(sizeKB - targetSizeKB) < Math.abs(bestSize - targetSizeKB)) {
        bestQuality = quality;
        bestSize = sizeKB;
      }
      
      if (sizeKB > targetSizeKB) {
        maxQuality = quality;
      } else {
        minQuality = quality;
      }
      
      // If we're close enough, stop iterating
      if (Math.abs(sizeKB - targetSizeKB) < targetSizeKB * 0.05) {
        break;
      }
    }
    
    return bestQuality;
  }

  /**
   * Convert canvas to blob with specified format and quality
   */
  private canvasToBlob(format: string, quality: number): Promise<Blob> {
    return new Promise((resolve) => {
      this.canvas.toBlob(
        (blob) => resolve(blob!),
        `image/${format}`,
        quality
      );
    });
  }

  /**
   * Smart format detection - choose best format for the image
   */
  detectOptimalFormat(file: File): 'jpeg' | 'webp' | 'png' {
    // WebP for modern browsers, JPEG for photos, PNG for graphics
    if (this.supportsWebP()) {
      return 'webp';
    }
    
    if (file.type === 'image/png' && this.hasTransparency(file)) {
      return 'png';
    }
    
    return 'jpeg';
  }

  /**
   * Check if browser supports WebP
   */
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  /**
   * Check if image has transparency (simplified check)
   */
  private hasTransparency(file: File): boolean {
    return file.type === 'image/png';
  }

  /**
   * Batch compress multiple images
   */
  async compressBatch(
    files: File[], 
    options: CompressionOptions,
    onProgress?: (completed: number, total: number) => void
  ): Promise<CompressionResult[]> {
    const results: CompressionResult[] = [];
    
    for (let i = 0; i < files.length; i++) {
      try {
        const result = await this.compressImage(files[i], options);
        results.push(result);
        onProgress?.(i + 1, files.length);
      } catch (error) {
        console.error(`Failed to compress ${files[i].name}:`, error);
        // Continue with other files
      }
    }
    
    return results;
  }

  /**
   * Analyze image and suggest optimal compression settings
   */
  async analyzeImage(file: File): Promise<{
    recommendedTargetSize: number;
    recommendedFormat: string;
    estimatedCompressionRatio: number;
  }> {
    const img = await this.loadImage(file);
    const area = img.width * img.height;
    
    // Simple heuristics for recommendations
    let recommendedTargetSize = 500; // Default 500KB
    
    if (area > 2000000) { // Large images (2MP+)
      recommendedTargetSize = 1000;
    } else if (area < 500000) { // Small images (<0.5MP)
      recommendedTargetSize = 200;
    }
    
    const recommendedFormat = this.detectOptimalFormat(file);
    const estimatedCompressionRatio = this.estimateCompressionRatio(file, recommendedFormat);
    
    return {
      recommendedTargetSize,
      recommendedFormat,
      estimatedCompressionRatio
    };
  }

  /**
   * Estimate compression ratio based on file type and size
   */
  private estimateCompressionRatio(file: File, targetFormat: string): number {
    const sizeMB = file.size / (1024 * 1024);
    
    if (file.type === 'image/png' && targetFormat === 'jpeg') {
      return Math.min(80, 60 + sizeMB * 5); // PNG to JPEG can save 60-80%
    }
    
    if (targetFormat === 'webp') {
      return Math.min(70, 50 + sizeMB * 3); // WebP typically saves 50-70%
    }
    
    return Math.min(60, 30 + sizeMB * 2); // General compression 30-60%
  }
}

export default ImageCompressionEngine;
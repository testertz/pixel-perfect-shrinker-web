
/**
 * PixelShrink - Smart Image Compression Tool
 * Built with vanilla JavaScript
 */

class ImageCompressor {
    constructor() {
        this.targetSize = 500; // Default target size in KB
        this.maxFileSize = 50 * 1024 * 1024; // 50MB max file size
        this.supportedFormats = ['image/jpeg', 'image/png', 'image/webp'];
        this.uploadedImages = [];
        this.compressionQueue = [];
        
        this.initializeElements();
        this.bindEvents();
        this.initializeTheme();
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.targetSizeSection = document.getElementById('targetSizeSection');
        this.imagesGrid = document.getElementById('imagesGrid');
        this.errorMessage = document.getElementById('errorMessage');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.themeToggle = document.getElementById('themeToggle');
        this.sizeButtons = document.querySelectorAll('.size-btn');
    }

    bindEvents() {
        // Upload area events
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        
        // File input change
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        
        // Target size buttons
        this.sizeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.selectTargetSize(btn));
        });
        
        // Theme toggle
        this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        
        // Prevent default drag behaviors
        document.addEventListener('dragover', e => e.preventDefault());
        document.addEventListener('drop', e => e.preventDefault());
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');
        const files = Array.from(e.dataTransfer.files);
        this.processFiles(files);
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        this.processFiles(files);
        e.target.value = ''; // Reset input
    }

    processFiles(files) {
        this.hideError();
        const validFiles = [];
        const errors = [];

        files.forEach(file => {
            if (!this.supportedFormats.includes(file.type)) {
                errors.push(`${file.name}: Unsupported format`);
                return;
            }
            
            if (file.size > this.maxFileSize) {
                errors.push(`${file.name}: File too large (max 50MB)`);
                return;
            }
            
            validFiles.push(file);
        });

        if (errors.length > 0) {
            this.showError(errors.join('\n'));
        }

        if (validFiles.length > 0) {
            this.addImages(validFiles);
            this.showTargetSizeSection();
        }
    }

    async addImages(files) {
        for (const file of files) {
            try {
                const image = await this.createImageObject(file);
                this.uploadedImages.push(image);
                this.renderImageCard(image);
            } catch (error) {
                console.error('Error processing image:', error);
                this.showError(`Error processing ${file.name}`);
            }
        }
    }

    createImageObject(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            const img = new Image();
            
            reader.onload = (e) => {
                img.onload = () => {
                    const imageObj = {
                        id: Date.now() + Math.random(),
                        file,
                        name: file.name,
                        originalSize: file.size,
                        width: img.width,
                        height: img.height,
                        dataUrl: e.target.result,
                        compressed: null,
                        compressedSize: null,
                        compressedDataUrl: null
                    };
                    resolve(imageObj);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    renderImageCard(image) {
        const card = document.createElement('div');
        card.className = 'image-card fade-in';
        card.innerHTML = `
            <img src="${image.dataUrl}" alt="${image.name}" class="image-preview">
            <div class="image-info">
                <div class="image-name">${image.name}</div>
                <div class="image-details">
                    <div class="detail-item">
                        <span class="detail-label">Original Size</span>
                        <span class="detail-value">${this.formatFileSize(image.originalSize)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Resolution</span>
                        <span class="detail-value">${image.width} × ${image.height}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Target Size</span>
                        <span class="detail-value">${this.formatFileSize(this.targetSize * 1024)}</span>
                    </div>
                    <div class="detail-item compressed-size-detail" style="display: none;">
                        <span class="detail-label">Compressed Size</span>
                        <span class="detail-value compressed-size-value">-</span>
                    </div>
                </div>
                <div class="compression-section">
                    <button class="compress-btn" onclick="imageCompressor.compressImage('${image.id}')">
                        🗜️ Compress Image
                    </button>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="compression-status"></div>
                    <button class="download-btn" onclick="imageCompressor.downloadImage('${image.id}')">
                        ⬇️ Download Compressed
                    </button>
                </div>
            </div>
        `;
        
        this.imagesGrid.appendChild(card);
        image.cardElement = card;
    }

    showTargetSizeSection() {
        this.targetSizeSection.style.display = 'block';
        this.targetSizeSection.classList.add('fade-in');
    }

    selectTargetSize(button) {
        this.sizeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.targetSize = parseInt(button.dataset.size);
        
        // Update target size display in all cards
        this.uploadedImages.forEach(image => {
            const targetSizeValue = image.cardElement.querySelector('.detail-value');
            if (targetSizeValue) {
                const targetSizeElement = image.cardElement.querySelectorAll('.detail-value')[2];
                if (targetSizeElement) {
                    targetSizeElement.textContent = this.formatFileSize(this.targetSize * 1024);
                }
            }
        });
    }

    async compressImage(imageId) {
        const image = this.uploadedImages.find(img => img.id == imageId);
        if (!image) return;

        const card = image.cardElement;
        const compressBtn = card.querySelector('.compress-btn');
        const progressBar = card.querySelector('.progress-bar');
        const progressFill = card.querySelector('.progress-fill');
        const status = card.querySelector('.compression-status');
        const downloadBtn = card.querySelector('.download-btn');
        const compressedSizeDetail = card.querySelector('.compressed-size-detail');
        const compressedSizeValue = card.querySelector('.compressed-size-value');

        // Start compression UI
        compressBtn.disabled = true;
        progressBar.style.display = 'block';
        status.textContent = 'Compressing...';
        status.className = 'compression-status status-compressing';
        downloadBtn.style.display = 'none';

        try {
            const targetSizeBytes = this.targetSize * 1024;
            
            // If original is already smaller than target, no compression needed
            if (image.originalSize <= targetSizeBytes) {
                progressFill.style.width = '100%';
                status.textContent = 'No compression needed - already smaller than target';
                status.className = 'compression-status status-success';
                
                image.compressedDataUrl = image.dataUrl;
                image.compressedSize = image.originalSize;
                
                compressedSizeDetail.style.display = 'block';
                compressedSizeValue.textContent = this.formatFileSize(image.originalSize);
                downloadBtn.style.display = 'block';
                
                setTimeout(() => {
                    progressBar.style.display = 'none';
                    compressBtn.disabled = false;
                }, 1000);
                return;
            }

            // Perform iterative compression
            const result = await this.performCompression(image, targetSizeBytes, (progress) => {
                progressFill.style.width = `${progress}%`;
            });

            if (result.success) {
                image.compressedDataUrl = result.dataUrl;
                image.compressedSize = result.size;
                
                status.textContent = `Compressed successfully! (${Math.round((1 - result.size / image.originalSize) * 100)}% reduction)`;
                status.className = 'compression-status status-success';
                
                compressedSizeDetail.style.display = 'block';
                compressedSizeValue.textContent = this.formatFileSize(result.size);
                downloadBtn.style.display = 'block';
            } else {
                throw new Error(result.error || 'Compression failed');
            }

        } catch (error) {
            console.error('Compression error:', error);
            status.textContent = `Error: ${error.message}`;
            status.className = 'compression-status status-error';
        } finally {
            setTimeout(() => {
                progressBar.style.display = 'none';
                compressBtn.disabled = false;
            }, 1000);
        }
    }

    async performCompression(image, targetSizeBytes, progressCallback) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                let quality = 0.9;
                let currentSize = image.originalSize;
                let attempts = 0;
                const maxAttempts = 15;
                let bestResult = null;

                const compress = () => {
                    attempts++;
                    progressCallback(Math.min((attempts / maxAttempts) * 100, 95));

                    // Try different output formats
                    const formats = ['image/webp', 'image/jpeg'];
                    let bestFormat = null;
                    let bestDataUrl = null;
                    let bestSize = Infinity;

                    formats.forEach(format => {
                        try {
                            const dataUrl = canvas.toDataURL(format, quality);
                            const size = this.getDataUrlSize(dataUrl);
                            
                            if (size < bestSize) {
                                bestSize = size;
                                bestDataUrl = dataUrl;
                                bestFormat = format;
                            }
                        } catch (e) {
                            // Format might not be supported
                        }
                    });

                    currentSize = bestSize;
                    bestResult = { dataUrl: bestDataUrl, size: bestSize, format: bestFormat };

                    // Check if we've reached our target or tried enough times
                    if (currentSize <= targetSizeBytes || attempts >= maxAttempts || quality <= 0.1) {
                        progressCallback(100);
                        resolve({
                            success: true,
                            dataUrl: bestResult.dataUrl,
                            size: bestResult.size,
                            format: bestResult.format,
                            quality: quality
                        });
                        return;
                    }

                    // Adjust quality for next iteration
                    const ratio = targetSizeBytes / currentSize;
                    if (ratio < 0.8) {
                        quality *= 0.7; // Reduce quality more aggressively
                    } else {
                        quality *= 0.85; // Reduce quality gradually
                    }

                    quality = Math.max(quality, 0.1);

                    // Continue compression after a short delay
                    setTimeout(compress, 50);
                };

                compress();
            };

            img.onerror = () => {
                resolve({
                    success: false,
                    error: 'Failed to load image for compression'
                });
            };

            img.src = image.dataUrl;
        });
    }

    getDataUrlSize(dataUrl) {
        // Calculate approximate size of base64 data URL
        const base64String = dataUrl.split(',')[1];
        return Math.round((base64String.length * 3) / 4);
    }

    downloadImage(imageId) {
        const image = this.uploadedImages.find(img => img.id == imageId);
        if (!image || !image.compressedDataUrl) return;

        const link = document.createElement('a');
        const originalName = image.name.split('.')[0];
        const extension = image.compressedDataUrl.startsWith('data:image/webp') ? 'webp' : 'jpg';
        
        link.download = `${originalName}_compressed_${this.targetSize}kb.${extension}`;
        link.href = image.compressedDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.errorMessage.classList.add('fade-in');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    hideError() {
        this.errorMessage.style.display = 'none';
        this.errorMessage.classList.remove('fade-in');
    }

    showLoading() {
        this.loadingOverlay.style.display = 'flex';
    }

    hideLoading() {
        this.loadingOverlay.style.display = 'none';
    }
}

// Initialize the application when DOM is loaded
let imageCompressor;

document.addEventListener('DOMContentLoaded', () => {
    imageCompressor = new ImageCompressor();
    console.log('🚀 PixelShrink initialized successfully!');
});

// Handle browser compatibility warnings
if (!HTMLCanvasElement.prototype.toDataURL) {
    console.error('Canvas toDataURL not supported');
    alert('Your browser does not support image compression. Please use a modern browser.');
}

// Performance optimization: Preload common UI elements
window.addEventListener('load', () => {
    // Preload common icons and optimize images
    const preloadImages = ['📁', '🗜️', '⬇️', '☀️', '🌙'];
    preloadImages.forEach(emoji => {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.textContent = emoji;
        document.body.appendChild(span);
        setTimeout(() => document.body.removeChild(span), 100);
    });
});

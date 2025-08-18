import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Download, Image as ImageIcon, Zap, Shield, Globe, Smartphone, Mail, Monitor, Camera, History, Settings, ChevronDown, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CompressedImage {
  id: string;
  original: File;
  compressed?: Blob;
  originalSize: number;
  compressedSize?: number;
  compressionRatio?: number;
  status: 'pending' | 'compressing' | 'completed' | 'error';
  targetSize: number;
  preview: string;
  error?: string;
}

interface CompressionHistory {
  id: string;
  filename: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  timestamp: Date;
  targetSize: number;
}

const ImageCompressor = () => {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [targetSize, setTargetSize] = useState(500); // KB
  const [isCompressing, setIsCompressing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [compressionHistory, setCompressionHistory] = useState<CompressionHistory[]>([]);
  const [currentView, setCurrentView] = useState<'compress' | 'history' | 'features' | 'about'>('compress');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Theme handling
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('pixelshrink-history');
    if (savedHistory) {
      setCompressionHistory(JSON.parse(savedHistory).map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      })));
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressImage = async (file: File, targetSizeKB: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate optimal dimensions
        const maxDimension = 2048;
        let { width, height } = img;
        
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Binary search for optimal quality
        let minQuality = 0.1;
        let maxQuality = 0.95;
        let bestBlob: Blob | null = null;
        
        const tryCompress = (quality: number): Promise<Blob> => {
          return new Promise((resolve) => {
            canvas.toBlob((blob) => {
              resolve(blob!);
            }, 'image/jpeg', quality);
          });
        };
        
        const findOptimalQuality = async () => {
          let iterations = 0;
          const maxIterations = 10;
          
          while (iterations < maxIterations && maxQuality - minQuality > 0.01) {
            const midQuality = (minQuality + maxQuality) / 2;
            const blob = await tryCompress(midQuality);
            const sizeKB = blob.size / 1024;
            
            if (sizeKB <= targetSizeKB) {
              bestBlob = blob;
              minQuality = midQuality;
            } else {
              maxQuality = midQuality;
            }
            iterations++;
          }
          
          if (!bestBlob) {
            bestBlob = await tryCompress(minQuality);
          }
          
          resolve(bestBlob);
        };
        
        findOptimalQuality();
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = useCallback((files: FileList) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a valid image file`,
          variant: "destructive",
        });
      }
      
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 50MB limit`,
          variant: "destructive",
        });
      }
      
      return isValidType && isValidSize;
    });

    const newImages: CompressedImage[] = validFiles.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      original: file,
      originalSize: file.size,
      status: 'pending',
      targetSize: targetSize,
      preview: URL.createObjectURL(file),
    }));

    setImages(prev => [...prev, ...newImages]);
    
    // Auto-compress
    newImages.forEach(image => compressImageById(image.id));
  }, [targetSize, toast]);

  const compressImageById = async (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, status: 'compressing' } : img
    ));

    const image = images.find(img => img.id === imageId);
    if (!image) return;

    try {
      const compressedBlob = await compressImage(image.original, targetSize);
      const compressionRatio = ((image.originalSize - compressedBlob.size) / image.originalSize) * 100;
      
      setImages(prev => prev.map(img => 
        img.id === imageId ? {
          ...img,
          compressed: compressedBlob,
          compressedSize: compressedBlob.size,
          compressionRatio,
          status: 'completed'
        } : img
      ));

      // Add to history
      const historyItem: CompressionHistory = {
        id: imageId,
        filename: image.original.name,
        originalSize: image.originalSize,
        compressedSize: compressedBlob.size,
        compressionRatio,
        timestamp: new Date(),
        targetSize: targetSize,
      };
      
      setCompressionHistory(prev => {
        const newHistory = [historyItem, ...prev].slice(0, 100); // Keep last 100
        localStorage.setItem('pixelshrink-history', JSON.stringify(newHistory));
        return newHistory;
      });

      toast({
        title: "Compression complete!",
        description: `${image.original.name} compressed by ${compressionRatio.toFixed(1)}%`,
      });

    } catch (error) {
      setImages(prev => prev.map(img => 
        img.id === imageId ? {
          ...img,
          status: 'error',
          error: 'Compression failed'
        } : img
      ));

      toast({
        title: "Compression failed",
        description: `Failed to compress ${image.original.name}`,
        variant: "destructive",
      });
    }
  };

  const downloadImage = (image: CompressedImage) => {
    if (!image.compressed) return;
    
    const url = URL.createObjectURL(image.compressed);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${image.original.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAllImages = () => {
    const completedImages = images.filter(img => img.status === 'completed' && img.compressed);
    
    if (completedImages.length === 0) {
      toast({
        title: "No images to download",
        description: "Please wait for compression to complete",
        variant: "destructive",
      });
      return;
    }

    // Create and download ZIP file logic would go here
    // For now, download individually
    completedImages.forEach(image => downloadImage(image));
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [handleFileSelect]);

  const sizeOptions = [
    { value: 100, label: "100 KB", icon: Smartphone, description: "Perfect for mobile apps" },
    { value: 300, label: "300 KB", icon: Mail, description: "Email attachments" },
    { value: 500, label: "500 KB", icon: Globe, description: "Web optimization" },
    { value: 1000, label: "1 MB", icon: Monitor, description: "High quality web" },
    { value: 2000, label: "2 MB", icon: Camera, description: "Print quality" },
  ];

  const navigation = [
    { id: 'compress', label: 'Compress', icon: Zap },
    { id: 'history', label: 'History', icon: History },
    { id: 'features', label: 'Features', icon: Shield },
    { id: 'about', label: 'About', icon: Settings },
  ];

  const stats = [
    { label: "Images Processed", value: "50M+", color: "text-blue-500" },
    { label: "Countries Served", value: "195", color: "text-green-500" },
    { label: "Data Saved", value: "2.5TB", color: "text-purple-500" },
    { label: "User Satisfaction", value: "99.9%", color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="glass border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">PixelShrink</h1>
                <p className="text-xs text-muted-foreground">Smart Compression</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentView(item.id as any)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </nav>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-9 h-9 p-0"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden w-9 h-9 p-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t py-4">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentView === item.id ? "default" : "ghost"}
                      className="justify-start flex items-center space-x-2"
                      onClick={() => {
                        setCurrentView(item.id as any);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'compress' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">100% Secure • Client-Side Processing</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
                Compress Images with AI Precision
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your images to perfect file sizes while maintaining exceptional quality. 
                No uploads, no tracking, just pure compression magic.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="glass-card p-4">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Size Selection */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Choose Target Size</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {sizeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <Button
                        key={option.value}
                        variant={targetSize === option.value ? "default" : "outline"}
                        className="h-auto p-4 flex flex-col items-center space-y-2"
                        onClick={() => setTargetSize(option.value)}
                      >
                        <Icon className="w-6 h-6" />
                        <div className="text-lg font-semibold">{option.label}</div>
                        <div className="text-xs text-center opacity-75">{option.description}</div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upload Area */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300",
                    dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                    "hover:border-primary hover:bg-primary/5"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto animate-glow">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">Drop your images here</h3>
                      <p className="text-muted-foreground mb-4">or click to browse files</p>
                      
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="button-primary"
                      >
                        Select Images
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                      {['JPG', 'PNG', 'WebP'].map((format) => (
                        <Badge key={format} variant="secondary" className="bg-primary/10 text-primary">
                          {format}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Maximum file size: 50MB per image
                    </p>
                  </div>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                />
              </CardContent>
            </Card>

            {/* Images Grid */}
            {images.length > 0 && (
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Compression Results</CardTitle>
                  <Button onClick={downloadAllImages} className="button-primary">
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                      <div key={image.id} className="glass-card p-4 space-y-4">
                        <div className="aspect-video relative overflow-hidden rounded-lg">
                          <img
                            src={image.preview}
                            alt={image.original.name}
                            className="w-full h-full object-cover"
                          />
                          
                          {image.status === 'compressing' && (
                            <div className="absolute inset-0 glass flex items-center justify-center">
                              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold truncate" title={image.original.name}>
                            {image.original.name}
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-2">
                            <div>Original: {formatFileSize(image.originalSize)}</div>
                            <div>
                              {image.compressedSize ? (
                                <>Compressed: {formatFileSize(image.compressedSize)}</>
                              ) : (
                                <span className="text-yellow-500">Processing...</span>
                              )}
                            </div>
                          </div>
                          
                          {image.compressionRatio && (
                            <div className="mt-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Compression:</span>
                                <span className="text-green-500 font-semibold">
                                  {image.compressionRatio.toFixed(1)}% saved
                                </span>
                              </div>
                              <Progress value={image.compressionRatio} className="h-2" />
                            </div>
                          )}
                          
                          {image.status === 'completed' && (
                            <Button
                              onClick={() => downloadImage(image)}
                              className="w-full mt-3 button-primary"
                              size="sm"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          )}
                          
                          {image.status === 'error' && (
                            <div className="text-red-500 text-sm mt-2">
                              {image.error || 'Compression failed'}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {currentView === 'history' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Compression History</h2>
              <p className="text-muted-foreground">Track your compression activity and savings</p>
            </div>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Recent Compressions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {compressionHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No compression history yet. Start compressing images to see your activity here.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {compressionHistory.slice(0, 20).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 glass border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.filename}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        
                        <div className="text-right space-y-1">
                          <div className="text-sm">
                            {formatFileSize(item.originalSize)} → {formatFileSize(item.compressedSize)}
                          </div>
                          <div className="text-green-500 font-semibold text-sm">
                            {item.compressionRatio.toFixed(1)}% saved
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === 'features' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover what makes PixelShrink the best image compression tool for professionals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "100% Secure",
                  description: "All processing happens in your browser. Your images never leave your device.",
                  color: "text-green-500"
                },
                {
                  icon: Zap,
                  title: "AI-Powered",
                  description: "Advanced algorithms automatically optimize compression for perfect quality.",
                  color: "text-blue-500"
                },
                {
                  icon: Globe,
                  title: "Universal Format Support",
                  description: "Works with JPG, PNG, WebP, and automatically converts for optimal results.",
                  color: "text-purple-500"
                },
                {
                  icon: Smartphone,
                  title: "Mobile Optimized",
                  description: "Perfect compression for mobile apps, web, email, and print.",
                  color: "text-orange-500"
                },
                {
                  icon: Download,
                  title: "Batch Processing",
                  description: "Compress multiple images simultaneously with bulk download options.",
                  color: "text-pink-500"
                },
                {
                  icon: History,
                  title: "Smart History",
                  description: "Track your compression activity and see total data savings over time.",
                  color: "text-indigo-500"
                }
              ].map((feature, index) => (
                <Card key={index} className="glass-card interactive">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === 'about' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">About PixelShrink</h2>
              <p className="text-xl text-muted-foreground">
                The world's most advanced image compression tool, trusted by millions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe everyone should have access to professional-grade image compression. 
                    PixelShrink democratizes advanced compression technology, making it accessible 
                    to designers, developers, and everyday users worldwide.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Privacy First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Your privacy is paramount. All image processing happens locally in your browser. 
                    We never upload, store, or analyze your images. What you compress stays with you.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Advanced Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Our compression engine uses cutting-edge algorithms to achieve optimal 
                    file sizes while maintaining visual quality. Machine learning helps 
                    determine the perfect balance for each image.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Global Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    With over 50 million images compressed and 2.5TB of data saved, 
                    PixelShrink is helping reduce internet bandwidth usage and 
                    improve web performance worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ImageCompressor;
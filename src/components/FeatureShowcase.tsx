import React from 'react';
import { Shield, Zap, Globe, Smartphone, Download, History, Settings, Image, Award, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FeatureShowcase = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Client-Side Processing",
      description: "Your images never leave your device. All compression happens locally in your browser for maximum privacy and security.",
      color: "text-green-500",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Zap,
      title: "AI-Powered Optimization",
      description: "Advanced algorithms automatically detect optimal compression settings for each image type and use case.",
      color: "text-blue-500",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Globe,
      title: "Universal Format Support",
      description: "Support for JPG, PNG, WebP with smart format conversion for optimal file sizes and compatibility.",
      color: "text-purple-500",
      gradient: "from-purple-500/20 to-violet-500/20"
    },
    {
      icon: Smartphone,
      title: "Multi-Platform Optimization",
      description: "Preset optimization profiles for mobile apps, web, email, social media, and print applications.",
      color: "text-orange-500",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: Download,
      title: "Batch Processing & Export",
      description: "Process multiple images simultaneously with bulk download options and ZIP archive creation.",
      color: "text-pink-500",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: History,
      title: "Smart History Tracking",
      description: "Track compression statistics, monitor data savings, and maintain a history of all processed images.",
      color: "text-indigo-500",
      gradient: "from-indigo-500/20 to-blue-500/20"
    }
  ];

  const stats = [
    { icon: Image, label: "Images Processed", value: "50M+", color: "text-blue-500" },
    { icon: Users, label: "Global Users", value: "2M+", color: "text-green-500" },
    { icon: Globe, label: "Countries", value: "195", color: "text-purple-500" },
    { icon: Award, label: "Data Saved", value: "2.5TB", color: "text-orange-500" },
  ];

  const useCases = [
    {
      title: "Web Developers",
      description: "Optimize images for faster website loading and better SEO scores",
      benefits: ["Improved page speed", "Better user experience", "Higher search rankings"]
    },
    {
      title: "Mobile App Developers",
      description: "Reduce app size and improve performance with optimized assets",
      benefits: ["Smaller app bundles", "Faster loading", "Better performance"]
    },
    {
      title: "Social Media Managers",
      description: "Perfect images for all social platforms with optimal file sizes",
      benefits: ["Platform compliance", "Faster uploads", "Professional quality"]
    },
    {
      title: "E-commerce Stores",
      description: "Optimize product images for better conversion and loading speed",
      benefits: ["Faster product pages", "Better conversion", "Reduced bandwidth"]
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-card text-center">
              <CardContent className="p-6">
                <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Features */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            Enterprise-Grade Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the advanced capabilities that make PixelShrink the choice of professionals worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="glass-card group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Perfect for Every Professional</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're building the next big app or managing social media campaigns, 
            PixelShrink has the tools you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>{useCase.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Built with Cutting-Edge Technology</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our compression engine leverages the latest web technologies for maximum performance and compatibility
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "WebAssembly", description: "Native performance" },
            { name: "Canvas API", description: "Hardware acceleration" },
            { name: "Web Workers", description: "Background processing" },
            { name: "Progressive Web App", description: "Offline capability" }
          ].map((tech, index) => (
            <div key={index} className="text-center">
              <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">
                {tech.name}
              </Badge>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
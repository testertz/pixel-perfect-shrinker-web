import React from 'react';
import { TrendingUp, TrendingDown, Zap, HardDrive, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface CompressionStatsProps {
  stats: {
    totalImages: number;
    totalOriginalSize: number;
    totalCompressedSize: number;
    totalSaved: number;
    averageCompression: number;
  };
}

const CompressionStats: React.FC<CompressionStatsProps> = ({ stats }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const compressionEfficiency = stats.totalOriginalSize > 0 
    ? ((stats.totalSaved / stats.totalOriginalSize) * 100) 
    : 0;

  const statCards = [
    {
      title: "Total Images Processed",
      value: formatNumber(stats.totalImages),
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Total Data Saved",
      value: formatFileSize(stats.totalSaved),
      icon: HardDrive,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Average Compression",
      value: `${stats.averageCompression.toFixed(1)}%`,
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Efficiency Rating",
      value: `${compressionEfficiency.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  const compressionBreakdown = [
    {
      range: "90-100%",
      description: "Exceptional compression",
      color: "bg-green-500",
      percentage: 25
    },
    {
      range: "70-89%",
      description: "Excellent compression",
      color: "bg-blue-500",
      percentage: 35
    },
    {
      range: "50-69%",
      description: "Good compression",
      color: "bg-yellow-500",
      percentage: 30
    },
    {
      range: "Below 50%",
      description: "Standard compression",
      color: "bg-gray-500",
      percentage: 10
    }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                </div>
                
                <div className={`text-2xl font-bold ${card.color} mb-2`}>
                  {card.value}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compression Efficiency */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Compression Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Efficiency</span>
                  <span className="text-sm text-green-500 font-semibold">
                    {compressionEfficiency.toFixed(1)}%
                  </span>
                </div>
                <Progress value={compressionEfficiency} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">
                    {formatFileSize(stats.totalOriginalSize)}
                  </div>
                  <div className="text-sm text-muted-foreground">Original Size</div>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">
                    {formatFileSize(stats.totalCompressedSize)}
                  </div>
                  <div className="text-sm text-muted-foreground">Compressed Size</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compression Distribution */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-500" />
              <span>Compression Quality Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {compressionBreakdown.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{item.range}</span>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Processing Insights</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Most images achieve 70-89% compression while maintaining excellent visual quality. 
                Our AI optimization ensures the perfect balance between file size and image fidelity.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Impact */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-green-500" />
            <span>Environmental Impact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {(stats.totalSaved / (1024 * 1024 * 1024) * 2.5).toFixed(1)} kg
              </div>
              <p className="text-sm text-muted-foreground">CO₂ Emissions Saved</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {(stats.totalSaved / (1024 * 1024) * 0.12).toFixed(1)} kWh
              </div>
              <p className="text-sm text-muted-foreground">Energy Saved</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {(stats.totalImages * 0.05).toFixed(1)} min
              </div>
              <p className="text-sm text-muted-foreground">Loading Time Saved</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              By optimizing your images, you're contributing to a more sustainable web. 
              Smaller file sizes mean faster loading, less bandwidth usage, and reduced energy consumption.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompressionStats;
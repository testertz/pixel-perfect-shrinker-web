
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Image, 
  Zap, 
  Shield, 
  Download, 
  Sparkles, 
  ArrowRight,
  CheckCircle,
  BarChart3,
  Clock,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FeatureShowcase from "@/components/FeatureShowcase";
import CompressionStats from "@/components/CompressionStats";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Zap,
      title: t.lightningFast,
      description: t.lightningFastDesc
    },
    {
      icon: Shield,
      title: t.secure,
      description: t.secureDesc
    },
    {
      icon: BarChart3,
      title: t.smartAnalytics,
      description: t.smartAnalyticsDesc
    },
    {
      icon: Download,
      title: t.batchProcessing,
      description: t.batchProcessingDesc
    },
    {
      icon: Users,
      title: t.developerFriendly,
      description: t.developerFriendlyDesc
    },
    {
      icon: Clock,
      title: t.alwaysAvailable,
      description: t.alwaysAvailableDesc
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 px-4">
        <div className="gradient-mesh absolute inset-0 opacity-30" />
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            {t.heroSubtitle}
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient block">{t.heroTitle}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            {t.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
            <Link to="/compressor">
              <Button size="lg" className="button-primary group w-full sm:w-auto">
                {t.startCompressing}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="button-glass w-full sm:w-auto">
              <Download className="w-5 h-5 mr-2" />
              {t.viewDemo}
            </Button>
          </div>
          
          <CompressionStats stats={{
            totalImages: 50000,
            totalOriginalSize: 2500000000000, // 2.5TB
            totalCompressedSize: 625000000000, // 625GB
            totalSaved: 1875000000000, // 1.875TB
            averageCompression: 75
          }} />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t.whyChoose}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              {t.whyChooseDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card interactive group hover:shadow-glow">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm sm:text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <FeatureShowcase />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-6 sm:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 px-4">
              {t.ctaDescription}
            </p>
            <Link to="/compressor">
              <Button size="lg" className="button-primary group w-full sm:w-auto">
                {t.getStartedNow}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

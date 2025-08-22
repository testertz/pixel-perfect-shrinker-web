import React from 'react';
import { Shield, Zap, Globe, Smartphone, Download, History, Settings, Image, Award, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';

const FeatureShowcase = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Shield,
      title: t.clientSideProcessing,
      description: t.clientSideProcessingDesc,
      color: "text-green-500",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Zap,
      title: t.aiPoweredOptimization,
      description: t.aiPoweredOptimizationDesc,
      color: "text-blue-500",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Globe,
      title: t.universalFormatSupport,
      description: t.universalFormatSupportDesc,
      color: "text-purple-500",
      gradient: "from-purple-500/20 to-violet-500/20"
    },
    {
      icon: Smartphone,
      title: t.multiPlatformOptimization,
      description: t.multiPlatformOptimizationDesc,
      color: "text-orange-500",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: Download,
      title: t.batchProcessingExport,
      description: t.batchProcessingExportDesc,
      color: "text-pink-500",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: History,
      title: t.smartHistoryTracking,
      description: t.smartHistoryTrackingDesc,
      color: "text-indigo-500",
      gradient: "from-indigo-500/20 to-blue-500/20"
    }
  ];

  const stats = [
    { icon: Image, label: t.imagesProcessed, value: "50M+", color: "text-blue-500" },
    { icon: Users, label: t.globalUsers, value: "2M+", color: "text-green-500" },
    { icon: Globe, label: t.countries, value: "195", color: "text-purple-500" },
    { icon: Award, label: t.dataSaved, value: "2.5TB", color: "text-orange-500" },
  ];

  const useCases = [
    {
      title: t.webDevelopers,
      description: t.webDevelopersDesc,
      benefits: [t.improvedPageSpeed, t.betterUserExperience, t.higherSearchRankings]
    },
    {
      title: t.mobileAppDevelopers,
      description: t.mobileAppDevelopersDesc,
      benefits: [t.smallerAppBundles, t.fasterLoading, t.betterPerformance]
    },
    {
      title: t.socialMediaManagers,
      description: t.socialMediaManagersDesc,
      benefits: [t.platformCompliance, t.fasterUploads, t.professionalQuality]
    },
    {
      title: t.ecommerceStores,
      description: t.ecommerceStoresDesc,
      benefits: [t.fasterProductPages, t.betterConversion, t.reducedBandwidth]
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
            {t.enterpriseFeatures}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.enterpriseFeaturesDesc}
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
          <h2 className="text-3xl font-bold mb-4">{t.perfectForProfessionals}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.perfectForProfessionalsDesc}
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
          <h2 className="text-2xl font-bold mb-4">{t.cuttingEdgeTechnology}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.cuttingEdgeTechnologyDesc}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "WebAssembly", description: t.nativePerformance },
            { name: "Canvas API", description: t.hardwareAcceleration },
            { name: "Web Workers", description: t.backgroundProcessing },
            { name: "Progressive Web App", description: t.offlineCapability }
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
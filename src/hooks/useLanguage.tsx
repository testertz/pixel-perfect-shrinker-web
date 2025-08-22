import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'sw';

interface Translations {
  // Navigation
  home: string;
  compress: string;
  features: string;
  history: string;
  about: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  startCompressing: string;
  viewDemo: string;
  whyChoose: string;
  whyChooseDescription: string;

  // Features
  lightningFast: string;
  lightningFastDesc: string;
  secure: string;
  secureDesc: string;
  smartAnalytics: string;
  smartAnalyticsDesc: string;
  batchProcessing: string;
  batchProcessingDesc: string;
  developerFriendly: string;
  developerFriendlyDesc: string;
  alwaysAvailable: string;
  alwaysAvailableDesc: string;

  // CTA
  ctaTitle: string;
  ctaDescription: string;
  getStartedNow: string;

  // Image Compressor
  dragDropImages: string;
  orClickToSelect: string;
  compressionSettings: string;
  targetSize: string;
  uploadedImages: string;
  compressing: string;
  compressed: string;
  error: string;
  downloadAll: string;
  clearAll: string;
  originalSize: string;
  compressedSize: string;
  saved: string;
  retry: string;

  // Common
  loading: string;
  cancel: string;
  download: string;
  delete: string;
  close: string;

  // 404 Page
  pageNotFound: string;
  returnHome: string;

  // Footer
  brandDescription: string;
  quickLinks: string;
  support: string;
  compressImages: string;
  aboutUs: string;
  helpCenter: string;
  apiDocumentation: string;
  privacyPolicy: string;
  termsOfService: string;
  copyright: string;
  madeWithLove: string;

  // Feature Showcase
  clientSideProcessing: string;
  clientSideProcessingDesc: string;
  aiPoweredOptimization: string;
  aiPoweredOptimizationDesc: string;
  universalFormatSupport: string;
  universalFormatSupportDesc: string;
  multiPlatformOptimization: string;
  multiPlatformOptimizationDesc: string;
  batchProcessingExport: string;
  batchProcessingExportDesc: string;
  smartHistoryTracking: string;
  smartHistoryTrackingDesc: string;
  
  // Stats
  imagesProcessed: string;
  globalUsers: string;
  countries: string;
  dataSaved: string;

  // Sections
  enterpriseFeatures: string;
  enterpriseFeaturesDesc: string;
  perfectForProfessionals: string;
  perfectForProfessionalsDesc: string;
  cuttingEdgeTechnology: string;
  cuttingEdgeTechnologyDesc: string;

  // Use Cases
  webDevelopers: string;
  webDevelopersDesc: string;
  mobileAppDevelopers: string;
  mobileAppDevelopersDesc: string;
  socialMediaManagers: string;
  socialMediaManagersDesc: string;
  ecommerceStores: string;
  ecommerceStoresDesc: string;

  // Benefits
  improvedPageSpeed: string;
  betterUserExperience: string;
  higherSearchRankings: string;
  smallerAppBundles: string;
  fasterLoading: string;
  betterPerformance: string;
  platformCompliance: string;
  fasterUploads: string;
  professionalQuality: string;
  fasterProductPages: string;
  betterConversion: string;
  reducedBandwidth: string;

  // Technology
  nativePerformance: string;
  hardwareAcceleration: string;
  backgroundProcessing: string;
  offlineCapability: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    compress: 'Compress',
    features: 'Features',
    history: 'History',
    about: 'About',

    // Hero Section
    heroTitle: 'Compress Images with AI Precision',
    heroSubtitle: 'World\'s Most Advanced Image Compressor',
    heroDescription: 'Reduce image file sizes by up to 90% while maintaining exceptional quality. Our advanced algorithms ensure your images look perfect across all devices.',
    startCompressing: 'Start Compressing',
    viewDemo: 'View Demo',
    whyChoose: 'Why Choose PixelShrink?',
    whyChooseDescription: 'Cutting-edge technology meets user-friendly design for the ultimate compression experience.',

    // Features
    lightningFast: 'Lightning Fast',
    lightningFastDesc: 'Process images in milliseconds with our optimized compression engine. No waiting, just results.',
    secure: '100% Secure',
    secureDesc: 'All processing happens locally in your browser. Your images never leave your device.',
    smartAnalytics: 'Smart Analytics',
    smartAnalyticsDesc: 'Track compression ratios, file sizes, and optimization metrics in real-time.',
    batchProcessing: 'Batch Processing',
    batchProcessingDesc: 'Compress multiple images simultaneously and download them all at once.',
    developerFriendly: 'Developer Friendly',
    developerFriendlyDesc: 'Perfect for web developers, designers, and content creators who need reliable compression.',
    alwaysAvailable: 'Always Available',
    alwaysAvailableDesc: 'No server dependencies. Works offline and processes images instantly, anytime.',

    // CTA
    ctaTitle: 'Ready to Optimize Your Images?',
    ctaDescription: 'Join thousands of developers and designers who trust PixelShrink for their image optimization needs.',
    getStartedNow: 'Get Started Now',

    // Image Compressor
    dragDropImages: 'Drag & drop your images here',
    orClickToSelect: 'or click to select files',
    compressionSettings: 'Compression Settings',
    targetSize: 'Target Size (KB)',
    uploadedImages: 'Uploaded Images',
    compressing: 'Compressing...',
    compressed: 'Compressed',
    error: 'Error',
    downloadAll: 'Download All',
    clearAll: 'Clear All',
    originalSize: 'Original',
    compressedSize: 'Compressed',
    saved: 'Saved',
    retry: 'Retry',

    // Common
    loading: 'Loading...',
    cancel: 'Cancel',
    download: 'Download',
    delete: 'Delete',
    close: 'Close',

    // 404 Page
    pageNotFound: 'Oops! Page not found',
    returnHome: 'Return to Home',

    // Footer
    brandDescription: 'Professional image compression tool that reduces file sizes while maintaining quality. Perfect for developers, designers, and content creators.',
    quickLinks: 'Quick Links',
    support: 'Support',
    compressImages: 'Compress Images',
    aboutUs: 'About Us',
    helpCenter: 'Help Center',
    apiDocumentation: 'API Documentation',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    copyright: '© 2024 PixelShrink. All rights reserved.',
    madeWithLove: 'Made with ❤️ for developers worldwide',

    // Feature Showcase
    clientSideProcessing: '100% Client-Side Processing',
    clientSideProcessingDesc: 'Your images never leave your device. All compression happens locally in your browser for maximum privacy and security.',
    aiPoweredOptimization: 'AI-Powered Optimization',
    aiPoweredOptimizationDesc: 'Advanced algorithms automatically detect optimal compression settings for each image type and use case.',
    universalFormatSupport: 'Universal Format Support',
    universalFormatSupportDesc: 'Support for JPG, PNG, WebP with smart format conversion for optimal file sizes and compatibility.',
    multiPlatformOptimization: 'Multi-Platform Optimization',
    multiPlatformOptimizationDesc: 'Preset optimization profiles for mobile apps, web, email, social media, and print applications.',
    batchProcessingExport: 'Batch Processing & Export',
    batchProcessingExportDesc: 'Process multiple images simultaneously with bulk download options and ZIP archive creation.',
    smartHistoryTracking: 'Smart History Tracking',
    smartHistoryTrackingDesc: 'Track compression statistics, monitor data savings, and maintain a history of all processed images.',
    
    // Stats
    imagesProcessed: 'Images Processed',
    globalUsers: 'Global Users',
    countries: 'Countries',
    dataSaved: 'Data Saved',

    // Sections
    enterpriseFeatures: 'Enterprise-Grade Features',
    enterpriseFeaturesDesc: 'Discover the advanced capabilities that make PixelShrink the choice of professionals worldwide',
    perfectForProfessionals: 'Perfect for Every Professional',
    perfectForProfessionalsDesc: 'Whether you\'re building the next big app or managing social media campaigns, PixelShrink has the tools you need',
    cuttingEdgeTechnology: 'Built with Cutting-Edge Technology',
    cuttingEdgeTechnologyDesc: 'Our compression engine leverages the latest web technologies for maximum performance and compatibility',

    // Use Cases
    webDevelopers: 'Web Developers',
    webDevelopersDesc: 'Optimize images for faster website loading and better SEO scores',
    mobileAppDevelopers: 'Mobile App Developers',
    mobileAppDevelopersDesc: 'Reduce app size and improve performance with optimized assets',
    socialMediaManagers: 'Social Media Managers',
    socialMediaManagersDesc: 'Perfect images for all social platforms with optimal file sizes',
    ecommerceStores: 'E-commerce Stores',
    ecommerceStoresDesc: 'Optimize product images for better conversion and loading speed',

    // Benefits
    improvedPageSpeed: 'Improved page speed',
    betterUserExperience: 'Better user experience',
    higherSearchRankings: 'Higher search rankings',
    smallerAppBundles: 'Smaller app bundles',
    fasterLoading: 'Faster loading',
    betterPerformance: 'Better performance',
    platformCompliance: 'Platform compliance',
    fasterUploads: 'Faster uploads',
    professionalQuality: 'Professional quality',
    fasterProductPages: 'Faster product pages',
    betterConversion: 'Better conversion',
    reducedBandwidth: 'Reduced bandwidth',

    // Technology
    nativePerformance: 'Native performance',
    hardwareAcceleration: 'Hardware acceleration',
    backgroundProcessing: 'Background processing',
    offlineCapability: 'Offline capability',
  },
  sw: {
    // Navigation
    home: 'Nyumbani',
    compress: 'Banua',
    features: 'Vipengele',
    history: 'Historia',
    about: 'Kuhusu',

    // Hero Section
    heroTitle: 'Banua Picha kwa Usahihi wa AI',
    heroSubtitle: 'Kibanuzi cha Picha cha Hali ya Juu Zaidi Duniani',
    heroDescription: 'Punguza ukubwa wa faili za picha hadi asilimia 90 huku ukidumisha ubora wa hali ya juu. Algoriti zetu za hali ya juu zinahakikisha picha zako zinaonekana kamili kwenye vifaa vyote.',
    startCompressing: 'Anza Kubanua',
    viewDemo: 'Angalia Onyesho',
    whyChoose: 'Kwa Nini Uchague PixelShrink?',
    whyChooseDescription: 'Teknolojia ya kisasa inakutana na muundo wa kirafiki kwa mtumiaji kwa uzoefu bora wa kubanua.',

    // Features
    lightningFast: 'Haraka kama Umeme',
    lightningFastDesc: 'Chakata picha katika millisekunde na injini yetu iliyoboresha ya kubanua. Hakuna kungoja, tu matokeo.',
    secure: 'Salama 100%',
    secureDesc: 'Uchakataji wote unafanyika ndani ya kivinjari chako. Picha zako haziwezi kutoka kwenye kifaa chako.',
    smartAnalytics: 'Uchanganuzi wa Akili',
    smartAnalyticsDesc: 'Fuatilia uwiano wa kubanua, ukubwa wa faili, na vipimo vya kuboresha wakati halisi.',
    batchProcessing: 'Uchakataji wa Kundi',
    batchProcessingDesc: 'Banua picha nyingi kwa wakati mmoja na uzipakue zote kwa mara moja.',
    developerFriendly: 'Rafiki wa Msanidi',
    developerFriendlyDesc: 'Kamili kwa wasanidi wa wavuti, wabunifu, na waundaji maudhui wanaohitaji kubanua kuaminika.',
    alwaysAvailable: 'Inapatikana Kila Wakati',
    alwaysAvailableDesc: 'Hakuna mitegemezi ya seva. Inafanya kazi bila mtandao na kuchakata picha papo hapo, wakati wowote.',

    // CTA
    ctaTitle: 'Tayari Kuboresha Picha Zako?',
    ctaDescription: 'Jiunge na maelfu ya wasanidi na wabunifu wanaoamini PixelShrink kwa mahitaji yao ya kuboresha picha.',
    getStartedNow: 'Anza Sasa',

    // Image Compressor
    dragDropImages: 'Buruta na dondosha picha zako hapa',
    orClickToSelect: 'au bofya kuchagua faili',
    compressionSettings: 'Mipangilio ya Kubanua',
    targetSize: 'Ukubwa Unaolengwa (KB)',
    uploadedImages: 'Picha Zilizopakiwa',
    compressing: 'Inabanua...',
    compressed: 'Imebanua',
    error: 'Hitilafu',
    downloadAll: 'Pakua Zote',
    clearAll: 'Futa Zote',
    originalSize: 'Asili',
    compressedSize: 'Imebanua',
    saved: 'Imehifadhiwa',
    retry: 'Jaribu Tena',

    // Common
    loading: 'Inapakia...',
    cancel: 'Ghairi',
    download: 'Pakua',
    delete: 'Futa',
    close: 'Funga',

    // 404 Page
    pageNotFound: 'Haya! Ukurasa haujapatikana',
    returnHome: 'Rudi Nyumbani',

    // Footer
    brandDescription: 'Zana ya kitaaluma ya kubanua picha inayopunguza ukubwa wa faili huku ikidumisha ubora. Kamili kwa wasanidi, wabunifu, na waundaji maudhui.',
    quickLinks: 'Viungo vya Haraka',
    support: 'Msaada',
    compressImages: 'Banua Picha',
    aboutUs: 'Kuhusu Sisi',
    helpCenter: 'Kituo cha Msaada',
    apiDocumentation: 'Nyaraka za API',
    privacyPolicy: 'Sera ya Faragha',
    termsOfService: 'Masharti ya Huduma',
    copyright: '© 2024 PixelShrink. Haki zote zimehifadhiwa.',
    madeWithLove: 'Imetengenezwa kwa ❤️ kwa wasanidi duniani kote',

    // Feature Showcase
    clientSideProcessing: 'Uchakataji wa Upande wa Mteja 100%',
    clientSideProcessingDesc: 'Picha zako hazitoki kwenye kifaa chako. Kubanua kwote kunafanyika ndani ya kivinjari chako kwa faragha na usalama wa kiwango cha juu.',
    aiPoweredOptimization: 'Kuboresha kwa Nguvu za AI',
    aiPoweredOptimizationDesc: 'Algoriti za hali ya juu zinagundua kiotomatiki mipangilio bora ya kubanua kwa kila aina ya picha na matumizi.',
    universalFormatSupport: 'Msaada wa Miundo ya Ulimwengu',
    universalFormatSupportDesc: 'Msaada wa JPG, PNG, WebP na ubadilishaji wa miundo wa akili kwa ukubwa bora wa faili na ulinganifu.',
    multiPlatformOptimization: 'Kuboresha kwa Majukwaa Mengi',
    multiPlatformOptimizationDesc: 'Wasifu wa kuboresha uliopangwa kwa programu za simu, wavuti, barua pepe, mitandao ya kijamii, na maombi ya kuchapisha.',
    batchProcessingExport: 'Uchakataji wa Kundi na Kuhamisha',
    batchProcessingExportDesc: 'Chakata picha nyingi kwa wakati mmoja na chaguo za kupakua kwa wingi na kuunda nyaraka za ZIP.',
    smartHistoryTracking: 'Kufuatilia Historia ya Akili',
    smartHistoryTrackingDesc: 'Fuatilia takwimu za kubanua, simama ukubwa wa data unaookolewa, na dhibitisha historia ya picha zote zilizochakatwa.',
    
    // Stats
    imagesProcessed: 'Picha Zilizochakatwa',
    globalUsers: 'Watumiaji wa Kimataifa',
    countries: 'Mataifa',
    dataSaved: 'Data Iliyohifadhiwa',

    // Sections
    enterpriseFeatures: 'Vipengele vya Kiwango cha Biashara',
    enterpriseFeaturesDesc: 'Gundua uwezo wa hali ya juu unaoufanya PixelShrink kuwa chaguo la wataalamu duniani kote',
    perfectForProfessionals: 'Kamili kwa Kila Mtaalamu',
    perfectForProfessionalsDesc: 'Iwe unajenga programu kubwa inayofuata au kusimamia kampeni za mitandao ya kijamii, PixelShrink ina zana unazohitaji',
    cuttingEdgeTechnology: 'Imejenga kwa Teknolojia ya Kisasa',
    cuttingEdgeTechnologyDesc: 'Injini yetu ya kubanua inatumia teknolojia za hivi punde za wavuti kwa utendaji na ulinganifu wa kiwango cha juu',

    // Use Cases
    webDevelopers: 'Wasanidi wa Wavuti',
    webDevelopersDesc: 'Boresha picha kwa kupakia haraka zaidi kwa tovuti na alama bora za SEO',
    mobileAppDevelopers: 'Wasanidi wa Programu za Simu',
    mobileAppDevelopersDesc: 'Punguza ukubwa wa programu na kuboresha utendaji kwa mali zilizoboresheewa',
    socialMediaManagers: 'Wasimamizi wa Mitandao ya Kijamii',
    socialMediaManagersDesc: 'Picha kamili kwa majukwaa yote ya kijamii na ukubwa bora wa faili',
    ecommerceStores: 'Maduka ya Biashara za Kielektroniki',
    ecommerceStoresDesc: 'Boresha picha za bidhaa kwa ubadilishaji bora na kasi ya kupakia',

    // Benefits
    improvedPageSpeed: 'Kasi iliyoboreshwa ya ukurasa',
    betterUserExperience: 'Uzoefu bora wa mtumiaji',
    higherSearchRankings: 'Daraja la juu la kutafuta',
    smallerAppBundles: 'Vifurushi vidogo vya programu',
    fasterLoading: 'Kupakia haraka',
    betterPerformance: 'Utendaji bora',
    platformCompliance: 'Kufuata sheria za majukwaa',
    fasterUploads: 'Kupakia haraka',
    professionalQuality: 'Ubora wa kitaaluma',
    fasterProductPages: 'Kurasa za haraka za bidhaa',
    betterConversion: 'Ubadilishaji bora',
    reducedBandwidth: 'Upana wa bendi uliopunguzwa',

    // Technology
    nativePerformance: 'Utendaji wa asili',
    hardwareAcceleration: 'Kuongeza kasi kwa maunzi',
    backgroundProcessing: 'Uchakataji wa nyuma',
    offlineCapability: 'Uwezo wa kufanya kazi bila mtandao',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('pixelshrink-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('pixelshrink-language', language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
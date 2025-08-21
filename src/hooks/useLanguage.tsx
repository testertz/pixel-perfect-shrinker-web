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
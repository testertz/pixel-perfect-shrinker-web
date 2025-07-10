
/**
 * PixelShrink - Smart Image Compression Tool
 * Enhanced with international UI/UX and modern features
 */

// Internationalization data
const i18nData = {
    en: {
        'app.title': 'PixelShrink',
        'app.subtitle': 'Smart Image Compression',
        'stats.images': 'Images Compressed',
        'stats.countries': 'Countries',
        'stats.satisfaction': 'Satisfaction',
        'features.secure': '100% Secure',
        'features.fast': 'Lightning Fast',
        'features.quality': 'Premium Quality',
        'features.formats': 'All Formats',
        'features.mobile': 'Mobile Ready',
        'upload.title': 'Drop Your Images Here',
        'upload.description': 'Transform your images instantly with our AI-powered compression',
        'upload.drag': 'Drag & Drop Your Images',
        'upload.or': 'or',
        'upload.browse': 'Browse Files',
        'upload.limit': 'Up to 50MB per file',
        'size.title': 'Choose Target Size',
        'size.description': 'Select the perfect size for your needs',
        'size.mobile': 'Mobile',
        'size.email': 'Email',
        'size.web': 'Web',
        'size.print': 'Print',
        'size.hd': 'HD Quality',
        'toast.success': 'Success!',
        'loading.title': 'Compressing Images',
        'loading.subtitle': 'Our AI is optimizing your images...',
        'footer.tagline': 'Compress smarter, not harder',
        'footer.product': 'Product',
        'footer.features': 'Features',
        'footer.pricing': 'Pricing',
        'footer.api': 'API',
        'footer.support': 'Support',
        'footer.help': 'Help Center',
        'footer.contact': 'Contact',
        'footer.status': 'Status',
        'footer.company': 'Company',
        'footer.about': 'About',
        'footer.blog': 'Blog',
        'footer.careers': 'Careers',
        'footer.github': 'Star on GitHub',
        'footer.rights': 'All rights reserved',
        'footer.secure': 'Secure',
        'footer.fast': 'Fast',
        'footer.global': 'Global',
        'nav.home': 'Home',
        'nav.features': 'Features',
        'nav.howto': 'How to Use',
        'nav.history': 'History',
        'nav.downloads': 'Downloads',
        'nav.about': 'About',
        'features.page.title': 'Our Features',
        'features.page.subtitle': 'Discover what makes PixelShrink the best image compression tool',
        'features.detailed.secure.title': '100% Secure',
        'features.detailed.secure.description': 'Your images are processed locally in your browser. No data is sent to our servers.',
        'features.detailed.fast.title': 'Lightning Fast',
        'features.detailed.fast.description': 'Advanced algorithms ensure rapid compression without quality loss.',
        'features.detailed.quality.title': 'Premium Quality',
        'features.detailed.quality.description': 'Maintain image quality while achieving optimal file sizes.',
        'features.detailed.formats.title': 'All Formats',
        'features.detailed.formats.description': 'Support for JPG, PNG, and WebP formats with smart conversion.',
        'features.detailed.mobile.title': 'Mobile Ready',
        'features.detailed.mobile.description': 'Fully responsive design that works perfectly on all devices.',
        'features.detailed.precise.title': 'Precise Control',
        'features.detailed.precise.description': 'Choose exact target sizes for perfect optimization.',
        'howto.page.title': 'How to Use PixelShrink',
        'howto.page.subtitle': 'Follow these simple steps to compress your images',
        'howto.step1.title': 'Upload Your Images',
        'howto.step1.description': 'Drag and drop your images or click to browse. Supports JPG, PNG, and WebP up to 50MB each.',
        'howto.step2.title': 'Choose Target Size',
        'howto.step2.description': 'Select your desired file size: 100KB for mobile, 500KB for web, or up to 2MB for high quality.',
        'howto.step3.title': 'Compress Images',
        'howto.step3.description': 'Our AI automatically optimizes your images to meet the target size while preserving quality.',
        'howto.step4.title': 'Download Results',
        'howto.step4.description': 'Download your compressed images individually or all at once in a ZIP file.',
        'history.page.title': 'Compression History',
        'history.page.subtitle': 'View your recent image compression activities',
        'history.clear': 'Clear History',
        'history.export': 'Export History',
        'history.empty.title': 'No History Yet',
        'history.empty.description': 'Start compressing images to see your history here.',
        'downloads.page.title': 'Downloads',
        'downloads.page.subtitle': 'Manage and re-download your compressed images',
        'downloads.all': 'Download All',
        'downloads.clear': 'Clear Downloads',
        'downloads.empty.title': 'No Downloads Yet',
        'downloads.empty.description': 'Compressed images will appear here for easy access.',
        'about.page.title': 'About PixelShrink',
        'about.page.subtitle': 'The story behind the smart image compression tool',
        'about.mission.title': 'Our Mission',
        'about.mission.description': 'We believe that image compression should be simple, fast, and secure. PixelShrink was created to provide a user-friendly solution that works entirely in your browser, ensuring your privacy while delivering exceptional results.',
        'about.stats.images': 'Images Compressed',
        'about.stats.countries': 'Countries Served',
        'about.stats.satisfaction': 'User Satisfaction',
        'about.stats.stored': 'Images Stored',
        'about.technology.title': 'Technology',
        'about.technology.description': 'Built with modern web technologies, PixelShrink uses advanced algorithms and AI-powered optimization to deliver the best compression results. All processing happens locally in your browser for maximum security and speed.',
        'about.team.title': 'Built with ❤️',
        'about.team.description': 'Created by passionate developers who understand the importance of web performance and user privacy.',
        'footer.howto': 'How to Use',
        'footer.history': 'History',
        'footer.downloads': 'Downloads',
        'footer.resources': 'Resources',
        'footer.documentation': 'Documentation',
        'footer.tutorials': 'Tutorials',
        'footer.community': 'Community',
        'footer.newsletter': 'Newsletter',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.cookies': 'Cookie Policy',
        'footer.privacy_badge': 'Privacy First'
    },
    es: {
        'app.title': 'PixelShrink',
        'app.subtitle': 'Compresión Inteligente de Imágenes',
        'stats.images': 'Imágenes Comprimidas',
        'stats.countries': 'Países',
        'stats.satisfaction': 'Satisfacción',
        'features.secure': '100% Seguro',
        'features.fast': 'Súper Rápido',
        'features.quality': 'Calidad Premium',
        'features.formats': 'Todos los Formatos',
        'features.mobile': 'Móvil Ready',
        'upload.title': 'Arrastra tus Imágenes Aquí',
        'upload.description': 'Transforma tus imágenes al instante con nuestra compresión IA',
        'upload.drag': 'Arrastra y Suelta tus Imágenes',
        'upload.or': 'o',
        'upload.browse': 'Explorar Archivos',
        'upload.limit': 'Hasta 50MB por archivo',
        'size.title': 'Elige el Tamaño Objetivo',
        'size.description': 'Selecciona el tamaño perfecto para tus necesidades',
        'size.mobile': 'Móvil',
        'size.email': 'Email',
        'size.web': 'Web',
        'size.print': 'Impresión',
        'size.hd': 'Calidad HD',
        'toast.success': '¡Éxito!',
        'loading.title': 'Comprimiendo Imágenes',
        'loading.subtitle': 'Nuestra IA está optimizando tus imágenes...',
        'footer.tagline': 'Comprime más inteligente, no más fuerte',
        'footer.product': 'Producto',
        'footer.features': 'Características',
        'footer.pricing': 'Precios',
        'footer.api': 'API',
        'footer.support': 'Soporte',
        'footer.help': 'Centro de Ayuda',
        'footer.contact': 'Contacto',
        'footer.status': 'Estado',
        'footer.company': 'Empresa',
        'footer.about': 'Acerca de',
        'footer.blog': 'Blog',
        'footer.careers': 'Carreras',
        'footer.github': 'Estrella en GitHub',
        'footer.rights': 'Todos los derechos reservados',
        'footer.secure': 'Seguro',
        'footer.fast': 'Rápido',
        'footer.global': 'Global'
    },
    fr: {
        'app.title': 'PixelShrink',
        'app.subtitle': 'Compression Intelligente d\'Images',
        'stats.images': 'Images Compressées',
        'stats.countries': 'Pays',
        'stats.satisfaction': 'Satisfaction',
        'features.secure': '100% Sécurisé',
        'features.fast': 'Ultra Rapide',
        'features.quality': 'Qualité Premium',
        'features.formats': 'Tous Formats',
        'features.mobile': 'Mobile Ready',
        'upload.title': 'Déposez vos Images Ici',
        'upload.description': 'Transformez vos images instantanément avec notre compression IA',
        'upload.drag': 'Glissez & Déposez vos Images',
        'upload.or': 'ou',
        'upload.browse': 'Parcourir Fichiers',
        'upload.limit': 'Jusqu\'à 50MB par fichier',
        'size.title': 'Choisir la Taille Cible',
        'size.description': 'Sélectionnez la taille parfaite pour vos besoins',
        'size.mobile': 'Mobile',
        'size.email': 'Email',
        'size.web': 'Web',
        'size.print': 'Impression',
        'size.hd': 'Qualité HD',
        'toast.success': 'Succès!',
        'loading.title': 'Compression en Cours',
        'loading.subtitle': 'Notre IA optimise vos images...',
        'footer.tagline': 'Compressez plus intelligemment',
        'footer.product': 'Produit',
        'footer.features': 'Fonctionnalités',
        'footer.pricing': 'Tarifs',
        'footer.api': 'API',
        'footer.support': 'Support',
        'footer.help': 'Centre d\'Aide',
        'footer.contact': 'Contact',
        'footer.status': 'Statut',
        'footer.company': 'Entreprise',
        'footer.about': 'À Propos',
        'footer.blog': 'Blog',
        'footer.careers': 'Carrières',
        'footer.github': 'Star sur GitHub',
        'footer.rights': 'Tous droits réservés',
        'footer.secure': 'Sécurisé',
        'footer.fast': 'Rapide',
        'footer.global': 'Global'
    },
    de: {
        'app.title': 'PixelShrink',
        'app.subtitle': 'Intelligente Bildkompression',
        'stats.images': 'Bilder Komprimiert',
        'stats.countries': 'Länder',
        'stats.satisfaction': 'Zufriedenheit',
        'features.secure': '100% Sicher',
        'features.fast': 'Blitzschnell',
        'features.quality': 'Premium Qualität',
        'features.formats': 'Alle Formate',
        'features.mobile': 'Mobile Ready',
        'upload.title': 'Bilder Hier Ablegen',
        'upload.description': 'Transformieren Sie Ihre Bilder sofort mit unserer KI-Kompression',
        'upload.drag': 'Bilder Ziehen & Ablegen',
        'upload.or': 'oder',
        'upload.browse': 'Dateien Durchsuchen',
        'upload.limit': 'Bis zu 50MB pro Datei',
        'size.title': 'Zielgröße Wählen',
        'size.description': 'Wählen Sie die perfekte Größe für Ihre Bedürfnisse',
        'size.mobile': 'Mobil',
        'size.email': 'Email',
        'size.web': 'Web',
        'size.print': 'Druck',
        'size.hd': 'HD Qualität',
        'toast.success': 'Erfolg!',
        'loading.title': 'Bilder Komprimieren',
        'loading.subtitle': 'Unsere KI optimiert Ihre Bilder...',
        'footer.tagline': 'Komprimieren Sie intelligenter',
        'footer.product': 'Produkt',
        'footer.features': 'Funktionen',
        'footer.pricing': 'Preise',
        'footer.api': 'API',
        'footer.support': 'Support',
        'footer.help': 'Hilfe-Center',
        'footer.contact': 'Kontakt',
        'footer.status': 'Status',
        'footer.company': 'Unternehmen',
        'footer.about': 'Über Uns',
        'footer.blog': 'Blog',
        'footer.careers': 'Karriere',
        'footer.github': 'Star auf GitHub',
        'footer.rights': 'Alle Rechte vorbehalten',
        'footer.secure': 'Sicher',
        'footer.fast': 'Schnell',
        'footer.global': 'Global'
    },
    ja: {
        'app.title': 'PixelShrink',
        'app.subtitle': 'スマート画像圧縮',
        'stats.images': '圧縮済み画像',
        'stats.countries': 'カ国',
        'stats.satisfaction': '満足度',
        'features.secure': '100%安全',
        'features.fast': '超高速',
        'features.quality': 'プレミアム品質',
        'features.formats': '全フォーマット',
        'features.mobile': 'モバイル対応',
        'upload.title': 'ここに画像をドロップ',
        'upload.description': 'AI搭載圧縮で画像を瞬時に変換',
        'upload.drag': '画像をドラッグ＆ドロップ',
        'upload.or': 'または',
        'upload.browse': 'ファイルを参照',
        'upload.limit': '1ファイル最大50MB',
        'size.title': 'ターゲットサイズを選択',
        'size.description': 'ニーズに最適なサイズを選択してください',
        'size.mobile': 'モバイル',
        'size.email': 'メール',
        'size.web': 'ウェブ',
        'size.print': '印刷',
        'size.hd': 'HD品質',
        'toast.success': '成功！',
        'loading.title': '画像圧縮中',
        'loading.subtitle': 'AIが画像を最適化しています...',
        'footer.tagline': 'より賢く圧縮',
        'footer.product': '製品',
        'footer.features': '機能',
        'footer.pricing': '料金',
        'footer.api': 'API',
        'footer.support': 'サポート',
        'footer.help': 'ヘルプセンター',
        'footer.contact': 'お問い合わせ',
        'footer.status': 'ステータス',
        'footer.company': '会社',
        'footer.about': '会社概要',
        'footer.blog': 'ブログ',
        'footer.careers': 'キャリア',
        'footer.github': 'GitHubでスター',
        'footer.rights': '全著作権所有',
        'footer.secure': '安全',
        'footer.fast': '高速',
        'footer.global': 'グローバル'
    },
    zh: {
        'app.title': 'PixelShrink',
        'app.subtitle': '智能图像压缩',
        'stats.images': '已压缩图像',
        'stats.countries': '个国家',
        'stats.satisfaction': '满意度',
        'features.secure': '100%安全',
        'features.fast': '闪电般快速',
        'features.quality': '高级质量',
        'features.formats': '全格式支持',
        'features.mobile': '移动就绪',
        'upload.title': '将图像拖放到这里',
        'upload.description': '使用我们的AI压缩技术即时转换您的图像',
        'upload.drag': '拖放您的图像',
        'upload.or': '或',
        'upload.browse': '浏览文件',
        'upload.limit': '每个文件最大50MB',
        'size.title': '选择目标大小',
        'size.description': '为您的需求选择完美的大小',
        'size.mobile': '移动端',
        'size.email': '邮件',
        'size.web': '网页',
        'size.print': '打印',
        'size.hd': '高清质量',
        'toast.success': '成功！',
        'loading.title': '正在压缩图像',
        'loading.subtitle': '我们的AI正在优化您的图像...',
        'footer.tagline': '更智能地压缩',
        'footer.product': '产品',
        'footer.features': '功能',
        'footer.pricing': '定价',
        'footer.api': 'API',
        'footer.support': '支持',
        'footer.help': '帮助中心',
        'footer.contact': '联系我们',
        'footer.status': '状态',
        'footer.company': '公司',
        'footer.about': '关于我们',
        'footer.blog': '博客',
        'footer.careers': '职业',
        'footer.github': '在GitHub上加星',
        'footer.rights': '版权所有',
        'footer.secure': '安全',
        'footer.fast': '快速',
        'footer.global': '全球'
    }
};

class ImageCompressor {
    constructor() {
        this.targetSize = 500;
        this.maxFileSize = 50 * 1024 * 1024;
        this.supportedFormats = ['image/jpeg', 'image/png', 'image/webp'];
        this.uploadedImages = [];
        this.compressionQueue = [];
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.currentPage = 'home';
        this.compressionHistory = JSON.parse(localStorage.getItem('compressionHistory')) || [];
        this.downloadsList = JSON.parse(localStorage.getItem('downloadsList')) || [];
        
        this.initializeElements();
        this.bindEvents();
        this.initializeTheme();
        this.initializeLanguage();
        this.initializeNavigation();
        this.startStatsAnimation();
        this.loadPageContent();
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
        this.languageSelector = document.getElementById('languageSelector');
        this.languageBtn = document.getElementById('languageBtn');
        this.languageDropdown = document.getElementById('languageDropdown');
        this.successToast = document.getElementById('successToast');
        
        // Navigation elements
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.footerNavLinks = document.querySelectorAll('.footer-nav-link');
        this.pages = document.querySelectorAll('.page');
        
        // Page-specific elements
        this.historyList = document.getElementById('historyList');
        this.downloadsGrid = document.getElementById('downloadsGrid');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.exportHistoryBtn = document.getElementById('exportHistoryBtn');
        this.downloadAllBtn = document.getElementById('downloadAllBtn');
        this.clearDownloadsBtn = document.getElementById('clearDownloadsBtn');
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
        
        // Language selector
        this.languageBtn.addEventListener('click', this.toggleLanguageDropdown.bind(this));
        
        // Language options
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                this.setLanguage(lang);
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.languageSelector.contains(e.target)) {
                this.languageSelector.classList.remove('active');
            }
        });
        
        // Prevent default drag behaviors
        document.addEventListener('dragover', e => e.preventDefault());
        document.addEventListener('drop', e => e.preventDefault());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
        
        // Navigation events
        this.navToggle?.addEventListener('click', this.toggleMobileNav.bind(this));
        
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                if (page) this.navigateToPage(page);
            });
        });
        
        // Footer navigation links
        this.footerNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                if (page) this.navigateToPage(page);
            });
        });
        
        // Page-specific button events
        this.clearHistoryBtn?.addEventListener('click', this.clearHistory.bind(this));
        this.exportHistoryBtn?.addEventListener('click', this.exportHistory.bind(this));
        this.downloadAllBtn?.addEventListener('click', this.downloadAll.bind(this));
        this.clearDownloadsBtn?.addEventListener('click', this.clearDownloads.bind(this));
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    initializeLanguage() {
        this.updateLanguage();
        this.updateLanguageSelector();
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.showToast('Theme switched to ' + newTheme + ' mode!', 'success');
    }

    toggleLanguageDropdown() {
        this.languageSelector.classList.toggle('active');
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.updateLanguage();
        this.updateLanguageSelector();
        this.languageSelector.classList.remove('active');
        
        const langNames = {
            en: 'English',
            es: 'Español', 
            fr: 'Français',
            de: 'Deutsch',
            ja: '日本語',
            zh: '中文'
        };
        
        this.showToast(`Language changed to ${langNames[lang]}!`, 'success');
    }

    updateLanguage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = i18nData[this.currentLanguage]?.[key] || i18nData.en[key] || key;
            element.textContent = translation;
        });
    }

    updateLanguageSelector() {
        const langCodes = { en: 'EN', es: 'ES', fr: 'FR', de: 'DE', ja: 'JA', zh: 'CN' };
        const langText = document.querySelector('.lang-text');
        if (langText) {
            langText.textContent = langCodes[this.currentLanguage] || 'EN';
        }
        
        // Update active language option
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === this.currentLanguage);
        });
    }

    initializeNavigation() {
        // Set initial page from URL hash or default to home
        const hash = window.location.hash.slice(1);
        this.currentPage = hash && ['home', 'features', 'how-to-use', 'history', 'downloads', 'about'].includes(hash) ? hash : 'home';
        this.navigateToPage(this.currentPage);
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.slice(1);
            const page = hash && ['home', 'features', 'how-to-use', 'history', 'downloads', 'about'].includes(hash) ? hash : 'home';
            this.navigateToPage(page, false);
        });
    }

    startStatsAnimation() {
        // Animate the stats numbers on page load
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '0';
                stat.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    stat.style.transition = 'all 0.8s ease-out';
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, index * 200);
            }, 1000);
        });
    }

    toggleMobileNav() {
        this.navMenu?.classList.toggle('active');
        this.navToggle?.classList.toggle('active');
    }

    navigateToPage(page, updateHistory = true) {
        if (this.currentPage === page) return;
        
        // Hide current page
        this.pages.forEach(p => p.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(page + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = page;
            
            // Update navigation active state
            this.navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.page === page);
            });
            
            // Update URL hash
            if (updateHistory) {
                history.pushState(null, null, `#${page}`);
            }
            
            // Close mobile navigation
            this.navMenu?.classList.remove('active');
            this.navToggle?.classList.remove('active');
            
            // Show/hide header based on page
            const header = document.getElementById('heroSection');
            if (header) {
                header.style.display = page === 'home' ? 'flex' : 'none';
            }
            
            // Load page-specific content
            this.loadPageContent();
        }
    }

    loadPageContent() {
        switch (this.currentPage) {
            case 'history':
                this.loadHistoryPage();
                break;
            case 'downloads':
                this.loadDownloadsPage();
                break;
        }
    }

    loadHistoryPage() {
        if (!this.historyList) return;
        
        if (this.compressionHistory.length === 0) {
            this.historyList.innerHTML = `
                <div class="history-empty">
                    <div class="empty-icon">📜</div>
                    <h3 data-i18n="history.empty.title">No History Yet</h3>
                    <p data-i18n="history.empty.description">Start compressing images to see your history here.</p>
                </div>
            `;
        } else {
            this.historyList.innerHTML = this.compressionHistory.map(item => `
                <div class="history-item">
                    <div class="history-item-header">
                        <div class="history-item-title">${item.fileName}</div>
                        <div class="history-item-date">${new Date(item.date).toLocaleString()}</div>
                    </div>
                    <div class="history-item-details">
                        <div class="history-detail">
                            <span class="history-detail-label">Original Size</span>
                            <span class="history-detail-value">${this.formatFileSize(item.originalSize)}</span>
                        </div>
                        <div class="history-detail">
                            <span class="history-detail-label">Compressed Size</span>
                            <span class="history-detail-value">${this.formatFileSize(item.compressedSize)}</span>
                        </div>
                        <div class="history-detail">
                            <span class="history-detail-label">Compression Ratio</span>
                            <span class="history-detail-value">${item.compressionRatio}%</span>
                        </div>
                        <div class="history-detail">
                            <span class="history-detail-label">Target Size</span>
                            <span class="history-detail-value">${this.formatFileSize(item.targetSize * 1024)}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        this.updateLanguage(); // Re-apply translations
    }

    loadDownloadsPage() {
        if (!this.downloadsGrid) return;
        
        if (this.downloadsList.length === 0) {
            this.downloadsGrid.innerHTML = `
                <div class="downloads-empty">
                    <div class="empty-icon">📦</div>
                    <h3 data-i18n="downloads.empty.title">No Downloads Yet</h3>
                    <p data-i18n="downloads.empty.description">Compressed images will appear here for easy access.</p>
                </div>
            `;
        } else {
            this.downloadsGrid.innerHTML = this.downloadsList.map(item => `
                <div class="image-card">
                    <img src="${item.dataUrl}" alt="${item.fileName}" class="image-preview">
                    <div class="image-info">
                        <div class="image-name">${item.fileName}</div>
                        <div class="image-details">
                            <div class="detail-item">
                                <div class="detail-label">Size</div>
                                <div class="detail-value">${this.formatFileSize(item.size)}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Date</div>
                                <div class="detail-value">${new Date(item.date).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <button class="download-btn" onclick="imageCompressor.redownloadImage('${item.id}')" style="display: flex;">
                            📥 Download Again
                        </button>
                    </div>
                </div>
            `).join('');
        }
        
        this.updateLanguage(); // Re-apply translations
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all compression history?')) {
            this.compressionHistory = [];
            localStorage.setItem('compressionHistory', JSON.stringify(this.compressionHistory));
            this.loadHistoryPage();
            this.showToast('History cleared successfully!', 'success');
        }
    }

    exportHistory() {
        if (this.compressionHistory.length === 0) {
            this.showToast('No history to export!', 'error');
            return;
        }
        
        const csvContent = [
            ['File Name', 'Original Size (bytes)', 'Compressed Size (bytes)', 'Compression Ratio (%)', 'Target Size (KB)', 'Date'],
            ...this.compressionHistory.map(item => [
                item.fileName,
                item.originalSize,
                item.compressedSize,
                item.compressionRatio,
                item.targetSize,
                new Date(item.date).toISOString()
            ])
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pixelshrink-history-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showToast('History exported successfully!', 'success');
    }

    downloadAll() {
        if (this.downloadsList.length === 0) {
            this.showToast('No images to download!', 'error');
            return;
        }
        
        // This would require a zip library to implement properly
        // For now, just show a message
        this.showToast('Download all feature coming soon!', 'info');
    }

    clearDownloads() {
        if (confirm('Are you sure you want to clear all downloaded images?')) {
            this.downloadsList = [];
            localStorage.setItem('downloadsList', JSON.stringify(this.downloadsList));
            this.loadDownloadsPage();
            this.showToast('Downloads cleared successfully!', 'success');
        }
    }

    redownloadImage(id) {
        const item = this.downloadsList.find(img => img.id === id);
        if (item) {
            const a = document.createElement('a');
            a.href = item.dataUrl;
            a.download = item.fileName;
            a.click();
            this.showToast('Image downloaded!', 'success');
        }
    }

    addToHistory(fileName, originalSize, compressedSize, targetSize) {
        const compressionRatio = Math.round((1 - compressedSize / originalSize) * 100);
        const historyItem = {
            fileName,
            originalSize,
            compressedSize,
            compressionRatio,
            targetSize,
            date: Date.now()
        };
        
        this.compressionHistory.unshift(historyItem);
        // Keep only last 50 items
        this.compressionHistory = this.compressionHistory.slice(0, 50);
        localStorage.setItem('compressionHistory', JSON.stringify(this.compressionHistory));
    }

    addToDownloads(fileName, dataUrl, size) {
        const downloadItem = {
            id: Date.now().toString(),
            fileName,
            dataUrl,
            size,
            date: Date.now()
        };
        
        this.downloadsList.unshift(downloadItem);
        // Keep only last 20 items
        this.downloadsList = this.downloadsList.slice(0, 20);
        localStorage.setItem('downloadsList', JSON.stringify(this.downloadsList));
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + O: Open file dialog
        if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
            e.preventDefault();
            this.fileInput.click();
        }
        
        // Escape: Close dropdowns/modals
        if (e.key === 'Escape') {
            this.languageSelector.classList.remove('active');
            this.hideError();
        }
        
        // Number keys: Select size
        const sizeMap = { '1': 100, '2': 300, '3': 500, '4': 1000, '5': 2000 };
        if (sizeMap[e.key]) {
            const targetBtn = document.querySelector(`[data-size="${sizeMap[e.key]}"]`);
            if (targetBtn) {
                this.selectTargetSize(targetBtn);
            }
        }
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
        e.target.value = '';
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
            this.showToast(`${validFiles.length} image(s) uploaded successfully!`, 'success');
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
        
        // Add staggered animation
        setTimeout(() => {
            card.classList.add('scale-in');
        }, this.uploadedImages.length * 100);
    }

    showTargetSizeSection() {
        this.targetSizeSection.style.display = 'block';
        this.targetSizeSection.classList.add('fade-in');
    }

    selectTargetSize(button) {
        this.sizeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.targetSize = parseInt(button.dataset.size);
        
        // Update target size display in all cards with animation
        this.uploadedImages.forEach(image => {
            const targetSizeElement = image.cardElement.querySelectorAll('.detail-value')[2];
            if (targetSizeElement) {
                targetSizeElement.style.transform = 'scale(1.1)';
                targetSizeElement.style.color = 'var(--accent-primary)';
                setTimeout(() => {
                    targetSizeElement.textContent = this.formatFileSize(this.targetSize * 1024);
                    targetSizeElement.style.transform = 'scale(1)';
                    targetSizeElement.style.color = 'var(--text-primary)';
                }, 150);
            }
        });
        
        this.showToast(`Target size set to ${this.formatFileSize(this.targetSize * 1024)}`, 'success');
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

        // Start compression UI with enhanced animations
        compressBtn.disabled = true;
        compressBtn.style.transform = 'scale(0.95)';
        progressBar.style.display = 'block';
        status.textContent = 'Compressing...';
        status.className = 'compression-status status-compressing';
        downloadBtn.style.display = 'none';

        try {
            const targetSizeBytes = this.targetSize * 1024;
            
            if (image.originalSize <= targetSizeBytes) {
                progressFill.style.width = '100%';
                status.textContent = 'No compression needed - already smaller than target';
                status.className = 'compression-status status-success';
                
                image.compressedDataUrl = image.dataUrl;
                image.compressedSize = image.originalSize;
                
                compressedSizeDetail.style.display = 'block';
                compressedSizeValue.textContent = this.formatFileSize(image.originalSize);
                downloadBtn.style.display = 'flex';
                
                setTimeout(() => {
                    progressBar.style.display = 'none';
                    compressBtn.disabled = false;
                    compressBtn.style.transform = 'scale(1)';
                    downloadBtn.classList.add('scale-in');
                }, 1000);
                return;
            }

            const result = await this.performCompression(image, targetSizeBytes, (progress) => {
                progressFill.style.width = `${progress}%`;
            });

            if (result.success) {
                image.compressedDataUrl = result.dataUrl;
                image.compressedSize = result.size;
                
                const reductionPercent = Math.round((1 - result.size / image.originalSize) * 100);
                status.textContent = `Compressed successfully! (${reductionPercent}% reduction)`;
                status.className = 'compression-status status-success';
                
                compressedSizeDetail.style.display = 'block';
                compressedSizeValue.textContent = this.formatFileSize(result.size);
                downloadBtn.style.display = 'flex';
                
                this.showToast(`${image.name} compressed by ${reductionPercent}%!`, 'success');
            } else {
                throw new Error(result.error || 'Compression failed');
            }

        } catch (error) {
            console.error('Compression error:', error);
            status.textContent = `Error: ${error.message}`;
            status.className = 'compression-status status-error';
            this.showToast('Compression failed: ' + error.message, 'error');
        } finally {
            setTimeout(() => {
                progressBar.style.display = 'none';
                compressBtn.disabled = false;
                compressBtn.style.transform = 'scale(1)';
                if (downloadBtn.style.display === 'flex') {
                    downloadBtn.classList.add('scale-in');
                }
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

                    const ratio = targetSizeBytes / currentSize;
                    if (ratio < 0.8) {
                        quality *= 0.7;
                    } else {
                        quality *= 0.85;
                    }

                    quality = Math.max(quality, 0.1);
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
        
        this.showToast('Download started!', 'success');
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    showError(message) {
        const errorText = this.errorMessage.querySelector('.error-text');
        errorText.textContent = message;
        this.errorMessage.style.display = 'flex';
        this.errorMessage.classList.add('fade-in');
        
        setTimeout(() => {
            this.hideError();
        }, 8000);
    }

    hideError() {
        this.errorMessage.style.display = 'none';
        this.errorMessage.classList.remove('fade-in');
    }

    showToast(message, type = 'success') {
        const toast = this.successToast;
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');
        const toastClose = toast.querySelector('.toast-close');
        
        toastMessage.textContent = message;
        
        // Set icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        toastIcon.textContent = icons[type] || icons.success;
        
        // Show toast
        toast.classList.add('show');
        
        // Auto hide after 4 seconds
        const hideTimeout = setTimeout(() => {
            this.hideToast();
        }, 4000);
        
        // Close button
        toastClose.onclick = () => {
            clearTimeout(hideTimeout);
            this.hideToast();
        };
    }

    hideToast() {
        this.successToast.classList.remove('show');
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
    console.log('🚀 PixelShrink initialized with enhanced UI/UX!');
    
    // Add some visual flair on load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Handle browser compatibility warnings
if (!HTMLCanvasElement.prototype.toDataURL) {
    console.error('Canvas toDataURL not supported');
    alert('Your browser does not support image compression. Please use a modern browser.');
}

// Performance optimization and accessibility
window.addEventListener('load', () => {
    // Preload emojis for better performance
    const preloadEmojis = ['📁', '🗜️', '⬇️', '☀️', '🌙', '🌐', '📱', '💌', '🖼️', '📸', '🔒', '⚡', '💎', '🌍'];
    preloadEmojis.forEach(emoji => {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.textContent = emoji;
        document.body.appendChild(span);
        setTimeout(() => document.body.removeChild(span), 100);
    });
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('✨ Enhanced features loaded successfully!');
});

// PWA Service Worker Registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker if available
        console.log('💡 PWA features available');
    });
}

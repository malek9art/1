// Hero slideshow functionality
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // Change slide every 5 seconds
        setInterval(nextSlide, 5000);
        debugLog('✅ تم تهيئة عرض الشرائح');
    } else if (slides.length === 1) {
        // إذا كان هناك شريحة واحدة فقط
        slides[0].classList.add('active');
        debugLog('⚠️ شريحة خلفية واحدة فقط');
    } else {
        debugLog('❌ لا توجد شرائح خلفية');
    }
}

// Fade in animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    debugLog(`✅ تم تهيئةanimations لـ ${fadeElements.length} عنصر`);
}

// Portfolio filtering
function initPortfolioFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active', 'bg-gold', 'text-white');
                    b.classList.add('text-gold');
                });
                
                // Add active class to clicked button
                this.classList.add('active', 'bg-gold', 'text-white');
                this.classList.remove('text-gold');
                
                const filter = this.getAttribute('data-filter');
                const portfolioItems = document.querySelectorAll('.portfolio-item');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
                
                debugLog(`✅ تم تطبيق عامل التصفية: ${filter}`);
            });
        });
        
        debugLog(`✅ تم تهيئة ${filterButtons.length} زر تصفية`);
    } else {
        debugLog('⚠️ لم يتم العثور على أزرار التصفية');
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            debugLog(`📱 تم ${mobileMenu.classList.contains('hidden') ? 'إغلاق' : 'فتح'} القائمة`);
        });
        
        debugLog('✅ تم تهيئة قائمة الجوال');
    } else {
        debugLog('❌ عناصر قائمة الجوال غير موجودة');
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                    
                    // Smooth scroll with offset for fixed navbar
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    debugLog(`🔗 التمرين إلى: ${targetId}`);
                }
            });
        });
        
        debugLog(`✅ تم تهيئة ${navLinks.length} رابط تنقل`);
    } else {
        debugLog('⚠️ لم يتم العثور على روابط التنقل');
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const submitText = document.getElementById('submit-text');
            const loadingSpinner = document.getElementById('loading-spinner');
            
            // Show loading state
            if (submitText) submitText.textContent = 'جاري الإرسال...';
            if (loadingSpinner) loadingSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    debugLog('✅ تم إرسال النموذج بنجاح');
                    alert('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.');
                    this.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                debugLog(`❌ خطأ في إرسال النموذج: ${error.message}`);
                alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
            } finally {
                // Reset loading state
                if (submitText) submitText.textContent = 'إرسال الرسالة';
                if (loadingSpinner) loadingSpinner.classList.add('hidden');
                submitBtn.disabled = false;
            }
        });
        
        debugLog('✅ تم تهيئة نموذج الاتصال');
    } else {
        debugLog('⚠️ نموذج الاتصال غير موجود');
    }
}

// دالة لتهيئة كل الرسوم المتحركة والوظائف
function initAllAnimations() {
    debugLog('🎬 بدء تهيئة الرسوم المتحركة...');
    
    initHeroSlideshow();
    initScrollAnimations();
    initPortfolioFiltering();
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    
    debugLog('✅ تم تهيئة جميع الرسوم المتحركة والوظائف');
}

// جعل الدوال متاحة globally للتصحيح
window.initHeroSlideshow = initHeroSlideshow;
window.initScrollAnimations = initScrollAnimations;
window.initPortfolioFiltering = initPortfolioFiltering;
window.initMobileMenu = initMobileMenu;
window.initSmoothScrolling = initSmoothScrolling;
window.initContactForm = initContactForm;
window.initAllAnimations = initAllAnimations;

debugLog('✅ تم تحميل animations.js بنجاح');

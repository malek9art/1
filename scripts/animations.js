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
        
        setInterval(nextSlide, 5000);
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

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Portfolio filtering
function initPortfolioFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active', 'bg-gold', 'text-white');
                    b.classList.add('text-gold');
                });
                
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
            });
        });
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
                
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
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
                    alert('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.');
                    this.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
                console.error('Error:', error);
            } finally {
                if (submitText) submitText.textContent = 'إرسال الرسالة';
                if (loadingSpinner) loadingSpinner.classList.add('hidden');
                submitBtn.disabled = false;
            }
        });
    }
}

// ==============================================
// دالة التهيئة الرئيسية - أضفها هنا في النهاية
// ==============================================

// دالة لتهيئة كل الرسوم المتحركة والوظائف
function initAllAnimations() {
    console.log('بدء تهيئة الرسوم المتحركة...');
    
    initHeroSlideshow();
    initScrollAnimations();
    initPortfolioFiltering();
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    
    console.log('تم تهيئة جميع الرسوم المتحركة والوظائف ✓');
}

// جعل الدوال متاحة globally للمساعدة في التصحيح
window.initHeroSlideshow = initHeroSlideshow;
window.initScrollAnimations = initScrollAnimations;
window.initPortfolioFiltering = initPortfolioFiltering;
window.initMobileMenu = initMobileMenu;
window.initSmoothScrolling = initSmoothScrolling;
window.initContactForm = initContactForm;
window.initAllAnimations = initAllAnimations;

console.log('تم تحميل animations.js بنجاح');

// Initialize site functionality
function initializeSiteFunctionality() {
    // Initialize animations and functionality
    initHeroSlideshow();
    initScrollAnimations();
    initPortfolioFiltering();
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
}

// Load all data from Google Sheets
async function loadAllData() {
    // Show loading state
    const siteNameElement = document.getElementById('site-name');
    if (siteNameElement) {
        siteNameElement.textContent = 'جاري التحميل...';
    }
    
    try {
        // Load all data in parallel
        const sheetNames = [
            'الإعدادات', 'الرئيسية', 'صور الهيرو', 'من أنا', 
            'المهارات', 'الخدمات', 'آراء العملاء', 'المعرض', 'وسائل التواصل'
        ];
        
        const dataPromises = sheetNames.map(sheetName => fetchSheetData(sheetName));
        const allData = await Promise.allSettled(dataPromises);
        
        // Extract data from promises
        const [
            settings, heroData, heroSlides, aboutData, 
            skillsData, servicesData, testimonialsData, portfolioData, socialData
        ] = allData.map(result => result.status === 'fulfilled' ? result.value : []);
        
        // Process settings
        processSettings(settings);
        
        // Process hero data
        processHeroData(heroData);
        
        // Process hero slides
        processHeroSlides(heroSlides);
        
        // Process about data
        processAboutData(aboutData);
        
        // Process skills
        processSkills(skillsData);
        
        // Process services
        processServices(servicesData);
        
        // Process testimonials
        processTestimonials(testimonialsData);
        
        // Process portfolio
        processPortfolio(portfolioData);
        
        // Process social media
        processSocialMedia(socialData);
        
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        // Initialize animations and functionality after content is loaded
        initializeSiteFunctionality();
    }
}

// Process settings data
function processSettings(settings) {
    if (settings && settings.length > 0) {
        const siteNameElement = document.getElementById('site-name');
        const footerSiteNameElement = document.getElementById('footer-site-name');
        const contactEmailElement = document.getElementById('contact-email');
        const contactPhoneElement = document.getElementById('contact-phone');
        const contactAddressElement = document.getElementById('contact-address');
        const logoImgElement = document.getElementById('logo-img');
        const footerLogoElement = document.getElementById('footer-logo');
        
        if (siteNameElement) siteNameElement.textContent = settings[0]['اسم الموقع'] || 'Malek.Art';
        if (footerSiteNameElement) footerSiteNameElement.textContent = settings[0]['اسم الموقع'] || 'Malek.Art';
        
        const logoUrl = settings[0]['شعار الموقع'];
        if (logoUrl && logoImgElement) logoImgElement.src = logoUrl;
        if (logoUrl && footerLogoElement) footerLogoElement.src = logoUrl;
        
        if (contactEmailElement) {
            contactEmailElement.textContent = settings[0]['البريد الإلكتروني'] || 'malek9art@gmail.com';
            contactEmailElement.href = `mailto:${settings[0]['البريد الإلكتروني'] || 'malek9art@gmail.com'}`;
        }
        
        if (contactPhoneElement) {
            contactPhoneElement.textContent = settings[0]['هاتف التواصل'] || '+967 783 720 851';
            contactPhoneElement.href = `tel:${settings[0]['هاتف التواصل'] || '+967783720851'}`;
        }
        
        if (contactAddressElement) {
            contactAddressElement.textContent = settings[0]['العنوان'] || 'صنعاء، الجمهورية اليمنية';
        }
    }
}

// Process hero data
function processHeroData(heroData) {
    if (heroData && heroData.length > 0) {
        const heroTitleElement = document.getElementById('hero-title');
        const heroSubtitleElement = document.getElementById('hero-subtitle');
        const heroButton1Element = document.getElementById('hero-button1');
        const heroButton2Element = document.getElementById('hero-button2');
        
        if (heroTitleElement) heroTitleElement.textContent = heroData[0]['العنوان'] || 'مرحباً بك في مالك أرت';
        if (heroSubtitleElement) heroSubtitleElement.textContent = heroData[0]['وصف'] || 'نبتكر حلولًا رقمية تجمع بين الفن والتسويق';
        if (heroButton1Element) heroButton1Element.textContent = heroData[0]['نص الزر 1'] || 'استكشف أعمالي';
        if (heroButton2Element) heroButton2Element.textContent = heroData[0]['نص الزر 2'] || 'تواصل معي';
    }
}

// Process hero slides
function processHeroSlides(heroSlides) {
    const slideshowContainer = document.getElementById('hero-slideshow');
    if (slideshowContainer) {
        slideshowContainer.innerHTML = '';
        
        if (heroSlides && heroSlides.length > 0) {
            heroSlides.forEach((slide, index) => {
                if (slide['رابط الصورة']) {
                    const slideDiv = document.createElement('div');
                    slideDiv.className = `hero-slide ${index === 0 ? 'active' : ''}`;
                    slideDiv.style.backgroundImage = `url('${slide['رابط الصورة']}')`;
                    slideshowContainer.appendChild(slideDiv);
                }
            });
        } else {
            // Add default slides if no data
            const defaultSlides = [
                'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80',
                'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80',
                'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80'
            ];
            
            defaultSlides.forEach((url, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.className = `hero-slide ${index === 0 ? 'active' : ''}`;
                slideDiv.style.backgroundImage = `url('${url}')`;
                slideshowContainer.appendChild(slideDiv);
            });
        }
    }
}

// Process about data
function processAboutData(aboutData) {
    if (aboutData && aboutData.length > 0) {
        const aboutTitleElement = document.getElementById('about-title');
        const aboutDescriptionElement = document.getElementById('about-description');
        
        if (aboutTitleElement) aboutTitleElement.textContent = aboutData[0]['العنوان'] || 'مطور ومنسق مشاريع رقمية';
        if (aboutDescriptionElement) aboutDescriptionElement.textContent = aboutData[0]['الوصف'] || 'أنا مالك، مطور ومنسق مشاريع رقمية أبتكر حلولاً محاسبية وأكاديمية مبتكرة، وأربطها ببيانات حية عبر Google Sheets وApps Script. أؤمن بقوة الأدوات المجانية وكفاءتها في تحقيق نتائج احترافية تخدم المجتمع التجاري والحرفي.';
    }
}

// Process skills
function processSkills(skillsData) {
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        
        if (skillsData && skillsData.length > 0) {
            skillsData.forEach(skill => {
                if (skill['اسم المهارة'] && skill['النسبة']) {
                    const skillItem = document.createElement('div');
                    skillItem.className = 'skill-item bg-white p-4 rounded-lg shadow-lg hover-scale';
                    skillItem.innerHTML = `
                        <div class="flex items-center mb-3">
                            <i class="fas fa-palette text-gold text-xl ml-3"></i>
                            <span class="font-semibold text-navy">${skill['اسم المهارة']}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-gold h-3 rounded-full transition-all duration-1000" style="width: ${skill['النسبة']}%"></div>
                        </div>
                    `;
                    skillsContainer.appendChild(skillItem);
                }
            });
        }
    }
}

// Process services
function processServices(servicesData) {
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        servicesContainer.innerHTML = '';
        
        if (servicesData && servicesData.length > 0) {
            servicesData.forEach((service, index) => {
                if (service['اسم الخدمة'] && service['الوصف']) {
                    const serviceCard = document.createElement('div');
                    serviceCard.className = 'service-card bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-xl hover-scale shadow-xl border border-gray-100';
                    serviceCard.innerHTML = `
                        <div class="w-16 h-16 md:w-20 md:h-20 gold-gradient rounded-full flex items-center justify-center mb-6 mx-auto floating" style="animation-delay: -${index}s;">
                            <i class="${service['الأيقونة'] || 'fas fa-palette'} text-navy text-2xl md:text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-navy mb-4 text-center">${service['اسم الخدمة']}</h3>
                        <p class="text-gray-600 text-center mb-4">${service['الوصف']}</p>
                        <div class="text-center">
                            <span class="inline-block bg-gold text-navy px-3 py-1 rounded-full text-sm font-semibold">${service['التصنيف'] || 'احترافي'}</span>
                        </div>
                    `;
                    servicesContainer.appendChild(serviceCard);
                }
            });
        }
    }
}

// Process testimonials
function processTestimonials(testimonialsData) {
    const testimonialsContainer = document.getElementById('testimonials-container');
    if (testimonialsContainer) {
        testimonialsContainer.innerHTML = '';
        
        if (testimonialsData && testimonialsData.length > 0) {
            testimonialsData.forEach((testimonial, index) => {
                if (testimonial['اسم العميل'] && testimonial['التعليق']) {
                    const testimonialCard = document.createElement('div');
                    testimonialCard.className = 'testimonial-card p-6 md:p-8 rounded-xl shadow-2xl hover-scale fade-in';
                    testimonialCard.style.animationDelay = `${index * 0.2}s`;
                    
                    // Generate star rating
                    let starsHtml = '';
                    const rating = parseInt(testimonial['التقييم']) || 5;
                    for (let i = 0; i < rating; i++) {
                        starsHtml += '<i class="fas fa-star text-gold"></i>';
                    }
                    
                    testimonialCard.innerHTML = `
                        <div class="flex items-center mb-6">
                            <div class="w-12 h-12 md:w-16 md:h-16 bg-gold rounded-full flex items-center justify-center ml-4">
                                <i class="fas fa-user text-navy text-lg md:text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy text-lg">${testimonial['اسم العميل']}</h4>
                                <p class="text-gray-600">${testimonial['الوظيفة'] || 'عميل'}</p>
                            </div>
                        </div>
                        <div class="flex mb-4">
                            ${starsHtml}
                        </div>
                        <p class="text-gray-700 italic">"${testimonial['التعليق']}"</p>
                    `;
                    testimonialsContainer.appendChild(testimonialCard);
                }
            });
        }
    }
}

// Process portfolio
function processPortfolio(portfolioData) {
    const portfolioContainer = document.getElementById('portfolio-container');
    if (portfolioContainer) {
        portfolioContainer.innerHTML = '';
        
        if (portfolioData && portfolioData.length > 0) {
            portfolioData.forEach(project => {
                if (project['اسم المشروع'] && project['الوصف']) {
                    const portfolioItem = document.createElement('div');
                    portfolioItem.className = 'portfolio-item';
                    portfolioItem.setAttribute('data-category', project['التصنيف'] || 'هوية بصرية');
                    
                    portfolioItem.innerHTML = `
                        <div class="bg-white rounded-lg overflow-hidden shadow-lg">
                            <div class="h-48 md:h-64 bg-gradient-to-br from-navy to-gray-700 flex items-center justify-center" style="background-image: url('${project['الصورة'] || 'https://i.ibb.co/0pMbNtdH/Elegant-luxurious-black-box-golden-brand-logo-mockup.png'}'); background-size: cover; background-position: center;">
                                <div class="bg-black bg-opacity-40 w-full h-full flex items-center justify-center">
                                    <i class="fas fa-palette text-gold text-3xl md:text-4xl"></i>
                                </div>
                            </div>
                            <div class="p-4 md:p-6">
                                <h3 class="text-lg md:text-xl font-bold text-navy mb-2">${project['اسم المشروع']}</h3>
                                <p class="text-gray-600 mb-4 text-sm md:text-base">${project['الوصف']}</p>
                                <a href="#" class="text-gold hover:text-navy font-semibold text-sm md:text-base">عرض التفاصيل <i class="fas fa-arrow-left mr-2"></i></a>
                            </div>
                        </div>
                    `;
                    portfolioContainer.appendChild(portfolioItem);
                }
            });
        }
    }
}

// Process social media
function processSocialMedia(socialData) {
    const socialContainer = document.getElementById('social-media-container');
    if (socialContainer) {
        socialContainer.innerHTML = '';
        
        if (socialData && socialData.length > 0) {
            socialData.forEach(social => {
                if (social['المنصة'] && social['الرابط']) {
                    const socialLink = document.createElement('a');
                    socialLink.href = social['الرابط'];
                    socialLink.target = '_blank';
                    socialLink.className = 'w-10 h-10 md:w-14 md:h-14 bg-gold rounded-full flex items-center justify-center text-navy hover:bg-light-gold transition-all hover-scale shadow-lg';
                    socialLink.innerHTML = `<i class="${social['الأيقونة'] || 'fab fa-facebook'} text-lg md:text-xl"></i>`;
                    socialContainer.appendChild(socialLink);
                }
            });
        }
    }
}

// Load all data when page is ready
document.addEventListener('DOMContentLoaded', loadAllData);

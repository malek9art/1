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

async function loadAllData() {
    console.log('بدء تحميل البيانات من جوجل شيتس...');
    
    try {
        const sheetNames = [
            'الإعدادات', 'الرئيسية', 'صور الهيرو', 'من أنا', 
            'المهارات', 'الخدمات', 'آراء العملاء', 'المعرض', 'وسائل التواصل'
        ];
        
        const dataPromises = sheetNames.map(sheetName => fetchSheetData(sheetName));
        const allData = await Promise.allSettled(dataPromises);
        
        const [
            settings, heroData, heroSlides, aboutData, 
            skillsData, servicesData, testimonialsData, portfolioData, socialData
        ] = allData.map(result => result.status === 'fulfilled' ? result.value : []);
        
        // عرض هيكل البيانات في الكونسول للمساعدة في التصحيح
        console.log('هيكل البيانات المستلمة:');
        console.log('الإعدادات:', settings);
        console.log('الرئيسية:', heroData);
        console.log('المهارات:', skillsData);
        
        // معالجة البيانات بشكل ديناميكي
        processDataDynamically({
            settings, heroData, heroSlides, aboutData, 
            skillsData, servicesData, testimonialsData, portfolioData, socialData
        });
        
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        initializeSiteFunctionality();
    }
}

function processDataDynamically(data) {
    // معالجة الإعدادات بشكل ديناميكي
    if (data.settings && data.settings.length > 0) {
        const settings = data.settings[0];
        applySettings(settings);
    }
    
    // معالجة البيانات الأخرى بشكل ديناميكي
    processHeroData(data.heroData);
    processHeroSlides(data.heroSlides);
    processAboutData(data.aboutData);
    processSkills(data.skillsData);
    processServices(data.servicesData);
    processTestimonials(data.testimonialsData);
    processPortfolio(data.portfolioData);
    processSocialMedia(data.socialData);
}

function applySettings(settings) {
    // تطبيق الإعدادات بشكل ديناميكي بناء على المفاتيح المتاحة
    const elements = {
        'site-name': ['اسم الموقع', 'Malek.Art'],
        'footer-site-name': ['اسم الموقع', 'Malek.Art'],
        'contact-email': ['البريد الإلكتروني', 'malek9art@gmail.com'],
        'contact-phone': ['هاتف التواصل', '+967 783 720 851'],
        'contact-address': ['العنوان', 'صنعاء، الجمهورية اليمنية']
    };
    
    for (const [elementId, [key, defaultValue]] of Object.entries(elements)) {
        const element = document.getElementById(elementId);
        if (element && settings[key] !== undefined) {
            if (elementId.includes('email')) {
                element.href = `mailto:${settings[key]}`;
            } else if (elementId.includes('phone')) {
                element.href = `tel:${settings[key]}`;
            }
            element.textContent = settings[key] || defaultValue;
        }
    }
    
    // معالجة الشعار
    const logoImg = document.getElementById('logo-img');
    const footerLogo = document.getElementById('footer-logo');
    if (settings['شعار الموقع'] && logoImg) logoImg.src = settings['شعار الموقع'];
    if (settings['شعار الموقع'] && footerLogo) footerLogo.src = settings['شعار الموقع'];
}

function processHeroData(heroData) {
    if (heroData && heroData.length > 0) {
        const hero = heroData[0];
        const elements = {
            'hero-title': ['العنوان', 'مرحباً بك في مالك أرت'],
            'hero-subtitle': ['وصف', 'نبتكر حلولًا رقمية تجمع بين الفن والتسويق'],
            'hero-button1': ['نص الزر 1', 'استكشف أعمالي'],
            'hero-button2': ['نص الزر 2', 'تواصل معي']
        };
        
        for (const [elementId, [key, defaultValue]] of Object.entries(elements)) {
            const element = document.getElementById(elementId);
            if (element && hero[key] !== undefined) {
                element.textContent = hero[key] || defaultValue;
            }
        }
    }
}

function processHeroSlides(heroSlides) {
    const slideshowContainer = document.getElementById('hero-slideshow');
    if (slideshowContainer) {
        slideshowContainer.innerHTML = '';
        
        if (heroSlides && heroSlides.length > 0) {
            heroSlides.forEach((slide, index) => {
                const imageUrl = slide['رابط الصورة'] || slide['صورة'] || slide['image'];
                if (imageUrl) {
                    const slideDiv = document.createElement('div');
                    slideDiv.className = `hero-slide ${index === 0 ? 'active' : ''}`;
                    slideDiv.style.backgroundImage = `url('${imageUrl}')`;
                    slideshowContainer.appendChild(slideDiv);
                }
            });
        }
        
        // إضافة شرائح افتراضية إذا لم توجد بيانات
        if (slideshowContainer.children.length === 0) {
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

function processAboutData(aboutData) {
    if (aboutData && aboutData.length > 0) {
        const about = aboutData[0];
        const titleElement = document.getElementById('about-title');
        const descElement = document.getElementById('about-description');
        
        if (titleElement && about['العنوان']) titleElement.textContent = about['العنوان'];
        if (descElement && about['الوصف']) descElement.textContent = about['الوصف'];
    }
}

function processSkills(skillsData) {
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        
        if (skillsData && skillsData.length > 0) {
            skillsData.forEach(skill => {
                const skillName = skill['اسم المهارة'] || skill['المهارة'] || skill['skill'];
                const skillPercent = skill['النسبة'] || skill['النسبة المئوية'] || skill['percentage'] || '80';
                
                if (skillName) {
                    const skillItem = document.createElement('div');
                    skillItem.className = 'skill-item bg-white p-4 rounded-lg shadow-lg hover-scale';
                    skillItem.innerHTML = `
                        <div class="flex items-center mb-3">
                            <i class="fas fa-palette text-gold text-xl ml-3"></i>
                            <span class="font-semibold text-navy">${skillName}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-gold h-3 rounded-full transition-all duration-1000" style="width: ${skillPercent}%"></div>
                        </div>
                    `;
                    skillsContainer.appendChild(skillItem);
                }
            });
        }
    }
}

function processServices(servicesData) {
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        servicesContainer.innerHTML = '';
        
        if (servicesData && servicesData.length > 0) {
            servicesData.forEach((service, index) => {
                const serviceName = service['اسم الخدمة'] || service['الخدمة'] || service['service'];
                const serviceDesc = service['الوصف'] || service['description'];
                const serviceIcon = service['الأيقونة'] || service['icon'] || 'fas fa-palette';
                const serviceCategory = service['التصنيف'] || service['category'] || 'احترافي';
                
                if (serviceName && serviceDesc) {
                    const serviceCard = document.createElement('div');
                    serviceCard.className = 'service-card bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-xl hover-scale shadow-xl border border-gray-100';
                    serviceCard.innerHTML = `
                        <div class="w-16 h-16 md:w-20 md:h-20 gold-gradient rounded-full flex items-center justify-center mb-6 mx-auto floating" style="animation-delay: -${index}s;">
                            <i class="${serviceIcon} text-navy text-2xl md:text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-navy mb-4 text-center">${serviceName}</h3>
                        <p class="text-gray-600 text-center mb-4">${serviceDesc}</p>
                        <div class="text-center">
                            <span class="inline-block bg-gold text-navy px-3 py-1 rounded-full text-sm font-semibold">${serviceCategory}</span>
                        </div>
                    `;
                    servicesContainer.appendChild(serviceCard);
                }
            });
        }
    }
}

function processTestimonials(testimonialsData) {
    const testimonialsContainer = document.getElementById('testimonials-container');
    if (testimonialsContainer) {
        testimonialsContainer.innerHTML = '';
        
        if (testimonialsData && testimonialsData.length > 0) {
            testimonialsData.forEach((testimonial, index) => {
                const clientName = testimonial['اسم العميل'] || testimonial['العميل'] || testimonial['client'];
                const clientJob = testimonial['الوظيفة'] || testimonial['وظيفة'] || testimonial['job'] || 'عميل';
                const clientComment = testimonial['التعليق'] || testimonial['comment'];
                const clientRating = testimonial['التقييم'] || testimonial['تقييم'] || testimonial['rating'] || '5';
                
                if (clientName && clientComment) {
                    const testimonialCard = document.createElement('div');
                    testimonialCard.className = 'testimonial-card p-6 md:p-8 rounded-xl shadow-2xl hover-scale fade-in';
                    testimonialCard.style.animationDelay = `${index * 0.2}s`;
                    
                    let starsHtml = '';
                    const rating = parseInt(clientRating) || 5;
                    for (let i = 0; i < rating; i++) {
                        starsHtml += '<i class="fas fa-star text-gold"></i>';
                    }
                    
                    testimonialCard.innerHTML = `
                        <div class="flex items-center mb-6">
                            <div class="w-12 h-12 md:w-16 md:h-16 bg-gold rounded-full flex items-center justify-center ml-4">
                                <i class="fas fa-user text-navy text-lg md:text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy text-lg">${clientName}</h4>
                                <p class="text-gray-600">${clientJob}</p>
                            </div>
                        </div>
                        <div class="flex mb-4">
                            ${starsHtml}
                        </div>
                        <p class="text-gray-700 italic">"${clientComment}"</p>
                    `;
                    testimonialsContainer.appendChild(testimonialCard);
                }
            });
        }
    }
}

function processPortfolio(portfolioData) {
    const portfolioContainer = document.getElementById('portfolio-container');
    if (portfolioContainer) {
        portfolioContainer.innerHTML = '';
        
        if (portfolioData && portfolioData.length > 0) {
            portfolioData.forEach(project => {
                const projectName = project['اسم المشروع'] || project['المشروع'] || project['project'];
                const projectDesc = project['الوصف'] || project['description'];
                const projectImage = project['الصورة'] || project['صورة'] || project['image'] || 'https://i.ibb.co/0pMbNtdH/Elegant-luxurious-black-box-golden-brand-logo-mockup.png';
                const projectCategory = project['التصنيف'] || project['category'] || 'هوية بصرية';
                
                if (projectName && projectDesc) {
                    const portfolioItem = document.createElement('div');
                    portfolioItem.className = 'portfolio-item';
                    portfolioItem.setAttribute('data-category', projectCategory);
                    
                    portfolioItem.innerHTML = `
                        <div class="bg-white rounded-lg overflow-hidden shadow-lg">
                            <div class="h-48 md:h-64 bg-gradient-to-br from-navy to-gray-700 flex items-center justify-center" style="background-image: url('${projectImage}'); background-size: cover; background-position: center;">
                                <div class="bg-black bg-opacity-40 w-full h-full flex items-center justify-center">
                                    <i class="fas fa-palette text-gold text-3xl md:text-4xl"></i>
                                </div>
                            </div>
                            <div class="p-4 md:p-6">
                                <h3 class="text-lg md:text-xl font-bold text-navy mb-2">${projectName}</h3>
                                <p class="text-gray-600 mb-4 text-sm md:text-base">${projectDesc}</p>
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

function processSocialMedia(socialData) {
    const socialContainer = document.getElementById('social-media-container');
    if (socialContainer) {
        socialContainer.innerHTML = '';
        
        if (socialData && socialData.length > 0) {
            socialData.forEach(social => {
                const socialLink = social['الرابط'] || social['رابط'] || social['link'] || '#';
                const socialIcon = social['الأيقونة'] || social['أيقونة'] || social['icon'] || 'fab fa-facebook';
                
                if (socialLink) {
                    const socialElement = document.createElement('a');
                    socialElement.href = socialLink;
                    socialElement.target = '_blank';
                    socialElement.className = 'w-10 h-10 md:w-14 md:h-14 bg-gold rounded-full flex items-center justify-center text-navy hover:bg-light-gold transition-all hover-scale shadow-lg';
                    socialElement.innerHTML = `<i class="${socialIcon} text-lg md:text-xl"></i>`;
                    socialContainer.appendChild(socialElement);
                }
            });
        }
    }
}

// Load all data when page is ready
document.addEventListener('DOMContentLoaded', loadAllData);

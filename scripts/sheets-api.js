// قاعدة URL لتطبيق Google Scripts الخاص بك
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzLldIHK8g34TQswqPC9lT3xzstlAvbRxpNlk8XBBfSXR4duEDNpJAuGlpd3vGW26ul7g/exec';

// Fetch data from Google Sheets via Google Apps Script
async function fetchSheetData(sheetName) {
    try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=${encodeURIComponent(sheetName)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            console.error('Error from Google Script:', data.error);
            return [];
        }
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        // Return sample data if there's an error
        return getSampleData(sheetName);
    }
}

// دالة للحصول على بيانات تجريبية عند فشل الاتصال
function getSampleData(sheetName) {
    const sampleData = {
        'الإعدادات': [
            {
                'اسم الموقع': 'Malek.Art',
                'شعار الموقع': 'https://i.ibb.co/0pMbNtdH/Elegant-luxurious-black-box-golden-brand-logo-mockup.png',
                'البريد الإلكتروني': 'malek9art@gmail.com',
                'هاتف التواصل': '+967 783 720 851',
                'العنوان': 'صنعاء، الجمهورية اليمنية'
            }
        ],
        'الرئيسية': [
            {
                'العنوان': 'مرحباً بك في مالك أرت',
                'وصف': 'نبتكر حلولًا رقمية تجمع بين الفن والتسويق',
                'نص الزر 1': 'استكشف أعمالي',
                'نص الزر 2': 'تواصل معي'
            }
        ],
        'صور الهيرو': [
            {'رابط الصورة': 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80'},
            {'رابط الصورة': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80'},
            {'رابط الصورة': 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80'}
        ],
        'من أنا': [
            {
                'العنوان': 'مطور ومنسق مشاريع رقمية',
                'الوصف': 'أنا مالك، مطور ومنسق مشاريع رقمية أبتكر حلولاً محاسبية وأكاديمية مبتكرة، وأربطها ببيانات حية عبر Google Sheets وApps Script. أؤمن بقوة الأدوات المجانية وكفاءتها في تحقيق نتائج احترافية تخدم المجتمع التجاري والحرفي.'
            }
        ],
        'المهارات': [
            {'اسم المهارة': 'تصميم الجرافيك', 'النسبة': '90'},
            {'اسم المهارة': 'تطوير الويب', 'النسبة': '85'},
            {'اسم المهارة': 'التصميم المتجاوب', 'النسبة': '95'},
            {'اسم المهارة': 'جداول البيانات', 'النسبة': '88'}
        ],
        'الخدمات': [
            {
                'اسم الخدمة': 'هوية بصرية',
                'الوصف': 'تصميم هوية بصرية متكاملة تعبر عن علامتك التجارية وتجذب عملاءك',
                'الأيقونة': 'fas fa-palette',
                'التصنيف': 'احترافي'
            },
            {
                'اسم الخدمة': 'مواقع إلكترونية',
                'الوصف': 'تصميم وتطوير مواقع إلكترونية متجاوبة وسريعة تحسن وجودك الرقمي',
                'الأيقونة': 'fas fa-desktop',
                'التصنيف': 'متكامل'
            },
            {
                'اسم الخدمة': 'سير ذاتية',
                'الوصف': 'تصميم سير ذاتية إحترافية وجذابة تبرز مهاراتك وخبراتك',
                'الأيقونة': 'fas fa-file-alt',
                'التصنيف': 'مميز'
            }
        ],
        'آراء العملاء': [
            {
                'اسم العميل': 'أحمد السعدي',
                'الوظيفة': 'صاحب مشروع',
                'التعليق': 'تعاملت مع مالك لتصميم هوية بصرية لمشروعي وكانت النتيجة رائعة، احترافية عالية وتنفيذ في الوقت المحدد.',
                'التقييم': '5'
            },
            {
                'اسم العميل': 'سارة محمد',
                'الوظيفة': 'مديرة تسويق',
                'التعليق': 'تميز مالك بالإبداع والالتزام بالمواعيد، أنشأ لنا موقعًا إلكترونيًا ساهم في زيادة مبيعاتنا بنسبة 40%.',
                'التقييم': '5'
            },
            {
                'اسم العميل': 'خالد الحربي',
                'الوظيفة': 'رائد أعمال',
                'التعليق': 'سيرة الذاتية التي صممها لي مالك كانت السبب في حصولي على وظيفة أحلامي، تصميم إحترافي يبرز مهاراتي بشكل رائع.',
                'التقييم': '5'
            }
        ],
        'المعرض': [
            {
                'اسم المشروع': 'هوية بصرية لمطعم',
                'الوصف': 'تصميم هوية بصرية متكاملة لمطعم فاخر تشمل الشعار والألوان والمواد الدعائية',
                'الصورة': 'https://i.ibb.co/0pMbNtdH/Elegant-luxurious-black-box-golden-brand-logo-mockup.png',
                'التصنيف': 'هوية بصرية'
            },
            {
                'اسم المشروع': 'موقع متجر إلكتروني',
                'الوصف': 'تصميم وتطوير متجر إلكتروني متكامل مع نظام دفع وإدارة منتجات',
                'الصورة': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'التصنيف': 'مواقع'
            },
            {
                'اسم المشروع': 'دعوات زفاف',
                'الوصف': 'تصميم دعوات زفاف فاخرة ومطبوعة بتقنية عالية الجودة مع ظروف مخصصة',
                'الصورة': 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'التصنيف': 'دعوات'
            }
        ],
        'وسائل التواصل': [
            {
                'المنصة': 'Facebook',
                'الرابط': 'https://facebook.com/malek.art',
                'الأيقونة': 'fab fa-facebook'
            },
            {
                'المنصة': 'Instagram',
                'الرابط': 'https://instagram.com/malek.art',
                'الأيقونة': 'fab fa-instagram'
            },
            {
                'المنصة': 'Twitter',
                'الرابط': 'https://twitter.com/malek_art',
                'الأيقونة': 'fab fa-twitter'
            },
            {
                'المنصة': 'LinkedIn',
                'الرابط': 'https://linkedin.com/in/malek-art',
                'الأيقونة': 'fab fa-linkedin'
            }
        ]
    };
    
    return sampleData[sheetName] || [];
      }

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzV9HMtZVZxk_gLGi0mBf5Md9fmG1XCn747rbfkX64gongb21kRQEQlK8jq-79_mOrX/exec';

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
            return getSampleData(sheetName);
        }
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        return getSampleData(sheetName);
    }
}

// دالة مساعدة لعرض هيكل البيانات القادم من الجدول
async function debugDataStructure() {
    const sheetNames = ['الإعدادات', 'الرئيسية', 'صور الهيرو', 'من أنا', 
                       'المهارات', 'الخدمات', 'آراء العملاء', 'المعرض', 'وسائل التواصل'];
    
    for (const sheetName of sheetNames) {
        try {
            const data = await fetchSheetData(sheetName);
            console.log(`=== ${sheetName} ===`);
            console.log('عدد العناصر:', data.length);
            if (data.length > 0) {
                console.log('المفاتيح المتاحة:', Object.keys(data[0]));
                console.log('العينة الأولى:', data[0]);
            }
            console.log('------------------------');
        } catch (error) {
            console.error(`خطأ في ${sheetName}:`, error);
        }
    }
}

// استدع هذه الدالة في console المتصفح لرؤية هيكل البيانات
// debugDataStructure();

function getSampleData(sheetName) {
    // بيانات افتراضية بسيطة للطوارئ فقط
    return [];
}

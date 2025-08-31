const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxamw53b0BTqHNkhXAccHHfgKH6-W7W9lW0bdobxH-JoG0LJqrkbnvWN3TGKNfVIW3jKg/exec';

async function fetchSheetData(sheetName) {
    try {
        console.log(`جلب بيانات من: ${sheetName}`);
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=${encodeURIComponent(sheetName)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.success) {
            console.log(`تم جلب ${data.data.length} عنصر من ${sheetName}`);
            return data.data;
        } else {
            console.error('Error from Google Script:', data.error);
            return [];
        }
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        return [];
    }
}

// دالة للمساعدة في تصحيح هيكل البيانات
window.debugDataStructure = async function() {
    const sheetNames = ['الإعدادات', 'الرئيسية', 'صور الهيرو', 'من أنا', 
                       'المهارات', 'الخدمات', 'آراء العملاء', 'المعرض', 'وسائل التواصل'];
    
    console.log('=== بدء تحليل هيكل البيانات ===');
    
    for (const sheetName of sheetNames) {
        try {
            const data = await fetchSheetData(sheetName);
            console.log(`\n=== ${sheetName} ===`);
            console.log('عدد العناصر:', data.length);
            
            if (data.length > 0) {
                console.log('المفاتيح المتاحة:', Object.keys(data[0]));
                console.log('العينة الأولى:', JSON.stringify(data[0], null, 2));
            } else {
                console.log('لا توجد بيانات في هذه الورقة');
            }
        } catch (error) {
            console.error(`خطأ في ${sheetName}:`, error);
        }
    }
    
    console.log('=== انتهى تحليل هيكل البيانات ===');
}

// دالة لاختبار اتصال مع ورقة محددة
window.testSheetConnection = async function(sheetName) {
    try {
        const data = await fetchSheetData(sheetName);
        console.log(`نتيجة ${sheetName}:`, data);
        return data;
    } catch (error) {
        console.error(`خطأ في ${sheetName}:`, error);
        return [];
    }
}

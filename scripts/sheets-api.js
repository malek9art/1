// قاعدة URL لتطبيق Google Scripts الخاص بك
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxamw53b0BTqHNkhXAccHHfgKH6-W7W9lW0bdobxH-JoG0LJqrkbnvWN3TGKNfVIW3jKg/exec';

// Fetch data from Google Sheets via Google Apps Script
async function fetchSheetData(sheetName) {
    try {
        // إضافة timestamp لمنع caching
        const timestamp = new Date().getTime();
        const url = `${GOOGLE_SCRIPT_URL}?sheet=${encodeURIComponent(sheetName)}&t=${timestamp}`;
        
        debugLog(`📡 جلب بيانات من: ${sheetName}`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`خطأ في الشبكة: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            debugLog(`✅ تم جلب ${data.data.length} عنصر من ${sheetName}`);
            return data.data;
        } else {
            debugLog(`❌ خطأ من Google Script: ${data.error}`);
            return [];
        }
    } catch (error) {
        debugLog(`❌ خطأ في جلب البيانات: ${error.message}`);
        return [];
    }
}

// دالة للمساعدة في تصحيح هيكل البيانات
async function debugDataStructure() {
    const sheetNames = ['الإعدادات', 'الرئيسية', 'صور الهيرو', 'من أنا', 
                       'المهارات', 'الخدمات', 'آراء العملاء', 'المعرض', 'وسائل التواصل'];
    
    debugLog('=== بدء تحليل هيكل البيانات ===');
    
    for (const sheetName of sheetNames) {
        try {
            const data = await fetchSheetData(sheetName);
            debugLog(`\n=== ${sheetName} ===`);
            debugLog('عدد العناصر: ' + data.length);
            
            if (data.length > 0) {
                debugLog('المفاتيح المتاحة: ' + JSON.stringify(Object.keys(data[0])));
                debugLog('العينة الأولى: ' + JSON.stringify(data[0]));
            } else {
                debugLog('لا توجد بيانات في هذه الورقة');
            }
        } catch (error) {
            debugLog(`خطأ في ${sheetName}: ${error}`);
        }
    }
    
    debugLog('=== انتهى تحليل هيكل البيانات ===');
}

// دالة لاختبار اتصال مع ورقة محددة
async function testSheetConnection(sheetName) {
    try {
        const data = await fetchSheetData(sheetName);
        debugLog(`نتيجة ${sheetName}: ${JSON.stringify(data)}`);
        return data;
    } catch (error) {
        debugLog(`خطأ في ${sheetName}: ${error}`);
        return [];
    }
}

// دالة لعرض الرسائل على الشاشة (للتابلت)
function debugLog(message) {
    console.log(message);
    
    // عرض الرسائل على الشاشة للتابلت
    const debugInfo = document.getElementById('debug-info');
    if (debugInfo) {
        const messageElement = document.createElement('div');
        messageElement.style.margin = '5px 0';
        messageElement.style.padding = '5px';
        messageElement.style.borderBottom = '1px solid #444';
        messageElement.textContent = new Date().toLocaleTimeString() + ': ' + message;
        
        debugInfo.appendChild(messageElement);
        debugInfo.scrollTop = debugInfo.scrollHeight;
    }
}

// تفعيل التصحيح تلقائياً إذا كان هناك مشكلة
setTimeout(() => {
    if (!window.dataLoaded) {
        debugLog('❌ البيانات لم تحمل تلقائياً');
        const debugPanel = document.getElementById('mobile-debug');
        if (debugPanel) debugPanel.style.display = 'block';
    }
}, 8000);

// جعل الدوال متاحة globally للتصحيح
window.fetchSheetData = fetchSheetData;
window.debugDataStructure = debugDataStructure;
window.testSheetConnection = testSheetConnection;
window.debugLog = debugLog;

debugLog('✅ تم تحميل sheets-api.js بنجاح');

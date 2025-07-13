import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Bot className="text-primary text-2xl ml-2" />
              <span className="text-xl font-bold">منصة أدوات الذكاء الصناعي</span>
            </div>
            <p className="text-gray-300">حلول ذكية للمشاكل اليومية باستخدام أحدث تقنيات الذكاء الصناعي</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">الأدوات</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">مولد السيرة الذاتية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">تصحيح العربية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">صياغة البريد</a></li>
              <li><a href="#" className="hover:text-white transition-colors">تلخيص PDF</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">الدعم</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="hover:text-white transition-colors">البلاغات</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 منصة أدوات الذكاء الصناعي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

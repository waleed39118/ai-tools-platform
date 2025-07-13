import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Translation data
const translations = {
  ar: {
    // Navigation
    home: "الرئيسية",
    resumeGenerator: "مولد السيرة الذاتية",
    arabicCorrection: "تصحيح العربية",
    emailDrafting: "صياغة البريد",
    pdfSummary: "تلخيص PDF",
    codeGenerator: "مولد الكود",
    
    // Home page
    aiToolsPlatform: "منصة أدوات ذكاء صناعي متخصصة",
    platformDescription: "حلول ذكية لإنتاجية أفضل في العمل والدراسة",
    resumeGeneratorDesc: "إنشاء سيرة ذاتية احترافية بالذكاء الصناعي في دقائق",
    arabicCorrectionDesc: "تدقيق وتحسين النصوص العربية باستخدام الذكاء الصناعي",
    emailDraftingDesc: "صياغة رسائل بريد إلكتروني رسمية ومهنية",
    pdfSummaryDesc: "تحويل ملفات PDF إلى ملخصات مفيدة للطلاب",
    codeGeneratorDesc: "إنشاء كود برمجي احترافي ومطور للمواقع والتطبيقات",
    
    // Features
    features: "المميزات",
    superFast: "سرعة فائقة",
    superFastDesc: "إنجاز المهام في دقائق بدلاً من ساعات",
    smartAI: "ذكاء صناعي متقدم",
    smartAIDesc: "أحدث تقنيات الذكاء الصناعي لضمان جودة النتائج",
    secureSafe: "آمن وموثوق",
    secureSafeDesc: "حماية عالية للبيانات مع احترام خصوصية المستخدمين",
    
    // Common buttons
    getStarted: "ابدأ الآن",
    tryNow: "جرب الآن",
    generate: "إنشاء",
    copy: "نسخ",
    download: "تحميل",
    clear: "مسح",
    
    // Resume Generator
    resumeGeneratorTitle: "مولد السيرة الذاتية",
    resumeGeneratorSubtitle: "إنشاء سيرة ذاتية احترافية ومميزة بالذكاء الصناعي",
    personalInfo: "المعلومات الشخصية",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان",
    jobTitle: "المسمى الوظيفي",
    experience: "الخبرة",
    education: "التعليم",
    skills: "المهارات",
    generateResume: "إنشاء السيرة الذاتية",
    
    // Form placeholders
    namePlaceholder: "أدخل اسمك الكامل",
    positionPlaceholder: "مثال: مطور ويب، مهندس برمجيات",
    contactPlaceholder: "معلومات الاتصال (بريد إلكتروني، هاتف، عنوان)",
    experiencePlaceholder: "صف خبرتك المهنية والمناصب السابقة",
    skillsPlaceholder: "اذكر مهاراتك الأساسية والتقنية",
    educationPlaceholder: "اذكر مؤهلاتك التعليمية والدرجات العلمية",
    
    // States
    generating: "جاري الإنشاء...",
    generatedResume: "السيرة الذاتية المنشأة",
    downloadResume: "تحميل السيرة الذاتية",
    
    // Arabic Correction
    arabicCorrectionTitle: "تصحيح النصوص العربية",
    arabicCorrectionSubtitle: "تحسين وتدقيق النصوص العربية باستخدام الذكاء الصناعي",
    enterText: "أدخل النص للتصحيح",
    correctedText: "النص المُصحح",
    correctText: "تصحيح النص",
    originalText: "النص الأصلي",
    textToCorrect: "النص المراد تصحيحه",
    enterArabicText: "أدخل النص العربي هنا لتصحيحه",
    
    // Email Drafting
    emailDraftingTitle: "صياغة الرسائل الإلكترونية",
    emailDraftingSubtitle: "إنشاء رسائل بريد إلكتروني رسمية ومهنية",
    emailPurpose: "الغرض من الرسالة",
    emailTone: "طابع الرسالة",
    emailRecipient: "المستقبل",
    emailContext: "السياق والتفاصيل",
    draftEmail: "صياغة الرسالة",
    
    // PDF Summary
    pdfSummaryTitle: "تلخيص ملفات PDF",
    pdfSummarySubtitle: "تحويل ملفات PDF إلى ملخصات مفيدة ومركزة",
    uploadPdf: "رفع ملف PDF",
    summaryType: "نوع التلخيص",
    summaryLength: "طول التلخيص",
    focusAreas: "المجالات المحددة",
    summarizePdf: "تلخيص الملف",
    
    // Code Generator
    codeGeneratorTitle: "مولد الكود الاحترافي",
    codeGeneratorSubtitle: "إنشاء كود برمجي احترافي وموثوق للمواقع والتطبيقات",
    projectTitle: "عنوان المشروع",
    projectDescription: "وصف المشروع",
    programmingLanguage: "لغة البرمجة",
    framework: "إطار العمل",
    requiredFeatures: "المميزات المطلوبة",
    codeStyle: "نمط الكود",
    generateCode: "إنشاء الكود",
    generatedCode: "الكود المُولد",
    fileStructure: "هيكل الملفات",
    
    // Status messages
    correcting: "جاري التصحيح...",
    drafting: "جاري الصياغة...",
    summarizing: "جاري التلخيص...",
    success: "تم بنجاح!",
    error: "حدث خطأ",
    
    // Footer
    allRightsReserved: "جميع الحقوق محفوظة",
    
    // Form placeholders
    enterFullName: "أدخل الاسم الكامل",
    enterEmail: "أدخل البريد الإلكتروني",
    enterPhone: "أدخل رقم الهاتف",
    enterAddress: "أدخل العنوان",
    enterJobTitle: "أدخل المسمى الوظيفي المرغوب",
    enterExperience: "اذكر خبراتك العملية والمهنية",
    enterEducation: "اذكر مؤهلاتك التعليمية",
    enterSkills: "اذكر مهاراتك الشخصية والمهنية",
    
    // Required field
    required: "مطلوب",
    optional: "اختياري",
  },
  en: {
    // Navigation
    home: "Home",
    resumeGenerator: "Resume Generator",
    arabicCorrection: "Arabic Correction",
    emailDrafting: "Email Drafting",
    pdfSummary: "PDF Summary",
    codeGenerator: "Code Generator",
    
    // Home page
    aiToolsPlatform: "Specialized AI Tools Platform",
    platformDescription: "Smart solutions for better productivity in work and study",
    resumeGeneratorDesc: "Create professional resume with AI in minutes",
    arabicCorrectionDesc: "Proofread and improve Arabic texts using AI",
    emailDraftingDesc: "Draft formal and professional emails",
    pdfSummaryDesc: "Convert PDF files to useful summaries for students",
    codeGeneratorDesc: "Generate professional code for websites and applications",
    
    // Features
    features: "Features",
    superFast: "Super Fast",
    superFastDesc: "Complete tasks in minutes instead of hours",
    smartAI: "Advanced AI",
    smartAIDesc: "Latest AI technologies to ensure quality results",
    secureSafe: "Secure & Safe",
    secureSafeDesc: "High data protection with user privacy respect",
    
    // Common buttons
    getStarted: "Get Started",
    tryNow: "Try Now",
    generate: "Generate",
    copy: "Copy",
    download: "Download",
    clear: "Clear",
    
    // Resume Generator
    resumeGeneratorTitle: "Resume Generator",
    resumeGeneratorSubtitle: "Create professional and distinctive resume with AI",
    personalInfo: "Personal Information",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    jobTitle: "Job Title",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    generateResume: "Generate Resume",
    
    // Form placeholders
    namePlaceholder: "Enter your full name",
    positionPlaceholder: "e.g., Web Developer, Software Engineer",
    contactPlaceholder: "Contact information (email, phone, address)",
    experiencePlaceholder: "Describe your work experience and previous positions",
    skillsPlaceholder: "List your key skills and technical abilities",
    educationPlaceholder: "List your educational qualifications and degrees",
    
    // States
    generating: "Generating...",
    generatedResume: "Generated Resume",
    downloadResume: "Download Resume",
    
    // Arabic Correction
    arabicCorrectionTitle: "Arabic Text Correction",
    arabicCorrectionSubtitle: "Improve and proofread Arabic texts using AI",
    enterText: "Enter text for correction",
    correctedText: "Corrected Text",
    correctText: "Correct Text",
    originalText: "Original Text",
    textToCorrect: "Text to Correct",
    enterArabicText: "Enter Arabic text here for correction",
    
    // Email Drafting
    emailDraftingTitle: "Email Drafting",
    emailDraftingSubtitle: "Create formal and professional emails",
    emailPurpose: "Email Purpose",
    emailTone: "Email Tone",
    emailRecipient: "Recipient",
    emailContext: "Context and Details",
    draftEmail: "Draft Email",
    
    // PDF Summary
    pdfSummaryTitle: "PDF Summary",
    pdfSummarySubtitle: "Convert PDF files to useful and focused summaries",
    uploadPdf: "Upload PDF",
    summaryType: "Summary Type",
    summaryLength: "Summary Length",
    focusAreas: "Focus Areas",
    summarizePdf: "Summarize PDF",
    
    // Code Generator
    codeGeneratorTitle: "Professional Code Generator",
    codeGeneratorSubtitle: "Generate professional and reliable code for websites and applications",
    projectTitle: "Project Title",
    projectDescription: "Project Description",
    programmingLanguage: "Programming Language",
    framework: "Framework",
    requiredFeatures: "Required Features",
    codeStyle: "Code Style",
    generateCode: "Generate Code",
    generatedCode: "Generated Code",
    fileStructure: "File Structure",
    
    // Status messages
    correcting: "Correcting...",
    drafting: "Drafting...",
    summarizing: "Summarizing...",
    success: "Success!",
    error: "Error occurred",
    
    // Footer
    allRightsReserved: "All Rights Reserved",
    
    // Form placeholders
    enterFullName: "Enter full name",
    enterEmail: "Enter email address",
    enterPhone: "Enter phone number",
    enterAddress: "Enter address",
    enterJobTitle: "Enter desired job title",
    enterExperience: "Describe your work and professional experience",
    enterEducation: "Describe your educational qualifications",
    enterSkills: "Describe your personal and professional skills",
    
    // Required field
    required: "Required",
    optional: "Optional",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem("language") as Language;
    return savedLang || "ar";
  });

  const isRTL = language === "ar";

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
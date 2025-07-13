import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Copy, Download, Loader2, FileCode, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function CodeGenerator() {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    language: "",
    framework: "none",
    features: "",
    codeStyle: "clean",
  });
  const [generatedCode, setGeneratedCode] = useState<any>(null);
  const { toast } = useToast();

  const generateCodeMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/generate-code", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setGeneratedCode(data.codeGeneration);
        toast({
          title: "تم إنشاء الكود بنجاح!",
          description: "يمكنك الآن مراجعة ونسخ الكود المُولد",
        });
      } else {
        toast({
          title: "خطأ في إنشاء الكود",
          description: data.error || "حدث خطأ غير متوقع",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "خطأ في الاتصال",
        description: "تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.projectTitle || !formData.projectDescription || !formData.language || !formData.features) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    generateCodeMutation.mutate({
      ...formData,
      framework: formData.framework === "none" ? "" : formData.framework
    });
  };

  const handleCopy = async () => {
    if (generatedCode?.generatedCode) {
      await navigator.clipboard.writeText(generatedCode.generatedCode);
      toast({
        title: "تم النسخ",
        description: "تم نسخ الكود إلى الحافظة",
      });
    }
  };

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "typescript", label: "TypeScript" },
    { value: "php", label: "PHP" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "html", label: "HTML/CSS" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
  ];

  const frameworks = [
    { value: "none", label: "بدون إطار عمل" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "express", label: "Express.js" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "spring", label: "Spring Boot" },
    { value: "laravel", label: "Laravel" },
    { value: "nextjs", label: "Next.js" },
  ];

  const codeStyles = [
    { value: "clean", label: "نظيف ومبسط" },
    { value: "enterprise", label: "مؤسسي متقدم" },
    { value: "functional", label: "برمجة وظيفية" },
    { value: "object-oriented", label: "كائنية التوجه" },
    { value: "modern", label: "حديث ومتطور" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse">
            <Code className="text-blue-600 text-3xl" />
          </div>
          <CardTitle className="text-3xl font-bold text-neutral-900">مولد الكود الاحترافي</CardTitle>
          <p className="text-gray-600">إنشاء كود برمجي احترافي وموثوق للمواقع والتطبيقات</p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="projectTitle" className="text-sm font-medium text-neutral-900">عنوان المشروع *</Label>
                  <Input
                    id="projectTitle"
                    value={formData.projectTitle}
                    onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                    placeholder="مثال: موقع إلكتروني لبيع المنتجات"
                    className="rtl-input mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="projectDescription" className="text-sm font-medium text-neutral-900">وصف المشروع *</Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                    placeholder="اشرح المشروع بالتفصيل، الغرض منه، والمستخدمين المستهدفين"
                    className="rtl-input mt-2 h-32"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="language" className="text-sm font-medium text-neutral-900">لغة البرمجة *</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger className="rtl-input mt-2">
                      <SelectValue placeholder="اختر لغة البرمجة" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="framework" className="text-sm font-medium text-neutral-900">إطار العمل</Label>
                  <Select value={formData.framework} onValueChange={(value) => handleInputChange("framework", value)}>
                    <SelectTrigger className="rtl-input mt-2">
                      <SelectValue placeholder="اختر إطار العمل (اختياري)" />
                    </SelectTrigger>
                    <SelectContent>
                      {frameworks.map((fw) => (
                        <SelectItem key={fw.value} value={fw.value}>
                          {fw.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="features" className="text-sm font-medium text-neutral-900">المميزات المطلوبة *</Label>
                  <Textarea
                    id="features"
                    value={formData.features}
                    onChange={(e) => handleInputChange("features", e.target.value)}
                    placeholder="اذكر المميزات والوظائف المطلوبة في المشروع"
                    className="rtl-input mt-2 h-32"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="codeStyle" className="text-sm font-medium text-neutral-900">نمط الكود</Label>
                  <Select value={formData.codeStyle} onValueChange={(value) => handleInputChange("codeStyle", value)}>
                    <SelectTrigger className="rtl-input mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {codeStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit"
                  className="w-full action-btn text-white py-4 border-0"
                  disabled={generateCodeMutation.isPending}
                >
                  {generateCodeMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري إنشاء الكود...
                    </>
                  ) : (
                    <>
                      <Code className="mr-2 h-4 w-4" />
                      إنشاء الكود
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Code Output */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">الكود المُولد</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg min-h-96 overflow-auto font-mono text-sm">
                  {generatedCode ? (
                    <pre className="whitespace-pre-wrap">{generatedCode.generatedCode}</pre>
                  ) : (
                    <div className="text-center text-gray-500 py-20">
                      <Terminal className="mx-auto text-6xl mb-4 text-gray-400" />
                      <p>املأ النموذج لإنشاء الكود</p>
                    </div>
                  )}
                </div>
                
                {generatedCode && (
                  <div className="mt-4 space-y-3">
                    <div className="flex space-x-4 space-x-reverse">
                      <Button 
                        onClick={handleCopy}
                        className="flex-1 action-btn text-white border-0"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        نسخ الكود
                      </Button>
                      <Button 
                        variant="outline"
                        className="px-6 border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* File Structure */}
              {generatedCode?.fileStructure && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">هيكل الملفات</h3>
                  <div className="bg-white p-4 rounded-lg border font-mono text-sm">
                    <pre className="whitespace-pre-wrap rtl-content">{generatedCode.fileStructure}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Code Statistics */}
          {generatedCode && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stats-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{generatedCode.linesOfCode}</div>
                <div className="text-sm text-gray-600">سطر من الكود</div>
              </div>
              <div className="stats-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{generatedCode.estimatedTime}h</div>
                <div className="text-sm text-gray-600">الوقت المقدر للتطوير</div>
              </div>
              <div className="stats-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  <FileCode className="inline text-2xl" />
                </div>
                <div className="text-sm text-gray-600">كود احترافي</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
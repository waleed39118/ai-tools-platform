import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResumeGenerator() {
  const { language, isRTL, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    contact: "",
    experience: "",
    skills: "",
    education: "",
  });
  const [generatedResume, setGeneratedResume] = useState<string>("");
  const { toast } = useToast();

  const generateResumeMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/generate-resume", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setGeneratedResume(data.resume);
        toast({
          title: t('success'),
          description: isRTL ? "تم إنشاء السيرة الذاتية بنجاح" : "Resume generated successfully",
        });
      } else {
        toast({
          title: t('error'),
          description: data.error || (isRTL ? "حدث خطأ غير متوقع" : "An unexpected error occurred"),
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: t('error'),
        description: isRTL ? "تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى." : "Could not connect to server. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.values(formData).some(value => value.trim() === "")) {
      toast({
        title: t('error'),
        description: isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    generateResumeMutation.mutate(formData);
  };

  const downloadResume = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedResume], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'resume.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <Card>
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse">
            <FileText className="text-blue-600 text-3xl" />
          </div>
          <CardTitle className="text-3xl font-bold text-white">{t('resumeGeneratorTitle')}</CardTitle>
          <p className="text-blue-100">{t('resumeGeneratorSubtitle')}</p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-neutral-900">{t('fullName')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t('namePlaceholder')}
                    className={`${isRTL ? 'rtl-input' : 'ltr-input'} mt-2`}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="position" className="text-sm font-medium text-neutral-900">{t('jobTitle')} *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    placeholder={t('positionPlaceholder')}
                    className={`${isRTL ? 'rtl-input' : 'ltr-input'} mt-2`}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact" className="text-sm font-medium text-neutral-900">{t('personalInfo')} *</Label>
                  <Textarea
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => handleInputChange("contact", e.target.value)}
                    placeholder={t('contactPlaceholder')}
                    className={`${isRTL ? 'rtl-input' : 'ltr-input'} mt-2 min-h-[100px]`}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experience" className="text-sm font-medium text-neutral-900">{t('experience')} *</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    placeholder={t('experiencePlaceholder')}
                    className={`${isRTL ? 'rtl-input' : 'ltr-input'} mt-2 min-h-[120px]`}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="skills" className="text-sm font-medium text-neutral-900">{t('skills')} *</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                    placeholder={t('skillsPlaceholder')}
                    className={`${isRTL ? 'rtl-input' : 'ltr-input'} mt-2 min-h-[100px]`}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="education" className="text-sm font-medium text-neutral-900">{t('education')} *</Label>
                  <Textarea
                    id="education"
                    value={formData.education}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                    placeholder={t('educationPlaceholder')}
                    className={`${isRTL ? 'rtl-input' : 'ltr-input'} mt-2 min-h-[100px]`}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                  disabled={generateResumeMutation.isPending}
                >
                  {generateResumeMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('generating')}
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      {t('generateResume')}
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Generated Resume Preview */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  {t('generatedResume')}
                </h3>
                
                {generatedResume ? (
                  <div className="space-y-4">
                    <div 
                      className="bg-white border rounded-lg p-4 max-h-96 overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: generatedResume }}
                    />
                    
                    <Button 
                      onClick={downloadResume}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t('downloadResume')}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>
                      {isRTL 
                        ? "املأ النموذج وانقر على 'إنشاء السيرة الذاتية' لمشاهدة النتيجة هنا"
                        : "Fill out the form and click 'Generate Resume' to see the result here"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
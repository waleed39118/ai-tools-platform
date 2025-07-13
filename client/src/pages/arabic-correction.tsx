import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Copy, Download, Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ArabicCorrection() {
  const { language, isRTL, t } = useLanguage();
  const [originalText, setOriginalText] = useState("");
  const [correctionResult, setCorrectionResult] = useState<any>(null);
  const { toast } = useToast();

  const correctTextMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await apiRequest("POST", "/api/correct-arabic", { originalText: text });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setCorrectionResult(data.correction);
        toast({
          title: "تم تصحيح النص بنجاح!",
          description: "يمكنك الآن مراجعة النص المصحح",
        });
      } else {
        toast({
          title: "خطأ في تصحيح النص",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!originalText.trim()) {
      toast({
        title: "نص فارغ",
        description: "يرجى إدخال نص للتصحيح",
        variant: "destructive",
      });
      return;
    }

    correctTextMutation.mutate(originalText);
  };

  const handleClear = () => {
    setOriginalText("");
    setCorrectionResult(null);
  };

  const handleCopy = async () => {
    if (correctionResult?.correctedText) {
      await navigator.clipboard.writeText(correctionResult.correctedText);
      toast({
        title: "تم النسخ",
        description: "تم نسخ النص المصحح إلى الحافظة",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <Card>
        <CardHeader className="text-center bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse">
            <CheckCircle className="text-green-600 text-3xl" />
          </div>
          <CardTitle className="text-3xl font-bold text-white">{t('arabicCorrectionTitle')}</CardTitle>
          <p className="text-green-100">{t('arabicCorrectionSubtitle')}</p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Text */}
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="original-text" className="text-sm font-medium text-neutral-900">{t('originalText')}</Label>
                  <Textarea
                    id="original-text"
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    placeholder={t('enterArabicText')}
                    className={`${isRTL ? 'rtl-input' : 'ltr-input'} mt-2 h-96`}
                  />
                </div>
                
                <div className="flex space-x-4 space-x-reverse">
                  <Button 
                    type="submit"
                    className="flex-1 success-btn text-white border-0"
                    disabled={correctTextMutation.isPending}
                  >
                    {correctTextMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('correcting')}
                      </>
                    ) : (
                      t('correctText')
                    )}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleClear}
                    className="px-6"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t('clear')}
                  </Button>
                </div>
              </form>
            </div>

            {/* Corrected Text */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-neutral-900">{t('correctedText')}</Label>
                <div className="rtl-input mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg h-96 bg-gray-50 overflow-y-auto">
                  {correctionResult ? (
                    <div className="text-neutral-900 leading-relaxed">
                      {correctionResult.correctedText}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-20">
                      <CheckCircle className="mx-auto text-6xl mb-4" />
                      <p>{isRTL ? 'النص المصحح سيظهر هنا' : 'Corrected text will appear here'}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {correctionResult && (
                <div className="flex space-x-4 space-x-reverse">
                  <Button 
                    onClick={handleCopy}
                    className="flex-1 action-btn text-white border-0"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {t('copy')}
                  </Button>
                  <Button 
                    variant="outline"
                    className="px-6 border-primary text-primary hover:bg-primary/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t('download')}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          {correctionResult && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stats-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{correctionResult.errorsFound}</div>
                <div className="text-sm text-gray-600">أخطاء تم إصلاحها</div>
              </div>
              <div className="stats-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{correctionResult.wordsImproved}</div>
                <div className="text-sm text-gray-600">كلمات تم تحسينها</div>
              </div>
              <div className="stats-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{correctionResult.readabilityScore}%</div>
                <div className="text-sm text-gray-600">تحسن الوضوح</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

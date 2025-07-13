import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Copy, Edit, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function EmailDrafting() {
  const [formData, setFormData] = useState({
    emailType: "",
    subject: "",
    recipientName: "",
    keyPoints: "",
    tone: "formal",
  });
  const [generatedEmail, setGeneratedEmail] = useState<string>("");
  const { toast } = useToast();

  const generateEmailMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/generate-email", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setGeneratedEmail(data.email.generatedContent);
        toast({
          title: "تم إنشاء الرسالة بنجاح!",
          description: "يمكنك الآن مراجعة ونسخ الرسالة",
        });
      } else {
        toast({
          title: "خطأ في إنشاء الرسالة",
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
    
    if (!formData.emailType || !formData.subject || !formData.recipientName || !formData.keyPoints) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    generateEmailMutation.mutate(formData);
  };

  const handleCopy = async () => {
    if (generatedEmail) {
      const textContent = generatedEmail.replace(/<[^>]*>/g, '');
      await navigator.clipboard.writeText(textContent);
      toast({
        title: "تم النسخ",
        description: "تم نسخ الرسالة إلى الحافظة",
      });
    }
  };

  const emailTypes = [
    { value: "job-application", label: "طلب وظيفة" },
    { value: "business-inquiry", label: "استفسار تجاري" },
    { value: "complaint", label: "شكوى" },
    { value: "thanks", label: "شكر" },
    { value: "follow-up", label: "متابعة" },
    { value: "meeting-request", label: "طلب اجتماع" },
  ];

  const tones = [
    { value: "formal", label: "رسمية" },
    { value: "friendly", label: "ودية" },
    { value: "professional", label: "مهنية" },
    { value: "urgent", label: "عاجلة" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse">
            <Mail className="text-purple-600 text-3xl" />
          </div>
          <CardTitle className="text-3xl font-bold text-neutral-900">مساعد صياغة البريد الإلكتروني</CardTitle>
          <p className="text-gray-600">صياغة رسائل إلكترونية رسمية واحترافية</p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Email Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="emailType" className="text-sm font-medium text-neutral-900">نوع الرسالة *</Label>
                  <Select value={formData.emailType} onValueChange={(value) => handleInputChange("emailType", value)}>
                    <SelectTrigger className="rtl-input mt-2">
                      <SelectValue placeholder="اختر نوع الرسالة" />
                    </SelectTrigger>
                    <SelectContent>
                      {emailTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-neutral-900">موضوع الرسالة *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="مثال: طلب وظيفة مطور برمجيات"
                    className="rtl-input mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="recipientName" className="text-sm font-medium text-neutral-900">اسم المرسل إليه *</Label>
                  <Input
                    id="recipientName"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange("recipientName", e.target.value)}
                    placeholder="مثال: أحمد محمد"
                    className="rtl-input mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="keyPoints" className="text-sm font-medium text-neutral-900">النقاط الرئيسية *</Label>
                  <Textarea
                    id="keyPoints"
                    value={formData.keyPoints}
                    onChange={(e) => handleInputChange("keyPoints", e.target.value)}
                    placeholder="اذكر النقاط الأساسية التي تريد تضمينها في الرسالة"
                    className="rtl-input mt-2 h-32"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tone" className="text-sm font-medium text-neutral-900">نبرة الرسالة</Label>
                  <Select value={formData.tone} onValueChange={(value) => handleInputChange("tone", value)}>
                    <SelectTrigger className="rtl-input mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((tone) => (
                        <SelectItem key={tone.value} value={tone.value}>
                          {tone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit"
                  className="w-full action-btn text-white py-4 border-0"
                  disabled={generateEmailMutation.isPending}
                >
                  {generateEmailMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري صياغة الرسالة...
                    </>
                  ) : (
                    "صياغة الرسالة"
                  )}
                </Button>
              </form>
            </div>

            {/* Email Preview */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">معاينة الرسالة</h3>
              <div className="bg-white p-6 rounded-lg min-h-96 border">
                {generatedEmail ? (
                  <div 
                    className="rtl-content prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: generatedEmail }}
                  />
                ) : (
                  <div className="text-center text-gray-500 py-20">
                    <Mail className="mx-auto text-6xl mb-4" />
                    <p>املأ النموذج لمعاينة الرسالة</p>
                  </div>
                )}
              </div>
              
              {generatedEmail && (
                <div className="mt-4 flex space-x-4 space-x-reverse">
                  <Button 
                    onClick={handleCopy}
                    className="flex-1 action-btn text-white border-0"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    نسخ الرسالة
                  </Button>
                  <Button 
                    variant="outline"
                    className="px-6 border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    تعديل
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

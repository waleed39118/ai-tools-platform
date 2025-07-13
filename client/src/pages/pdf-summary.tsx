import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, Copy, Download, Loader2, Trash2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function PdfSummary() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    summaryType: "general",
    summaryLength: "medium",
    focusAreas: "",
  });
  const [summaryResult, setSummaryResult] = useState<any>(null);
  const { toast } = useToast();

  const generateSummaryMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/summarize-pdf", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Failed to summarize PDF");
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setSummaryResult(data.summary);
        toast({
          title: "تم إنشاء التلخيص بنجاح!",
          description: "يمكنك الآن مراجعة ونسخ التلخيص",
        });
      } else {
        toast({
          title: "خطأ في إنشاء التلخيص",
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "نوع ملف غير صحيح",
          description: "يرجى رفع ملف PDF فقط",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "حجم الملف كبير",
          description: "يجب أن يكون حجم الملف أقل من 10 ميجابايت",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setSummaryResult(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "لم يتم رفع ملف",
        description: "يرجى رفع ملف PDF أولاً",
        variant: "destructive",
      });
      return;
    }

    const data = new FormData();
    data.append("pdf", selectedFile);
    data.append("summaryType", formData.summaryType);
    data.append("summaryLength", formData.summaryLength);
    data.append("focusAreas", formData.focusAreas);

    generateSummaryMutation.mutate(data);
  };

  const handleCopy = async () => {
    if (summaryResult?.summaryContent) {
      await navigator.clipboard.writeText(summaryResult.summaryContent);
      toast({
        title: "تم النسخ",
        description: "تم نسخ التلخيص إلى الحافظة",
      });
    }
  };

  const summaryTypes = [
    { value: "general", label: "ملخص عام" },
    { value: "academic", label: "ملخص أكاديمي" },
    { value: "key-points", label: "النقاط الرئيسية" },
    { value: "chapters", label: "تلخيص الفصول" },
  ];

  const summaryLengths = [
    { value: "short", label: "قصير (200-300 كلمة)" },
    { value: "medium", label: "متوسط (500-700 كلمة)" },
    { value: "long", label: "طويل (1000+ كلمة)" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse">
            <FileText className="text-amber-600 text-3xl" />
          </div>
          <CardTitle className="text-3xl font-bold text-neutral-900">تلخيص ملفات PDF</CardTitle>
          <p className="text-gray-600">تحويل المستندات إلى ملخصات مفيدة للطلاب والباحثين</p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-neutral-900">رفع ملف PDF</Label>
                  <div 
                    className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('pdf-upload')?.click()}
                  >
                    <Upload className="mx-auto text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">اسحب وأفلت ملف PDF هنا أو انقر للتحديد</p>
                    <p className="text-sm text-gray-500">حد أقصى 10 ميجابايت</p>
                    <input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {selectedFile && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <FileText className="text-orange-600 text-2xl" />
                        <div>
                          <div className="font-medium">{selectedFile.name}</div>
                          <div className="text-sm text-gray-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="summaryType" className="text-sm font-medium text-neutral-900">نوع التلخيص</Label>
                  <Select value={formData.summaryType} onValueChange={(value) => handleInputChange("summaryType", value)}>
                    <SelectTrigger className="rtl-input mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {summaryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="summaryLength" className="text-sm font-medium text-neutral-900">طول التلخيص</Label>
                  <Select value={formData.summaryLength} onValueChange={(value) => handleInputChange("summaryLength", value)}>
                    <SelectTrigger className="rtl-input mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {summaryLengths.map((length) => (
                        <SelectItem key={length.value} value={length.value}>
                          {length.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="focusAreas" className="text-sm font-medium text-neutral-900">التركيز على</Label>
                  <Textarea
                    id="focusAreas"
                    value={formData.focusAreas}
                    onChange={(e) => handleInputChange("focusAreas", e.target.value)}
                    placeholder="اذكر المواضيع أو المفاهيم التي تريد التركيز عليها في التلخيص (اختياري)"
                    className="rtl-input mt-2 h-24"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full action-btn text-white py-4 border-0"
                  disabled={generateSummaryMutation.isPending}
                >
                  {generateSummaryMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري إنشاء التلخيص...
                    </>
                  ) : (
                    "إنشاء التلخيص"
                  )}
                </Button>
              </form>
            </div>

            {/* Summary Output */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">التلخيص</h3>
              <div className="bg-white p-6 rounded-lg min-h-96 border">
                {summaryResult ? (
                  <div className="rtl-content prose max-w-none">
                    <div className="text-neutral-900 leading-relaxed">
                      {summaryResult.summaryContent}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-20">
                    <FileText className="mx-auto text-6xl mb-4" />
                    <p>ارفع ملف PDF للحصول على التلخيص</p>
                  </div>
                )}
              </div>
              
              {summaryResult && (
                <div className="mt-4 space-y-3">
                  <div className="flex space-x-4 space-x-reverse">
                    <Button 
                      onClick={handleCopy}
                      className="flex-1 action-btn text-white border-0"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      نسخ التلخيص
                    </Button>
                    <Button 
                      variant="outline"
                      className="px-6 border-orange-600 text-orange-600 hover:bg-orange-50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      تحميل
                    </Button>
                  </div>
                  <Button 
                    variant="outline"
                    className="w-full success-btn text-white border-0"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    إعادة تلخيص بطريقة مختلفة
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Summary Statistics */}
          {summaryResult && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="stats-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-600">{summaryResult.originalPages}</div>
                <div className="text-sm text-gray-600">صفحات أصلية</div>
              </div>
              <div className="stats-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{summaryResult.summaryWords}</div>
                <div className="text-sm text-gray-600">كلمات التلخيص</div>
              </div>
              <div className="stats-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{summaryResult.compressionRatio}%</div>
                <div className="text-sm text-gray-600">نسبة الضغط</div>
              </div>
              <div className="stats-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{summaryResult.processingTime}ms</div>
                <div className="text-sm text-gray-600">وقت المعالجة</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

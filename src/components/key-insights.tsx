"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Target, Brain, Award, AlertCircle } from "lucide-react";

const KeyInsights = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">الرؤى الرئيسية</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Performance vs Efficiency */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="w-5 h-5" />
              الأداء مقابل الكفاءة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/30 text-primary">
                توازن مهم
              </Badge>
              <span className="text-sm text-primary">96% مقابل 10x السرعة</span>
            </div>
            <p className="text-sm text-primary leading-relaxed">
              النماذج التقليدية تحقق أداءً قريباً من النماذج المتقدمة بموارد حاسوبية أقل بكثير
            </p>
            <div className="flex items-center gap-2 text-xs text-primary/90">
              <Award className="w-4 h-4" />
              نموذج SVM: 96% من أداء نموذج BERT بسرعة أعلى
            </div>
          </CardContent>
        </Card>

        {/* Traditional vs Modern */}
        <Card className="bg-muted/40 border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Brain className="w-5 h-5" />
              التقليدي مقابل الحديث
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-muted/80 text-foreground">
                فجوة أقل
              </Badge>
              <span className="text-sm text-foreground/80">من المتوقع</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              الطرق التقليدية المُحسَّنة تبقى تنافسية مع التقنيات الحديثة في معالجة النصوص العربية
            </p>
            <div className="flex items-center gap-2 text-xs text-foreground/70">
              <Target className="w-4 h-4" />
              التحسين الجيد يتفوق على التعقيد
            </div>
          </CardContent>
        </Card>

        {/* Resource Considerations */}
        <Card className="bg-primary/10 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <AlertCircle className="w-5 h-5" />
              اعتبارات الموارد
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/40 text-primary">
                مفصلية
              </Badge>
              <span className="text-sm text-primary">للإنتاج</span>
            </div>
            <p className="text-sm text-primary leading-relaxed">
              اختيار النموذج يجب أن يوازن بين دقة الأداء ومتطلبات البنية التحتية والاستدامة
            </p>
            <div className="flex items-center gap-2 text-xs text-primary/90">
              <Lightbulb className="w-4 h-4" />
              النماذج البسيطة مناسبة للإنتاج
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Findings Summary */}
      <Card className="bg-gradient-to-r from-muted/30 to-muted/50 border-muted-foreground/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lightbulb className="w-5 h-5" />
            النتائج الرئيسية والتوصيات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">النتائج المحورية:</h4>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  النماذج التقليدية المُحسَّنة تحافظ على قدرتها التنافسية في معالجة النصوص العربية
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  التحسين في المعالجة المسبقة والهندسة يتفوق أحياناً على تعقيد النموذج
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  الكفاءة الحاسوبية عامل حاسم في اختيار النموذج للأنظمة الإنتاجية
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  قابلية التفسير والشفافية مهمة في البيئات الحساسة
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">إرشادات الاختيار:</h4>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  النماذج التقليدية للأنظمة السريعة ومحدودة الموارد
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  النماذج المتقدمة عند الحاجة لأقصى دقة ممكنة
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  تقييم العائد على الاستثمار التقني قبل اتخاذ القرار
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  الموازنة بين الدقة والسرعة والاستدامة حسب السياق
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyInsights;

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Database, BarChart3, Lightbulb } from "lucide-react";
import DatasetOverview from "./dataset-overview";
import ClassificationResults from "./classification-results";
import SummarizationResults from "./summarization-results";
import KeyInsights from "./key-insights";

const NotebookOverview = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <div className="flex justify-center">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          نظرة عامة على مشروع معالجة اللغة الطبيعية
        </h2>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          دراسة مقارنة شاملة لتقنيات التصنيف والتلخيص للنصوص العربية باستخدام مجموعة بيانات
          &quot;كلمات&quot;
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Badge variant="outline" className="text-sm">
            تصنيف النصوص
          </Badge>
          <Badge variant="outline" className="text-sm">
            تلخيص النصوص
          </Badge>
          <Badge variant="outline" className="text-sm">
            معالجة اللغة العربية
          </Badge>
          <Badge variant="outline" className="text-sm">
            التعلم الآلي
          </Badge>
        </div>
      </div>

      {/* Dataset Overview Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Database className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">نظرة عامة على مجموعة البيانات</h2>
        </div>
        <Card className="border-2">
          <CardContent className="p-6 md:p-8">
            <DatasetOverview />
          </CardContent>
        </Card>
      </section>

      {/* Results Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">نتائج التجارب</h2>
        </div>

        {/* Classification Results */}
        <Card className="border-2">
          <CardContent className="p-6 md:p-8">
            <ClassificationResults />
          </CardContent>
        </Card>

        {/* Summarization Results */}
        <Card className="border-2">
          <CardContent className="p-6 md:p-8">
            <SummarizationResults />
          </CardContent>
        </Card>
      </section>

      {/* Key Insights Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">الخلاصة والرؤى</h2>
        </div>
        <Card className="border-2">
          <CardContent className="p-6 md:p-8">
            <KeyInsights />
          </CardContent>
        </Card>
      </section>

      {/* Research Summary Footer */}
      <Card className="bg-gradient-to-r from-muted/40 to-muted/60 border-2">
        <CardHeader>
          <CardTitle className="text-center text-xl">ملخص البحث</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            هذا المشروع يقدم دراسة شاملة ومقارنة متعمقة لتقنيات معالجة اللغة الطبيعية العربية، مع
            التركيز على مهام التصنيف والتلخيص. النتائج تشير إلى أن النماذج التقليدية لا تزال تحقق
            أداءً ممتازاً في التصنيف، بينما تحتاج تقنيات التلخيص إلى مزيد من التطوير لتحقيق نتائج
            مثلى مع النصوص العربية.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-foreground/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>18,256 عينة تصنيف</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>29,335 مقالة تلخيص</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>6 فئات تصنيف</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>4 نماذج مختلفة</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotebookOverview;

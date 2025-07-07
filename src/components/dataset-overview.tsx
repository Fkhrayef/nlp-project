"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, FileText, Brain, CheckCircle } from "lucide-react";

const DatasetOverview = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Database className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">مجموعة البيانات</h3>
      </div>

      {/* Classification Dataset */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h4 className="text-lg font-semibold text-foreground">بيانات التصنيف</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">18,256</div>
              <div className="text-sm text-primary/90 mt-1">إجمالي العينات</div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">15,221</div>
              <div className="text-sm text-primary/90 mt-1">عينات فريدة</div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-muted-foreground/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-muted-foreground">3,035</div>
              <div className="text-sm text-muted-foreground mt-1">عينات مكررة</div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-muted-foreground/15">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-muted-foreground">0</div>
              <div className="text-sm text-muted-foreground mt-1">قيم مفقودة</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summarization Dataset */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h4 className="text-lg font-semibold text-foreground">بيانات التلخيص</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">29,335</div>
              <div className="text-sm text-primary/90 mt-1">إجمالي المقالات</div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">29,192</div>
              <div className="text-sm text-primary/90 mt-1">مقالات فريدة</div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-muted-foreground/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-muted-foreground">142</div>
              <div className="text-sm text-muted-foreground mt-1">مقالات مكررة</div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">189</div>
              <div className="text-sm text-destructive mt-1">قيم مفقودة</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dataset Quality Summary */}
      <Card className="bg-gradient-to-r from-muted/40 to-muted/60 border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            تقييم جودة البيانات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">بيانات التصنيف:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/80">نسبة النظافة:</span>
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">
                    100%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/80">نسبة التكرار:</span>
                  <Badge
                    variant="outline"
                    className="bg-muted/50 text-foreground border-muted-foreground/40"
                  >
                    16.6%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/80">عدد الفئات:</span>
                  <Badge variant="outline" className="bg-primary/15 text-primary border-primary/30">
                    6 فئات
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">بيانات التلخيص:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/80">نسبة النظافة:</span>
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">
                    99.4%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/80">نسبة التكرار:</span>
                  <Badge
                    variant="outline"
                    className="bg-muted/50 text-foreground border-muted-foreground/40"
                  >
                    0.5%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/80">متوسط طول المقال:</span>
                  <Badge variant="outline" className="bg-primary/15 text-primary border-primary/30">
                    ~500 كلمة
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatasetOverview;

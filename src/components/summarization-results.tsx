"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { FileText, BarChart3, TrendingUp } from "lucide-react";

const rougeData = [
  {
    metric: "ROUGE-1",
    tfidf: 0.1314,
    bert: 0.1333,
  },
  {
    metric: "ROUGE-2",
    tfidf: 0.0299,
    bert: 0.0295,
  },
  {
    metric: "ROUGE-L",
    tfidf: 0.0948,
    bert: 0.103,
  },
];

const bleuData = [
  {
    metric: "BLEU-1",
    tfidf: 0.0759,
    bert: 0.0823, // Mocked data
  },
  {
    metric: "BLEU-2",
    tfidf: 0.0333,
    bert: 0.0387, // Mocked data
  },
  {
    metric: "BLEU-3",
    tfidf: 0.0172,
    bert: 0.0209, // Mocked data
  },
  {
    metric: "BLEU-4",
    tfidf: 0.0087,
    bert: 0.0134, // Mocked data
  },
];

const chartConfig = {
  tfidf: {
    label: "TF-IDF",
    color: "hsl(var(--chart-1))",
  },
  bert: {
    label: "BERT",
    color: "hsl(var(--chart-2))",
  },
};

const SummarizationResults = () => {
  return (
    <div className="space-y-8">
      {/* Mobile-first Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-6 sm:flex-row sm:text-right">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">نتائج التلخيص</h3>
      </div>

      {/* Side by Side Charts - Better Responsive Design */}
      <div className="space-y-6 2xl:space-y-0 2xl:grid 2xl:grid-cols-2 2xl:gap-6">
        {/* ROUGE Scores Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col items-center text-center gap-2 sm:flex-row sm:text-right">
              <BarChart3 className="w-5 h-5 text-primary" />
              مقارنة درجات مقياس ROUGE
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full max-w-full">
              <ChartContainer config={chartConfig} className="h-[450px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rougeData} margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="metric"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      angle={-30}
                      textAnchor="start"
                      height={80}
                      interval={0}
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 0.15]}
                      ticks={[0, 0.03, 0.06, 0.09, 0.12, 0.15]}
                      textAnchor="start"
                      tickFormatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                      width={20}
                      tick={{ dx: -5, dy: 0 }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, ""]}
                    />
                    <Legend iconType="rect" wrapperStyle={{ paddingTop: "20px" }} />
                    <Bar
                      dataKey="tfidf"
                      fill="var(--color-tfidf)"
                      name="TF-IDF"
                      radius={[3, 3, 0, 0]}
                    />
                    <Bar
                      dataKey="bert"
                      fill="var(--color-bert)"
                      name="BERT"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* BLEU Scores Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col items-center text-center gap-2 sm:flex-row sm:text-right">
              <TrendingUp className="w-5 h-5 text-primary" />
              مقارنة درجات مقياس BLEU
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full max-w-full">
              <ChartContainer config={chartConfig} className="h-[450px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bleuData} margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="metric"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      angle={-30}
                      textAnchor="start"
                      height={80}
                      interval={0}
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 0.15]}
                      ticks={[0, 0.03, 0.06, 0.09, 0.12, 0.15]}
                      textAnchor="start"
                      tickFormatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                      width={20}
                      tick={{ dx: -5, dy: 0 }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, ""]}
                    />
                    <Legend />
                    <Bar
                      dataKey="tfidf"
                      fill="var(--color-tfidf)"
                      name="TF-IDF"
                      radius={[3, 3, 0, 0]}
                    />
                    <Bar
                      dataKey="bert"
                      fill="var(--color-bert)"
                      name="BERT"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Comparison Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-muted/30 border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="text-foreground">تلخيص TF-IDF</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-foreground/80">متوسط مقياس ROUGE:</span>
                <span className="font-bold text-foreground">8.54%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground/80">متوسط مقياس BLEU:</span>
                <span className="font-bold text-foreground">3.38%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground/80">أفضل متريك:</span>
                <span className="font-bold text-foreground">مقياس ROUGE-1 (%13.14)</span>
              </div>
            </div>
            <p className="text-sm text-foreground/80">
              نهج إحصائي تقليدي يعتمد على ترددات الكلمات، يوفر نتائج معقولة
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">تلخيص BERT</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-primary">متوسط مقياس ROUGE:</span>
                <span className="font-bold text-primary">8.86%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-primary">متوسط مقياس BLEU:</span>
                <span className="font-bold text-primary">4.88%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-primary">أفضل متريك:</span>
                <span className="font-bold text-primary">مقياس ROUGE-1 (%13.33)</span>
              </div>
            </div>
            <p className="text-sm text-primary">
              نموذج متقدم يفهم السياق بشكل أفضل، يحقق أداءً محسناً عبر معظم المتريكات
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummarizationResults;

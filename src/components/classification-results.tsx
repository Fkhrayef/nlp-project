"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Target, Award } from "lucide-react";

const classificationData = [
  {
    class: "ثقافة",
    svmPrecision: 0.94,
    svmRecall: 0.88,
    svmF1: 0.91,
    lstmPrecision: 0.85,
    lstmRecall: 0.82,
    lstmF1: 0.83,
  },
  {
    class: "اقتصاد",
    svmPrecision: 0.91,
    svmRecall: 0.9,
    svmF1: 0.91,
    lstmPrecision: 0.82,
    lstmRecall: 0.9,
    lstmF1: 0.86,
  },
  {
    class: "دولي",
    svmPrecision: 0.93,
    svmRecall: 0.95,
    svmF1: 0.94,
    lstmPrecision: 0.9,
    lstmRecall: 0.94,
    lstmF1: 0.92,
  },
  {
    class: "محلي",
    svmPrecision: 0.87,
    svmRecall: 0.9,
    svmF1: 0.89,
    lstmPrecision: 0.85,
    lstmRecall: 0.73,
    lstmF1: 0.79,
  },
  {
    class: "دين",
    svmPrecision: 0.94,
    svmRecall: 0.88,
    svmF1: 0.91,
    lstmPrecision: 0.85,
    lstmRecall: 0.82,
    lstmF1: 0.83,
  },
  {
    class: "رياضة",
    svmPrecision: 0.99,
    svmRecall: 0.99,
    svmF1: 0.99,
    lstmPrecision: 0.97,
    lstmRecall: 0.98,
    lstmF1: 0.98,
  },
];

const svmChartConfig = {
  svmPrecision: {
    label: "Precision",
    color: "hsl(var(--chart-2))",
  },
  svmRecall: {
    label: "Recall",
    color: "hsl(var(--chart-5))",
  },
  svmF1: {
    label: "F1-Score",
    color: "hsl(var(--chart-1))",
  },
};

const lstmChartConfig = {
  lstmPrecision: {
    label: "Precision",
    color: "hsl(var(--chart-2))",
  },
  lstmRecall: {
    label: "Recall",
    color: "hsl(var(--chart-5))",
  },
  lstmF1: {
    label: "F1-Score",
    color: "hsl(var(--chart-1))",
  },
};

const ClassificationResults = () => {
  return (
    <div className="space-y-8">
      {/* Mobile-first Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-6 sm:flex-row sm:text-right">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Target className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">نتائج التصنيف</h3>
      </div>

      {/* Side by Side Charts - Better Responsive Design */}
      <div className="space-y-6 2xl:space-y-0 2xl:grid 2xl:grid-cols-2 2xl:gap-6">
        {/* SVM Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col items-center text-center gap-2 sm:flex-row sm:text-right">
              <Award className="w-5 h-5 text-primary" />
              نموذج SVM
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full max-w-full">
              <ChartContainer config={svmChartConfig} className="h-[450px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={classificationData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="class"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      angle={-45}
                      textAnchor="start"
                      height={80}
                      interval={0}
                    />
                    <YAxis
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 1]}
                      textAnchor="start"
                      tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                      width={20}
                      tick={{ dx: -5, dy: 0 }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, ""]}
                    />
                    <Legend iconType="rect" wrapperStyle={{ paddingTop: "20px" }} />
                    <Bar
                      dataKey="svmPrecision"
                      fill="var(--color-svmPrecision)"
                      name="Precision"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="svmRecall"
                      fill="var(--color-svmRecall)"
                      name="Recall"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="svmF1"
                      fill="var(--color-svmF1)"
                      name="F1-Score"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* LSTM Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col items-center text-center gap-2 sm:flex-row sm:text-right">
              <Award className="w-5 h-5 text-primary" />
              نموذج LSTM
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full max-w-full">
              <ChartContainer config={lstmChartConfig} className="h-[450px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={classificationData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="class"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      angle={-45}
                      textAnchor="start"
                      height={80}
                      interval={0}
                    />
                    <YAxis
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 1]}
                      textAnchor="start"
                      tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                      width={20}
                      tick={{ dx: -5, dy: 0 }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, ""]}
                    />
                    <Legend iconType="rect" wrapperStyle={{ paddingTop: "20px" }} />
                    <Bar
                      dataKey="lstmPrecision"
                      fill="var(--color-lstmPrecision)"
                      name="Precision"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="lstmRecall"
                      fill="var(--color-lstmRecall)"
                      name="Recall"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="lstmF1"
                      fill="var(--color-lstmF1)"
                      name="F1-Score"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col items-center text-center gap-2 sm:flex-row sm:text-right">
            <Target className="w-5 h-5 text-primary" />
            مقارنة النماذج
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">الفئة</TableHead>
                  <TableHead className="text-center" colSpan={3}>
                    SVM
                  </TableHead>
                  <TableHead className="text-center" colSpan={3}>
                    LSTM
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="text-center"></TableHead>
                  <TableHead className="text-center">Precision</TableHead>
                  <TableHead className="text-center">Recall</TableHead>
                  <TableHead className="text-center">نقاط F1</TableHead>
                  <TableHead className="text-center">Precision</TableHead>
                  <TableHead className="text-center">Recall</TableHead>
                  <TableHead className="text-center">نقاط F1</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classificationData.map((row) => (
                  <TableRow key={row.class}>
                    <TableCell className="font-medium text-center">{row.class}</TableCell>
                    <TableCell className="text-center">
                      {(row.svmPrecision * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-center">
                      {(row.svmRecall * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {(row.svmF1 * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-center">
                      {(row.lstmPrecision * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-center">
                      {(row.lstmRecall * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {(row.lstmF1 * 100).toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold text-center">المتوسط</TableCell>
                  <TableCell className="text-center font-semibold">93.0%</TableCell>
                  <TableCell className="text-center font-semibold">92.0%</TableCell>
                  <TableCell className="text-center font-bold text-primary">92.0%</TableCell>
                  <TableCell className="text-center font-semibold">87.3%</TableCell>
                  <TableCell className="text-center font-semibold">87.2%</TableCell>
                  <TableCell className="text-center font-bold text-primary">87.0%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Model Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">نموذج SVM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-primary">الدقة الإجمالية:</span>
                <span className="font-bold text-primary">93%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-primary">متوسط نقاط F1:</span>
                <span className="font-bold text-primary">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-primary">أفضل فئة:</span>
                <span className="font-bold text-primary">رياضة (99%)</span>
              </div>
            </div>
            <p className="text-sm text-primary">
              يظهر أداءً ممتازاً عبر جميع الفئات مع ثبات عالي في النتائج
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/30 border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="text-foreground">نموذج LSTM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-foreground/80">الدقة الإجمالية:</span>
                <span className="font-bold text-foreground">88%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground/80">متوسط نقاط F1:</span>
                <span className="font-bold text-foreground">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground/80">أفضل فئة:</span>
                <span className="font-bold text-foreground">رياضة (98%)</span>
              </div>
            </div>
            <p className="text-sm text-foreground/80">
              أداء جيد مع تحديات في فئة المحلي، يحتاج لمزيد من التحسين
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassificationResults;

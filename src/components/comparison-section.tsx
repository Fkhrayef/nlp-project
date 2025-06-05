"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { compareResults, formatArabicNumber, formatPercentage } from "@/lib/utils";

type PreprocessingSteps = {
  original_text: string;
  step_1_remove_diacritics?: string;
  step_2_remove_punctuation?: string;
  step_3_normalize_text?: string;
  step_4_remove_stopwords?: string;
  step_5_stem_words?: string;
  final_result: string;
  preprocessing_summary?: {
    original_length: number;
    final_length: number;
    reduction_percentage: number;
    words_removed: number;
    words_remaining: number;
  };
};

type ClassificationResponse = {
  text: string;
  predicted_class: string;
  confidence: number;
  probabilities?: Record<string, number>;
  preprocessing_steps: PreprocessingSteps;
  model_used: string;
};

type SummarizationResponse = {
  original_text: string;
  summary: string;
  num_sentences_requested: number;
  actual_summary_sentences: number;
  compression_ratio: number;
  preprocessing_steps: PreprocessingSteps;
  model_used: string;
};

type DualTechniqueResponse<T> = {
  traditional: T;
  modern: T;
};

type ComparisonSectionProps = {
  result: DualTechniqueResponse<ClassificationResponse | SummarizationResponse>;
};

export const ComparisonSection = ({ result }: ComparisonSectionProps) => {
  const comparisons = compareResults(
    result.traditional as unknown as Record<string, unknown>,
    result.modern as unknown as Record<string, unknown>
  );

  // Filter out comparisons with very small differences (less than 0.1%)
  const significantComparisons = comparisons.filter((comp) => comp.diff > 0.1);

  if (significantComparisons.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-right">مقارنة النتائج</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            لا توجد اختلافات كبيرة بين التقنيتين في هذه المهمة
          </p>
        </CardContent>
      </Card>
    );
  }

  const getBetterBadgeVariant = (better: string) => {
    switch (better) {
      case "modern":
        return "default" as const;
      case "traditional":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  const getBetterText = (better: string) => {
    switch (better) {
      case "modern":
        return "الحديثة";
      case "traditional":
        return "التقليدية";
      default:
        return "متساوية";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-right">مقارنة التقنيات</h3>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">الاختلافات الرئيسية</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">المقياس</TableHead>
                <TableHead className="text-right">التقليدية</TableHead>
                <TableHead className="text-right">الحديثة</TableHead>
                <TableHead className="text-right">الفرق %</TableHead>
                <TableHead className="text-right">الأفضل</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {significantComparisons
                .sort((a, b) => b.diff - a.diff)
                .slice(0, 10) // Show top 10 differences
                .map((comparison, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-right font-medium">
                      {comparison.metric.replace(/\./g, " › ")}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatArabicNumber(comparison.traditional, 3)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatArabicNumber(comparison.modern, 3)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          comparison.diff > 10
                            ? "destructive"
                            : comparison.diff > 5
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {formatPercentage(comparison.diff)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getBetterBadgeVariant(comparison.better)}>
                        {getBetterText(comparison.better)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">ملخص المقارنة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <Badge variant="outline" className="text-sm">
                إجمالي المقاييس: {comparisons.length}
              </Badge>
            </div>
            <div>
              <Badge variant="outline" className="text-sm">
                اختلافات كبيرة: {significantComparisons.length}
              </Badge>
            </div>
            <div>
              <Badge variant="default" className="text-sm">
                الحديثة أفضل: {comparisons.filter((c) => c.better === "modern").length}
              </Badge>
            </div>
            <div>
              <Badge variant="secondary" className="text-sm">
                التقليدية أفضل: {comparisons.filter((c) => c.better === "traditional").length}
              </Badge>
            </div>
          </div>

          {significantComparisons.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                أكبر اختلاف:{" "}
                {formatPercentage(Math.max(...significantComparisons.map((c) => c.diff)))}
                في مقياس &quot;
                {
                  significantComparisons.find(
                    (c) => c.diff === Math.max(...significantComparisons.map((s) => s.diff))
                  )?.metric
                }
                &quot;
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

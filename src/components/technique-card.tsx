"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPercentage } from "@/lib/utils";
import { CLASSIFICATION_LABELS } from "@/lib/constants";

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

type TechniqueCardProps = {
  label: string;
  result: ClassificationResponse | SummarizationResponse;
  task: string;
};

export const TechniqueCard = ({ label, result, task }: TechniqueCardProps) => {
  const renderClassificationResult = (data: ClassificationResponse) => (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-right mb-2">نتيجة التصنيف</h4>
        <div className="inline-flex items-center gap-2">
          <Badge variant="secondary" className="text-base px-4 py-2">
            {CLASSIFICATION_LABELS[data.predicted_class as keyof typeof CLASSIFICATION_LABELS] ||
              data.predicted_class}
          </Badge>
          <span className="text-sm text-muted-foreground">
            ({formatPercentage(data.confidence * 100)})
          </span>
        </div>
      </div>

      {data.probabilities && Object.keys(data.probabilities).length > 0 && (
        <div className="space-y-2">
          <h5 className="font-medium text-right">توزيع الاحتمالات:</h5>
          <div className="space-y-1">
            {Object.entries(data.probabilities)
              .sort(([, a], [, b]) => b - a)
              .map(([category, probability]) => (
                <div key={category} className="flex justify-between items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 ml-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${probability * 100}%` }}
                    />
                  </div>
                  <span className="text-sm w-20 text-right">
                    {formatPercentage(probability * 100)}
                  </span>
                  <span className="text-sm w-16 text-right">
                    {CLASSIFICATION_LABELS[category as keyof typeof CLASSIFICATION_LABELS] ||
                      category}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground text-right">
        <p>
          <strong>النموذج المستخدم:</strong> {data.model_used}
        </p>
        <p>
          <strong>النص:</strong> {data.text}
        </p>
      </div>
    </div>
  );

  const renderSummarizationResult = (data: SummarizationResponse) => (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-right mb-2">الملخص</h4>
        <p className="text-right bg-blue-50 p-4 rounded border-r-4 border-blue-500" dir="rtl">
          {data.summary}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <Badge variant="outline">عدد الجمل المطلوبة: {data.num_sentences_requested}</Badge>
        </div>
        <div>
          <Badge variant="outline">جمل الملخص الفعلية: {data.actual_summary_sentences}</Badge>
        </div>
      </div>

      <div className="text-center">
        <Badge variant="secondary">
          نسبة الضغط: {formatPercentage(data.compression_ratio * 100)}
        </Badge>
      </div>

      <div className="text-sm text-muted-foreground text-right">
        <p>
          <strong>النموذج المستخدم:</strong> {data.model_used}
        </p>
      </div>
    </div>
  );

  const renderResult = () => {
    if (task === "classification") {
      return renderClassificationResult(result as ClassificationResponse);
    } else if (task === "summarization") {
      return renderSummarizationResult(result as SummarizationResponse);
    }
    return <p className="text-center text-muted-foreground">نوع مهمة غير مدعوم</p>;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-right">{label}</CardTitle>
      </CardHeader>
      <CardContent>{renderResult()}</CardContent>
    </Card>
  );
};

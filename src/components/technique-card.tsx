"use client";

import { useState } from "react";
import { FileText, Brain, Copy } from "lucide-react";
import { formatPercentage } from "@/lib/utils";
import { CLASSIFICATION_LABELS } from "@/lib/constants";
import { ClassificationResponse, SummarizationResponse } from "@/lib/types";
import { ProbabilityChart } from "@/components/ui/probability-chart";
import { InfoBlock } from "@/components/info-block";
import { Badge } from "@/components/ui/badge";

type TechniqueCardProps = {
  label: string;
  result: ClassificationResponse | SummarizationResponse;
  task: string;
};

export const TechniqueCard = ({ label, result, task }: TechniqueCardProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const renderClassificationResult = (data: ClassificationResponse) => {
    // Transform probability data for chart
    const categories = data.probability_distribution
      ? Object.keys(data.probability_distribution).sort(
          (a, b) => data.probability_distribution![b] - data.probability_distribution![a]
        )
      : [];

    const chartData = categories.map((category) => ({
      category: CLASSIFICATION_LABELS[category as keyof typeof CLASSIFICATION_LABELS] || category,
      probability: data.probability_distribution![category] * 100,
    }));

    return (
      <div className="space-y-4 md:space-y-6">
        <div className="text-center">
          <h4 className="text-base md:text-lg font-semibold text-right mb-2">نتيجة التصنيف</h4>
          <div className="inline-flex items-center gap-2">
            <Badge variant="secondary" className="px-4 py-2 text-base md:text-sm font-semibold">
              {CLASSIFICATION_LABELS[data.prediction as keyof typeof CLASSIFICATION_LABELS] ||
                data.prediction}
            </Badge>
            <span className="text-xs md:text-sm text-gray-600">
              ({formatPercentage(data.confidence * 100)})
            </span>
          </div>
        </div>

        {data.probability_distribution && Object.keys(data.probability_distribution).length > 0 && (
          <div className="space-y-3 md:space-y-4">
            <h5 className="font-medium text-right text-sm md:text-base">توزيع الاحتمالات:</h5>
            <ProbabilityChart data={chartData} />
          </div>
        )}

        <div className="text-xs md:text-sm text-gray-600 text-right">
          <p>
            <strong>النموذج المستخدم:</strong> {data.model_used}
          </p>
        </div>
      </div>
    );
  };

  const renderSummarizationResult = (data: SummarizationResponse) => (
    <div className="space-y-4 md:space-y-6">
      <InfoBlock title="الملخص" icon={<FileText className="w-5 h-5 md:w-6 md:h-6" />}>
        <p dir="rtl" className="text-foreground text-right leading-relaxed text-base md:text-lg">
          {data.summary}
        </p>
      </InfoBlock>

      <div className="flex gap-3 md:gap-4">
        <div className="text-center p-3 md:p-4 bg-primary/5 rounded-xl border border-border flex-1">
          <div className="text-xl md:text-2xl font-bold text-primary">
            {data.summary_sentence_count}
          </div>
          <div className="text-xs md:text-sm text-primary/80">جمل الملخص</div>
        </div>
        <div className="text-center p-3 md:p-4 bg-primary/5 rounded-xl border border-border flex-1">
          <div className="text-xl md:text-2xl font-bold text-primary">
            {data.original_sentence_count}
          </div>
          <div className="text-xs md:text-sm text-primary/80">الجمل الأصلية</div>
        </div>
      </div>
    </div>
  );

  const getResultText = () => {
    if (task === "classification") {
      const data = result as ClassificationResponse;
      return (
        CLASSIFICATION_LABELS[data.prediction as keyof typeof CLASSIFICATION_LABELS] ||
        data.prediction
      );
    } else if (task === "summarization") {
      const data = result as SummarizationResponse;
      return data.summary;
    }
    return "";
  };

  const getModelName = () => {
    if ("model_used" in result) {
      return result.model_used;
    }
    return label === "نتائج النموذج الأول" ? "النموذج التقليدي" : "النموذج الحديث";
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8 border border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-4 md:mb-6">
        <div className="flex items-center justify-center md:justify-start">
          <div className="bg-primary/10 p-3 rounded-xl ml-4">
            {task === "summarization" ? (
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            ) : (
              <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            )}
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-lg md:text-xl font-bold text-foreground">{label}</h4>
            <p className="text-sm text-muted-foreground mt-1">{getModelName()}</p>
          </div>
        </div>
        <button
          onClick={() => copyToClipboard(getResultText())}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 w-full md:w-auto ${
            copySuccess
              ? "bg-primary/10 text-primary"
              : "bg-muted hover:bg-primary/5 text-foreground hover:text-primary"
          }`}
        >
          <Copy className="w-4 h-4" />
          <span className="font-medium">{copySuccess ? "تم النسخ!" : "نسخ"}</span>
        </button>
      </div>

      {task === "classification"
        ? renderClassificationResult(result as ClassificationResponse)
        : renderSummarizationResult(result as SummarizationResponse)}
    </div>
  );
};

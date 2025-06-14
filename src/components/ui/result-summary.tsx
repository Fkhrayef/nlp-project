import { Badge } from "@/components/ui/badge";
import { formatPercentage } from "@/lib/utils";

type ResultSummaryProps = {
  summary: string;
  originalCount: number;
  summaryCount: number;
  className?: string;
};

export const ResultSummary = ({
  summary,
  originalCount,
  summaryCount,
  className = "",
}: ResultSummaryProps) => {
  const compressionRatio = (summaryCount / originalCount) * 100;

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h4 className="text-lg font-semibold text-right mb-2">الملخص</h4>
        <p className="text-right bg-primary/5 p-4 rounded border-r-4 border-primary" dir="rtl">
          {summary}
        </p>
      </div>

      <div className="flex gap-4 text-center">
        <div className="flex-1">
          <Badge variant="outline">عدد الجمل الأصلية: {originalCount}</Badge>
        </div>
        <div className="flex-1">
          <Badge variant="outline">جمل الملخص: {summaryCount}</Badge>
        </div>
      </div>

      <div className="text-center">
        <Badge variant="secondary">نسبة الضغط: {formatPercentage(compressionRatio)}</Badge>
      </div>
    </div>
  );
};

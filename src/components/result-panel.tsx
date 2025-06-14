"use client";

import { TechniqueCard } from "./technique-card";
import { PerformanceComparison } from "./performance-comparison";
import { DualResults } from "@/lib/types";

type ResultPanelProps = {
  result: DualResults;
  task: string;
  selectedModels: {
    traditional: string;
    modern: string;
  };
};

export const ResultPanel = ({ result, task, selectedModels }: ResultPanelProps) => {
  const getProcessingTime = () => {
    return Math.floor(Math.random() * 1000) + 1500; // Generate random processing time for demo
  };

  const traditionalTime = getProcessingTime();
  const modernTime = getProcessingTime();

  return (
    <div className="space-y-8">
      {/* Comparison Results */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <TechniqueCard
            label="نتائج النموذج التقليدي"
            result={result.traditional}
            task={task}
            modelName={selectedModels.traditional}
          />
        </div>
        <div className="flex-1">
          <TechniqueCard
            label="نتائج النموذج الحديث"
            result={result.modern}
            task={task}
            modelName={selectedModels.modern}
          />
        </div>
      </div>

      {/* Performance Comparison */}
      <PerformanceComparison traditionalTime={traditionalTime} modernTime={modernTime} />
    </div>
  );
};

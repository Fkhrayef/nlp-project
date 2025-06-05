"use client";

import { TechniqueCard } from "./technique-card";

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

type ResultPanelProps = {
  result: DualTechniqueResponse<ClassificationResponse | SummarizationResponse>;
  task: string;
};

export const ResultPanel = ({ result, task }: ResultPanelProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-right">النتائج</h3>

      {/* Responsive flex layout: side-by-side on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <TechniqueCard label="التقنية التقليدية" result={result.traditional} task={task} />
        </div>

        <div className="flex-1">
          <TechniqueCard label="التقنية الحديثة" result={result.modern} task={task} />
        </div>
      </div>
    </div>
  );
};

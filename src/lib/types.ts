// Common response types
export type PreprocessingStep = {
  step_name: string;
  input_text: string;
  output_text: string;
  description: string;
};

export type PreprocessingSteps = {
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
  steps?: PreprocessingStep[];
};

export type PreprocessingResponse = {
  original_text: string;
  task_type: string;
  preprocessing_steps: PreprocessingSteps;
  processed_text: string;
};

// Classification specific types
export type ClassificationResponse = {
  text: string;
  predicted_class: string;
  confidence: number;
  probabilities?: Record<string, number>;
  preprocessing_steps: PreprocessingSteps;
  model_used: string;
};

// Summarization specific types
export type SummarizationResponse = {
  original_text: string;
  summary: string;
  num_sentences_requested: number;
  actual_summary_sentences: number;
  compression_ratio: number;
  preprocessing_steps: PreprocessingSteps;
  model_used: string;
};

// Generic response wrapper
export type DualTechniqueResponse<T> = {
  traditional: T;
  modern: T;
};

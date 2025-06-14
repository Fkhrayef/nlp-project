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
  task_type: string;
  preprocessing_steps: {
    original: string;
    stripped_lowered: string;
    normalized: string;
    diacritics_removed: string;
    punctuation_removed: string;
    repeated_chars_reduced: string;
    whitespace_normalized: string;
    numbers_removed: string;
    tokenized: string[];
    stopwords_removed: string[];
    stemmed: string[];
    final: string;
  };
};

// Classification specific types
export type ClassificationResponse = {
  prediction: string;
  confidence: number;
  probability_distribution: Record<string, number>;
  cleaned_text: string;
  model_used: string;
};

// Summarization specific types
export type SummarizationResponse = {
  summary: string;
  original_sentence_count: number;
  summary_sentence_count: number;
  sentences: string[];
  selected_indices: number[];
  sentence_scores: number[];
};

// Generic response wrapper
export type DualResults = {
  traditional: ClassificationResponse | SummarizationResponse;
  modern: ClassificationResponse | SummarizationResponse;
};

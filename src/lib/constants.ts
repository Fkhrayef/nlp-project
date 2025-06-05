// API Configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://mabosaimi-arabic-summarizer-classifier.hf.space";

// Task Configuration
export const TASKS = [
  { value: "classification", label: "تصنيف النص", requiresNumSentences: false, requiresText: true },
  { value: "summarization", label: "تلخيص النص", requiresNumSentences: true, requiresText: true },
] as const;

// API Endpoints
export const ENDPOINTS = {
  classification: "/classify",
  summarization: "/summarize",
  preprocess: "/preprocess",
} as const;

// Classification Categories (Arabic)
export const CLASSIFICATION_LABELS = {
  culture: "ثقافة",
  economy: "اقتصاد",
  international: "دولي",
  local: "محلي",
  religion: "دين",
  sports: "رياضة",
} as const;

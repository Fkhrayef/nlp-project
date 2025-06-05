"use server";

import { ServerFormSchema } from "@/lib/validations";
import { API_BASE_URL, ENDPOINTS } from "@/lib/constants";
import type {
  ClassificationResponse,
  SummarizationResponse,
  PreprocessingResponse,
  DualTechniqueResponse,
} from "@/lib/types";

// Types used only in this file
type TextInput = {
  text: string;
};

type TextInputWithSentences = {
  text: string;
  num_sentences: number;
};

type PreprocessingInput = {
  text: string;
  task_type: string;
};

// Combined response type for the new flow
export type AnalysisResult = {
  preprocessing: PreprocessingResponse;
  results: DualTechniqueResponse<ClassificationResponse | SummarizationResponse>;
  task: string;
};

// Helper function to call traditional endpoint
const callTraditionalEndpoint = async (
  endpoint: string,
  payload: TextInput | TextInputWithSentences
): Promise<ClassificationResponse | SummarizationResponse> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Traditional API error: ${response.statusText}`);
  }

  return response.json() as Promise<ClassificationResponse | SummarizationResponse>;
};

// Helper function to call modern endpoint (future implementation)
const callModernEndpoint = async (
  endpoint: string,
  payload: TextInput | TextInputWithSentences
): Promise<ClassificationResponse | SummarizationResponse> => {
  // For now, we'll call the same endpoint and mock a different response
  // In the future, this will call endpoint with ?technique=modern parameter
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Modern API error: ${response.statusText}`);
  }

  const data = (await response.json()) as ClassificationResponse | SummarizationResponse;

  // Mock some differences for modern technique (temporary)
  if ("confidence" in data && data.confidence !== undefined) {
    data.confidence = Math.min(0.99, data.confidence + 0.05);
  }
  if ("model_used" in data && data.model_used) {
    data.model_used = "modern_" + data.model_used;
  }

  return data;
};

// Helper function to call preprocessing endpoint
const callPreprocessingEndpoint = async (text: string): Promise<PreprocessingResponse> => {
  const url = `${API_BASE_URL}${ENDPOINTS.preprocess}`;
  const payload: PreprocessingInput = { text, task_type: "classification" };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Preprocessing API error: ${response.statusText}`);
  }

  return response.json() as Promise<PreprocessingResponse>;
};

// Main server action for handling form submissions
export const handleSubmit = async (formData: FormData): Promise<AnalysisResult> => {
  const rawData = {
    text: formData.get("text")?.toString() || "",
    task: formData.get("task")?.toString() || "",
    numSentences: formData.get("numSentences")?.toString() || "",
  };

  const parsed = ServerFormSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const { text, task, numSentences } = parsed.data;
  const endpoint = ENDPOINTS[task as keyof typeof ENDPOINTS];

  if (!endpoint) {
    throw new Error("مهمة غير صحيحة");
  }

  // Prepare payload based on task type
  let payload: TextInput | TextInputWithSentences;

  if (task === "summarization") {
    payload = { text, num_sentences: numSentences || 3 };
  } else {
    payload = { text };
  }

  try {
    // Step 1: Call preprocessing once
    const preprocessing = await callPreprocessingEndpoint(text);

    // Step 2: Call the actual task endpoints in parallel
    const [traditional, modern] = await Promise.all([
      callTraditionalEndpoint(endpoint, payload),
      callModernEndpoint(endpoint, payload),
    ]);

    return {
      preprocessing,
      results: { traditional, modern },
      task,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "حدث خطأ في الاتصال بالخادم");
  }
};

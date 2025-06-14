"use server";

import { ServerFormSchema, ServerFormData } from "@/lib/validations";
import { API_BASE_URL, ENDPOINTS } from "@/lib/constants";
import type {
  ClassificationResponse,
  SummarizationResponse,
  PreprocessingResponse,
  DualResults,
} from "@/lib/types";

// Request payload types
type ClassificationPayload = {
  text: string;
  model: string;
};

type SummarizationPayload = {
  text: string;
  num_sentences: number;
  model: string;
};

type PreprocessingPayload = {
  text: string;
  task_type: string;
};

// Combined result type
export type AnalysisResult = {
  preprocessing: PreprocessingResponse;
  results: DualResults;
  task: string;
  selectedModels: {
    traditional: string;
    modern: string;
  };
};

// Helper function to call classification endpoint
async function callClassificationEndpoint(
  text: string,
  model: string
): Promise<ClassificationResponse> {
  const url = `${API_BASE_URL}${ENDPOINTS.classification}`;
  const payload: ClassificationPayload = { text, model };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling classification endpoint:", error);
    throw error;
  }
}

// Helper function to call summarization endpoint
async function callSummarizationEndpoint(
  text: string,
  numSentences: number,
  model: string
): Promise<SummarizationResponse> {
  const url = `${API_BASE_URL}${ENDPOINTS.summarization}`;
  const payload: SummarizationPayload = {
    text,
    num_sentences: numSentences,
    model,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling summarization endpoint:", error);
    throw error;
  }
}

// Helper function to call preprocessing endpoint
async function callPreprocessingEndpoint(
  text: string,
  task: string
): Promise<PreprocessingResponse> {
  const url = `${API_BASE_URL}${ENDPOINTS.preprocess}`;
  const payload: PreprocessingPayload = { text, task_type: task };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling preprocessing endpoint:", error);
    throw error;
  }
}

// Main server action for handling form submissions
export async function handleSubmit(formData: FormData): Promise<AnalysisResult> {
  const rawData = {
    text: formData.get("text")?.toString() || "",
    task: formData.get("task")?.toString() || "",
    numSentences: formData.get("numSentences")?.toString() || "",
    traditionalModel: formData.get("traditionalModel")?.toString() || "",
    modernModel: formData.get("modernModel")?.toString() || "",
  };

  const parsed = ServerFormSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const { text, task, numSentences, traditionalModel, modernModel } = parsed.data as ServerFormData;

  try {
    // Step 1: Call preprocessing
    const preprocessing = await callPreprocessingEndpoint(text, task);

    // Step 2: Call task-specific endpoints with user-selected models
    let traditional, modern;

    if (task === "classification") {
      traditional = await callClassificationEndpoint(text, traditionalModel);
      modern = await callClassificationEndpoint(text, modernModel);
    } else if (task === "summarization") {
      // Use numSentences (which is already a number from the schema) or default to 3
      const sentenceCount = numSentences || 3;

      traditional = await callSummarizationEndpoint(text, sentenceCount, traditionalModel);
      modern = await callSummarizationEndpoint(text, sentenceCount, modernModel);
    } else {
      throw new Error("مهمة غير صحيحة");
    }

    return {
      preprocessing,
      results: { traditional, modern },
      task,
      selectedModels: {
        traditional: traditionalModel,
        modern: modernModel,
      },
    };
  } catch (error) {
    console.error("Error in handleSubmit:", error);
    throw new Error(error instanceof Error ? error.message : "حدث خطأ في الاتصال بالخادم");
  }
}

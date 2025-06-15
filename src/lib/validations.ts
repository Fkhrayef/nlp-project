import * as z from "zod";

export const TaskType = z.enum(["classification", "summarization"]);

// Helper function to count sentences in Arabic text
const countSentences = (text: string): number => {
  if (!text.trim()) return 0;
  // Count sentences by looking for sentence-ending punctuation: ., !, ?, ؟, ۔
  const sentences = text
    .trim()
    .split(/[.!?؟۔]+/)
    .filter((s) => s.trim().length > 0);
  return sentences.length;
};

// Client-side form schema with custom validation
export const FormSchema = z
  .object({
    text: z.string().min(10, { message: "النص يجب أن يكون على الأقل 10 أحرف" }),
    task: z.enum(["classification", "summarization"], {
      required_error: "يرجى اختيار نوع المهمة",
    }),
    numSentences: z.string().optional(),
    traditionalModel: z.string().optional(),
    modernModel: z.string().min(1, { message: "يرجى اختيار النموذج الحديث" }),
  })
  .refine(
    (data) => {
      // Only validate sentence count for summarization task
      if (data.task === "summarization" && data.numSentences) {
        const requestedSentences = parseInt(data.numSentences, 10);
        const totalSentences = countSentences(data.text);

        // Requested sentences must be less than total sentences
        return requestedSentences < totalSentences;
      }
      return true;
    },
    {
      message: "عدد الجمل المطلوبة يجب أن يكون أقل من عدد الجمل في النص الأصلي",
      path: ["numSentences"], // This will show the error on the numSentences field
    }
  );

// Server-side form schema with additional validations
export const ServerFormSchema = z
  .object({
    text: z.string().min(10, { message: "النص يجب أن يكون على الأقل 10 أحرف" }),
    task: z.enum(["classification", "summarization"], {
      required_error: "يرجى اختيار نوع المهمة",
    }),
    numSentences: z
      .string()
      .optional()
      .refine((val) => !val || (parseInt(val, 10) >= 1 && parseInt(val, 10) <= 20), {
        message: "عدد الجمل يجب أن يكون بين 1 و 20",
      })
      .transform((val) => (val ? parseInt(val, 10) : undefined)),
    traditionalModel: z.string(),
    modernModel: z.string().min(1, { message: "يرجى اختيار النموذج الحديث" }),
  })
  .refine(
    (data) => {
      // Only validate sentence count for summarization task
      if (data.task === "summarization" && data.numSentences) {
        const totalSentences = countSentences(data.text);

        // Requested sentences must be less than total sentences
        return data.numSentences < totalSentences;
      }
      return true;
    },
    {
      message: "عدد الجمل المطلوبة يجب أن يكون أقل من عدد الجمل في النص الأصلي",
      path: ["numSentences"], // This will show the error on the numSentences field
    }
  );

// Infer the types from the schemas
export type FormData = z.infer<typeof FormSchema>;
export type ServerFormData = z.infer<typeof ServerFormSchema>;
export type TaskTypeValue = "classification" | "summarization";

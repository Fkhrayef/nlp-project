import * as z from "zod";

export const TaskType = z.enum(["classification", "summarization"]);

// Client-side form schema
export const FormSchema = z.object({
  text: z.string().min(10, { message: "النص يجب أن يكون على الأقل 10 أحرف" }),
  task: z.enum(["classification", "summarization"], {
    required_error: "يرجى اختيار نوع المهمة",
  }),
  numSentences: z.string().optional(),
});

// Server-side form schema with additional validations
export const ServerFormSchema = z.object({
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
});

// Infer the types from the schemas
export type FormData = z.infer<typeof FormSchema>;
export type ServerFormData = z.infer<typeof ServerFormSchema>;
export type TaskTypeValue = "classification" | "summarization";

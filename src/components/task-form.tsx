"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ControllerRenderProps } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { handleSubmit, type AnalysisResult } from "@/actions/actions";
import { TASKS } from "@/lib/constants";
import { TaskFormBtn } from "./task-form-btn";

// Form schema using zod
const formSchema = z.object({
  text: z.string().min(10, { message: "النص يجب أن يكون على الأقل 10 أحرف" }),
  task: z.enum(["classification", "summarization"]),
  numSentences: z.string().optional(),
});

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>;

type TaskFormProps = {
  onResult: (result: AnalysisResult | null) => void;
  onError: (error: string) => void;
};

export const TaskForm = ({ onResult, onError }: TaskFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      task: "classification",
      numSentences: "",
    },
  });

  const selectedTask = form.watch("task");
  const selectedTaskConfig = TASKS.find((task) => task.value === selectedTask);
  const requiresNumSentences = selectedTaskConfig?.requiresNumSentences === true;

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // Convert form data to FormData object for server action
      const formData = new FormData();
      formData.append("text", values.text);
      formData.append("task", values.task);
      if (values.numSentences) {
        formData.append("numSentences", values.numSentences);
      }

      const result = await handleSubmit(formData);
      onResult(result);
    } catch (error) {
      onError(error instanceof Error ? error.message : "حدث خطأ غير متوقع");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    form.reset();
    onResult(null);
    onError("");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Text Input - Moved to the top */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }: { field: ControllerRenderProps<FormValues, "text"> }) => (
            <FormItem>
              <FormLabel className="text-right block">النص المراد تحليله</FormLabel>
              <FormControl>
                <Textarea
                  dir="rtl"
                  placeholder="أدخل النص العربي هنا..."
                  className="min-h-[150px] text-right"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Task Selection - Moved after the textarea */}
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="task"
            render={({ field }: { field: ControllerRenderProps<FormValues, "task"> }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-right block">نوع المهمة</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="bg-background" dir="rtl">
                      <SelectValue placeholder="اختر نوع المهمة" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border shadow-md" dir="rtl">
                      {TASKS.map((task) => (
                        <SelectItem key={task.value} value={task.value}>
                          {task.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Sentences - Only show for summarization tasks */}
          {requiresNumSentences && (
            <FormField
              control={form.control}
              name="numSentences"
              render={({ field }: { field: ControllerRenderProps<FormValues, "numSentences"> }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-right block">عدد الجمل المطلوبة</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="3"
                      min="1"
                      max="20"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <TaskFormBtn isSubmitting={isSubmitting} />
          <Button type="button" variant="outline" onClick={handleClear} disabled={isSubmitting}>
            مسح
          </Button>
        </div>
      </form>
    </Form>
  );
};

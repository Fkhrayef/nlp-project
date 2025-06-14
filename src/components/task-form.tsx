"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ControllerRenderProps } from "react-hook-form";
import { FileText, Brain, Send, Sparkles } from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";
import { handleSubmit, type AnalysisResult } from "@/actions/actions";
import { FormSchema, type FormData } from "@/lib/validations";

type TaskFormProps = {
  onResult: (result: AnalysisResult | null) => void;
  onError: (error: string) => void;
};

const TASK_CARDS = [
  {
    value: "summarization",
    title: "تلخص نص",
    description: "استخراج النقاط الرئيسية وإنشاء ملخصات موجزة من النص العربي",
    icon: FileText,
    formTitle: "تلخيص النص",
    buttonText: "توليد الملخص",
  },
  {
    value: "classification",
    title: "تصنف نص",
    description: "تصنيف وتحليل النص العربي باستخدام نماذج التعلم الآلي المتقدمة",
    icon: Brain,
    formTitle: "تصنيف النص",
    buttonText: "تصنيف النص",
  },
] as const;

export const TaskForm = ({ onResult, onError }: TaskFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
      task: undefined,
      numSentences: "3",
    },
  });

  const selectedTask = form.watch("task");
  const selectedTaskConfig = TASK_CARDS.find((task) => task.value === selectedTask);
  const requiresNumSentences = selectedTask === "summarization";

  const onSubmit = async (values: FormData) => {
    if (!values.task) return;

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

  const getCardClasses = (taskValue: string) => {
    const isSelected = selectedTask === taskValue;

    if (isSelected) {
      return "relative bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20";
    }

    return "relative bg-card border border-border hover:border-primary/30 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer transform-gpu";
  };

  const getTextClasses = (taskValue: string) => {
    const isSelected = selectedTask === taskValue;

    if (isSelected) {
      return "text-primary";
    }

    return "text-foreground group-hover:text-primary";
  };

  const getIconClasses = (taskValue: string) => {
    const isSelected = selectedTask === taskValue;

    if (isSelected) {
      return "bg-primary/20 text-primary";
    }

    return "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary";
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-tajawal-bold text-foreground mb-2">اختر مهمتك</h2>
      </div>

      {/* Task Selection Cards */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto px-2 md:px-0">
        {TASK_CARDS.map((task) => {
          const IconComponent = task.icon;
          const isSelected = selectedTask === task.value;

          return (
            <Card
              key={task.value}
              className={`group p-6 md:p-8 rounded-2xl border cursor-pointer transition-all duration-300 ${getCardClasses(
                task.value
              )}`}
              onClick={() =>
                form.setValue("task", task.value as "summarization" | "classification")
              }
            >
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div
                  className={`p-3 md:p-4 rounded-xl transition-all duration-300 ${getIconClasses(
                    task.value
                  )}`}
                >
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3
                  className={`text-lg md:text-xl font-tajawal-bold transition-colors duration-300 ${getTextClasses(
                    task.value
                  )}`}
                >
                  {task.title}
                </h3>
                <p
                  className={`text-xs md:text-sm leading-relaxed transition-colors duration-300 ${
                    isSelected
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {task.description}
                </p>
              </div>
              {isSelected && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-primary rounded-full p-1.5 md:p-2 shadow-lg ring-2 ring-background">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Dynamic Form - Only show when task is selected */}
      {selectedTask && selectedTaskConfig && (
        <Card className="shadow-lg border-border max-w-6xl mx-auto">
          <CardContent className="p-4 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 mb-6 md:mb-8 text-center md:text-right">
              <div className="bg-primary/10 p-3 rounded-xl mx-auto md:mx-0 md:ml-4 w-fit">
                <selectedTaskConfig.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-tajawal-bold text-foreground">
                  {selectedTaskConfig.formTitle}
                </h3>
                <p className="text-muted-foreground font-tajawal-normal mt-1 text-sm md:text-base">
                  مقارنة النماذج المتعددة
                </p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                {/* Text Input */}
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }: { field: ControllerRenderProps<FormData, "text"> }) => (
                    <FormItem>
                      <FormLabel className="text-right block text-foreground font-tajawal-medium text-base md:text-lg mb-3">
                        إدخال النص العربي
                      </FormLabel>
                      <FormControl>
                        <div>
                          <Textarea
                            dir="rtl"
                            placeholder="أدخل النص العربي هنا..."
                            className="min-h-[120px] md:min-h-[160px] text-right bg-background border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-base md:text-xl p-4 md:p-6 rounded-xl font-tajawal-normal"
                            disabled={isSubmitting}
                            {...field}
                          />
                          <Button
                            type="button"
                            tabIndex={0}
                            aria-label="استخدم مثالاً"
                            variant="secondary"
                            size="sm"
                            className="mt-2"
                            onClick={() =>
                              form.setValue(
                                "text",
                                "يكون سعر الفاكهة والخضراوات في موسم إنباتها أقل من غيره من المواسم. ستلجأ محلات الخضروات إلى عرض الفاكهة بأسعار مناسبة في موسمها بسبب توفر المنتجات. لا يقتصر الأمر على السعر الأقل، بل سيكون طعامك أشهى وألذ عند تناوله في موسمه. في فصل الخريف يتوفر التفاح والتين والبنجر والكمثرى."
                              )
                            }
                          >
                            استخدم مثالاً
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form Controls Row */}
                <div
                  className={`flex flex-col md:flex-row gap-6 md:gap-8 ${
                    requiresNumSentences ? "md:space-x-8" : ""
                  }`}
                >
                  {/* Model Selection */}
                  <FormField
                    control={form.control}
                    name="task"
                    render={() => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-foreground font-tajawal-medium text-base md:text-lg mb-3 block">
                          اختيار النموذج
                        </FormLabel>
                        <FormControl>
                          <Select value="lstm_model" disabled>
                            <SelectTrigger className="bg-background border-2 border-border h-12 md:h-14 text-base md:text-lg px-4 md:px-6 rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lstm_model">LSTM Model</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Number of Sentences - Only for summarization */}
                  {requiresNumSentences && (
                    <FormField
                      control={form.control}
                      name="numSentences"
                      render={({
                        field,
                      }: {
                        field: ControllerRenderProps<FormData, "numSentences">;
                      }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-foreground font-tajawal-medium text-base md:text-lg mb-3 block">
                            عدد الجمل
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="20"
                              className="bg-background border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 md:h-14 text-base md:text-lg px-4 md:px-6 rounded-xl transition-all duration-300"
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

                {/* Submit Button */}
                <div className="pt-4 md:pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 md:h-16 text-lg md:text-xl font-tajawal-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transform-gpu rounded-xl"
                  >
                    <div className="flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                          <span>جاري المعالجة...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 md:w-6 md:h-6" />
                          <span>{selectedTaskConfig?.buttonText}</span>
                        </>
                      )}
                    </div>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

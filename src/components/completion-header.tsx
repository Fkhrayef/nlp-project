"use client";

import { CheckCircle, RotateCcw, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoBlock } from "@/components/info-block";

type CompletionHeaderProps = {
  task: string;
  originalText?: string;
  onBack: () => void;
};

export const CompletionHeader = ({ task, originalText, onBack }: CompletionHeaderProps) => {
  const getModelName = (technique: string) => {
    return technique === "traditional" ? "النموذج التقليدي" : "النموذج الحديث";
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-4 md:p-10 border border-border">
      {/* Header Section - Mobile First */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-6 md:mb-8">
        {/* Icon and Text - Stacked on mobile, inline on desktop */}
        <div className="flex flex-col md:flex-row md:items-center text-center md:text-right">
          <div className="bg-primary p-3 rounded-xl mx-auto md:mx-0 md:ml-4 mb-4 md:mb-0 w-fit">
            <CheckCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-0">
              اكتملت المقارنة
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">
              المهمة: {task === "summarization" ? "تلخيص النص" : "تصنيف النص"} • مقارنة{" "}
              {getModelName("traditional")} مع {getModelName("modern")}
            </p>
          </div>
        </div>

        {/* Button - Full width on mobile, auto width on desktop */}
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full md:w-auto flex items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary/30 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          مقارنة أخرى
        </Button>
      </div>

      {/* Original Text Section */}
      {originalText && (
        <div className="mt-6 md:mt-8">
          <InfoBlock title="النص الأصلي" icon={<Leaf className="w-5 h-5 md:w-6 md:h-6" />}>
            <p
              dir="rtl"
              className="text-foreground text-right leading-relaxed text-base md:text-lg"
            >
              {originalText}
            </p>
          </InfoBlock>
        </div>
      )}
    </div>
  );
};

"use client";

import { useState } from "react";
import { Settings, Eye, EyeOff, CheckCircle, Leaf } from "lucide-react";
import { PreprocessingResponse } from "@/lib/types";
import { InfoBlock } from "@/components/info-block";
import { Badge } from "@/components/ui/badge";

type PreprocessingAccordionProps = {
  result: PreprocessingResponse;
};

export const PreprocessingAccordion = ({ result }: PreprocessingAccordionProps) => {
  const [showPreprocessing, setShowPreprocessing] = useState(false);

  const preprocessing = result.preprocessing_steps;

  if (!preprocessing) {
    return (
      <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
        <div className="flex items-center">
          <div className="bg-green-100 p-3 rounded-xl ml-4">
            <Settings className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-foreground">خطوات المعالجة الأولية</h4>
            <p className="text-gray-600">لم يتم العثور على خطوات المعالجة</p>
          </div>
        </div>
      </div>
    );
  }

  // Define all possible preprocessing steps and filter to only show those with data
  const allPossibleSteps = [
    { stepName: "إزالة الأحرف الخاصة", processedText: preprocessing.stripped_lowered },
    { stepName: "تطبيع النص", processedText: preprocessing.normalized },
    { stepName: "إزالة التشكيل", processedText: preprocessing.diacritics_removed },
    { stepName: "إزالة علامات الترقيم", processedText: preprocessing.punctuation_removed },
    { stepName: "تقليل الأحرف المكررة", processedText: preprocessing.repeated_chars_reduced },
    { stepName: "توحيد المسافات", processedText: preprocessing.whitespace_normalized },
    { stepName: "إزالة الأرقام", processedText: preprocessing.numbers_removed },
  ];

  // Filter to only include steps that have data, then assign sequential numbers
  const availableSteps = allPossibleSteps
    .filter((step) => step.processedText && step.processedText.trim() !== "")
    .map((step, index) => ({
      ...step,
      stepNumber: index + 1,
    }));

  return (
    <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8 border border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-4 md:mb-6">
        <div className="flex items-center justify-center md:justify-start">
          <div className="bg-primary/10 p-3 rounded-xl ml-4">
            <Settings className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-bold text-foreground">خطوات المعالجة الأولية</h4>
          </div>
        </div>
        <button
          onClick={() => setShowPreprocessing(!showPreprocessing)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-primary/5 text-foreground hover:text-primary rounded-xl transition-all duration-300 w-full md:w-auto"
        >
          <span className="font-medium">{showPreprocessing ? "إخفاء" : "عرض"}</span>
          {showPreprocessing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {showPreprocessing && (
        <div className="space-y-4 md:space-y-6 animate-in slide-in-from-top-4 duration-500">
          {/* Original Text */}
          {preprocessing.original && (
            <InfoBlock title="النص الأصلي" icon={<Leaf className="w-5 h-5 md:w-6 md:h-6" />}>
              <p
                dir="rtl"
                className="text-foreground text-right leading-relaxed text-sm md:text-base"
              >
                {preprocessing.original}
              </p>
            </InfoBlock>
          )}

          {/* Processing Steps - Show only available steps with sequential numbering */}
          {availableSteps.map((step, index) => (
            <div key={`step-${step.stepNumber}`} className="relative">
              <InfoBlock
                title={step.stepName}
                icon={
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary flex items-center justify-center text-xs md:text-sm font-bold text-white">
                    {step.stepNumber}
                  </div>
                }
              >
                <p
                  dir="rtl"
                  className="text-foreground text-right leading-relaxed text-sm md:text-base"
                >
                  {step.processedText}
                </p>
              </InfoBlock>
              {index < availableSteps.length - 1 && (
                <div className="flex justify-center my-2 md:my-3">
                  <div className="w-0.5 h-4 md:h-6 bg-primary"></div>
                </div>
              )}
            </div>
          ))}

          {/* Tokenization step */}
          {preprocessing.tokenized && preprocessing.tokenized.length > 0 && (
            <>
              {availableSteps.length > 0 && (
                <div className="flex justify-center my-2 md:my-3">
                  <div className="w-0.5 h-4 md:h-6 bg-primary"></div>
                </div>
              )}
              <InfoBlock
                title="تقسيم النص إلى كلمات"
                icon={
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary flex items-center justify-center text-xs md:text-sm font-bold text-white">
                    {availableSteps.length + 1}
                  </div>
                }
              >
                <div
                  dir="rtl"
                  className="text-foreground text-right leading-relaxed flex flex-wrap gap-1 md:gap-2 justify-start"
                >
                  {preprocessing.tokenized.map((token, idx) => (
                    <Badge
                      key={`token-${idx}`}
                      variant="secondary"
                      className="px-3 py-1 text-base md:text-sm font-medium"
                    >
                      {token}
                    </Badge>
                  ))}
                </div>
              </InfoBlock>
            </>
          )}

          {/* Stopwords removal step */}
          {preprocessing.stopwords_removed && preprocessing.stopwords_removed.length > 0 && (
            <>
              <div className="flex justify-center my-2 md:my-3">
                <div className="w-0.5 h-4 md:h-6 bg-primary"></div>
              </div>
              <InfoBlock
                title="إزالة كلمات الوقف"
                icon={
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary flex items-center justify-center text-xs md:text-sm font-bold text-white">
                    {availableSteps.length + (preprocessing.tokenized?.length > 0 ? 2 : 1)}
                  </div>
                }
              >
                <div
                  dir="rtl"
                  className="text-foreground text-right leading-relaxed flex flex-wrap gap-1 md:gap-2 justify-start"
                >
                  {preprocessing.stopwords_removed.map((token, idx) => (
                    <Badge
                      key={`stopword-${idx}`}
                      variant="secondary"
                      className="px-3 py-1 text-base md:text-sm font-medium"
                    >
                      {token}
                    </Badge>
                  ))}
                </div>
              </InfoBlock>
            </>
          )}

          {/* Stemming step */}
          {preprocessing.stemmed && preprocessing.stemmed.length > 0 && (
            <>
              <div className="flex justify-center my-2 md:my-3">
                <div className="w-0.5 h-4 md:h-6 bg-primary"></div>
              </div>
              <InfoBlock
                title="جذع الكلمات"
                icon={
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary flex items-center justify-center text-xs md:text-sm font-bold text-white">
                    {availableSteps.length +
                      (preprocessing.tokenized?.length > 0 ? 1 : 0) +
                      (preprocessing.stopwords_removed?.length > 0 ? 1 : 0) +
                      1}
                  </div>
                }
              >
                <div
                  dir="rtl"
                  className="text-foreground text-right leading-relaxed flex flex-wrap gap-1 md:gap-2 justify-start"
                >
                  {preprocessing.stemmed.map((token, idx) => (
                    <Badge
                      key={`stem-${idx}`}
                      variant="secondary"
                      className="px-3 py-1 text-base md:text-sm font-medium"
                    >
                      {token}
                    </Badge>
                  ))}
                </div>
              </InfoBlock>
            </>
          )}

          {/* Final Result */}
          {preprocessing.final && (
            <>
              <div className="flex justify-center my-2 md:my-3">
                <div className="w-0.5 h-4 md:h-6 bg-primary"></div>
              </div>
              <InfoBlock
                title="النتيجة النهائية"
                icon={<CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary" />}
              >
                <p
                  dir="rtl"
                  className="text-foreground text-right leading-relaxed font-medium text-sm md:text-base"
                >
                  {preprocessing.final}
                </p>
              </InfoBlock>
            </>
          )}
        </div>
      )}
    </div>
  );
};

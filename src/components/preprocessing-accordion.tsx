"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Types moved to this file since they're only used here
type PreprocessingStep = {
  step_name: string;
  input_text: string;
  output_text: string;
  description: string;
};

type PreprocessingSteps = {
  original_text: string;
  original?: string;
  diacritics_removed?: string;
  stripped_lowered?: string;
  normalized?: string;
  punctuation_removed?: string;
  repeated_chars_reduced?: string;
  whitespace_normalized?: string;
  numbers_removed?: string;
  tokenized?: string[];
  stopwords_removed?: string[];
  stemmed?: string[];
  final?: string;
  final_result?: string;
  step_1_remove_diacritics?: string;
  step_2_remove_punctuation?: string;
  step_3_normalize_text?: string;
  step_4_remove_stopwords?: string;
  step_5_stem_words?: string;
  preprocessing_summary?: {
    original_length: number;
    final_length: number;
    reduction_percentage: number;
    words_removed: number;
    words_remaining: number;
  };
  steps?: PreprocessingStep[];
};

type PreprocessingResponse = {
  original_text: string;
  task_type: string;
  preprocessing_steps: PreprocessingSteps;
  processed_text: string;
};

type PreprocessingAccordionProps = {
  result: PreprocessingResponse;
};

export const PreprocessingAccordion = ({ result }: PreprocessingAccordionProps) => {
  console.log("Preprocessing steps:", result.preprocessing_steps);

  const renderPreprocessingSteps = (data: PreprocessingResponse) => {
    const steps = data?.preprocessing_steps;

    // Handle case where steps might be completely missing
    if (!steps) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-right">خطوات المعالجة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              لم يتم العثور على خطوات المعالجة الأولية
            </p>
          </CardContent>
        </Card>
      );
    }

    // Get the original and final text (handling different API formats)
    const originalText = steps.original_text || steps.original || "";
    const finalText = steps.final_result || steps.final || "";

    // Calculate the reduction percentage
    const originalLength = originalText.length || 0;
    const finalLength = finalText.length || 0;
    const reductionPercentage =
      originalLength > 0 ? ((1 - finalLength / originalLength) * 100).toFixed(1) : "0";

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-right">خطوات المعالجة الأولية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {/* Original text display */}
            {originalText && (
              <div>
                <h4 className="font-medium text-right mb-2">النص الأصلي:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-blue-500"
                  dir="rtl"
                >
                  {originalText}
                </p>
              </div>
            )}

            {/* New API format steps */}
            {steps.stripped_lowered && (
              <div>
                <h4 className="font-medium text-right mb-2">١. إزالة الأحرف الخاصة:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-green-500"
                  dir="rtl"
                >
                  {steps.stripped_lowered}
                </p>
              </div>
            )}

            {steps.normalized && (
              <div>
                <h4 className="font-medium text-right mb-2">٢. تطبيع النص:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-yellow-500"
                  dir="rtl"
                >
                  {steps.normalized}
                </p>
              </div>
            )}

            {steps.diacritics_removed && (
              <div>
                <h4 className="font-medium text-right mb-2">٣. إزالة التشكيل:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-orange-500"
                  dir="rtl"
                >
                  {steps.diacritics_removed}
                </p>
              </div>
            )}

            {steps.punctuation_removed && (
              <div>
                <h4 className="font-medium text-right mb-2">٤. إزالة علامات الترقيم:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-purple-500"
                  dir="rtl"
                >
                  {steps.punctuation_removed}
                </p>
              </div>
            )}

            {steps.repeated_chars_reduced && (
              <div>
                <h4 className="font-medium text-right mb-2">٥. تقليل الأحرف المكررة:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-red-500"
                  dir="rtl"
                >
                  {steps.repeated_chars_reduced}
                </p>
              </div>
            )}

            {steps.whitespace_normalized && (
              <div>
                <h4 className="font-medium text-right mb-2">٦. توحيد المسافات:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-blue-500"
                  dir="rtl"
                >
                  {steps.whitespace_normalized}
                </p>
              </div>
            )}

            {steps.numbers_removed && (
              <div>
                <h4 className="font-medium text-right mb-2">٧. إزالة الأرقام:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-green-500"
                  dir="rtl"
                >
                  {steps.numbers_removed}
                </p>
              </div>
            )}

            {/* Tokenization step */}
            {steps.tokenized && steps.tokenized.length > 0 && (
              <div>
                <h4 className="font-medium text-right mb-2">٨. تقسيم النص إلى كلمات:</h4>
                <div
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-yellow-500 flex flex-wrap gap-1 justify-end"
                  dir="rtl"
                >
                  {steps.tokenized.map((token, idx) => (
                    <span key={`token-${idx}`} className="bg-blue-100 rounded px-2 py-1">
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stopwords removal step */}
            {steps.stopwords_removed && steps.stopwords_removed.length > 0 && (
              <div>
                <h4 className="font-medium text-right mb-2">٩. إزالة كلمات الوقف:</h4>
                <div
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-orange-500 flex flex-wrap gap-1 justify-end"
                  dir="rtl"
                >
                  {steps.stopwords_removed.map((token, idx) => (
                    <span key={`stopword-${idx}`} className="bg-blue-100 rounded px-2 py-1">
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stemming step */}
            {steps.stemmed && steps.stemmed.length > 0 && (
              <div>
                <h4 className="font-medium text-right mb-2">١٠. جذع الكلمات:</h4>
                <div
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-purple-500 flex flex-wrap gap-1 justify-end"
                  dir="rtl"
                >
                  {steps.stemmed.map((token, idx) => (
                    <span key={`stem-${idx}`} className="bg-blue-100 rounded px-2 py-1">
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Old API format steps (as fallback) */}
            {steps.step_1_remove_diacritics && !steps.diacritics_removed && (
              <div>
                <h4 className="font-medium text-right mb-2">١. إزالة التشكيل:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-green-500"
                  dir="rtl"
                >
                  {steps.step_1_remove_diacritics}
                </p>
              </div>
            )}

            {steps.step_2_remove_punctuation && !steps.punctuation_removed && (
              <div>
                <h4 className="font-medium text-right mb-2">٢. إزالة علامات الترقيم:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-yellow-500"
                  dir="rtl"
                >
                  {steps.step_2_remove_punctuation}
                </p>
              </div>
            )}

            {steps.step_3_normalize_text && !steps.normalized && (
              <div>
                <h4 className="font-medium text-right mb-2">٣. تطبيع النص:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-orange-500"
                  dir="rtl"
                >
                  {steps.step_3_normalize_text}
                </p>
              </div>
            )}

            {steps.step_4_remove_stopwords && !steps.stopwords_removed && (
              <div>
                <h4 className="font-medium text-right mb-2">٤. إزالة كلمات الوقف:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-purple-500"
                  dir="rtl"
                >
                  {steps.step_4_remove_stopwords}
                </p>
              </div>
            )}

            {steps.step_5_stem_words && !steps.stemmed && (
              <div>
                <h4 className="font-medium text-right mb-2">٥. جذع الكلمات:</h4>
                <p
                  className="text-sm text-right bg-gray-50 p-3 rounded border-r-4 border-red-500"
                  dir="rtl"
                >
                  {steps.step_5_stem_words}
                </p>
              </div>
            )}

            {/* Final result */}
            {finalText && (
              <div>
                <h4 className="font-medium text-right mb-2">النتيجة النهائية:</h4>
                <p
                  className="text-sm text-right bg-green-50 p-3 rounded border-r-4 border-green-600 font-medium"
                  dir="rtl"
                >
                  {finalText}
                </p>
              </div>
            )}
          </div>

          {/* Processing Summary */}
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h4 className="font-medium text-right mb-3">ملخص المعالجة:</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <Badge variant="outline" className="text-xs">
                  الطول الأصلي: {originalLength} حرف
                </Badge>
              </div>
              <div>
                <Badge variant="outline" className="text-xs">
                  الطول النهائي: {finalLength} حرف
                </Badge>
              </div>
              <div>
                <Badge variant="outline" className="text-xs">
                  نسبة التقليل: {reductionPercentage}%
                </Badge>
              </div>
            </div>

            {steps.preprocessing_summary && (
              <div className="grid grid-cols-2 gap-2 text-center mt-2">
                <div>
                  <Badge variant="outline" className="text-xs">
                    الكلمات المزالة: {steps.preprocessing_summary.words_removed}
                  </Badge>
                </div>
                <div>
                  <Badge variant="outline" className="text-xs">
                    الكلمات المتبقية: {steps.preprocessing_summary.words_remaining}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-right">المعالجة الأولية للنص</h3>
      <div>{renderPreprocessingSteps(result)}</div>
    </div>
  );
};

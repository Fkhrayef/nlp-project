import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TaskForm } from "@/components/task-form";
import { CompletionHeader } from "@/components/completion-header";
import { PreprocessingAccordion } from "@/components/preprocessing-accordion";
import { ResultPanel } from "@/components/result-panel";
import ContentBlock from "@/components/content-block";
import type { AnalysisResult } from "@/actions/actions";

interface ContentProps {
  onReset?: () => void;
}

export const Content = ({ onReset }: ContentProps) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [originalText, setOriginalText] = useState<string>("");

  const handleResult = (newResult: AnalysisResult | null) => {
    setResult(newResult);
    setError("");
    if (newResult) {
      setShowResults(true);
      // Store the original text from preprocessing
      if (newResult.preprocessing?.preprocessing_steps?.original) {
        setOriginalText(newResult.preprocessing.preprocessing_steps.original);
      }
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setResult(null);
    setShowResults(false);
  };

  const handleBackToForm = () => {
    setShowResults(false);
    setResult(null);
    setError("");
    setOriginalText("");
    onReset?.(); // Call external reset handler if provided
  };

  return (
    <ContentBlock className="p-4 md:p-6">
      <div className="space-y-6 md:space-y-8 h-full overflow-y-auto">
        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription className="text-right">{error}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Form */}
        {!showResults && <TaskForm onResult={handleResult} onError={handleError} />}

        {/* Step 2: Results */}
        {showResults && result && (
          <div className="space-y-6 md:space-y-8">
            {/* 1. Completion Header with Original Text */}
            <CompletionHeader
              task={result.task}
              originalText={originalText}
              onBack={handleBackToForm}
            />

            {/* 2. Preprocessing Steps */}
            <PreprocessingAccordion result={result.preprocessing} />

            {/* 3. Results and 4. Performance Comparison */}
            <ResultPanel
              result={result.results}
              task={result.task}
              selectedModels={result.selectedModels}
            />
          </div>
        )}
      </div>
    </ContentBlock>
  );
};

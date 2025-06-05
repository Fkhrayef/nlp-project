import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TaskForm } from "@/components/task-form";
import { PreprocessingAccordion } from "@/components/preprocessing-accordion";
import { ResultPanel } from "@/components/result-panel";
import { ComparisonSection } from "@/components/comparison-section";
import type { AnalysisResult } from "@/actions/actions";

export const Content = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleResult = (newResult: AnalysisResult | null) => {
    setResult(newResult);
    setError("");
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setResult(null);
  };

  return (
    <div className="space-y-8">
      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="text-right">{error}</AlertDescription>
        </Alert>
      )}

      {/* Task Form */}
      <TaskForm onResult={handleResult} onError={handleError} />

      {/* Results Section */}
      {result && (
        <div className="space-y-8">
          {/* Preprocessing Steps */}
          <PreprocessingAccordion result={result.preprocessing} />

          {/* Main Results Panel */}
          <ResultPanel result={result.results} task={result.task} />

          {/* Comparison Section */}
          <ComparisonSection result={result.results} />
        </div>
      )}
    </div>
  );
};

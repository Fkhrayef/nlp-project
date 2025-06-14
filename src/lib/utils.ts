import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges conflicting Tailwind classes
 * Uses clsx for conditional classes and tailwind-merge to handle conflicts
 *
 * Example:
 * cn("px-2 py-1", condition && "bg-blue-500", "px-4")
 * Result: "py-1 bg-blue-500 px-4" (px-4 overrides px-2)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate percentage difference between two numbers
export function calculatePercentageDiff(value1: number, value2: number): number {
  if (value1 === 0 && value2 === 0) return 0;
  if (value1 === 0) return 100;
  return Math.abs(((value2 - value1) / value1) * 100);
}

// Compare numeric metrics between traditional and modern results
export function compareResults(
  traditional: Record<string, unknown>,
  modern: Record<string, unknown>
): Array<{
  metric: string;
  traditional: number;
  modern: number;
  diff: number;
  better: "traditional" | "modern" | "equal";
}> {
  const comparisons: Array<{
    metric: string;
    traditional: number;
    modern: number;
    diff: number;
    better: "traditional" | "modern" | "equal";
  }> = [];

  // Extract numeric values recursively
  const extractNumbers = (
    obj: Record<string, unknown>,
    prefix = ""
  ): Array<{ key: string; value: number }> => {
    const numbers: Array<{ key: string; value: number }> = [];

    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "number") {
        numbers.push({ key: fullKey, value });
      } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        numbers.push(...extractNumbers(value as Record<string, unknown>, fullKey));
      }
    }

    return numbers;
  };

  const traditionalNumbers = extractNumbers(traditional);
  const modernNumbers = extractNumbers(modern);

  traditionalNumbers.forEach(({ key, value: tradValue }) => {
    const modernMatch = modernNumbers.find((item) => item.key === key);
    if (modernMatch) {
      const diff = calculatePercentageDiff(tradValue, modernMatch.value);
      let better: "traditional" | "modern" | "equal" = "equal";

      // Determine which is better based on metric type
      if (key.includes("confidence") || key.includes("score") || key.includes("accuracy")) {
        better =
          modernMatch.value > tradValue
            ? "modern"
            : tradValue > modernMatch.value
            ? "traditional"
            : "equal";
      } else if (key.includes("time") || key.includes("length") || key.includes("count")) {
        better =
          modernMatch.value < tradValue
            ? "modern"
            : tradValue < modernMatch.value
            ? "traditional"
            : "equal";
      }

      comparisons.push({
        metric: key,
        traditional: tradValue,
        modern: modernMatch.value,
        diff,
        better,
      });
    }
  });

  return comparisons;
}

// Format Arabic numbers
export function formatArabicNumber(num: number, decimalPlaces = 2): string {
  return num.toLocaleString("ar-SA", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}

/**
 * Formats a number as a percentage string with 2 decimal places
 *
 * Example:
 * formatPercentage(85.123) → "85.12%"
 * formatPercentage(50) → "50.00%"
 */
export function formatPercentage(num: number): string {
  return `${num.toFixed(2)}%`;
}

"use client";

import { Feather, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export const Header = () => {
  const { setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="relative text-center space-y-4 py-8">
      {/* Dark mode toggle */}
      <div className="absolute left-4 top-4">
        <Button variant="ghost" size="icon" aria-label="تبديل الوضع" onClick={handleToggleTheme}>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>

      {/* Clickable Logo & Title */}
      <button
        onClick={handleReset}
        className="inline-block group cursor-pointer bg-transparent border-none p-0 w-auto h-auto"
        aria-label="العودة إلى الصفحة الرئيسية"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-primary p-3 md:p-4 rounded-2xl shadow-lg transition-all duration-200 group-hover:shadow-xl group-hover:scale-105">
            <Feather className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-tajawal-bold text-primary mb-2 md:mb-4 transition-colors duration-200 group-hover:text-primary/80">
          معالج النصوص العربية
        </h1>
      </button>

      {/* Subtitle */}
      <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto font-tajawal-normal leading-relaxed px-4">
        قارن النتائج من نموذجين مختلفين لمعالجة النصوص العربية باستخدام الذكاء الاصطناعي
      </p>
    </div>
  );
};

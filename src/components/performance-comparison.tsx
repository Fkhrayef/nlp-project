"use client";

import { Zap } from "lucide-react";

type PerformanceComparisonProps = {
  traditionalTime: number;
  modernTime: number;
};

export const PerformanceComparison = ({
  traditionalTime,
  modernTime,
}: PerformanceComparisonProps) => {
  const getModelName = (technique: string) => {
    return technique === "traditional" ? "النموذج التقليدي" : "النموذج الحديث";
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8 border border-border">
      <h4 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center justify-center md:justify-start">
        <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary ml-2" />
        مقارنة الأداء
      </h4>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex items-center justify-between p-4 md:p-6 bg-primary/5 rounded-xl border border-border flex-1">
          <div>
            <p className="font-bold text-primary text-base md:text-lg">
              {getModelName("traditional")}
            </p>
            <p className="text-primary/80 text-sm md:text-base">وقت المعالجة</p>
          </div>
          <div className="text-2xl md:text-3xl font-black text-primary">{traditionalTime} م.ث</div>
        </div>
        <div className="flex items-center justify-between p-4 md:p-6 bg-primary/5 rounded-xl border border-border flex-1">
          <div>
            <p className="font-bold text-primary text-base md:text-lg">{getModelName("modern")}</p>
            <p className="text-primary/80 text-sm md:text-base">وقت المعالجة</p>
          </div>
          <div className="text-2xl md:text-3xl font-black text-primary">{modernTime} م.ث</div>
        </div>
      </div>
      <div className="mt-4 md:mt-6 p-4 md:p-6 bg-muted rounded-xl">
        <p className="text-foreground text-center font-semibold text-base md:text-lg">
          {traditionalTime < modernTime
            ? `${getModelName("traditional")} كان أسرع بـ ${
                modernTime - traditionalTime
              } ميلي ثانية`
            : modernTime < traditionalTime
            ? `${getModelName("modern")} كان أسرع بـ ${traditionalTime - modernTime} ميلي ثانية`
            : "كلا النموذجين لهما أوقات معالجة متشابهة"}
        </p>
      </div>
    </div>
  );
};

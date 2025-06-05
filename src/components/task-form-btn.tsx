"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type TaskFormBtnProps = {
  isSubmitting: boolean;
};

export const TaskFormBtn = ({ isSubmitting }: TaskFormBtnProps) => {
  return (
    <Button type="submit" disabled={isSubmitting} className="flex-1">
      {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      {isSubmitting ? "جاري التحليل..." : "تشغيل التحليل"}
    </Button>
  );
};

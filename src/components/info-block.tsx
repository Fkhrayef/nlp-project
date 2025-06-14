import React from "react";

export type InfoBlockProps = {
  title: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const InfoBlock: React.FC<InfoBlockProps> = ({ title, icon, children, className = "" }) => {
  return (
    <section
      className={`bg-primary/5 border-r-4 border-primary rounded-lg p-4 mb-4 text-foreground shadow-sm flex flex-col gap-2 ${className}`}
      aria-label={typeof title === "string" ? title : undefined}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-primary" aria-hidden="true">
          {icon}
        </span>
        <span className="font-bold text-lg">{title}</span>
      </div>
      <div className="text-base leading-relaxed">{children}</div>
    </section>
  );
};

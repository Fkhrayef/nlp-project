"use client";

import { Header } from "@/components/header";
import { Content } from "@/components/content";
import { Footer } from "@/components/footer";
import { useState, useCallback } from "react";

export default function Home() {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = useCallback(() => {
    // Force re-render of Content component to reset its state
    setResetKey((prev) => prev + 1);
  }, []);

  return (
    <main>
      <div className="flex flex-col max-w-[1200px] mx-auto px-4 min-h-screen">
        <Header onReset={handleReset} />

        <div className="flex-1">
          <Content key={resetKey} onReset={() => setResetKey((prev) => prev + 1)} />
        </div>

        <Footer />
      </div>
    </main>
  );
}

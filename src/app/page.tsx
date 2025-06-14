"use client";

import { Header } from "@/components/header";
import { Content } from "@/components/content";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col max-w-[1200px] mx-auto px-4 min-h-screen">
        <Header />

        <div className="flex-1">
          <Content />
        </div>
      </div>
    </main>
  );
}

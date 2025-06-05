"use client";

import { Header } from "@/components/header";
import { Container } from "@/components/container";
import { Content } from "@/components/content";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <Header />
      <div className="flex justify-center items-center">
        <Container>
          <Content />
        </Container>
      </div>
    </main>
  );
}

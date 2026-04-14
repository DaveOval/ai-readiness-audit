import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WhatWeCheck } from "@/components/what-we-check";
import { ReportPreview } from "@/components/report-preview";
import { StatsStrip } from "@/components/stats-strip";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhatWeCheck />
        <ReportPreview />
        <StatsStrip />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

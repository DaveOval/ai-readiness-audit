import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scan Results",
  description:
    "View your AI readiness audit results. Detailed scores across technical health, discoverability, content structure, structured data, and AI readiness.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

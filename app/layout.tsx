import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/lib/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Readiness Audit — Is Your Website Ready for the AI Era?",
  description:
    "Paste any URL and get an instant audit of how search engines and AI systems see your content. 30+ checks across 6 categories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.classList.remove("dark","light");document.documentElement.classList.add(t)}else if(window.matchMedia("(prefers-color-scheme:light)").matches){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative overflow-x-hidden bg-background text-foreground transition-colors duration-300">
        <AmbientBg />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

function AmbientBg() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 dark-ambient"
      />
      <style>{`
        .dark .dark-ambient {
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.3 0.15 265 / 0.35), transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 80%, oklch(0.25 0.12 280 / 0.2), transparent 60%);
        }
        .light .dark-ambient {
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.85 0.06 265 / 0.25), transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 80%, oklch(0.88 0.04 280 / 0.15), transparent 60%);
        }
      `}</style>
    </>
  );
}

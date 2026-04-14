import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Readiness Audit",
    short_name: "AI Audit",
    description:
      "Paste any URL and get an instant audit of how search engines and AI systems see your content.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#4F46E5",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

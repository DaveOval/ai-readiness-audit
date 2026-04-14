"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { validateUrl } from "@/lib/url";
import { useI18n } from "@/lib/i18n";

interface UrlInputProps {
  size?: "large" | "default";
  className?: string;
}

export function UrlInput({ size = "default", className = "" }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useI18n();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const result = validateUrl(url);
    if (!result.success) {
      setError(result.error);
      return;
    }

    setLoading(true);
    router.push(`/scan?url=${encodeURIComponent(result.url)}`);
  }

  const isLarge = size === "large";

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div
        className={`relative flex items-center rounded-2xl t-input backdrop-blur-sm transition-all focus-within:border-blue-500/40 focus-within:glow-blue-sm ${
          isLarge ? "p-2" : "p-1.5"
        }`}
      >
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError("");
          }}
          placeholder={t("urlInput.placeholder")}
          className={`flex-1 min-w-0 bg-transparent t-text placeholder:t-text-muted outline-none ${
            isLarge ? "px-3 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base" : "px-3 py-2 text-sm"
          }`}
          aria-label={t("urlInput.aria")}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 font-medium text-white transition-all hover:from-blue-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 shrink-0 ${
            isLarge ? "px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base" : "px-4 py-2 text-sm"
          }`}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {t("urlInput.button")}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400 px-2" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

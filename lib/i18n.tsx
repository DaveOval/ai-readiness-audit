"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Locale = "en" | "es";

const translations = {
  en: {
    // Navbar
    "nav.brand": "AI Readiness Audit",
    "nav.howItWorks": "How it works",
    "nav.startScan": "Start Scan",

    // Hero
    "hero.badge": "Free, instant, no sign-up required",
    "hero.title1": "Is your website ready",
    "hero.title2": "for the AI era?",
    "hero.subtitle":
      "Paste any URL and get an instant audit of how search engines and AI systems see your content. 30+ checks across 6 categories.",
    "hero.footnote": "Works with any public webpage. Results in seconds.",

    // URL Input
    "urlInput.placeholder": "Paste any URL to scan...",
    "urlInput.button": "Scan Website",
    "urlInput.aria": "Website URL",

    // What we check
    "check.title": "What we check",
    "check.subtitle":
      "A comprehensive audit across the signals that matter most for search engines and AI systems.",
    "check.technical": "Technical Health",
    "check.technicalDesc":
      "HTTP status, viewport, language attribute, and document fundamentals.",
    "check.discoverability": "Discoverability",
    "check.discoverabilityDesc":
      "Canonical URLs, robots directives, sitemaps, and indexability signals.",
    "check.social": "Social Sharing",
    "check.socialDesc":
      "Open Graph tags, Twitter cards, and preview-ready metadata.",
    "check.content": "Content Structure",
    "check.contentDesc":
      "Heading hierarchy, word count, readability, and internal linking.",
    "check.structured": "Structured Data",
    "check.structuredDesc":
      "JSON-LD markup, schema.org types, and machine-readable annotations.",
    "check.ai": "AI Readiness",
    "check.aiDesc":
      "Answer-first content, entity clarity, and citation-friendly structure.",

    // Report preview
    "preview.title": "Actionable, not abstract",
    "preview.subtitle":
      "Get a clear score, specific issues, and prioritized fixes — not a vague thumbs up.",
    "preview.verdict": "Strong",
    "preview.verdictCopy":
      "Good page hygiene. Biggest gains are in structured data and answer-first content.",

    // Stats
    "stats.checks": "Checks performed",
    "stats.categories": "Categories scored",
    "stats.time": "Average scan time",
    "stats.free": "Free, forever",

    // Footer
    "footer.builtWith": "Built with Next.js",

    // Scan page
    "scan.title": "Scanning your page",
    "scan.subtitle":
      "Analyzing how search engines and AI systems see your content",
    "scan.complete": "Complete",
    "scan.backHome": "Back to home",
    "scan.reportTitle": "Audit Report",
    "scan.failed": "Scan failed",
    "scan.noUrl": "No URL provided",
    "scan.noUrlDesc": "Paste a URL below to start an AI readiness audit.",
    "scan.loading": "Loading...",

    // Scan phases
    "phase.fetchingHtml": "Fetching HTML",
    "phase.inspectingMetadata": "Inspecting metadata",
    "phase.checkingIndexability": "Checking indexability",
    "phase.parsingStructured": "Parsing structured data",
    "phase.evaluatingContent": "Evaluating content clarity",
    "phase.generatingVerdict": "Generating verdict",

    // Report
    "report.outOf": "out of 100",
    "report.auditAnother": "Audit another page",
    "report.auditAnotherDesc":
      "Paste a different URL to run a fresh audit. Each scan takes just a few seconds.",
    "report.topIssues": "Top issues blocking visibility",
    "report.noIssues": "No critical issues found. Nice work.",
    "report.recommended": "Recommended actions",
    "report.noFixes": "Everything looks good. No urgent fixes needed.",
    "report.detected": "What we detected",
    "report.checks": "checks",
    "report.passed": "passed",
    "report.issues": "issues",

    // Impact
    "impact.high": "High impact",
    "impact.medium": "Medium impact",
    "impact.low": "Low impact",

    // Category labels
    "cat.technical": "Technical Health",
    "cat.discoverability": "Discoverability",
    "cat.content": "Content Structure",
    "cat.structuredData": "Structured Data",
    "cat.aiReadiness": "AI Readiness",

    // Contact
    "contact.title": "Get in touch",
    "contact.subtitle": "Have questions, feedback, or want to collaborate? Send me a message.",
    "contact.name": "Your name",
    "contact.namePlaceholder": "Jane Doe",
    "contact.email": "Your email",
    "contact.emailPlaceholder": "you@example.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell me what you'd like to discuss...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent! I'll get back to you soon.",
    "contact.error": "Could not send message. Please email me directly.",
    "nav.contact": "Contact",

    // Footer
    "footer.madeBy": "Made by",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",
  },
  es: {
    // Navbar
    "nav.brand": "Auditoría IA",
    "nav.howItWorks": "Cómo funciona",
    "nav.startScan": "Iniciar Escaneo",

    // Hero
    "hero.badge": "Gratis, instantáneo, sin registro",
    "hero.title1": "¿Tu sitio web está listo",
    "hero.title2": "para la era de la IA?",
    "hero.subtitle":
      "Pega cualquier URL y obtén una auditoría instantánea de cómo los motores de búsqueda y los sistemas de IA ven tu contenido. Más de 30 verificaciones en 6 categorías.",
    "hero.footnote":
      "Funciona con cualquier página web pública. Resultados en segundos.",

    // URL Input
    "urlInput.placeholder": "Pega cualquier URL para escanear...",
    "urlInput.button": "Escanear Sitio",
    "urlInput.aria": "URL del sitio web",

    // What we check
    "check.title": "Qué verificamos",
    "check.subtitle":
      "Una auditoría completa de las señales más importantes para motores de búsqueda y sistemas de IA.",
    "check.technical": "Salud Técnica",
    "check.technicalDesc":
      "Estado HTTP, viewport, atributo de idioma y fundamentos del documento.",
    "check.discoverability": "Descubribilidad",
    "check.discoverabilityDesc":
      "URLs canónicas, directivas robots, sitemaps y señales de indexación.",
    "check.social": "Compartir en Redes",
    "check.socialDesc":
      "Etiquetas Open Graph, Twitter Cards y metadatos de previsualización.",
    "check.content": "Estructura del Contenido",
    "check.contentDesc":
      "Jerarquía de encabezados, conteo de palabras, legibilidad y enlaces internos.",
    "check.structured": "Datos Estructurados",
    "check.structuredDesc":
      "Marcado JSON-LD, tipos schema.org y anotaciones legibles por máquinas.",
    "check.ai": "Preparación para IA",
    "check.aiDesc":
      "Contenido con respuesta directa, claridad de entidades y estructura citable.",

    // Report preview
    "preview.title": "Accionable, no abstracto",
    "preview.subtitle":
      "Obtén un puntaje claro, problemas específicos y correcciones priorizadas — no un vago aprobado.",
    "preview.verdict": "Fuerte",
    "preview.verdictCopy":
      "Buena higiene de página. Las mayores ganancias están en datos estructurados y contenido directo.",

    // Stats
    "stats.checks": "Verificaciones realizadas",
    "stats.categories": "Categorías evaluadas",
    "stats.time": "Tiempo promedio de escaneo",
    "stats.free": "Gratis, siempre",

    // Footer
    "footer.builtWith": "Hecho con Next.js",

    // Scan page
    "scan.title": "Escaneando tu página",
    "scan.subtitle":
      "Analizando cómo los motores de búsqueda y los sistemas de IA ven tu contenido",
    "scan.complete": "Completado",
    "scan.backHome": "Volver al inicio",
    "scan.reportTitle": "Informe de Auditoría",
    "scan.failed": "Escaneo fallido",
    "scan.noUrl": "No se proporcionó URL",
    "scan.noUrlDesc":
      "Pega una URL abajo para iniciar una auditoría de preparación para IA.",
    "scan.loading": "Cargando...",

    // Scan phases
    "phase.fetchingHtml": "Obteniendo HTML",
    "phase.inspectingMetadata": "Inspeccionando metadatos",
    "phase.checkingIndexability": "Verificando indexabilidad",
    "phase.parsingStructured": "Analizando datos estructurados",
    "phase.evaluatingContent": "Evaluando claridad del contenido",
    "phase.generatingVerdict": "Generando veredicto",

    // Report
    "report.outOf": "de 100",
    "report.auditAnother": "Auditar otra página",
    "report.auditAnotherDesc":
      "Pega una URL diferente para ejecutar una nueva auditoría. Cada escaneo toma solo unos segundos.",
    "report.topIssues": "Principales problemas que bloquean la visibilidad",
    "report.noIssues": "No se encontraron problemas críticos. Buen trabajo.",
    "report.recommended": "Acciones recomendadas",
    "report.noFixes":
      "Todo se ve bien. No se necesitan correcciones urgentes.",
    "report.detected": "Lo que detectamos",
    "report.checks": "verificaciones",
    "report.passed": "aprobadas",
    "report.issues": "problemas",

    // Impact
    "impact.high": "Alto impacto",
    "impact.medium": "Impacto medio",
    "impact.low": "Bajo impacto",

    // Category labels
    "cat.technical": "Salud Técnica",
    "cat.discoverability": "Descubribilidad",
    "cat.content": "Estructura del Contenido",
    "cat.structuredData": "Datos Estructurados",
    "cat.aiReadiness": "Preparación para IA",

    // Contact
    "contact.title": "Contáctame",
    "contact.subtitle": "¿Tienes preguntas, comentarios o quieres colaborar? Envíame un mensaje.",
    "contact.name": "Tu nombre",
    "contact.namePlaceholder": "Juan Pérez",
    "contact.email": "Tu correo",
    "contact.emailPlaceholder": "tu@ejemplo.com",
    "contact.message": "Mensaje",
    "contact.messagePlaceholder": "Cuéntame de qué te gustaría hablar...",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.success": "¡Mensaje enviado! Te responderé pronto.",
    "contact.error": "No se pudo enviar el mensaje. Escríbeme directamente por correo.",
    "nav.contact": "Contacto",

    // Footer
    "footer.madeBy": "Hecho por",

    // Theme
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
  },
} as const;

type TranslationKey = keyof (typeof translations)["en"];

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("locale");
  if (saved === "en" || saved === "es") return saved;
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("es")) return "es";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(detectLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale][key] || translations.en[key] || key;
    },
    [locale]
  );

  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: "en", setLocale, t: (key) => translations.en[key] || key }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

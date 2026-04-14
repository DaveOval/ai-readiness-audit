import type { Verdict } from "./types";
import type { Locale } from "./i18n";

const verdictLabels: Record<Locale, Record<Verdict, string>> = {
  en: {
    Excellent: "Excellent",
    Strong: "Strong",
    "Needs Work": "Needs Work",
    Weak: "Weak",
  },
  es: {
    Excellent: "Excelente",
    Strong: "Fuerte",
    "Needs Work": "Necesita Mejoras",
    Weak: "Débil",
  },
};

export function translateVerdict(verdict: Verdict, locale: Locale): string {
  return verdictLabels[locale][verdict] ?? verdict;
}

const findingNames: Record<string, string> = {
  "HTTP Status": "Estado HTTP",
  "Language attribute": "Atributo de idioma",
  "Viewport meta": "Meta viewport",
  "Page title": "Título de página",
  "Meta description": "Meta descripción",
  "Canonical URL": "URL canónica",
  "Robots meta": "Meta robots",
  "No noindex directive": "Sin directiva noindex",
  "robots.txt reachable": "robots.txt accesible",
  "Sitemap reachable": "Sitemap accesible",
  "Open Graph title": "Título Open Graph",
  "Open Graph description": "Descripción Open Graph",
  "Open Graph image": "Imagen Open Graph",
  "Twitter card": "Twitter Card",
  "Single H1": "H1 único",
  "Heading hierarchy": "Jerarquía de encabezados",
  "Word count": "Conteo de palabras",
  "Internal links": "Enlaces internos",
  "Paragraph readability": "Legibilidad de párrafos",
  "Rich content elements": "Elementos de contenido enriquecido",
  "JSON-LD present": "JSON-LD presente",
  "Schema types detected": "Tipos de schema detectados",
  "Additional structured markup": "Marcado estructurado adicional",
  "Answer-first content": "Contenido con respuesta directa",
  "Extractable summary": "Resumen extraíble",
  "Entity clarity": "Claridad de entidades",
  "Content chunking": "Segmentación de contenido",
  "Citation-friendly structure": "Estructura citable",
  "Transparency signals": "Señales de transparencia",
};

const findingDetails: Record<string, string> = {
  "Viewport meta tag is configured": "La etiqueta meta viewport está configurada",
  "Missing viewport meta tag — mobile rendering may be broken": "Falta la etiqueta meta viewport — el renderizado móvil puede fallar",
  "No <title> element found": "No se encontró elemento <title>",
  "No meta description found": "No se encontró meta descripción",
  "No canonical URL specified": "No se especificó URL canónica",
  "No robots meta tag (defaults to index,follow)": "Sin etiqueta meta robots (por defecto index,follow)",
  "Page is indexable": "La página es indexable",
  "robots.txt is accessible": "robots.txt es accesible",
  "robots.txt not found or unreachable": "robots.txt no encontrado o inaccesible",
  "XML sitemap is accessible": "El sitemap XML es accesible",
  "No valid XML sitemap found at /sitemap.xml": "No se encontró un sitemap XML válido en /sitemap.xml",
  "No og:title meta tag": "Sin etiqueta meta og:title",
  "No og:description meta tag": "Sin etiqueta meta og:description",
  "No og:image meta tag": "Sin etiqueta meta og:image",
  "OG image specified": "Imagen OG especificada",
  "No twitter:card meta tag": "Sin etiqueta meta twitter:card",
  "No H1 heading found": "No se encontró encabezado H1",
  "Incomplete heading hierarchy — missing H1 or H2 levels": "Jerarquía de encabezados incompleta — faltan niveles H1 o H2",
  "Few or no paragraph elements — content may lack structure": "Pocos o ningún elemento de párrafo — el contenido puede carecer de estructura",
  "No lists, tables, or FAQ structures found": "No se encontraron listas, tablas o estructuras FAQ",
  "No JSON-LD structured data found": "No se encontraron datos estructurados JSON-LD",
  "No identifiable schema.org types": "No se identificaron tipos schema.org",
  "No microdata or RDFa markup detected": "No se detectó marcado microdata o RDFa",
  "Content begins with substantive information, not a generic greeting": "El contenido comienza con información sustancial, no un saludo genérico",
  "Content does not lead with a clear, direct answer": "El contenido no comienza con una respuesta clara y directa",
  "Page has title, description, and structured paragraphs — easy to summarize": "La página tiene título, descripción y párrafos estructurados — fácil de resumir",
  "Missing key elements for AI to generate an accurate summary": "Faltan elementos clave para que la IA genere un resumen preciso",
  "Page provides machine-readable entity information": "La página proporciona información de entidades legible por máquinas",
  "No clear entity signals — AI may struggle to attribute content": "Sin señales claras de entidades — la IA puede tener dificultades para atribuir contenido",
  "Content is well-segmented into logical sections": "El contenido está bien segmentado en secciones lógicas",
  "Content lacks clear sectioning for chunk-based retrieval": "El contenido carece de secciones claras para recuperación por fragmentos",
  "Content uses quotable structures (lists, definitions, or quotes)": "El contenido usa estructuras citables (listas, definiciones o citas)",
  "Content lacks easily citable structures": "El contenido carece de estructuras fácilmente citables",
  "No author, date, or organization signals detected": "No se detectaron señales de autor, fecha u organización",
  "Page is marked noindex — search engines will not index this page": "La página está marcada como noindex — los motores de búsqueda no la indexarán",
  "noindex found — this page is excluded from search results": "noindex encontrado — esta página está excluida de los resultados de búsqueda",
  "Author identified": "Autor identificado",
  "Publication date found": "Fecha de publicación encontrada",
  "Organization attributed": "Organización atribuida",
};

const fixTitles: Record<string, string> = {
  "Add a descriptive page title": "Agregar un título de página descriptivo",
  "Write a compelling meta description": "Escribir una meta descripción atractiva",
  "Set a canonical URL": "Establecer una URL canónica",
  "Use exactly one H1 heading": "Usar exactamente un encabezado H1",
  "Add structured data markup": "Agregar marcado de datos estructurados",
  "Lead with your key message": "Comenzar con tu mensaje clave",
  "Improve page summarizability": "Mejorar la capacidad de resumen de la página",
  "Add entity information": "Agregar información de entidades",
  "Add authorship and date signals": "Agregar señales de autoría y fecha",
  "Remove noindex directive": "Eliminar la directiva noindex",
  "Add a language attribute": "Agregar un atributo de idioma",
  "Add a viewport meta tag": "Agregar una etiqueta meta viewport",
  "Add Open Graph meta tags": "Agregar etiquetas meta Open Graph",
  "Improve content sectioning": "Mejorar la sección del contenido",
  "Add quotable structures": "Agregar estructuras citables",
};

const fixDescriptions: Record<string, string> = {
  'Include a unique <title> tag that clearly describes the page content. Keep it under 60 characters for optimal display in search results.':
    "Incluye una etiqueta <title> única que describa claramente el contenido. Mantenla bajo 60 caracteres para una visualización óptima en resultados de búsqueda.",
  'Add a <meta name="description"> tag with a 150-160 character summary that entices clicks and accurately describes the page.':
    'Agrega una etiqueta <meta name="description"> con un resumen de 150-160 caracteres que atraiga clics y describa la página con precisión.',
  'Add <link rel="canonical" href="..."> to prevent duplicate content issues and consolidate ranking signals.':
    'Agrega <link rel="canonical" href="..."> para prevenir problemas de contenido duplicado y consolidar señales de ranking.',
  "Ensure your page has a single H1 that clearly states the main topic. Use H2-H6 for subsections.":
    "Asegúrate de que tu página tenga un solo H1 que declare claramente el tema principal. Usa H2-H6 para subsecciones.",
  "Include JSON-LD structured data for your content type (Article, Product, FAQ, Organization) to help search engines and AI systems understand your content.":
    "Incluye datos estructurados JSON-LD para tu tipo de contenido (Article, Product, FAQ, Organization) para ayudar a motores de búsqueda e IA a entender tu contenido.",
  "Start your content with a direct answer or clear value statement. AI systems prioritize pages that get to the point quickly.":
    "Comienza tu contenido con una respuesta directa o una declaración de valor clara. Los sistemas de IA priorizan páginas que van al punto rápidamente.",
  "Ensure you have a title, meta description, single H1, and well-structured paragraphs so AI can generate accurate summaries.":
    "Asegúrate de tener un título, meta descripción, H1 único y párrafos bien estructurados para que la IA pueda generar resúmenes precisos.",
  "Include structured data about your organization, author, or product to help AI systems attribute and trust your content.":
    "Incluye datos estructurados sobre tu organización, autor o producto para ayudar a los sistemas de IA a atribuir y confiar en tu contenido.",
  "Include author names, publication dates, and organization info to build trust signals for both search engines and AI.":
    "Incluye nombres de autores, fechas de publicación e información de la organización para construir señales de confianza para motores de búsqueda e IA.",
  "Your page has a noindex tag preventing search engines from indexing it. Remove this if you want the page to appear in search results.":
    "Tu página tiene una etiqueta noindex que impide que los motores de búsqueda la indexen. Elimínala si quieres que la página aparezca en resultados de búsqueda.",
  'Add lang="en" (or your language) to the <html> tag to help search engines and screen readers understand the page language.':
    'Agrega lang="es" (o tu idioma) a la etiqueta <html> para ayudar a motores de búsqueda y lectores de pantalla a entender el idioma de la página.',
  'Include <meta name="viewport" content="width=device-width, initial-scale=1"> for proper mobile rendering.':
    'Incluye <meta name="viewport" content="width=device-width, initial-scale=1"> para un renderizado móvil adecuado.',
  "Include og:title, og:description, and og:image tags to control how your page appears when shared on social platforms.":
    "Incluye etiquetas og:title, og:description y og:image para controlar cómo aparece tu página al compartirla en redes sociales.",
  "Use <section>, <article>, and <main> elements with clear headings to help AI systems retrieve specific content chunks.":
    "Usa elementos <section>, <article> y <main> con encabezados claros para ayudar a los sistemas de IA a recuperar fragmentos específicos de contenido.",
  "Include lists, blockquotes, and definition terms to make your content easier for AI to cite directly.":
    "Incluye listas, citas en bloque y términos de definición para que tu contenido sea más fácil de citar directamente por la IA.",
};

const verdictCopies: Record<string, string> = {
  "This page is well-optimized for both search engines and AI discovery. Keep it up.":
    "Esta página está bien optimizada tanto para motores de búsqueda como para descubrimiento por IA. Sigue así.",
  "Strong metadata foundation, but missing machine-readable context for AI systems.":
    "Base sólida de metadatos, pero falta contexto legible por máquinas para sistemas de IA.",
  "Good page hygiene. Biggest gains are in structured data and answer-first content.":
    "Buena higiene de página. Las mayores ganancias están en datos estructurados y contenido con respuesta directa.",
  "Solid overall presence. A few targeted improvements could push this into excellent territory.":
    "Presencia general sólida. Algunas mejoras específicas podrían llevarla a territorio excelente.",
  "Technically reachable, but weakly structured for AI summarization.":
    "Técnicamente accesible, pero débilmente estructurada para resúmenes por IA.",
  "This page is indexable, but not especially quotable. Content depth and structure need attention.":
    "Esta página es indexable, pero no especialmente citable. La profundidad y estructura del contenido necesitan atención.",
  "Missing the signals that help AI systems understand, summarize, and cite your content.":
    "Faltan las señales que ayudan a los sistemas de IA a entender, resumir y citar tu contenido.",
  "Several areas need improvement before this page performs well in AI-driven discovery.":
    "Varias áreas necesitan mejorar antes de que esta página funcione bien en descubrimiento impulsado por IA.",
  "This page has fundamental issues across most categories. Start with the basics: title, description, and structured content.":
    "Esta página tiene problemas fundamentales en la mayoría de las categorías. Comienza con lo básico: título, descripción y contenido estructurado.",
  "Significant gaps in visibility and AI readiness. Prioritize the recommended fixes below.":
    "Brechas significativas en visibilidad y preparación para IA. Prioriza las correcciones recomendadas abajo.",
};

export function translateFindingName(name: string, locale: Locale): string {
  if (locale === "en") return name;
  return findingNames[name] ?? name;
}

export function translateFindingDetail(detail: string, locale: Locale): string {
  if (locale === "en") return detail;
  return findingDetails[detail] ?? detail;
}

export function translateFixTitle(title: string, locale: Locale): string {
  if (locale === "en") return title;
  if (title.startsWith("Fix: ")) {
    const inner = title.slice(5);
    const translated = findingNames[inner];
    return translated ? `Corregir: ${translated}` : title;
  }
  return fixTitles[title] ?? title;
}

export function translateFixDescription(desc: string, locale: Locale): string {
  if (locale === "en") return desc;
  return fixDescriptions[desc] ?? findingDetails[desc] ?? desc;
}

export function translateVerdictCopy(copy: string, locale: Locale): string {
  if (locale === "en") return copy;
  return verdictCopies[copy] ?? copy;
}

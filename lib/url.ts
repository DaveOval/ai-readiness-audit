import { z } from "zod/v4";

const urlSchema = z.string().min(1, "URL is required").refine(
  (val) => {
    try {
      const withProto = val.match(/^https?:\/\//) ? val : `https://${val}`;
      new URL(withProto);
      return true;
    } catch {
      return false;
    }
  },
  { message: "Please enter a valid URL" }
);

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  const withProto = trimmed.match(/^https?:\/\//) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProto);
  return parsed.toString();
}

export function validateUrl(input: string): { success: true; url: string } | { success: false; error: string } {
  const result = urlSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }
  try {
    const url = normalizeUrl(input);
    return { success: true, url };
  } catch {
    return { success: false, error: "Please enter a valid URL" };
  }
}

export function getDisplayUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
  } catch {
    return url;
  }
}

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/contact";

const FORMSPREE_FORM_ID = "mwkdpyzj";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
const NEXT_URL = `${SITE_URL}/?sent=1#contact`;

const subscribeToHistory = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
};
const getSentFromUrl = () =>
  new URLSearchParams(window.location.search).get("sent") === "1";
const getSentSsr = () => false;

export function ContactSection() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const sentFromUrl = useSyncExternalStore(
    subscribeToHistory,
    getSentFromUrl,
    getSentSsr,
  );

  useEffect(() => {
    if (!sentFromUrl) return;
    const params = new URLSearchParams(window.location.search);
    params.delete("sent");
    const qs = params.toString();
    const cleanUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}#contact`;
    window.history.replaceState({}, "", cleanUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, [sentFromUrl]);

  const isSent = sentFromUrl;

  return (
    <section id="contact" className="py-12 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/10 mb-5">
            <Mail className="h-5 w-5 text-blue-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold t-text tracking-tight">
            {t("contact.title")}
          </h2>
          <p className="mt-3 t-text-tertiary max-w-md mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {isSent ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl t-card p-6 sm:p-8 flex items-start gap-3"
            role="status"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-sm t-text">{t("contact.success")}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            action={FORMSPREE_ENDPOINT}
            method="POST"
            onSubmit={() => setSubmitting(true)}
            className="rounded-2xl t-card p-6 sm:p-8 space-y-5"
          >
            <input type="hidden" name="_next" value={NEXT_URL} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium t-text-secondary mb-1.5">
                  {t("contact.name")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("contact.namePlaceholder")}
                  className="w-full rounded-xl t-input px-4 py-2.5 text-sm t-text placeholder:t-text-muted outline-none focus:border-blue-500/40 transition-colors"
                  disabled={submitting}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium t-text-secondary mb-1.5">
                  {t("contact.email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("contact.emailPlaceholder")}
                  className="w-full rounded-xl t-input px-4 py-2.5 text-sm t-text placeholder:t-text-muted outline-none focus:border-blue-500/40 transition-colors"
                  disabled={submitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium t-text-secondary mb-1.5">
                {t("contact.message")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("contact.messagePlaceholder")}
                className="w-full rounded-xl t-input px-4 py-2.5 text-sm t-text placeholder:t-text-muted outline-none resize-none focus:border-blue-500/40 transition-colors"
                disabled={submitting}
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-1">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-xs t-text-tertiary hover:text-blue-400 transition-colors truncate max-w-full"
              >
                {CONTACT_EMAIL}
              </a>

              <button
                type="submit"
                disabled={submitting || !name.trim() || !email.trim() || !message.trim()}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:from-blue-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 w-full sm:w-auto"
              >
                {submitting ? (
                  t("contact.sending")
                ) : (
                  <>
                    {t("contact.send")}
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

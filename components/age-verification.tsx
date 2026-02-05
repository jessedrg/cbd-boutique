"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const BOT_USER_AGENTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'sogou', 'exabot', 'facebot', 'facebookexternalhit',
  'ia_archiver', 'linkedinbot', 'twitterbot', 'pinterest', 'semrushbot',
  'ahrefsbot', 'mj12bot', 'dotbot', 'petalbot', 'bytespider',
  'applebot', 'chrome-lighthouse', 'pagespeed', 'gtmetrix', 'pingdom'
];

function isBot(): boolean {
  if (typeof window === 'undefined') return true;
  const ua = navigator.userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

const AGE_CONTENT: Record<string, {
  title: string;
  subtitle: string;
  question: string;
  confirm: string;
  deny: string;
  warning: string;
  legal: string;
}> = {
  en: {
    title: "Age Verification",
    subtitle: "CBD Boutique",
    question: "Are you 18 years of age or older?",
    confirm: "Yes, I am 18+",
    deny: "No, I am under 18",
    warning: "You must be 18 or older to enter this website.",
    legal: "By entering this site you confirm you are of legal age and agree to our Terms of Service and Privacy Policy."
  },
  es: {
    title: "Verificacion de Edad",
    subtitle: "CBD Boutique",
    question: "Tienes 18 anos o mas?",
    confirm: "Si, tengo 18+",
    deny: "No, soy menor de 18",
    warning: "Debes tener 18 anos o mas para entrar a este sitio.",
    legal: "Al entrar a este sitio confirmas que eres mayor de edad y aceptas nuestros Terminos de Servicio y Politica de Privacidad."
  },
  de: {
    title: "Altersverifikation",
    subtitle: "CBD Boutique",
    question: "Sind Sie 18 Jahre oder alter?",
    confirm: "Ja, ich bin 18+",
    deny: "Nein, ich bin unter 18",
    warning: "Sie mussen 18 Jahre oder alter sein, um diese Website zu betreten.",
    legal: "Durch das Betreten dieser Seite bestatigen Sie, dass Sie volljahrig sind und stimmen unseren AGB und Datenschutzrichtlinien zu."
  },
  fr: {
    title: "Verification de l'age",
    subtitle: "CBD Boutique",
    question: "Avez-vous 18 ans ou plus?",
    confirm: "Oui, j'ai 18+",
    deny: "Non, j'ai moins de 18 ans",
    warning: "Vous devez avoir 18 ans ou plus pour acceder a ce site.",
    legal: "En entrant sur ce site, vous confirmez etre majeur et acceptez nos Conditions Generales et Politique de Confidentialite."
  }
};

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M40 16.3L32.7 7.4L30.7 4.1L32.3 0L22.6 8.2L29.9 17L31.9 20.3L30.3 24.4L40 16.3Z" fill="#0C5A76"/>
      <path d="M25.9 12.3L14.5 12.5L10.7 12L8.60001 8.2L8.89999 20.9L20.3 20.7L24.1 21.2L26.2 25L25.9 12.3Z" fill="#0C5A76"/>
      <path d="M14 20.9L7.10001 30L4.39999 32.8L0 32.1L10.1 39.7L17 30.6L19.7 27.9L24.1 28.6L14 20.9Z" fill="#0C5A76"/>
      <path d="M13.3 35.6L16 46.7L16.5 50.5L13.2 53.5L25.4 50.3L22.6 39.2L22.1 35.4L25.4 32.5L13.3 35.6Z" fill="#0C5A76"/>
      <path d="M24.3 45.3L34.6 50.1L37.9 52.2L38.2 56.6L43.3 45L32.9 40.2L29.6 38.2L29.3 33.8L24.3 45.3Z" fill="#0C5A76"/>
      <path d="M38.7 42.7L48.9 37.6L52.5 36.3L56.1 38.8L50.3 27.6L40.1 32.7L36.4 34L32.8 31.5L38.7 42.7Z" fill="#0C5A76"/>
      <path d="M45.7 29.8L48 18.6L49.3 14.9L53.5 13.7L41.1 11.2L38.8 22.4L37.5 26.1L33.3 27.3L45.7 29.8Z" fill="#0C5A76"/>
    </svg>
  );
}

export function AgeVerification() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isDenied, setIsDenied] = useState(false);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    if (isBot()) {
      setIsVerified(true);
      return;
    }

    const verified = localStorage.getItem("age-verified");
    if (verified === "true") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }

    const path = window.location.pathname;
    const pathLocale = path.split("/")[1];
    if (pathLocale && AGE_CONTENT[pathLocale]) {
      setLocale(pathLocale);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("age-verified", "true");
    setIsVerified(true);
  };

  const handleDeny = () => {
    setIsDenied(true);
  };

  if (isVerified === null) return null;
  if (isVerified) return null;

  const content = AGE_CONTENT[locale] || AGE_CONTENT.en;

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/90 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-background max-w-md w-full p-10 sm:p-14 text-center shadow-2xl">
        {isDenied ? (
          <>
            <div className="w-16 h-16 mx-auto mb-8 border border-destructive/30 flex items-center justify-center">
              <svg className="h-8 w-8 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-muted-foreground font-light leading-relaxed">
              {content.warning}
            </p>
          </>
        ) : (
          <>
            {/* Logo */}
            <div className="mb-8">
              <LogoMark className="mx-auto mb-4" />
              <span className="text-xl font-serif font-light tracking-wide text-foreground">{content.subtitle}</span>
            </div>

            {/* Divider */}
            <div className="w-12 h-px bg-border mx-auto mb-8" />

            {/* Title */}
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
              {content.title}
            </h2>

            {/* Question */}
            <p className="text-xl font-serif font-light mb-10 text-foreground leading-relaxed">
              {content.question}
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleConfirm}
                className="h-14 rounded-none text-xs uppercase tracking-[0.2em] font-medium bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {content.confirm}
              </Button>
              <Button
                onClick={handleDeny}
                variant="outline"
                className="h-14 rounded-none text-xs uppercase tracking-[0.2em] font-medium border-border text-foreground hover:bg-secondary"
              >
                {content.deny}
              </Button>
            </div>

            {/* Legal text */}
            <p className="text-[10px] text-muted-foreground mt-10 leading-relaxed max-w-xs mx-auto">
              {content.legal}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

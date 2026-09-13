"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "dark";
      size: "flexible";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const LOCAL_TEST_SITE_KEY = "1x00000000000000000000AA";

export function TurnstileWidget({
  onToken,
  onError,
}: {
  onToken: (token: string) => void;
  onError?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? LOCAL_TEST_SITE_KEY;

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: "registration_request_otp",
      theme: "dark",
      size: "flexible",
      callback: onToken,
      "expired-callback": () => onToken(""),
      "error-callback": () => {
        onToken("");
        onError?.();
      },
    });
  }, [onError, onToken, siteKey]);

  useEffect(() => {
    renderWidget();
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  return (
    <div className="min-h-16 overflow-hidden rounded-xl border border-white/10 bg-black/20 p-3">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} />
    </div>
  );
}


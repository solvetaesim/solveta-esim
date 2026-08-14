"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencySelect } from "./PrefSelects";
import { Bolt } from "@/components/ui/icons";

const MESSAGES = [
  "Instant QR delivery",
  "Works in 190+ countries",
  "No roaming fees, ever",
  "24/7 human support",
];

export function TopStrip() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-parchment text-ink-muted">
      <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between px-5 text-xs sm:px-8">
        <p className="flex items-center gap-1.5" aria-live="polite">
          <Bolt className="size-3 text-coral" />
          <span className="font-medium text-ink">{MESSAGES[i]}</span>
          <span className="hidden text-ink-muted sm:inline">· secure checkout</span>
        </p>
        <div className="flex items-center gap-3">
          <CurrencySelect />
          <span className="h-3 w-px bg-hairline" aria-hidden />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

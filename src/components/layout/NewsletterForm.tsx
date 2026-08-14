"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@/components/ui/icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  }

  if (done) {
    return (
      <p className="inline-flex items-center gap-2 rounded-full bg-success/15 px-4 py-3 text-sm text-success">
        <Check className="size-4" /> You&apos;re on the list — safe travels.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="inline-flex w-full max-w-sm items-center gap-2 rounded-full border border-hairline bg-card p-1.5 md:w-auto">
      <label htmlFor="newsletter" className="sr-only">Email address</label>
      <input
        id="newsletter"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-coral px-4 text-sm font-medium text-white transition-colors hover:bg-coral-strong"
      >
        Subscribe <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

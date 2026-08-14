"use client";

import { useMemo, useState } from "react";
import type { Plan } from "@/lib/types";
import { formatData } from "@/lib/data/plans";
import { Price } from "@/components/ui/Price";
import { Pin } from "@/components/ui/icons";

const HABITS = [
  { key: "maps", label: "Maps & navigation", perDay: 0.15 },
  { key: "chat", label: "Messaging & email", perDay: 0.1 },
  { key: "social", label: "Social & browsing", perDay: 0.4 },
  { key: "video", label: "Streaming video", perDay: 1.2 },
];

/** Interactive "how much data do I need?" widget → recommends a plan. */
export function DataCalculator({ plans, days: initialDays = 7 }: { plans: Plan[]; days?: number }) {
  const [days, setDays] = useState(initialDays);
  const [active, setActive] = useState<Record<string, boolean>>({ maps: true, chat: true, social: true, video: false });

  const perDay = HABITS.reduce((sum, h) => sum + (active[h.key] ? h.perDay : 0), 0);
  const needGb = Math.max(0.5, Math.round(perDay * days * 10) / 10);

  const recommended = useMemo(() => {
    const sorted = [...plans].sort((a, b) => (a.dataGb ?? 999) - (b.dataGb ?? 999));
    return sorted.find((p) => p.unlimited || (p.dataGb ?? 0) >= needGb) ?? sorted[sorted.length - 1];
  }, [plans, needGb]);

  return (
    <div className="rounded-ticket border border-hairline bg-card p-6 shadow-ticket">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal">
        <Pin className="size-3.5 text-coral" /> Data calculator
      </div>
      <h3 className="mt-2 font-display text-2xl text-ink">How much data do I need?</h3>

      <div className="mt-5">
        <label htmlFor="trip-days" className="flex items-center justify-between text-sm text-ink">
          <span>Trip length</span>
          <span className="font-mono font-semibold text-coral-strong">{days} days</span>
        </label>
        <input
          id="trip-days"
          type="range"
          min={1}
          max={30}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="mt-2 w-full accent-coral"
        />
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm text-ink">What will you do online?</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {HABITS.map((h) => (
            <label
              key={h.key}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                active[h.key] ? "border-coral bg-coral-tint text-ink" : "border-hairline text-ink-muted"
              }`}
            >
              <input
                type="checkbox"
                checked={!!active[h.key]}
                onChange={(e) => setActive((s) => ({ ...s, [h.key]: e.target.checked }))}
                className="accent-coral"
              />
              {h.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between rounded-lg bg-parchment p-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">Estimated need</p>
          <p className="font-mono text-2xl font-semibold text-ink">{needGb} GB</p>
        </div>
        {recommended ? (
          <div className="text-right">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">We recommend</p>
            <p className="font-display text-lg text-ink">{formatData(recommended)} · {recommended.validityDays}d</p>
            <Price usd={recommended.price} className="text-sm font-semibold text-coral-strong" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

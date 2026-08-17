"use client";

import { usePreferences } from "@/components/providers/Preferences";
import type { CurrencyCode } from "@/lib/types";

const selectCls =
  "bg-transparent font-mono text-xs uppercase tracking-wide text-current focus-visible:outline-2 rounded";

export function CurrencySelect() {
  const { currency, setCurrency } = usePreferences();
  return (
    <label className="inline-flex items-center gap-1">
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className={selectCls}
      >
        <option value="GBP">£ GBP</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>
    </label>
  );
}

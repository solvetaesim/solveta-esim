"use client";

import { useState } from "react";
import Link from "next/link";
import type { RegionId } from "@/lib/types";
import { regions } from "@/lib/data/regions";
import { countriesByRegion } from "@/lib/data/countries";
import { AtlasMap } from "@/components/ui/AtlasMap";
import { Price } from "@/components/ui/Price";
import { Pin } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function CoverageExplorer() {
  const [region, setRegion] = useState<RegionId>("europe");
  const list = countriesByRegion(region);
  const active = regions.find((r) => r.id === region)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Regions">
          {regions.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={region === r.id}
              onClick={() => setRegion(r.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                region === r.id ? "border-coral bg-coral text-white" : "border-hairline bg-card text-ink hover:border-ink/30",
              )}
            >
              {r.name}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-ticket border border-hairline bg-card p-4 shadow-ticket">
          <div className="mb-2 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
            <span className="inline-flex items-center gap-1.5"><Pin className="size-3 text-coral" /> {active.name}</span>
            <span className="text-teal">{active.coords}</span>
          </div>
          <AtlasMap />
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl text-ink">{active.name}</h2>
          <span className="text-sm text-ink-muted">
            from <Price usd={active.fromPrice} className="font-semibold text-coral-strong" />
          </span>
        </div>
        <p className="mt-1 text-ink-muted">{active.blurb}</p>

        <ul className="mt-5 divide-y divide-hairline rounded-ticket border border-hairline bg-card">
          {list.map((c) => (
            <li key={c.slug}>
              <Link href={`/destinations/${c.slug}`} className="flex items-center justify-between px-4 py-3 hover:bg-parchment">
                <span className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden>{c.flag}</span>
                  <span>
                    <span className="block font-medium text-ink">{c.name}</span>
                    <span className="font-mono text-[0.68rem] text-ink-muted">{c.iso3} · {c.speeds.join("/")}</span>
                  </span>
                </span>
                <span className="font-mono text-sm text-coral-strong">
                  <Price usd={c.fromPrice} prefix="from " />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

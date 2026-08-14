"use client";

import Link from "next/link";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { FlagChip } from "@/components/ui/FlagChip";
import { StampBadge } from "@/components/ui/StampBadge";
import { Price } from "@/components/ui/Price";
import { Pin, ArrowRight } from "@/components/ui/icons";
import { popularCountries } from "@/lib/data/countries";
import { regions } from "@/lib/data/regions";

export function MegaNav({ onClose }: { onClose: () => void }) {
  const popular = popularCountries().slice(0, 8);

  return (
    <div
      onMouseLeave={onClose}
      className="absolute inset-x-0 top-full border-b border-hairline bg-canvas shadow-pop"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        {/* Popular */}
        <div>
          <DestinationSearch className="mb-5" placeholder="Search 190+ destinations…" />
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">Popular destinations</p>
          <ul className="grid grid-cols-2 gap-2">
            {popular.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/destinations/${c.slug}`}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-parchment"
                >
                  <FlagChip flag={c.flag} name={c.name} className="border-transparent bg-transparent px-0" size="sm" />
                  <span className="font-mono text-[0.7rem] text-coral-strong">
                    <Price usd={c.fromPrice} prefix="from " />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Regions */}
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">Regions</p>
          <ul className="space-y-1">
            {regions.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/regions/${r.id}`}
                  className="group flex items-center justify-between rounded-lg px-2 py-2 hover:bg-parchment"
                >
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <Pin className="size-3.5 text-teal" /> {r.name}
                  </span>
                  <span className="font-mono text-[0.7rem] text-ink-muted">{r.countryCount} countries</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured deal ticket */}
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">Featured deal</p>
          <Link
            href="/destinations/jp"
            className="group block overflow-hidden rounded-ticket border border-coral/40 bg-card shadow-ticket"
          >
            <div className="flex items-center justify-between p-4">
              <div>
                <span className="text-2xl" aria-hidden>🇯🇵</span>
                <h4 className="mt-1 font-display text-xl text-ink">Japan · 5G</h4>
                <p className="font-mono text-[0.68rem] text-ink-muted">35.68° N · 139.69° E</p>
              </div>
              <StampBadge ink="gold" rotate={6}>Bestseller</StampBadge>
            </div>
            <div className="ticket-perf mx-4" aria-hidden />
            <div className="flex items-center justify-between p-4">
              <span className="font-mono text-sm text-ink">
                3 GB · 30 days
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-coral-strong">
                <Price usd={7.5} /> <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

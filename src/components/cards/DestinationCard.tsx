import Link from "next/link";
import type { Country } from "@/lib/types";
import { Price } from "@/components/ui/Price";
import { StampBadge } from "@/components/ui/StampBadge";
import { Pin } from "@/components/ui/icons";

/** Compact destination tile for grids — flag, coords, from-price, stamps. */
export function DestinationCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/destinations/${country.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-card border border-hairline bg-card p-5 shadow-ticket transition-transform duration-200 ease-[var(--ease-atlas)] hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.06] transition-opacity group-hover:opacity-[0.12]" aria-hidden>
        <Pin className="size-24 text-coral" />
      </div>

      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl leading-none" aria-hidden>{country.flag}</span>
        {country.bestseller ? (
          <StampBadge ink="gold" rotate={5}>Bestseller</StampBadge>
        ) : country.popular ? (
          <StampBadge ink="teal" rotate={-4}>Popular</StampBadge>
        ) : null}
      </div>

      <div className="mt-4">
        <h3 className="font-display text-xl text-ink">{country.name}</h3>
        <p className="font-mono text-[0.68rem] text-ink-muted">
          {country.iso3} · {country.dialCode}
        </p>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <span className="text-xs text-ink-muted">
          from <Price usd={country.fromPrice} className="text-sm font-semibold text-coral-strong" />
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-widest text-teal">{country.speeds.join("/")}</span>
      </div>
    </Link>
  );
}

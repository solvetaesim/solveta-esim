import Link from "next/link";
import type { Country, Plan } from "@/lib/types";
import { formatData } from "@/lib/data/plans";
import { Price } from "@/components/ui/Price";
import { StampBadge } from "@/components/ui/StampBadge";
import { Pin, ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface BoardingPassProps {
  plan: Plan;
  country: Country;
  featured?: boolean;
}

/**
 * The flagship component — a plan styled as a refined boarding pass.
 * Top stub: destination + stamp. Perforated divider. Bottom stub: mono data
 * block, FROM YOU → DESTINATION route arc, and the coral "Get this plan" CTA.
 */
export function BoardingPass({ plan, country, featured }: BoardingPassProps) {
  const badgeInk = plan.badge === "UNLIMITED" ? "teal" : plan.badge === "NEW" ? "gold" : "coral";

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-ticket border bg-card shadow-ticket transition-transform duration-200 ease-[var(--ease-atlas)] hover:-translate-y-1",
        featured ? "border-coral/40" : "border-hairline",
      )}
    >
      {/* Top stub — destination */}
      <div className="flex items-start justify-between gap-3 p-5 pb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
            <Pin className="size-3 text-coral" />
            {country.iso3} · {country.dialCode}
          </div>
          <h3 className="mt-1 truncate font-display text-2xl leading-tight text-ink">
            <span aria-hidden className="mr-1.5">{country.flag}</span>
            {country.name}
          </h3>
          <p className="mt-0.5 font-mono text-[0.68rem] text-ink-muted/80">{country.coords}</p>
        </div>
        {plan.badge ? (
          <StampBadge ink={badgeInk} rotate={4} className="shrink-0">
            {plan.badge}
          </StampBadge>
        ) : null}
      </div>

      {/* Perforated divider */}
      <div className="ticket-perf mx-5" aria-hidden />

      {/* Bottom stub — data + CTA */}
      <div className="flex flex-1 flex-col p-5 pt-6">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
          <Field label="Data" value={formatData(plan)} strong />
          <Field label="Validity" value={`${plan.validityDays} days`} />
          <Field label="Network" value={`${plan.speed} · ${plan.network}`} />
          <div>
            <dt className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">Price</dt>
            <dd className="mt-0.5">
              <Price usd={plan.price} className="text-xl font-semibold text-ink" />
            </dd>
          </div>
        </dl>

        {/* Route arc — FROM YOU → DESTINATION */}
        <div className="mt-5 flex items-center gap-2 rounded-lg border border-dashed border-hairline bg-parchment/60 px-3 py-2">
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">You</span>
          <svg viewBox="0 0 80 20" className="h-4 flex-1 text-teal" fill="none" aria-hidden>
            <path d="M4 16 Q 40 -2 76 16" stroke="currentColor" strokeWidth="1.4" strokeDasharray="1 4" strokeLinecap="round" />
            <circle cx="4" cy="16" r="2.4" fill="currentColor" />
          </svg>
          <span className="flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-widest text-coral-strong">
            <Pin className="size-3" /> {country.iso3}
          </span>
        </div>

        <Link
          href={{ pathname: "/checkout", query: { plan: plan.id } }}
          className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-coral font-medium text-white shadow-soft transition-colors duration-200 hover:bg-coral-strong focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Get this plan
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
        <p className="mt-2 text-center text-xs text-ink-muted">
          Instant QR delivery · Works on {country.speeds.join("/")}
        </p>
      </div>
    </article>
  );
}

function Field({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">{label}</dt>
      <dd className={cn("mt-0.5 font-mono", strong ? "text-xl font-semibold text-ink" : "text-sm text-ink")}>
        {value}
      </dd>
    </div>
  );
}

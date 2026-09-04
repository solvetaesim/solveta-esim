import { COMPANY_REGISTERED } from "@/lib/site";

/**
 * Pre-launch disclosure band.
 *
 * The store is fully built but not trading: no company is registered behind it
 * yet, so every legal-entity field on the site is a placeholder. Anyone landing
 * here has to be told that before they read a price, so the band sits above the
 * header in normal flow — first thing on the page, on every page, at every
 * width. It scrolls away rather than sticking, because the disclosure only has
 * to be made on arrival, not to cost a strip of viewport for the whole visit.
 *
 * Amber, not coral: coral is the brand's action colour and a warning that looks
 * like a call to action is neither. It disappears on its own the moment
 * COMPANY_REGISTERED flips to true.
 */
export function DevNotice() {
  if (COMPANY_REGISTERED) return null;

  return (
    <div role="status" className="bg-notice text-notice-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-baseline gap-x-3 gap-y-1 px-5 py-2 sm:px-8">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest">
          In development
        </span>
        <p className="text-sm text-notice-ink/80">
          Orders are not live yet, and the company details shown here are placeholders.
        </p>
      </div>
    </div>
  );
}

/**
 * The policy library is drafted and complete, but a policy is a contract with a
 * named seller — and there is no named seller yet. Rather than hide the texts,
 * the pages carry this note so nobody mistakes a draft for terms in force.
 */
export function PolicyDraftNotice({ className }: { className?: string }) {
  if (COMPANY_REGISTERED) return null;

  return (
    <div
      role="note"
      className={`rounded-card border border-notice/60 bg-notice/15 px-5 py-4 ${className ?? ""}`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-ink">Draft — not yet in force</p>
      <p className="mt-2 text-pretty text-sm text-ink-muted">
        These policies are prepared but not live. The selling company is not registered yet, so
        every company name, number and address below is a placeholder. The final text, with the
        registered details filled in, will be published here before the store opens for orders.
      </p>
    </div>
  );
}

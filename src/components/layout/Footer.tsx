import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { site } from "@/lib/site";
import { regions } from "@/lib/data/regions";
import { popularCountries } from "@/lib/data/countries";
import { PaymentMarks } from "@/components/ui/PaymentMarks";

const columns = [
  {
    title: "Plans",
    links: [
      { label: "Regional plans", href: "/plans/regional" },
      { label: "Global plans", href: "/plans/global" },
      { label: "Unlimited data", href: "/plans/global" },
      { label: "All destinations", href: "/destinations" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help centre", href: "/help" },
      { label: "Installation guides", href: "/how-it-works" },
      { label: "Compatibility check", href: "/compatibility" },
      { label: "Refund policy", href: "/legal/refund-cancellation" },
      { label: "Contact us", href: "/help#contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/help#about" },
      { label: "Coverage map", href: "/coverage" },
      { label: "Compatibility", href: "/compatibility" },
      { label: "Contact us", href: "/help#contact" },
    ],
  },
];

export function Footer() {
  const topCountries = popularCountries().slice(0, 6);

  return (
    <footer className="mt-auto surface-navy bg-ink text-ink-inverse">
      {/* Top band */}
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-2 md:items-center">
        <div>
          <Logo className="[&_span:last-child]:text-ink-inverse [&>span:first-child]:bg-canvas" />
          <p className="mt-3 max-w-sm text-pretty text-ink-inverse/70">{site.tagline}. Travel data for the whole planet, delivered as a QR code in seconds.</p>
        </div>
        <div className="md:justify-self-end md:text-right">
          <p className="font-display text-xl">Fare drops & new destinations</p>
          <p className="mb-3 text-sm text-ink-inverse/60">Occasionally, never spam.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-hairline" />

      {/* Columns */}
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-4">
        <FooterCol title="Destinations">
          <ul className="space-y-2">
            {topCountries.map((c) => (
              <li key={c.slug}>
                <FooterLink href={`/destinations/${c.slug}`}>{c.flag} {c.name}</FooterLink>
              </li>
            ))}
            {regions.slice(0, 2).map((r) => (
              <li key={r.id}>
                <FooterLink href={`/regions/${r.id}`}>{r.name} plans</FooterLink>
              </li>
            ))}
          </ul>
        </FooterCol>
        {columns.map((col) => (
          <FooterCol key={col.title} title={col.title}>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterCol>
        ))}
      </div>

      {/* Trust row */}
      <div className="border-t border-hairline">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <PaymentMarks />
          <span className="inline-flex items-center gap-1 rounded border border-hairline px-2 py-1 font-mono text-[0.6rem] tracking-wide text-success">SSL SECURE</span>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-hairline">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-ink-inverse/60 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company} · Reg. no. {site.regNumber} · {site.address} · {site.supportEmail}. {site.name} is a trading name. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-4">
            <FooterLink href="/legal/privacy">Privacy</FooterLink>
            <FooterLink href="/legal/terms">Terms</FooterLink>
            <FooterLink href="/legal/cookies">Cookies</FooterLink>
            <FooterLink href="/legal/refund-cancellation">Refund Policy</FooterLink>
            <FooterLink href="/legal">All policies</FooterLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-inverse/50">{title}</h3>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-ink-inverse/80 transition-colors hover:text-coral">
      {children}
    </Link>
  );
}

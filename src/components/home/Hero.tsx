import Link from "next/link";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { AtlasMap } from "@/components/ui/AtlasMap";
import { FlagChip } from "@/components/ui/FlagChip";
import { Container } from "@/components/ui/Section";
import { Pin, Bolt, Check } from "@/components/ui/icons";
import { popularCountries } from "@/lib/data/countries";
import { site } from "@/lib/site";

const steps = [
  { n: "01", label: "Choose destination" },
  { n: "02", label: "Get QR instantly" },
  { n: "03", label: "Install & travel" },
];

export function Hero() {
  const chips = popularCountries().slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0 bg-contours opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />

      <Container className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-teal">
            <Pin className="size-3.5 text-coral" /> {site.homeCoords} · departures
          </p>

          <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
            The world, connected in one tap.
          </h1>

          <p className="mt-5 max-w-lg text-pretty text-lg text-ink-muted">
            Buy a travel eSIM for {site.countriesCovered} countries, get your QR code the second you pay, and land already online. No roaming bills, no plastic SIM.
          </p>

          <div className="mt-7 max-w-xl">
            <DestinationSearch size="lg" autoFocus={false} />
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Popular destinations">
              {chips.map((c) => (
                <li key={c.slug}>
                  <Link href={`/destinations/${c.slug}`}>
                    <FlagChip flag={c.flag} name={c.name} code={c.iso3} size="sm" className="transition-colors hover:border-coral" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust ribbon */}
          <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            <TrustItem icon={<Bolt className="size-3.5 text-coral" />}>Instant delivery</TrustItem>
            <TrustItem icon={<Check className="size-3.5 text-success" />}>No roaming fees</TrustItem>
            <TrustItem icon={<Check className="size-3.5 text-success" />}>eKYC-free where possible</TrustItem>
            <TrustItem icon={<span className="text-gold">★</span>}>24/7 support</TrustItem>
          </ul>
        </div>

        {/* Map + steps */}
        <div className="relative animate-fade-up" data-delay="2">
          <div className="relative rounded-ticket border border-hairline bg-card/70 p-4 shadow-ticket backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
              <span>Live coverage map</span>
              <span className="text-teal">190+ networks</span>
            </div>
            <AtlasMap />
          </div>

          <ol className="mt-4 grid grid-cols-3 gap-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-card border border-hairline bg-card p-3 text-center">
                <span className="font-mono text-xs text-coral-strong">{s.n}</span>
                <p className="mt-1 text-xs font-medium text-ink">{s.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function TrustItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      {icon}
      <span className="font-medium text-ink">{children}</span>
    </li>
  );
}

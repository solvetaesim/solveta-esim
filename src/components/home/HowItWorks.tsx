import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Search, QrGlyph, Bolt } from "@/components/ui/icons";

const steps = [
  {
    n: "01",
    icon: <Search className="size-6" />,
    title: "Choose your destination",
    body: "Search a country or region and pick the boarding-pass plan that matches your trip — data, days, done.",
  },
  {
    n: "02",
    icon: <QrGlyph className="size-6" />,
    title: "Get your QR instantly",
    body: "Pay in one page. Your eSIM QR code appears immediately and lands in your inbox — no waiting, no shipping.",
  },
  {
    n: "03",
    icon: <Bolt className="size-6" />,
    title: "Install & travel",
    body: "Scan the QR, follow the per-device steps, and step off the plane already connected. It takes about a minute.",
  },
];

export function HowItWorks() {
  return (
    <Section band="parchment" grid id="how">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">How it works</Eyebrow>
          <h2 className="mt-3 text-balance font-display text-4xl text-ink sm:text-5xl">
            Three steps from booking to boarding
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} as="li" delay={(i + 1) as 1 | 2 | 3}>
              <div className="relative h-full rounded-ticket border border-hairline bg-card p-7 shadow-ticket">
                <span className="absolute right-6 top-6 font-mono text-4xl text-coral/15">{s.n}</span>
                <span className="inline-grid size-12 place-items-center rounded-full bg-coral-tint text-coral-strong">
                  {s.icon}
                </span>
                <h3 className="mt-5 font-display text-2xl text-ink">{s.title}</h3>
                <p className="mt-2 text-pretty text-ink-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

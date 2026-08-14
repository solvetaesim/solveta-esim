import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StampBadge } from "@/components/ui/StampBadge";
import { site } from "@/lib/site";

const reviews = [
  { name: "Mara L.", trip: "Tokyo · JPN", text: "Scanned the QR at the gate in Lisbon and had 5G the moment we landed at Haneda. Genuinely one minute.", stamp: "Verified" },
  { name: "Daniel R.", trip: "Bangkok · THA", text: "Skipped the airport SIM kiosk entirely. The boarding-pass cards made picking the right amount of data obvious.", stamp: "Bestseller buyer" },
  { name: "Priya S.", trip: "New York · USA", text: "Kept my home number on dual-SIM and topped up from the app mid-trip. No bill shock this time.", stamp: "Repeat traveller" },
];

const stats = [
  { value: site.countriesCovered, label: "Countries covered" },
  { value: "£0", label: "Roaming fees" },
  { value: "24/7", label: "Human support" },
  { value: "60s", label: "Typical install time" },
];

export function Reviews() {
  return (
    <Section band="navy" grid>
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center text-coral">Trusted by travellers</Eyebrow>
          <h2 className="mt-3 text-balance font-display text-4xl text-ink-inverse sm:text-5xl">
            Loved from departure to landing
          </h2>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-card border border-hairline bg-card-raised/10 p-5 text-center">
              <dt className="font-mono text-3xl font-semibold text-coral">{s.value}</dt>
              <dd className="mt-1 text-sm text-ink-inverse/70">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i + 1) as 1 | 2 | 3}>
              <figure className="flex h-full flex-col rounded-ticket border border-hairline bg-card-raised/10 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-gold">★★★★★</span>
                  <StampBadge ink="teal" rotate={4}>{r.stamp}</StampBadge>
                </div>
                <blockquote className="mt-4 flex-1 text-pretty text-ink-inverse/90">“{r.text}”</blockquote>
                <figcaption className="mt-4 border-t border-hairline pt-3 text-sm">
                  <span className="font-medium text-ink-inverse">{r.name}</span>
                  <span className="ml-2 font-mono text-[0.7rem] text-ink-inverse/50">{r.trip}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

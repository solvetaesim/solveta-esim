import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Check } from "@/components/ui/icons";

const rows = [
  { label: "Cost for 3 GB abroad", us: "from $6.90", roaming: "$45+ in overage" },
  { label: "Delivery", us: "Instant QR", roaming: "Buy a local SIM on arrival" },
  { label: "Setup", us: "~1 minute", roaming: "Store queue + passport" },
  { label: "Keep your number", us: "Yes, dual-SIM", roaming: "Swap card, lose it" },
  { label: "Coverage", us: "190+ countries", roaming: "Per-country plans" },
  { label: "Top-ups", us: "In-app, anytime", roaming: "Back to the store" },
];

export function WhyUs() {
  return (
    <Section band="canvas" contours>
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow coords="us vs roaming">Why travellers switch</Eyebrow>
            <h2 className="mt-3 text-balance font-display text-4xl text-ink sm:text-5xl">
              Same journey. None of the roaming shock.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-ink-muted">
              A travel eSIM replaces the airport SIM queue and the bill-shock text with a QR code you scan before you leave home.
            </p>
          </div>

          <div className="overflow-hidden rounded-ticket border border-hairline bg-card shadow-ticket">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-hairline bg-parchment font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
              <span className="px-4 py-3">Feature</span>
              <span className="px-4 py-3 text-coral-strong">Solveta</span>
              <span className="px-4 py-3">Roaming</span>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className={`grid grid-cols-[1.4fr_1fr_1fr] items-center text-sm ${i % 2 ? "bg-card" : "bg-canvas/40"}`}
              >
                <span className="px-4 py-3 text-ink">{r.label}</span>
                <span className="flex items-center gap-1.5 px-4 py-3 font-medium text-ink">
                  <Check className="size-3.5 text-success" /> {r.us}
                </span>
                <span className="px-4 py-3 text-ink-muted">{r.roaming}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

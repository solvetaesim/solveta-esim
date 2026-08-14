import { Section, Container } from "@/components/ui/Section";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { Pin } from "@/components/ui/icons";

export function FinalCta() {
  return (
    <Section band="navy" contours>
      <Container className="py-20 text-center">
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coral">
          <Pin className="size-3.5" /> Your next trip starts here
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-4xl text-ink-inverse sm:text-6xl">
          Pick a destination. Be online before you land.
        </h2>
        <div className="mx-auto mt-8 max-w-xl">
          <DestinationSearch size="lg" placeholder="Where are you traveling?" />
        </div>
        <p className="mt-4 text-sm text-ink-inverse/60">Instant QR delivery · No roaming fees · 24/7 support</p>
      </Container>
    </Section>
  );
}

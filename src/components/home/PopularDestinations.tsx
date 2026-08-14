import Link from "next/link";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { popularCountries } from "@/lib/data/countries";
import { ArrowRight } from "@/components/ui/icons";

export function PopularDestinations() {
  const list = popularCountries().slice(0, 8);
  return (
    <Section band="canvas" contours>
      <Container className="py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow coords="most travelled">Popular destinations</Eyebrow>
            <h2 className="mt-3 max-w-xl text-balance font-display text-4xl text-ink sm:text-5xl">
              Where the atlas opens most often
            </h2>
          </div>
          <Link href="/destinations" className="inline-flex items-center gap-1.5 font-medium text-teal hover:text-teal-strong">
            All destinations <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <DestinationCard country={c} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/destinations" variant="outline" size="lg">
            Browse all {"190+"} destinations
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

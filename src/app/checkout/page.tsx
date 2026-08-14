import type { Metadata } from "next";
import { Section, Container } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { resolvePlanSummary, fallbackSummary } from "@/lib/data/summary";
import { Pin } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Secure checkout",
  description: "Complete your Solveta eSIM order. Guest checkout, instant QR delivery.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
};

export default async function CheckoutPage({ searchParams }: PageProps<"/checkout">) {
  const sp = await searchParams;
  const planId = typeof sp.plan === "string" ? sp.plan : undefined;
  const plan = resolvePlanSummary(planId) ?? fallbackSummary();

  return (
    <Section band="canvas" contours grid>
      <Container className="py-10 sm:py-14">
        <Breadcrumbs
          trail={[
            { name: "Home", path: "/" },
            { name: "Checkout", path: "/checkout" },
          ]}
        />
        <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal">
          <Pin className="size-3.5 text-coral" /> One-page checkout · instant delivery
        </div>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Almost there — one tap to takeoff</h1>
        <div className="mt-10">
          <CheckoutFlow plan={plan} />
        </div>
      </Container>
    </Section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import type { PlanSummary } from "@/lib/data/summary";
import type { OrderResult } from "@/lib/api/client";
import { placeOrder } from "@/app/checkout/actions";
import { Price } from "@/components/ui/Price";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { InstallSteps } from "@/components/how/InstallSteps";
import { QrCode } from "./QrCode";
import { Pin, Check, Bolt, ArrowRight } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Stage = "form" | "processing" | "done";

export function CheckoutFlow({ plan }: { plan: PlanSummary }) {
  const [stage, setStage] = useState<Stage>("form");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStage("processing");
    try {
      const result = await placeOrder(plan.id, email);
      setOrder(result);
      setStage("done");
    } catch {
      setError("Something went wrong placing your order. Please try again.");
      setStage("form");
    }
  }

  if (stage === "done" && order) {
    return <Delivery plan={plan} order={order} email={email} copied={copied} setCopied={setCopied} />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      {/* Form */}
      <form onSubmit={onSubmit} className="order-2 rounded-ticket border border-hairline bg-card p-6 shadow-ticket sm:p-8 lg:order-1">
        <h2 className="font-display text-2xl text-ink">Guest checkout</h2>
        <p className="mt-1 text-sm text-ink-muted">No account needed — your QR is delivered instantly and by email.</p>

        <fieldset className="mt-6 space-y-4" disabled={stage === "processing"}>
          <Field id="email" label="Email for delivery" hint="We send the QR code here.">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full rounded-lg border border-hairline bg-canvas px-4 text-ink placeholder:text-ink-muted focus:border-coral focus:outline-none"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Cardholder name">
              <input id="name" required placeholder="Alex Traveler" className="h-12 w-full rounded-lg border border-hairline bg-canvas px-4 text-ink placeholder:text-ink-muted focus:border-coral focus:outline-none" />
            </Field>
            <Field id="card" label="Card number">
              <input id="card" required inputMode="numeric" placeholder="4242 4242 4242 4242" className="h-12 w-full rounded-lg border border-hairline bg-canvas px-4 font-mono text-ink placeholder:text-ink-muted focus:border-coral focus:outline-none" />
            </Field>
            <Field id="exp" label="Expiry">
              <input id="exp" required placeholder="MM/YY" className="h-12 w-full rounded-lg border border-hairline bg-canvas px-4 font-mono text-ink placeholder:text-ink-muted focus:border-coral focus:outline-none" />
            </Field>
            <Field id="cvc" label="CVC">
              <input id="cvc" required inputMode="numeric" placeholder="123" className="h-12 w-full rounded-lg border border-hairline bg-canvas px-4 font-mono text-ink placeholder:text-ink-muted focus:border-coral focus:outline-none" />
            </Field>
          </div>
        </fieldset>

        {error ? <p className="mt-4 rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p> : null}

        <label htmlFor="terms" className="mt-6 flex items-start gap-2.5 text-sm text-ink-muted">
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-coral"
          />
          <span>
            I read and agree to the{" "}
            <Link href="/help#terms" className="text-coral underline-offset-2 hover:underline">terms and conditions</Link> and{" "}
            <Link href="/help#privacy" className="text-coral underline-offset-2 hover:underline">privacy policy</Link>.
          </span>
        </label>

        <button
          type="submit"
          disabled={stage === "processing" || !agreed}
          className="mt-4 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-coral text-base font-medium text-white shadow-soft transition-colors hover:bg-coral-strong disabled:cursor-not-allowed disabled:opacity-60"
        >
          {stage === "processing" ? (
            <>
              <span className="animate-pin-drop"><Pin className="size-5" /></span> Issuing your eSIM…
            </>
          ) : (
            <>
              Pay <Price usd={plan.price} /> & get QR <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-ink-muted">
          <li className="inline-flex items-center gap-1"><Check className="size-3.5 text-success" /> SSL secure</li>
          <li className="inline-flex items-center gap-1"><Bolt className="size-3.5 text-coral" /> Instant delivery</li>
          <li className="inline-flex items-center gap-1"><Check className="size-3.5 text-success" /> No hidden fees</li>
        </ul>

        <div className="mt-5 flex flex-col items-center gap-3 border-t border-hairline pt-5">
          <PaymentMarks />
          <p className="text-center text-[0.7rem] leading-relaxed text-ink-muted">
            Merchant of Record: {site.company} · Reg. no. {site.regNumber} · {site.address}.
          </p>
        </div>
      </form>

      {/* Order summary — boarding pass */}
      <OrderTicket plan={plan} className="order-1 lg:order-2" />
    </div>
  );
}

function OrderTicket({ plan, className }: { plan: PlanSummary; className?: string }) {
  return (
    <aside className={cn("rounded-ticket border border-coral/40 bg-card shadow-ticket", className)}>
      <div className="p-6">
        <div className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
          <Pin className="size-3 text-coral" /> Order summary
        </div>
        <h3 className="mt-1 font-display text-2xl text-ink">
          <span aria-hidden className="mr-1.5">{plan.flag}</span>{plan.title}
        </h3>
        <p className="font-mono text-[0.68rem] text-ink-muted">{plan.coords}</p>
      </div>
      <div className="ticket-perf mx-6" aria-hidden />
      <div className="p-6">
        <dl className="space-y-2 font-mono text-sm">
          <Line label="Data" value={plan.data} />
          <Line label="Validity" value={`${plan.days} days`} />
          <Line label="Network" value={`${plan.speed} · ${plan.network}`} />
        </dl>
        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
          <span className="text-sm text-ink-muted">Total due</span>
          <Price usd={plan.price} className="text-2xl font-semibold text-ink" />
        </div>
      </div>
    </aside>
  );
}

function Delivery({
  plan,
  order,
  email,
  copied,
  setCopied,
}: {
  plan: PlanSummary;
  order: OrderResult;
  email: string;
  copied: boolean;
  setCopied: (v: boolean) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <span className="inline-grid size-14 place-items-center rounded-full bg-success text-white animate-pin-drop">
          <Check className="size-7" />
        </span>
        <h2 className="mt-4 font-display text-4xl text-ink">Your eSIM is ready</h2>
        <p className="mt-2 text-ink-muted">
          Order <span className="font-mono text-ink">{order.orderId}</span> · a copy is on its way to{" "}
          <span className="font-medium text-ink">{email}</span>.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[auto_1fr] md:items-center rounded-ticket border border-coral/40 bg-card p-6 shadow-ticket sm:p-8">
        <div className="mx-auto animate-fade-up">
          <QrCode value={order.qrCode} />
        </div>
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">Scan to install</p>
          <h3 className="mt-1 font-display text-2xl text-ink">
            <span aria-hidden className="mr-1.5">{plan.flag}</span>{plan.title}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">{plan.data} · {plan.days} days · {plan.speed}</p>

          <div className="mt-4 space-y-1.5 rounded-lg bg-parchment p-4 font-mono text-xs text-ink">
            <p className="flex justify-between gap-2"><span className="text-ink-muted">SM-DP+</span><span>{order.smdpAddress}</span></p>
            <p className="flex flex-col gap-1">
              <span className="text-ink-muted">Activation code</span>
              <span className="break-all">{order.activationCode}</span>
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(order.activationCode);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-full border border-hairline bg-card px-4 text-sm font-medium text-ink hover:border-coral"
          >
            {copied ? <><Check className="size-4 text-success" /> Copied</> : "Copy activation code"}
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-ticket border border-hairline bg-card p-6 shadow-ticket sm:p-8">
        <h3 className="font-display text-2xl text-ink">Install in about a minute</h3>
        <p className="mb-5 mt-1 text-sm text-ink-muted">Pick your device below.</p>
        <InstallSteps />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/account?tab=esims" className="inline-flex h-12 items-center gap-2 rounded-full bg-coral px-6 font-medium text-white hover:bg-coral-strong">
          View in My eSIMs <ArrowRight className="size-4" />
        </Link>
        <Link href="/destinations" className="inline-flex h-12 items-center rounded-full border border-hairline bg-card px-6 font-medium text-ink hover:border-ink/30">
          Add another destination
        </Link>
      </div>
    </div>
  );
}

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-ink-muted">{hint}</span> : null}
    </label>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}

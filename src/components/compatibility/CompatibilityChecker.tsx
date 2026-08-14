"use client";

import { useState } from "react";
import { deviceBrands, modelsForBrand } from "@/lib/data/devices";
import { Check, Pin } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Customs-form styled device lookup: brand → model → verdict. */
export function CompatibilityChecker() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const models = brand ? modelsForBrand(brand) : [];
  const selected = models.find((m) => m.model === model);

  return (
    <div className="mx-auto max-w-xl rounded-ticket border-2 border-dashed border-hairline bg-card p-6 shadow-ticket sm:p-8">
      <div className="flex items-center justify-between border-b-2 border-dashed border-hairline pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">Form C-1 · Device declaration</p>
          <h2 className="mt-1 font-display text-2xl text-ink">Compatibility check</h2>
        </div>
        <Pin className="size-8 text-coral" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Brand">
          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setModel("");
            }}
            className="h-11 w-full rounded-lg border border-hairline bg-canvas px-3 text-ink focus:border-coral focus:outline-none"
          >
            <option value="">Select brand…</option>
            {deviceBrands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>

        <Field label="Model">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!brand}
            className="h-11 w-full rounded-lg border border-hairline bg-canvas px-3 text-ink focus:border-coral focus:outline-none disabled:opacity-50"
          >
            <option value="">{brand ? "Select model…" : "Pick a brand first"}</option>
            {models.map((m) => (
              <option key={m.model} value={m.model}>{m.model}</option>
            ))}
          </select>
        </Field>
      </div>

      {selected ? (
        <div
          className={cn(
            "mt-6 rounded-lg border-2 p-5",
            selected.esimSupported ? "border-success/40 bg-success/10" : "border-danger/40 bg-danger/10",
          )}
          role="status"
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-full",
                selected.esimSupported ? "bg-success text-white" : "bg-danger text-white",
              )}
            >
              {selected.esimSupported ? <Check className="size-5" /> : "✕"}
            </span>
            <div>
              <p className="font-display text-xl text-ink">
                {selected.esimSupported ? "Compatible — you're good to go" : "Not eSIM-compatible"}
              </p>
              <p className="text-sm text-ink-muted">
                {selected.brand} {selected.model}
                {selected.note ? ` · ${selected.note}` : ""}
              </p>
            </div>
          </div>
          {selected.esimSupported ? (
            <p className="mt-3 text-sm text-ink-muted">
              Also make sure your phone is carrier-unlocked. Then pick a destination and you&apos;ll be online in about a minute.
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-6 rounded-lg bg-parchment p-4 text-sm text-ink-muted">
          Select your brand and model to see an instant verdict. We check {`${deviceBrands.length}`} brands and dozens of models.
        </p>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-ink-muted">{label}</span>
      {children}
    </label>
  );
}

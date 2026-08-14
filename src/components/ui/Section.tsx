import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  band?: "canvas" | "parchment" | "navy";
  contours?: boolean;
  grid?: boolean;
  id?: string;
}

const bands = {
  canvas: "bg-canvas text-ink",
  parchment: "bg-parchment text-ink",
  navy: "surface-navy bg-ink text-ink-inverse",
};

export function Section({ children, className, band = "canvas", contours, grid, id }: SectionProps) {
  return (
    <section id={id} className={cn("relative overflow-hidden", bands[band], className)}>
      {contours ? <div className="pointer-events-none absolute inset-0 bg-contours opacity-70" aria-hidden /> : null}
      {grid ? <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden /> : null}
      <div className="relative">{children}</div>
    </section>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

interface EyebrowProps {
  children: React.ReactNode;
  coords?: string;
  className?: string;
}

/** Mono section label with an optional coordinate caption — instrument-data feel. */
export function Eyebrow({ children, coords, className }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-coral-strong", className)}>
      <span className="h-px w-8 bg-coral/50" aria-hidden />
      <span>{children}</span>
      {coords ? <span className="text-ink-muted/70">· {coords}</span> : null}
    </div>
  );
}

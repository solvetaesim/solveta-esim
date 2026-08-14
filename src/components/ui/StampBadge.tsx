import { cn } from "@/lib/utils";

type Ink = "coral" | "teal" | "gold";

const inks: Record<Ink, string> = {
  coral: "text-coral-strong border-coral/50",
  teal: "text-teal border-teal/50",
  gold: "text-gold border-gold/60",
};

interface StampBadgeProps {
  children: React.ReactNode;
  ink?: Ink;
  rotate?: number;
  className?: string;
}

/** Passport-stamp style badge — irregular, slightly rotated. */
export function StampBadge({ children, ink = "coral", rotate = -3, className }: StampBadgeProps) {
  return (
    <span
      style={{ rotate: `${rotate}deg` }}
      className={cn(
        "inline-flex items-center gap-1 rounded-[4px] border-2 border-dashed px-2 py-0.5",
        "font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em]",
        "bg-card/60 backdrop-blur-[1px]",
        inks[ink],
        className,
      )}
    >
      {children}
    </span>
  );
}

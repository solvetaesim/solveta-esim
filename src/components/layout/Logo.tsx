import Link from "next/link";
import { Pin } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2", className)}
      aria-label={`${site.name} home`}
    >
      <span className="relative grid size-9 place-items-center rounded-full bg-ink text-coral">
        <Pin className="size-5 transition-transform duration-300 ease-[var(--ease-atlas)] group-hover:-translate-y-0.5" />
      </span>
      <span className="font-display text-2xl font-semibold tracking-tight text-ink">{site.name}</span>
    </Link>
  );
}

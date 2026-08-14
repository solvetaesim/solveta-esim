"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** 1–6, staggers the animation delay */
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: "div" | "li" | "article" | "section";
}

/** Fades content up when it scrolls into view. No-ops under reduced-motion. */
export function Reveal({ children, className, delay, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      data-delay={delay}
      className={cn(shown ? "animate-fade-up" : "opacity-0", className)}
    >
      {children}
    </Tag>
  );
}

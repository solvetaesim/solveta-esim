"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AtlasMapProps {
  className?: string;
}

const PINS = [
  { x: 300, y: 150, label: "Tokyo" },
  { x: 120, y: 140, label: "New York" },
  { x: 200, y: 120, label: "London" },
  { x: 255, y: 190, label: "Bangkok" },
  { x: 215, y: 165, label: "Dubai" },
  { x: 335, y: 235, label: "Sydney" },
];

const ARCS: Array<[number, number]> = [
  [1, 2],
  [2, 4],
  [4, 0],
  [0, 3],
  [3, 5],
];

/**
 * Stylised graticule "atlas" with glowing pins and route arcs that draw in.
 * Purely decorative; hidden from assistive tech. Honors reduced-motion via CSS.
 */
export function AtlasMap({ className }: AtlasMapProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = ref.current?.querySelectorAll<SVGPathElement>("[data-arc]");
    paths?.forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.setProperty("--arc-len", String(len));
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
      p.style.animationDelay = `${0.3 + i * 0.28}s`;
      p.classList.add("animate-draw-arc");
    });
  }, []);

  function arc(a: number, b: number): string {
    const p1 = PINS[a];
    const p2 = PINS[b];
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2 - Math.abs(p2.x - p1.x) * 0.35 - 20;
    return `M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`;
  }

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 300"
      className={cn("h-auto w-full", className)}
      aria-hidden
      fill="none"
    >
      {/* graticule */}
      <g stroke="var(--grid)" strokeWidth="0.6" opacity="0.9">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={`lat${i}`} d={`M 20 ${40 + i * 28} Q 210 ${28 + i * 28} 400 ${40 + i * 28}`} />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <path key={`lon${i}`} d={`M ${40 + i * 34} 30 Q ${40 + i * 34 + (i - 5) * 6} 150 ${40 + i * 34} 272`} />
        ))}
      </g>

      {/* abstract landmasses as dotted contour blobs */}
      <g fill="var(--contour)" opacity="0.55">
        {LAND.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* route arcs */}
      <g stroke="var(--route)" strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
        {ARCS.map(([a, b], i) => (
          <path key={i} data-arc d={arc(a, b)} strokeDasharray="1 5" />
        ))}
      </g>

      {/* pins */}
      <g>
        {PINS.map((p, i) => (
          <g key={p.label} transform={`translate(${p.x} ${p.y})`}>
            <circle r="9" fill="var(--coral)" opacity="0.16">
              <animate attributeName="r" values="7;12;7" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <circle r="3.4" fill="var(--coral)" />
            <circle r="1.3" fill="var(--card)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

// Rough decorative continent silhouettes (not geographically exact).
const LAND = [
  "M70 110 q30 -22 70 -10 q30 12 20 40 q-14 34 -60 30 q-44 -4 -40 -34 q2 -18 10 -26 Z",
  "M120 190 q18 -10 30 6 q14 22 -6 44 q-18 20 -30 -2 q-12 -30 6 -48 Z",
  "M195 95 q26 -14 44 4 q10 14 -2 26 q-20 16 -42 6 q-16 -22 0 -36 Z",
  "M215 150 q40 -12 70 8 q26 20 6 48 q-30 30 -74 14 q-26 -40 -2 -70 Z",
  "M300 210 q26 -8 40 8 q12 18 -8 32 q-24 14 -38 -6 q-10 -22 6 -34 Z",
];

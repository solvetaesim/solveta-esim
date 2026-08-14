import visa from "@/assets/visa.svg";
import mastercard from "@/assets/mastercard.svg";
import pciDss from "@/assets/pci-dss.svg";
import { cn } from "@/lib/utils";

const marks = [
  { src: visa, alt: "Visa" },
  { src: mastercard, alt: "Mastercard" },
  { src: pciDss, alt: "PCI DSS compliant" },
];

export function PaymentMarks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {marks.map((m) => (
        <li key={m.alt} className="grid h-7 place-items-center rounded bg-white px-1 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.src.src} alt={m.alt} className="h-5 w-auto" />
        </li>
      ))}
    </ul>
  );
}

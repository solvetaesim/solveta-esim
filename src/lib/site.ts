import { countries } from "@/lib/data/countries";

/** Rounded-down "N+" label derived from the live catalogue so marketing copy
 *  never overstates the number of destinations actually on sale. */
const countriesCovered = `${Math.floor(countries.length / 10) * 10}+`;

/** Legal entity.
 *
 *  No company is registered yet, so the site ships placeholders rather than a
 *  name it is not entitled to trade under. The placeholders are deliberate and
 *  visible: they appear in the footer, on the policy pages, in the checkout's
 *  merchant line and on generated invoices, alongside the development notice
 *  in the header.
 *
 *  To go live: register the entity, set NEXT_PUBLIC_COMPANY_NAME / _NUMBER /
 *  _ADDRESS (locally in .env.local, on the host in its env settings), then set
 *  COMPANY_REGISTERED to true. That one flag also removes the development
 *  banner and the draft notice from the policy pages. Until it is true the env
 *  values are ignored on purpose, so a stale host variable cannot put an
 *  unregistered company name back on a public page.
 *
 *  NEXT_PUBLIC_ prefix is required because site is imported by client
 *  components (Header, checkout, footer). */
export const COMPANY_REGISTERED = false;

const registered = (value: string | undefined, placeholder: string) =>
  COMPANY_REGISTERED && value ? value : placeholder;

const company = registered(process.env.NEXT_PUBLIC_COMPANY_NAME, "COMPANY NAME");
const regNumber = registered(process.env.NEXT_PUBLIC_COMPANY_NUMBER, "COMPANY NUMBER");
const address = registered(process.env.NEXT_PUBLIC_COMPANY_ADDRESS, "COMPANY ADDRESS");
const supportEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "info@solvetaesim.com";

export const site = {
  name: "Solveta",
  company,
  regNumber,
  address,
  tagline: "Connectivity for the curious",
  description: `Solveta sells travel eSIMs for ${countriesCovered} countries. Choose your destination, get a QR code instantly, install in one minute — no roaming fees, no physical SIM.`,
  url: "https://solvetaesim.com",
  homeCity: "London",
  homeCoords: "51.5072° N · 0.1276° W",
  supportEmail,
  countriesCovered,
} as const;

export const nav = {
  primary: [
    { label: "Destinations", href: "/destinations", mega: true },
    { label: "Regional plans", href: "/plans/regional" },
    { label: "Global plans", href: "/plans/global" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Compatibility", href: "/compatibility" },
    { label: "Help", href: "/help" },
  ],
} as const;

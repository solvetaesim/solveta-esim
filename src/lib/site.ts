import { countries } from "@/lib/data/countries";

/** Rounded-down "N+" label derived from the live catalogue so marketing copy
 *  never overstates the number of destinations actually on sale. */
const countriesCovered = `${Math.floor(countries.length / 10) * 10}+`;

export const site = {
  name: "Solveta",
  company: "SOLVETA LTD",
  regNumber: "17349586",
  address: "Dept 6953, 196 High Road, Wood Green, London, United Kingdom, N22 8HH",
  tagline: "Connectivity for the curious",
  description: `Solveta sells travel eSIMs for ${countriesCovered} countries. Choose your destination, get a QR code instantly, install in one minute — no roaming fees, no physical SIM.`,
  url: "https://solvetaesim.com",
  homeCity: "London",
  homeCoords: "51.5072° N · 0.1276° W",
  supportEmail: "info@solvetaesim.com",
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

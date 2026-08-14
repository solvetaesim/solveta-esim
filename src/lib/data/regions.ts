import type { Region } from "@/lib/types";

export const regions: Region[] = [
  {
    id: "europe",
    name: "Europe",
    blurb: "One eSIM across the Schengen area and beyond.",
    countryCount: 39,
    fromPrice: 4.5,
    coords: "48.85° N · 2.35° E",
  },
  {
    id: "asia",
    name: "Asia",
    blurb: "Tokyo to Bangkok on a single plan.",
    countryCount: 21,
    fromPrice: 4.0,
    coords: "35.68° N · 139.69° E",
  },
  {
    id: "americas",
    name: "Americas",
    blurb: "North, Central & South — coast to coast.",
    countryCount: 18,
    fromPrice: 4.9,
    coords: "40.71° N · 74.00° W",
  },
  {
    id: "middle-east",
    name: "Middle East",
    blurb: "Stay connected across the Gulf.",
    countryCount: 12,
    fromPrice: 5.5,
    coords: "25.20° N · 55.27° E",
  },
  {
    id: "africa",
    name: "Africa",
    blurb: "Safari-ready coverage on the continent.",
    countryCount: 15,
    fromPrice: 6.0,
    coords: "30.04° N · 31.24° E",
  },
  {
    id: "oceania",
    name: "Oceania",
    blurb: "Australia, New Zealand & the islands.",
    countryCount: 9,
    fromPrice: 5.0,
    coords: "33.87° S · 151.21° E",
  },
];

export function getRegion(id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}

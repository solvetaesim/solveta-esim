import type { Country } from "@/lib/types";

export const countries: Country[] = [
  { slug: "jp", name: "Japan", iso3: "JPN", dialCode: "+81", flag: "🇯🇵", region: "asia", coords: "35.6762° N · 139.6503° E", networks: ["NTT Docomo", "SoftBank"], speeds: ["4G", "5G"], popular: true, bestseller: true, fromPrice: 4.5 },
  { slug: "us", name: "United States", iso3: "USA", dialCode: "+1", flag: "🇺🇸", region: "americas", coords: "40.7128° N · 74.0060° W", networks: ["T-Mobile", "AT&T"], speeds: ["4G", "5G"], popular: true, bestseller: true, fromPrice: 4.9 },
  { slug: "tr", name: "Turkey", iso3: "TUR", dialCode: "+90", flag: "🇹🇷", region: "middle-east", coords: "39.9334° N · 32.8597° E", networks: ["Turkcell", "Vodafone"], speeds: ["4G", "5G"], popular: true, fromPrice: 5.5 },
  { slug: "th", name: "Thailand", iso3: "THA", dialCode: "+66", flag: "🇹🇭", region: "asia", coords: "13.7563° N · 100.5018° E", networks: ["AIS", "TrueMove"], speeds: ["4G", "5G"], popular: true, bestseller: true, fromPrice: 4.0 },
  { slug: "ae", name: "United Arab Emirates", iso3: "ARE", dialCode: "+971", flag: "🇦🇪", region: "middle-east", coords: "25.2048° N · 55.2708° E", networks: ["Etisalat", "du"], speeds: ["4G", "5G"], popular: true, fromPrice: 6.5 },
  { slug: "fr", name: "France", iso3: "FRA", dialCode: "+33", flag: "🇫🇷", region: "europe", coords: "48.8566° N · 2.3522° E", networks: ["Orange", "SFR"], speeds: ["4G", "5G"], popular: true, fromPrice: 4.5 },
  { slug: "it", name: "Italy", iso3: "ITA", dialCode: "+39", flag: "🇮🇹", region: "europe", coords: "41.9028° N · 12.4964° E", networks: ["TIM", "Vodafone"], speeds: ["4G", "5G"], popular: true, fromPrice: 4.5 },
  { slug: "es", name: "Spain", iso3: "ESP", dialCode: "+34", flag: "🇪🇸", region: "europe", coords: "40.4168° N · 3.7038° W", networks: ["Movistar", "Orange"], speeds: ["4G", "5G"], popular: true, fromPrice: 4.5 },
  { slug: "gb", name: "United Kingdom", iso3: "GBR", dialCode: "+44", flag: "🇬🇧", region: "europe", coords: "51.5072° N · 0.1276° W", networks: ["EE", "Vodafone"], speeds: ["4G", "5G"], popular: true, fromPrice: 4.7 },
  { slug: "de", name: "Germany", iso3: "DEU", dialCode: "+49", flag: "🇩🇪", region: "europe", coords: "52.5200° N · 13.4050° E", networks: ["Telekom", "Vodafone"], speeds: ["4G", "5G"], fromPrice: 4.6 },
  { slug: "gr", name: "Greece", iso3: "GRC", dialCode: "+30", flag: "🇬🇷", region: "europe", coords: "37.9838° N · 23.7275° E", networks: ["Cosmote", "Vodafone"], speeds: ["4G", "5G"], fromPrice: 4.8 },
  { slug: "pt", name: "Portugal", iso3: "PRT", dialCode: "+351", flag: "🇵🇹", region: "europe", coords: "38.7223° N · 9.1393° W", networks: ["MEO", "NOS"], speeds: ["4G", "5G"], fromPrice: 4.6 },
  { slug: "kr", name: "South Korea", iso3: "KOR", dialCode: "+82", flag: "🇰🇷", region: "asia", coords: "37.5665° N · 126.9780° E", networks: ["SKT", "KT"], speeds: ["4G", "5G"], popular: true, fromPrice: 4.9 },
  { slug: "sg", name: "Singapore", iso3: "SGP", dialCode: "+65", flag: "🇸🇬", region: "asia", coords: "1.3521° N · 103.8198° E", networks: ["Singtel", "StarHub"], speeds: ["4G", "5G"], fromPrice: 4.7 },
  { slug: "id", name: "Indonesia", iso3: "IDN", dialCode: "+62", flag: "🇮🇩", region: "asia", coords: "6.2088° S · 106.8456° E", networks: ["Telkomsel", "XL"], speeds: ["4G", "5G"], bestseller: true, fromPrice: 4.2 },
  { slug: "vn", name: "Vietnam", iso3: "VNM", dialCode: "+84", flag: "🇻🇳", region: "asia", coords: "21.0278° N · 105.8342° E", networks: ["Viettel", "Vinaphone"], speeds: ["4G", "5G"], fromPrice: 4.3 },
  { slug: "in", name: "India", iso3: "IND", dialCode: "+91", flag: "🇮🇳", region: "asia", coords: "28.6139° N · 77.2090° E", networks: ["Jio", "Airtel"], speeds: ["4G", "5G"], fromPrice: 4.4 },
  { slug: "mx", name: "Mexico", iso3: "MEX", dialCode: "+52", flag: "🇲🇽", region: "americas", coords: "19.4326° N · 99.1332° W", networks: ["Telcel", "AT&T"], speeds: ["4G", "5G"], popular: true, fromPrice: 5.2 },
  { slug: "br", name: "Brazil", iso3: "BRA", dialCode: "+55", flag: "🇧🇷", region: "americas", coords: "15.7939° S · 47.8828° W", networks: ["Vivo", "Claro"], speeds: ["4G", "5G"], fromPrice: 5.4 },
  { slug: "ca", name: "Canada", iso3: "CAN", dialCode: "+1", flag: "🇨🇦", region: "americas", coords: "45.4215° N · 75.6972° W", networks: ["Rogers", "Bell"], speeds: ["4G", "5G"], fromPrice: 5.0 },
  { slug: "ar", name: "Argentina", iso3: "ARG", dialCode: "+54", flag: "🇦🇷", region: "americas", coords: "34.6037° S · 58.3816° W", networks: ["Claro", "Movistar"], speeds: ["4G", "5G"], fromPrice: 5.6 },
  { slug: "eg", name: "Egypt", iso3: "EGY", dialCode: "+20", flag: "🇪🇬", region: "africa", coords: "30.0444° N · 31.2357° E", networks: ["Vodafone", "Orange"], speeds: ["4G"], fromPrice: 6.0 },
  { slug: "za", name: "South Africa", iso3: "ZAF", dialCode: "+27", flag: "🇿🇦", region: "africa", coords: "33.9249° S · 18.4241° E", networks: ["MTN", "Vodacom"], speeds: ["4G", "5G"], fromPrice: 6.2 },
  { slug: "ma", name: "Morocco", iso3: "MAR", dialCode: "+212", flag: "🇲🇦", region: "africa", coords: "33.5731° N · 7.5898° W", networks: ["Maroc Telecom", "Orange"], speeds: ["4G"], fromPrice: 6.4 },
  { slug: "au", name: "Australia", iso3: "AUS", dialCode: "+61", flag: "🇦🇺", region: "oceania", coords: "33.8688° S · 151.2093° E", networks: ["Telstra", "Optus"], speeds: ["4G", "5G"], popular: true, fromPrice: 5.0 },
  { slug: "nz", name: "New Zealand", iso3: "NZL", dialCode: "+64", flag: "🇳🇿", region: "oceania", coords: "41.2865° S · 174.7762° E", networks: ["Spark", "One NZ"], speeds: ["4G", "5G"], fromPrice: 5.3 },
  { slug: "sa", name: "Saudi Arabia", iso3: "SAU", dialCode: "+966", flag: "🇸🇦", region: "middle-east", coords: "24.7136° N · 46.6753° E", networks: ["STC", "Mobily"], speeds: ["4G", "5G"], fromPrice: 6.0 },
  { slug: "il", name: "Israel", iso3: "ISR", dialCode: "+972", flag: "🇮🇱", region: "middle-east", coords: "31.7683° N · 35.2137° E", networks: ["Partner", "Cellcom"], speeds: ["4G", "5G"], fromPrice: 5.8 },
];

const bySlug = new Map(countries.map((c) => [c.slug, c]));

export function getCountry(slug: string): Country | undefined {
  return bySlug.get(slug);
}

export function popularCountries(): Country[] {
  return countries.filter((c) => c.popular);
}

export function countriesByRegion(region: string): Country[] {
  return countries.filter((c) => c.region === region);
}

export function searchCountries(query: string, limit = 6): Country[] {
  const q = query.trim().toLowerCase();
  if (!q) return popularCountries().slice(0, limit);
  return countries
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso3.toLowerCase().includes(q) ||
        c.slug.includes(q),
    )
    .slice(0, limit);
}

import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PreferencesProvider } from "@/components/providers/Preferences";
import { DevNotice } from "@/components/layout/DevNotice";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { getCurrentUser } from "@/lib/auth/dal";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Travel eSIMs for ${site.countriesCovered} countries`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["eSIM", "travel eSIM", "international data", "roaming", "QR eSIM"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — The world, connected in one tap`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

// Set the theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(()=>{try{const t=localStorage.getItem('solveta:theme');const d=t?t==='dark':matchMedia('(prefers-color-scheme:dark)').matches;const e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(_){}})();`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  const account = user
    ? { firstName: user.firstName, balanceCents: user.balanceCents }
    : null;
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <PreferencesProvider>
          <DevNotice />
          <Header account={account} />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </PreferencesProvider>
      </body>
    </html>
  );
}

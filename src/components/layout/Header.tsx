"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopStrip } from "./TopStrip";
import { Logo } from "./Logo";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { MegaNav } from "./MegaNav";
import { MobileDrawer } from "./MobileDrawer";
import { AccountButton } from "./AccountButton";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Cart, Heart, ChevronDown } from "@/components/ui/icons";

export interface AccountSummary {
  firstName: string;
  balanceCents: number;
}

export function Header({ account }: { account: AccountSummary | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden md:block">
        <TopStrip />
      </div>

      <div className={cn("border-b border-hairline bg-canvas/95 backdrop-blur transition-shadow", scrolled && "shadow-soft")}>
        {/* Main bar */}
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
          <div className={cn("flex items-center transition-all duration-200", scrolled ? "py-2.5" : "py-3.5")}>
            <Logo href={account ? "/account" : "/"} />
          </div>

          <div className="hidden flex-1 justify-center lg:flex">
            <DestinationSearch className="w-full max-w-md" />
          </div>

          <div className="ml-auto flex items-center gap-1">
            {account ? (
              <Link
                href="/account?tab=wallet"
                className="mr-1 hidden items-center gap-1.5 rounded-full border border-hairline bg-card px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-ink/30 sm:inline-flex"
                title="Wallet balance"
              >
                <span className="text-ink-muted">Balance</span>
                <span className="font-semibold">${(account.balanceCents / 100).toFixed(2)}</span>
              </Link>
            ) : null}
            <AccountButton account={account} />
            <IconLink href="/account?tab=saved" label="Saved destinations" icon={<Heart className="size-5" />} count={2} />
            <IconLink href="/account?tab=esims" label="My eSIMs & cart" icon={<Cart className="size-5" />} count={1} />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="ml-1 grid size-10 place-items-center rounded-full hover:bg-parchment lg:hidden"
            >
              <span className="space-y-1" aria-hidden>
                <span className="block h-0.5 w-5 bg-ink" />
                <span className="block h-0.5 w-5 bg-ink" />
                <span className="block h-0.5 w-3.5 bg-ink" />
              </span>
            </button>
          </div>
        </div>

        {/* Nav row */}
        <nav aria-label="Primary" className="mx-auto hidden w-full max-w-7xl items-center gap-1 px-5 pb-2 sm:px-8 lg:flex">
          {nav.primary.map((item) =>
            "mega" in item && item.mega ? (
              <button
                key={item.href}
                onClick={() => setMegaOpen((o) => !o)}
                onMouseEnter={() => setMegaOpen(true)}
                aria-expanded={megaOpen}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-parchment",
                  megaOpen && "bg-parchment",
                )}
              >
                {item.label}
                <ChevronDown className={cn("size-4 transition-transform", megaOpen && "rotate-180")} />
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-parchment",
                  pathname === item.href ? "text-coral-strong" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {megaOpen ? <MegaNav onClose={() => setMegaOpen(false)} /> : null}
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

function IconLink({ href, label, icon, count }: { href: string; label: string; icon: React.ReactNode; count?: number }) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="relative grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-parchment"
    >
      {icon}
      {count ? (
        <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-coral font-mono text-[0.55rem] font-bold text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}

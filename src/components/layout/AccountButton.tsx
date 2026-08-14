import Link from "next/link";
import { User } from "@/components/ui/icons";
import type { AccountSummary } from "./Header";

export function AccountButton({ account }: { account: AccountSummary | null }) {
  return (
    <Link
      href={account ? "/account" : "/login"}
      aria-label={account ? "Account" : "Sign in"}
      title={account ? "Account" : "Sign in"}
      className="relative grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-parchment"
    >
      <User className="size-5" />
    </Link>
  );
}

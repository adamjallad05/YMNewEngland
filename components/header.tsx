import Link from "next/link";
import { CalendarRange, Shield } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/90 backdrop-blur">
      <div className="shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/20 text-glow">
            <CalendarRange className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-fog">Young Muslims</p>
            <h1 className="text-base font-semibold text-white sm:text-lg">YM MA/RI Calendar</h1>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link href="/regions/all-regions" className="button-secondary hidden sm:inline-flex">
            Browse Events
          </Link>
          <Link href="/login" className="button-primary">
            <Shield className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

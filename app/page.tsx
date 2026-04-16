import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FeaturedSections } from "@/components/featured-sections";
import { RegionSelector } from "@/components/region-selector";
import { getUpcomingPublishedEvents } from "@/lib/data/events";

export default async function HomePage() {
  const events = await getUpcomingPublishedEvents();

  return (
    <div className="shell space-y-12 py-10 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-glow/40 bg-glow/10 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-glow">
            Massachusetts + Rhode Island
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            YM MA/RI Calendar
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-fog sm:text-lg">
            A shared regional event calendar for Young Muslims programming across Massachusetts and Rhode Island,
            built for members to discover upcoming gatherings and for local leaders to manage events long-term.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/regions/all-regions" className="button-primary">
              View All Regions
            </Link>
            <Link href="/login" className="button-secondary">
              Leader Login
            </Link>
          </div>
        </div>

        <div className="panel p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Monthly + weekly calendar",
              "List view with filters",
              "Today and this week highlights",
              "Secure admin dashboard",
              "Draft and published events",
              "Multi-region assignments"
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-line bg-navy-2/60 p-4 text-sm text-snow">
                {item}
              </div>
            ))}
          </div>
          <Link href="/regions/all-regions" className="mt-6 inline-flex items-center text-sm text-glow">
            Open live calendar experience <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <FeaturedSections events={events} />

      <section className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-fog">Select a Region</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Browse programming by community</h2>
          <p className="mt-2 max-w-2xl text-sm text-fog">
            Jump into a specific YM chapter or view all programming combined in one calendar.
          </p>
        </div>
        <RegionSelector activeRegion="all-regions" />
      </section>
    </div>
  );
}

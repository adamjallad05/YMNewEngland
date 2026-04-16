import { notFound } from "next/navigation";

import { CalendarShell } from "@/components/calendar-shell";
import { RegionSelector } from "@/components/region-selector";
import { getPublishedEvents } from "@/lib/data/events";
import { getRegionBySlug } from "@/lib/utils";
import type { RegionSlug } from "@/lib/types";

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const regionMeta = getRegionBySlug(region);

  if (!regionMeta) {
    notFound();
  }

  const events = await getPublishedEvents();

  return (
    <div className="shell space-y-8 py-10">
      <section className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-fog">Regional Navigation</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{regionMeta.name}</h1>
          <p className="mt-2 text-sm text-fog">
            Calendar and list browsing for upcoming YM programming, with mobile-friendly filtering and future navigation.
          </p>
        </div>
        <RegionSelector activeRegion={region as RegionSlug} />
      </section>

      <CalendarShell events={events} regionSlug={region as RegionSlug} regionTitle={regionMeta.name} />
    </div>
  );
}

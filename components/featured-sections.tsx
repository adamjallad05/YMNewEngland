import Link from "next/link";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";

import { formatDateRange } from "@/lib/date";
import type { EventRecord } from "@/lib/types";

function firstEvent(events: EventRecord[]) {
  return events[0] ?? null;
}

export function FeaturedSections({ events }: { events: EventRecord[] }) {
  const today = new Date().toDateString();
  const weekEnd = new Date();
  weekEnd.setDate(weekEnd.getDate() + 7);

  const featured = firstEvent(events);
  const todaysEvents = events.filter((event) => new Date(event.start_datetime).toDateString() === today);
  const thisWeek = events.filter((event) => {
    const date = new Date(event.start_datetime);
    return date >= new Date() && date <= weekEnd;
  });

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="panel overflow-hidden">
        <div className="border-b border-line/70 bg-gradient-to-br from-brand/25 via-navy to-navy-2 p-6">
          <div className="mb-3 inline-flex rounded-full border border-glow/50 bg-glow/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-glow">
            Featured Event
          </div>
          {featured ? (
            <>
              <h2 className="max-w-2xl text-2xl font-semibold text-white sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 max-w-2xl text-sm text-snow/80">{featured.description}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-fog">
                <span>{formatDateRange(featured.start_datetime, featured.end_datetime)}</span>
                <span>{featured.region}</span>
                <span>{featured.venue_name}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/events/${featured.slug}`} className="button-primary">
                  View Details
                </Link>
                <Link href="/regions/all-regions" className="button-secondary">
                  Full Calendar
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-white">Regional programming in one place</h2>
              <p className="mt-3 max-w-2xl text-sm text-fog">
                Once you connect Supabase and seed events, featured programming will automatically surface here.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="panel p-5">
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-glow" />
            <h3 className="font-semibold text-white">Today&apos;s Events</h3>
          </div>
          <p className="text-3xl font-semibold text-white">{todaysEvents.length}</p>
          <p className="mt-2 text-sm text-fog">
            {todaysEvents.length ? "Gatherings happening today across the region." : "No events today yet."}
          </p>
        </div>
        <div className="panel p-5">
          <div className="mb-4 flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-glow" />
            <h3 className="font-semibold text-white">This Week</h3>
          </div>
          <p className="text-3xl font-semibold text-white">{thisWeek.length}</p>
          <p className="mt-2 text-sm text-fog">Upcoming events over the next seven days.</p>
          <Link href="/regions/all-regions" className="mt-4 inline-flex items-center text-sm text-glow">
            Open full calendar <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

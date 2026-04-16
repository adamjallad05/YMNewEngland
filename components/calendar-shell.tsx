"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, LayoutList, ChevronLeft, ChevronRight } from "lucide-react";

import { MonthCalendar } from "@/components/month-calendar";
import { WeekCalendar } from "@/components/week-calendar";
import { EventList } from "@/components/event-list";
import { FilterSidebar } from "@/components/filter-sidebar";
import { addMonths, addDays, threeMonthsAhead, toDateInputValue } from "@/lib/date";
import { cn, matchesRegion } from "@/lib/utils";
import type { EventFilters, EventRecord, RegionSlug } from "@/lib/types";

type Props = {
  events: EventRecord[];
  regionSlug: RegionSlug;
  regionTitle: string;
};

export function CalendarShell({ events, regionSlug, regionTitle }: Props) {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [calendarView, setCalendarView] = useState<"month" | "week">("month");
  const [cursorDate, setCursorDate] = useState(new Date());
  const [filters, setFilters] = useState<EventFilters>({
    region: regionSlug,
    dateFrom: toDateInputValue(new Date()),
    dateTo: toDateInputValue(threeMonthsAhead())
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = new Date(event.start_datetime);
      const inRegion = matchesRegion(event, filters.region);
      const afterStart = filters.dateFrom ? eventDate >= new Date(filters.dateFrom) : true;
      const beforeEnd = filters.dateTo ? eventDate <= new Date(`${filters.dateTo}T23:59:59`) : true;
      const category = filters.category ? event.category === filters.category : true;
      const speaker = filters.speaker
        ? event.speaker_names?.join(" ").toLowerCase().includes(filters.speaker.toLowerCase())
        : true;
      const location = filters.location
        ? `${event.venue_name ?? ""} ${event.address ?? ""}`.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const keyword = filters.keyword
        ? `${event.title} ${event.description ?? ""} ${(event.tags ?? []).join(" ")}`.toLowerCase().includes(filters.keyword.toLowerCase())
        : true;

      return inRegion && afterStart && beforeEnd && category && speaker && location && keyword;
    });
  }, [events, filters]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <FilterSidebar initialFilters={filters} onChange={setFilters} />
      <div className="space-y-6">
        <section className="panel p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-fog">Region View</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">{regionTitle}</h2>
              <p className="mt-2 text-sm text-fog">
                Default range shows upcoming three months, with quick navigation for future and past planning.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setView("calendar")}
                className={cn("button-secondary", view === "calendar" && "border-glow bg-brand/10 text-white")}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                Calendar View
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={cn("button-secondary", view === "list" && "border-glow bg-brand/10 text-white")}
              >
                <LayoutList className="mr-2 h-4 w-4" />
                List View
              </button>
            </div>
          </div>

          {view === "calendar" ? (
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCalendarView("month")}
                    className={cn("button-secondary", calendarView === "month" && "border-glow bg-brand/10 text-white")}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarView("week")}
                    className={cn("button-secondary", calendarView === "week" && "border-glow bg-brand/10 text-white")}
                  >
                    Weekly
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCursorDate((current) =>
                        calendarView === "month" ? addMonths(current, -1) : addDays(current, -7)
                      )
                    }
                    className="button-secondary"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCursorDate((current) =>
                        calendarView === "month" ? addMonths(current, 1) : addDays(current, 7)
                      )
                    }
                    className="button-secondary"
                  >
                    Forward
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>

              {calendarView === "month" ? (
                <MonthCalendar date={cursorDate} events={filteredEvents} />
              ) : (
                <WeekCalendar date={cursorDate} events={filteredEvents} />
              )}
            </div>
          ) : (
            <div className="mt-5">
              <EventList events={filteredEvents} />
            </div>
          )}
        </section>

        <section className="panel p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Past Events Archive</h3>
              <p className="mt-1 text-sm text-fog">
                Older events remain searchable automatically after their date passes.
              </p>
            </div>
            <Link href="/regions/all-regions" className="button-secondary w-fit">
              Browse combined archive
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";

import { addDays, startOfWeek, weekLabel } from "@/lib/date";
import type { EventRecord } from "@/lib/types";

export function WeekCalendar({ date, events }: { date: Date; events: EventRecord[] }) {
  const weekStart = startOfWeek(date);
  const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));

  return (
    <div className="grid gap-4 lg:grid-cols-7">
      {days.map((day) => {
        const dayEvents = events.filter((event) => {
          const eventDate = new Date(event.start_datetime);
          return (
            eventDate.getFullYear() === day.getFullYear() &&
            eventDate.getMonth() === day.getMonth() &&
            eventDate.getDate() === day.getDate()
          );
        });

        return (
          <div key={day.toISOString()} className="panel min-h-72 p-4">
            <div className="mb-4 border-b border-line/70 pb-3">
              <p className="text-xs uppercase tracking-[0.2em] text-fog">Day</p>
              <h3 className="mt-1 text-base font-semibold text-white">{weekLabel(day)}</h3>
            </div>
            <div className="space-y-3">
              {dayEvents.length ? (
                dayEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="block rounded-2xl border border-line bg-navy-2/80 p-3 transition hover:border-glow/70"
                  >
                    <p className="font-medium text-white">{event.title}</p>
                    <p className="mt-1 text-sm text-fog">{event.region}</p>
                    <p className="mt-1 text-xs text-glow">
                      {new Date(event.start_datetime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit"
                      })}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-fog">No events scheduled.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

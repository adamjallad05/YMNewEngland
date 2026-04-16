import Link from "next/link";

import { addDays, endOfMonth, isSameDay, monthLabel, startOfMonth, startOfWeek } from "@/lib/date";
import type { EventRecord } from "@/lib/types";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function MonthCalendar({ date, events }: { date: Date; events: EventRecord[] }) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const gridStart = startOfWeek(monthStart);
  const days = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
  const today = new Date();

  const eventsByDay = days.map((day) =>
    events.filter((event) => isSameDay(new Date(event.start_datetime), day)).slice(0, 3)
  );

  return (
    <div className="panel overflow-hidden">
      <div className="border-b border-line/70 p-4">
        <h3 className="text-lg font-semibold text-white">{monthLabel(date)}</h3>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid-calendar border-b border-line/70">
            {weekdays.map((day) => (
              <div key={day} className="border-r border-line/70 p-3 text-xs uppercase tracking-[0.2em] text-fog last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid-calendar">
            {days.map((day, index) => {
              const dayEvents = eventsByDay[index];
              const inCurrentMonth = day.getMonth() === date.getMonth();
              const isToday = isSameDay(day, today);

              return (
                <div key={day.toISOString()} className="min-h-36 border-b border-r border-line/70 p-2 last:border-r-0">
                  <div
                    className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                      isToday ? "bg-glow text-white" : inCurrentMonth ? "text-white" : "text-fog/50"
                    }`}
                  >
                    {day.getDate()}
                  </div>
                  <div className="space-y-2">
                    {dayEvents.map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="block rounded-xl border border-brand/40 bg-brand/10 px-2 py-1.5 text-xs text-snow transition hover:border-glow"
                      >
                        <p className="truncate font-medium">{event.title}</p>
                        <p className="truncate text-[11px] text-fog">{event.region}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

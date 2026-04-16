import type { EventRecord } from "@/lib/types";
import { EventCard } from "@/components/event-card";

export function EventList({ events }: { events: EventRecord[] }) {
  const grouped = events.reduce<Record<string, EventRecord[]>>((acc, event) => {
    const label = new Date(event.start_datetime).toLocaleString("en-US", { month: "long", year: "numeric" });
    acc[label] ??= [];
    acc[label].push(event);
    return acc;
  }, {});

  if (!events.length) {
    return (
      <div className="panel p-8 text-center">
        <h3 className="text-lg font-semibold text-white">No events match these filters</h3>
        <p className="mt-2 text-sm text-fog">Try widening the date range or clearing a filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([month, monthEvents]) => (
        <section key={month}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">{month}</h2>
            <p className="text-sm text-fog">{monthEvents.length} events</p>
          </div>
          <div className="space-y-4">
            {monthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

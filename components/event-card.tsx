import Link from "next/link";
import { MapPin, Mic, Tag } from "lucide-react";

import { formatDate, formatTime } from "@/lib/date";
import type { EventRecord } from "@/lib/types";

export function EventCard({ event }: { event: EventRecord }) {
  return (
    <Link href={`/events/${event.slug}`} className="panel block p-4 transition hover:border-glow/80 hover:shadow-glow">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-glow">
            <span>{event.region}</span>
            <span className="rounded-full border border-line px-2 py-1 tracking-normal text-fog">{event.status}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
          <p className="text-sm text-fog">
            {formatDate(event.start_datetime)} • {formatTime(event.start_datetime)} - {formatTime(event.end_datetime)}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-fog">
            {event.speaker_names?.length ? (
              <span className="inline-flex items-center gap-2">
                <Mic className="h-4 w-4 text-glow" />
                {event.speaker_names.join(", ")}
              </span>
            ) : null}
            {event.venue_name ? (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-glow" />
                {event.venue_name}
              </span>
            ) : null}
          </div>
        </div>
        {event.category ? (
          <span className="inline-flex h-fit items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-3 py-1 text-xs text-snow">
            <Tag className="h-3.5 w-3.5 text-glow" />
            {event.category}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

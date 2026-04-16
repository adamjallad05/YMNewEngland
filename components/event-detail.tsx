import Image from "next/image";
import Link from "next/link";
import { Calendar, Mail, MapPin, Mic, Tags, Users } from "lucide-react";

import { formatDateRange } from "@/lib/date";
import type { EventRecord } from "@/lib/types";

export function EventDetail({ event }: { event: EventRecord }) {
  const googleCalendarUrl = new URL("https://calendar.google.com/calendar/render");
  googleCalendarUrl.searchParams.set("action", "TEMPLATE");
  googleCalendarUrl.searchParams.set("text", event.title);
  googleCalendarUrl.searchParams.set("details", event.description ?? "");
  googleCalendarUrl.searchParams.set("location", `${event.venue_name ?? ""} ${event.address ?? ""}`.trim());
  googleCalendarUrl.searchParams.set(
    "dates",
    `${event.start_datetime.replace(/[-:]/g, "").replace(".000Z", "Z").replace(/\.\d+Z$/, "Z").replace(/T/, "T").replace(/Z$/, "Z")}/${event.end_datetime
      .replace(/[-:]/g, "")
      .replace(".000Z", "Z")
      .replace(/\.\d+Z$/, "Z")
      .replace(/T/, "T")
      .replace(/Z$/, "Z")}`
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <section className="panel overflow-hidden">
          {event.flyer_image_url ? (
            <div className="relative h-72 w-full">
              <Image src={event.flyer_image_url} alt={event.title} fill className="object-cover" />
            </div>
          ) : null}
          <div className="p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-brand/50 bg-brand/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-glow">
                {event.region}
              </span>
              {event.category ? (
                <span className="rounded-full border border-line px-3 py-1 text-xs text-fog">{event.category}</span>
              ) : null}
            </div>
            <h1 className="text-3xl font-semibold text-white">{event.title}</h1>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-fog">{event.description}</p>
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="panel p-5">
          <h2 className="text-lg font-semibold text-white">Event Details</h2>
          <div className="mt-4 space-y-4 text-sm text-fog">
            <div className="flex gap-3">
              <Calendar className="mt-0.5 h-4 w-4 text-glow" />
              <span>{formatDateRange(event.start_datetime, event.end_datetime)}</span>
            </div>
            {event.venue_name || event.address ? (
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-glow" />
                <span>{[event.venue_name, event.address].filter(Boolean).join(" • ")}</span>
              </div>
            ) : null}
            {event.speaker_names?.length ? (
              <div className="flex gap-3">
                <Mic className="mt-0.5 h-4 w-4 text-glow" />
                <span>{event.speaker_names.join(", ")}</span>
              </div>
            ) : null}
            {event.gender_audience || event.age_group ? (
              <div className="flex gap-3">
                <Users className="mt-0.5 h-4 w-4 text-glow" />
                <span>{[event.gender_audience, event.age_group].filter(Boolean).join(" • ")}</span>
              </div>
            ) : null}
            {event.tags?.length ? (
              <div className="flex gap-3">
                <Tags className="mt-0.5 h-4 w-4 text-glow" />
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-line bg-navy-2 px-2.5 py-1 text-xs text-snow">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {event.contact_name || event.contact_email ? (
              <div className="rounded-2xl border border-line bg-navy-2/70 p-4">
                <p className="font-medium text-white">{event.contact_name ?? "Event Contact"}</p>
                {event.contact_email ? (
                  <p className="mt-2 inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-glow" />
                    <a href={`mailto:${event.contact_email}`}>{event.contact_email}</a>
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {event.registration_url ? (
              <Link href={event.registration_url} target="_blank" className="button-primary">
                RSVP / Register
              </Link>
            ) : null}
            <Link href={googleCalendarUrl.toString()} target="_blank" className="button-secondary">
              Add to Google Calendar
            </Link>
          </div>
        </section>
      </aside>
    </div>
  );
}

import Link from "next/link";

import { deleteEventAction, duplicateEventAction } from "@/app/actions";
import { formatDate } from "@/lib/date";
import type { EventRecord, UserRole } from "@/lib/types";

export function EventTable({ events, role }: { events: EventRecord[]; role: UserRole }) {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-line text-left text-sm">
          <thead className="bg-navy-2/80 text-fog">
            <tr>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Region</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {events.map((event) => (
              <tr key={event.id} className="bg-navy/40">
                <td className="px-4 py-4">
                  <p className="font-medium text-white">{event.title}</p>
                  <p className="mt-1 text-xs text-fog">{event.category ?? "General event"}</p>
                </td>
                <td className="px-4 py-4 text-fog">{formatDate(event.start_datetime)}</td>
                <td className="px-4 py-4 text-fog">{event.region}</td>
                <td className="px-4 py-4">
                  <span className="rounded-full border border-line px-2.5 py-1 text-xs text-snow">{event.status}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/events/${event.id}/edit`} className="button-secondary">
                      Edit
                    </Link>
                    <form action={duplicateEventAction}>
                      <input type="hidden" name="id" value={event.id} />
                      <button type="submit" className="button-secondary">
                        Duplicate
                      </button>
                    </form>
                    {role === "admin" ? (
                      <form action={deleteEventAction}>
                        <input type="hidden" name="id" value={event.id} />
                        <button type="submit" className="button-secondary">
                          Delete
                        </button>
                      </form>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

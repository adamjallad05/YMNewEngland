import { CalendarRange, Clock3, FilePenLine } from "lucide-react";

import { EventTable } from "@/components/admin/event-table";
import { getAdminEvents, getCurrentUserProfile } from "@/lib/data/events";

export default async function AdminDashboardPage() {
  const [events, profile] = await Promise.all([getAdminEvents(), getCurrentUserProfile()]);

  const published = events.filter((event) => event.status === "published").length;
  const drafts = events.filter((event) => event.status === "draft").length;
  const upcoming = events.filter((event) => new Date(event.start_datetime) >= new Date()).length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Published", value: published, icon: CalendarRange },
          { label: "Drafts", value: drafts, icon: FilePenLine },
          { label: "Upcoming", value: upcoming, icon: Clock3 }
        ].map((item) => (
          <div key={item.label} className="panel p-5">
            <item.icon className="h-5 w-5 text-glow" />
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
            <p className="mt-2 text-sm text-fog">{item.label} events</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Manage Events</h2>
          <p className="mt-2 text-sm text-fog">
            Duplicate recurring programs, save drafts before publishing, and edit multi-region events from one table.
          </p>
        </div>
        <EventTable events={events} role={profile.role!} />
      </section>
    </div>
  );
}

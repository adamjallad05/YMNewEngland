import { notFound } from "next/navigation";

import { EventForm } from "@/components/admin/event-form";
import { getAdminEventById } from "@/lib/data/events";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getAdminEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-white">Edit Event</h2>
        <p className="mt-2 text-sm text-fog">Update details, publish status, dates, and flyer assets.</p>
      </div>
      <EventForm event={event} />
    </div>
  );
}

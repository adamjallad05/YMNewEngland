import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-white">Create Event</h2>
        <p className="mt-2 text-sm text-fog">Add new programming for one or multiple YM regions.</p>
      </div>
      <EventForm />
    </div>
  );
}

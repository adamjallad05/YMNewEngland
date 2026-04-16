import Link from "next/link";
import { notFound } from "next/navigation";

import { EventDetail } from "@/components/event-detail";
import { getEventBySlug } from "@/lib/data/events";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="shell space-y-6 py-10">
      <Link href="/regions/all-regions" className="text-sm text-glow">
        Back to calendar
      </Link>
      <EventDetail event={event} />
    </div>
  );
}

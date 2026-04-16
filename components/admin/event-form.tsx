"use client";

import { useActionState } from "react";

import { saveEventAction } from "@/app/actions";
import { FlyerUploadField } from "@/components/admin/flyer-upload-field";
import {
  CATEGORY_OPTIONS,
  EVENT_TAGS,
  GENDER_AUDIENCES,
  REGION_OPTIONS,
  STATUS_OPTIONS,
  type EventFormState,
  type EventRecord
} from "@/lib/types";

const initialState: EventFormState = {};

function datePart(value?: string | null) {
  return value ? new Date(value).toISOString().slice(0, 10) : "";
}

function timePart(value?: string | null) {
  return value ? new Date(value).toISOString().slice(11, 16) : "";
}

export function EventForm({ event }: { event?: EventRecord | null }) {
  const [state, formAction, pending] = useActionState(saveEventAction, initialState);
  const secondary = new Set(event?.secondary_regions ?? []);
  const speakers = event?.speaker_names?.length ? event.speaker_names : ["", ""];

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" defaultValue={event?.id ?? ""} />

      <section className="panel p-5">
        <h2 className="text-lg font-semibold text-white">Basics</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-fog">Title</label>
            <input className="field" name="title" defaultValue={event?.title ?? ""} required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">Slug</label>
            <input className="field" name="slug" defaultValue={event?.slug ?? ""} placeholder="Optional custom slug" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">Status</label>
            <select className="field" name="status" defaultValue={event?.status ?? "draft"}>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-fog">Description</label>
            <textarea className="field min-h-32" name="description" defaultValue={event?.description ?? ""} />
          </div>
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="text-lg font-semibold text-white">Date & Region</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-fog">Primary Region</label>
            <select className="field" name="region" defaultValue={event?.region ?? ""} required>
              <option value="">Select a region</option>
              {REGION_OPTIONS.filter((region) => region.slug !== "all-regions").map((region) => (
                <option key={region.slug} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">Category</label>
            <select className="field" name="category" defaultValue={event?.category ?? ""}>
              <option value="">Select category</option>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">Start Date</label>
            <input className="field" type="date" name="start_date" defaultValue={datePart(event?.start_datetime)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">Start Time</label>
            <input className="field" type="time" name="start_time" defaultValue={timePart(event?.start_datetime)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">End Date</label>
            <input className="field" type="date" name="end_date" defaultValue={datePart(event?.end_datetime)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">End Time</label>
            <input className="field" type="time" name="end_time" defaultValue={timePart(event?.end_datetime)} required />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-fog">Secondary Regions</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {REGION_OPTIONS.filter((region) => region.slug !== "all-regions").map((region) => (
                <label key={region.slug} className="flex items-center gap-3 rounded-2xl border border-line bg-navy-2/70 px-3 py-2 text-sm text-snow">
                  <input type="checkbox" name="secondary_regions" value={region.name} defaultChecked={secondary.has(region.name)} />
                  {region.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="text-lg font-semibold text-white">Venue, Speakers & Contact</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-fog">Venue Name</label>
            <input className="field" name="venue_name" defaultValue={event?.venue_name ?? ""} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">Address</label>
            <input className="field" name="address" defaultValue={event?.address ?? ""} />
          </div>
          {speakers.map((speaker, index) => (
            <div key={index}>
              <label className="mb-1 block text-sm text-fog">Speaker {index + 1}</label>
              <input className="field" name="speaker_names" defaultValue={speaker} />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-sm text-fog">Gender Audience</label>
            <select className="field" name="gender_audience" defaultValue={event?.gender_audience ?? ""}>
              <option value="">Select audience</option>
              {GENDER_AUDIENCES.map((audience) => (
                <option key={audience} value={audience}>
                  {audience}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">Age Group</label>
            <input className="field" name="age_group" defaultValue={event?.age_group ?? ""} placeholder="High school, college, family..." />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">Registration URL</label>
            <input className="field" name="registration_url" defaultValue={event?.registration_url ?? ""} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">Contact Name</label>
            <input className="field" name="contact_name" defaultValue={event?.contact_name ?? ""} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">Contact Email</label>
            <input className="field" name="contact_email" type="email" defaultValue={event?.contact_email ?? ""} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-fog">Flyer / Image</label>
            <FlyerUploadField defaultValue={event?.flyer_image_url} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-fog">Tags</label>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {EVENT_TAGS.map((tag) => (
                <label key={tag} className="flex items-center gap-3 rounded-2xl border border-line bg-navy-2/70 px-3 py-2 text-sm text-snow">
                  <input type="checkbox" name="tags" value={tag} defaultChecked={event?.tags?.includes(tag)} />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {state.error ? <p className="text-sm text-red-300">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-emerald-300">{state.success}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="button-primary" disabled={pending}>
          {pending ? "Saving..." : event ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
}

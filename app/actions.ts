"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import type { EventFormState, RegionName } from "@/lib/types";

function stringOrNull(value: FormDataEntryValue | null) {
  const text = value?.toString().trim();
  return text ? text : null;
}

function arrayOrNull(values: FormDataEntryValue[]) {
  const result = values.map((value) => value.toString().trim()).filter(Boolean);
  return result.length ? result : null;
}

async function requireAuthorizedUser() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in.");
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  const role = profile?.role as "admin" | "editor" | undefined;

  if (!role) {
    throw new Error("You do not have admin access yet.");
  }

  return { supabase, user, role };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function saveEventAction(_: EventFormState, formData: FormData): Promise<EventFormState> {
  try {
    const { supabase, user } = await requireAuthorizedUser();
    const id = stringOrNull(formData.get("id"));
    const title = formData.get("title")?.toString().trim();
    const primaryRegion = formData.get("region")?.toString() as RegionName | undefined;
    const startDate = formData.get("start_date")?.toString();
    const startTime = formData.get("start_time")?.toString();
    const endDate = formData.get("end_date")?.toString();
    const endTime = formData.get("end_time")?.toString();

    if (!title || !primaryRegion || !startDate || !startTime || !endDate || !endTime) {
      return { error: "Title, primary region, start, and end date/time are required." };
    }

    const secondaryRegions = arrayOrNull(formData.getAll("secondary_regions")) as RegionName[] | null;
    const payload = {
      title,
      slug: slugify(stringOrNull(formData.get("slug")) ?? title),
      description: stringOrNull(formData.get("description")),
      start_datetime: new Date(`${startDate}T${startTime}`).toISOString(),
      end_datetime: new Date(`${endDate}T${endTime}`).toISOString(),
      region: primaryRegion,
      secondary_regions: secondaryRegions,
      venue_name: stringOrNull(formData.get("venue_name")),
      address: stringOrNull(formData.get("address")),
      speaker_names: arrayOrNull(formData.getAll("speaker_names")),
      category: stringOrNull(formData.get("category")),
      gender_audience: stringOrNull(formData.get("gender_audience")),
      age_group: stringOrNull(formData.get("age_group")),
      registration_url: stringOrNull(formData.get("registration_url")),
      flyer_image_url: stringOrNull(formData.get("flyer_image_url")),
      contact_name: stringOrNull(formData.get("contact_name")),
      contact_email: stringOrNull(formData.get("contact_email")),
      tags: arrayOrNull(formData.getAll("tags")),
      status: formData.get("status")?.toString() === "draft" ? "draft" : "published",
      created_by: user.id
    };

    const query = id ? supabase.from("events").update(payload).eq("id", id) : supabase.from("events").insert(payload);
    const { error } = await query;

    if (error) {
      console.error(error);
      return { error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/regions/all-regions");
    revalidatePath("/admin");
    return { success: id ? "Event updated successfully." : "Event created successfully." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unable to save event." };
  }
}

export async function duplicateEventAction(formData: FormData) {
  const { supabase } = await requireAuthorizedUser();
  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  const { data: event } = await supabase.from("events").select("*").eq("id", id).single();
  if (!event) {
    return;
  }

  const start = new Date(event.start_datetime);
  const end = new Date(event.end_datetime);
  start.setDate(start.getDate() + 7);
  end.setDate(end.getDate() + 7);

  const { id: _ignored, created_at, updated_at, ...clone } = event;
  await supabase.from("events").insert({
    ...clone,
    slug: `${clone.slug}-${Date.now()}`,
    title: `${clone.title} (Copy)`,
    start_datetime: start.toISOString(),
    end_datetime: end.toISOString(),
    status: "draft"
  });

  revalidatePath("/admin");
}

export async function deleteEventAction(formData: FormData) {
  const { supabase } = await requireAuthorizedUser();
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }

  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/admin");
}

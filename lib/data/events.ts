import { cache } from "react";

import { demoEvents } from "@/lib/demo-events";
import { createClient } from "@/lib/supabase/server";
import type { EventRecord, UserRole } from "@/lib/types";

function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export const getPublishedEvents = cache(async () => {
  if (!hasSupabaseEnv()) {
    return demoEvents;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .order("start_datetime", { ascending: true });

  if (error) {
    console.error(error);
    return [] as EventRecord[];
  }

  return (data ?? []) as EventRecord[];
});

export const getUpcomingPublishedEvents = cache(async () => {
  if (!hasSupabaseEnv()) {
    const now = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 3);
    return demoEvents.filter((event) => {
      const start = new Date(event.start_datetime);
      return start >= now && start <= end;
    });
  }

  const supabase = await createClient();
  const start = new Date();
  const end = new Date();
  end.setMonth(end.getMonth() + 3);

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .gte("start_datetime", start.toISOString())
    .lte("start_datetime", end.toISOString())
    .order("start_datetime", { ascending: true });

  if (error) {
    console.error(error);
    return [] as EventRecord[];
  }

  return (data ?? []) as EventRecord[];
});

export async function getEventBySlug(slug: string) {
  if (!hasSupabaseEnv()) {
    return demoEvents.find((event) => event.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").eq("slug", slug).single();
  return data as EventRecord | null;
}

export async function getAdminEvents() {
  if (!hasSupabaseEnv()) {
    return demoEvents;
  }

  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").order("start_datetime", { ascending: true });
  return (data ?? []) as EventRecord[];
}

export async function getAdminEventById(id: string) {
  if (!hasSupabaseEnv()) {
    return demoEvents.find((event) => event.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").eq("id", id).single();
  return data as EventRecord | null;
}

export async function getCurrentUserProfile() {
  if (!hasSupabaseEnv()) {
    return { user: null, role: null as UserRole | null, profile: null };
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, role: null as UserRole | null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  return { user, role: (profile?.role ?? null) as UserRole | null, profile };
}

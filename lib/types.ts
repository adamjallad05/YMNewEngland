export const REGION_OPTIONS = [
  { name: "All Regions", slug: "all-regions" },
  { name: "YM Sharon", slug: "ym-sharon" },
  { name: "YM Pawtucket", slug: "ym-pawtucket" },
  { name: "YM MetroWest", slug: "ym-metrowest" },
  { name: "YM Lowell", slug: "ym-lowell" },
  { name: "YM Worcester (WIC)", slug: "ym-worcester-wic" }
] as const;

export const EVENT_TAGS = [
  "Halaqa",
  "Qiyam",
  "Social",
  "Sports",
  "Volunteer",
  "Fundraiser",
  "Conference",
  "Sisters",
  "Brothers",
  "Family",
  "Youth Night",
  "Education"
] as const;

export const CATEGORY_OPTIONS = [
  "Halaqa",
  "Qiyam",
  "Social",
  "Sports",
  "Volunteer",
  "Fundraiser",
  "Conference",
  "Education",
  "Youth Night",
  "Family"
] as const;

export const GENDER_AUDIENCES = ["Brothers", "Sisters", "Co-ed"] as const;
export const STATUS_OPTIONS = ["draft", "published"] as const;

export type RegionName = (typeof REGION_OPTIONS)[number]["name"];
export type RegionSlug = (typeof REGION_OPTIONS)[number]["slug"];
export type EventTag = (typeof EVENT_TAGS)[number];
export type EventCategory = (typeof CATEGORY_OPTIONS)[number];
export type GenderAudience = (typeof GENDER_AUDIENCES)[number];
export type EventStatus = (typeof STATUS_OPTIONS)[number];

export type EventRecord = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  start_datetime: string;
  end_datetime: string;
  region: RegionName;
  secondary_regions: RegionName[] | null;
  venue_name: string | null;
  address: string | null;
  speaker_names: string[] | null;
  category: string | null;
  gender_audience: GenderAudience | null;
  age_group: string | null;
  registration_url: string | null;
  flyer_image_url: string | null;
  contact_name: string | null;
  contact_email: string | null;
  tags: string[] | null;
  status: EventStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type UserRole = "admin" | "editor";

export type EventFilters = {
  region: RegionSlug;
  dateFrom?: string;
  dateTo?: string;
  category?: string;
  speaker?: string;
  location?: string;
  keyword?: string;
};

export type EventFormState = {
  error?: string;
  success?: string;
};

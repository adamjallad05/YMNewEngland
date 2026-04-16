import { REGION_OPTIONS, type EventRecord, type RegionName, type RegionSlug } from "@/lib/types";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getRegionBySlug(slug: string) {
  return REGION_OPTIONS.find((region) => region.slug === slug);
}

export function getRegionSlugsForEvent(region: RegionName, secondaryRegions: RegionName[] | null) {
  return [region, ...(secondaryRegions ?? [])]
    .map((name) => REGION_OPTIONS.find((item) => item.name === name)?.slug)
    .filter(Boolean) as RegionSlug[];
}

export function matchesRegion(event: EventRecord, regionSlug: RegionSlug) {
  if (regionSlug === "all-regions") {
    return true;
  }

  return getRegionSlugsForEvent(event.region, event.secondary_regions).includes(regionSlug);
}

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `https://${path}`;
}

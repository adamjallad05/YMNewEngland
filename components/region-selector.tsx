"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { REGION_OPTIONS, type RegionSlug } from "@/lib/types";
import { cn } from "@/lib/utils";

export function RegionSelector({ activeRegion }: { activeRegion?: RegionSlug }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {REGION_OPTIONS.map((region) => (
        <Link
          key={region.slug}
          href={`/regions/${region.slug}`}
          className={cn(
            "panel group p-5 transition hover:-translate-y-1 hover:border-glow/80 hover:shadow-glow",
            activeRegion === region.slug && "border-glow shadow-glow"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/15 text-glow">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{region.name}</h3>
              <p className="mt-2 text-sm text-fog">
                {region.slug === "all-regions"
                  ? "Combined regional calendar across MA and RI."
                  : "View upcoming programming, weekly gatherings, and special events."}
              </p>
            </div>
            <ArrowRight className="mt-1 h-5 w-5 text-fog transition group-hover:text-glow" />
          </div>
        </Link>
      ))}
    </div>
  );
}

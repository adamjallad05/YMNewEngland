"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { CATEGORY_OPTIONS, REGION_OPTIONS, type EventFilters } from "@/lib/types";
import { toDateInputValue } from "@/lib/date";

type Props = {
  initialFilters: EventFilters;
  onChange: (filters: EventFilters) => void;
};

export function FilterSidebar({ initialFilters, onChange }: Props) {
  const [filters, setFilters] = useState<EventFilters>(initialFilters);

  const sync = (patch: Partial<EventFilters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    onChange(next);
  };

  return (
    <div className="panel sticky top-24 p-4">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-glow" />
        <h3 className="font-semibold text-white">Search & Filters</h3>
      </div>
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-sm text-fog">Keyword</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-fog" />
            <input
              className="field pl-9"
              value={filters.keyword ?? ""}
              onChange={(event) => sync({ keyword: event.target.value })}
              placeholder="Halaqa, Seerah, service..."
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-fog">Region</label>
          <select className="field" value={filters.region} onChange={(event) => sync({ region: event.target.value as EventFilters["region"] })}>
            {REGION_OPTIONS.map((region) => (
              <option key={region.slug} value={region.slug}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-fog">From</label>
            <input
              className="field"
              type="date"
              value={filters.dateFrom ?? toDateInputValue(new Date())}
              onChange={(event) => sync({ dateFrom: event.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fog">To</label>
            <input
              className="field"
              type="date"
              value={filters.dateTo ?? ""}
              onChange={(event) => sync({ dateTo: event.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-fog">Category</label>
          <select className="field" value={filters.category ?? ""} onChange={(event) => sync({ category: event.target.value })}>
            <option value="">All categories</option>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-fog">Speaker</label>
          <input
            className="field"
            value={filters.speaker ?? ""}
            onChange={(event) => sync({ speaker: event.target.value })}
            placeholder="Search speaker"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-fog">Location</label>
          <input
            className="field"
            value={filters.location ?? ""}
            onChange={(event) => sync({ location: event.target.value })}
            placeholder="Masjid, community center..."
          />
        </div>

        <button
          type="button"
          className="button-secondary w-full"
          onClick={() =>
            sync({
              region: "all-regions",
              dateFrom: toDateInputValue(new Date()),
              dateTo: "",
              category: "",
              speaker: "",
              location: "",
              keyword: ""
            })
          }
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}

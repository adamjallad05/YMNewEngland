"use client";

import { useId, useState } from "react";
import { Upload } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export function FlyerUploadField({ defaultValue }: { defaultValue?: string | null }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const id = useId();

  async function handleFileChange(file: File | undefined) {
    if (!file) {
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const filePath = `flyers/${Date.now()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`;
    const { error } = await supabase.storage.from("event-flyers").upload(filePath, file, {
      cacheControl: "3600",
      upsert: true
    });

    if (error) {
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("event-flyers").getPublicUrl(filePath);
    setValue(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="flyer_image_url" value={value} />
      <div className="rounded-2xl border border-dashed border-line bg-navy-2/70 p-4">
        <label htmlFor={id} className="flex cursor-pointer items-center gap-3 text-sm text-snow">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/15 text-glow">
            <Upload className="h-4 w-4" />
          </span>
          <span>{uploading ? "Uploading flyer..." : "Upload flyer or event image"}</span>
        </label>
        <input id={id} type="file" accept="image/*" className="hidden" onChange={(event) => handleFileChange(event.target.files?.[0])} />
      </div>
      <input
        className="field"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Or paste an existing image URL"
      />
      {value ? <p className="text-xs text-fog">Saved image URL will be submitted with the form.</p> : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );

  async function handleSubmit(formData: FormData) {
    if (!hasSupabaseEnv) {
      setError("Supabase is not configured yet. Add environment variables to enable admin login.");
      return;
    }

    setLoading(true);
    setError(null);
    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? ""
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form
      action={handleSubmit}
      className="panel mx-auto w-full max-w-lg space-y-4 p-6"
    >
      <div>
        <h1 className="text-2xl font-semibold text-white">Leader Login</h1>
        <p className="mt-2 text-sm text-fog">
          Sign in with a Supabase-authenticated admin or editor account to manage regional events.
        </p>
        {!hasSupabaseEnv ? (
          <p className="mt-2 text-sm text-amber-200">
            Demo mode is active right now. Public pages work, but admin auth needs Supabase environment variables.
          </p>
        ) : null}
      </div>
      <div>
        <label className="mb-1 block text-sm text-fog">Email</label>
        <input name="email" type="email" className="field" required />
      </div>
      <div>
        <label className="mb-1 block text-sm text-fog">Password</label>
        <input name="password" type="password" className="field" required />
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button type="submit" className="button-primary w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

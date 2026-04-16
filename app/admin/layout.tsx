import Link from "next/link";
import { redirect } from "next/navigation";

import { signOutAction } from "@/app/actions";
import { getCurrentUserProfile } from "@/lib/data/events";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role, profile } = await getCurrentUserProfile();

  if (!user || !role) {
    redirect("/login");
  }

  return (
    <div className="shell space-y-6 py-10">
      <section className="panel p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-fog">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Welcome, {profile?.full_name ?? user.email}</h1>
            <p className="mt-2 text-sm text-fog">
              Role: <span className="text-snow">{role}</span>. Editors can manage their own events, while admins have full access.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin" className="button-secondary">
              Dashboard
            </Link>
            <Link href="/admin/events/new" className="button-primary">
              Add Event
            </Link>
            <form action={signOutAction}>
              <button type="submit" className="button-secondary">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </section>
      {children}
    </div>
  );
}

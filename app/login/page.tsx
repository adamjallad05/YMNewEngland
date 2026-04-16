import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getCurrentUserProfile } from "@/lib/data/events";

export default async function LoginPage() {
  const { user, role } = await getCurrentUserProfile();

  if (user && role) {
    redirect("/admin");
  }

  return (
    <div className="shell space-y-6 py-16">
      {user && !role ? (
        <div className="panel mx-auto max-w-lg p-5 text-sm text-fog">
          Your account is signed in, but it does not have an assigned `admin` or `editor` role yet. Ask a regional
          admin to update your role in Supabase before using the dashboard.
        </div>
      ) : null}
      <LoginForm />
    </div>
  );
}

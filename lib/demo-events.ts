import type { EventRecord } from "@/lib/types";

const now = new Date();

function at(daysFromNow: number, hour: number, minute = 0) {
  const date = new Date(now);
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

export const demoEvents: EventRecord[] = [
  {
    id: "demo-1",
    title: "Friday Halaqa: Anchored Hearts",
    slug: "friday-halaqa-anchored-hearts",
    description:
      "A weekly Friday night halaqa focused on sincerity, consistency, and staying rooted in the masjid community.",
    start_datetime: at(2, 19),
    end_datetime: at(2, 21),
    region: "YM Sharon",
    secondary_regions: ["YM MetroWest"],
    venue_name: "ICNE Sharon",
    address: "1515 Washington St, Sharon, MA",
    speaker_names: ["Ustadh Kareem Ahmed"],
    category: "Halaqa",
    gender_audience: "Co-ed",
    age_group: "High School + College",
    registration_url: "https://forms.gle/example-sharon-halaqa",
    flyer_image_url:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
    contact_name: "Br. Hasan",
    contact_email: "sharon@ymne.org",
    tags: ["Halaqa", "Education", "Youth Night"],
    status: "published",
    created_by: null,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  },
  {
    id: "demo-2",
    title: "Qiyam Night: Hope & Dua",
    slug: "qiyam-night-hope-dua",
    description: "Late-night worship, reminders, qiyam, and breakfast for youth from across the region.",
    start_datetime: at(9, 22),
    end_datetime: at(10, 5),
    region: "YM Pawtucket",
    secondary_regions: ["YM Sharon", "YM Worcester (WIC)"],
    venue_name: "Masjid Ar-Razzaq",
    address: "727 East Ave, Pawtucket, RI",
    speaker_names: ["Sh. Ibrahim Saad"],
    category: "Qiyam",
    gender_audience: "Brothers",
    age_group: "High School + College",
    registration_url: "https://forms.gle/example-qiyam",
    flyer_image_url:
      "https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=1200&q=80",
    contact_name: "Br. Yusuf",
    contact_email: "pawtucket@ymne.org",
    tags: ["Qiyam", "Brothers", "Youth Night"],
    status: "published",
    created_by: null,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  },
  {
    id: "demo-3",
    title: "Sisters Tea & Reflection Circle",
    slug: "sisters-tea-reflection-circle",
    description:
      "An uplifting sisters-only gathering with tea, discussion, and guided reflection on gratitude and sisterhood.",
    start_datetime: at(13, 15),
    end_datetime: at(13, 17),
    region: "YM MetroWest",
    secondary_regions: ["YM Sharon"],
    venue_name: "Community Hall",
    address: "12 Green St, Framingham, MA",
    speaker_names: ["Sr. Noura Hasan"],
    category: "Social",
    gender_audience: "Sisters",
    age_group: "Young Adults",
    registration_url: "https://forms.gle/example-sisters-tea",
    flyer_image_url:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    contact_name: "Sr. Mariam",
    contact_email: "metrowest@ymne.org",
    tags: ["Sisters", "Social", "Education"],
    status: "published",
    created_by: null,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  },
  {
    id: "demo-4",
    title: "Basketball Night",
    slug: "basketball-night-lowell",
    description: "Open gym, team rotations, and a short reminder before play begins.",
    start_datetime: at(16, 18),
    end_datetime: at(16, 21),
    region: "YM Lowell",
    secondary_regions: [],
    venue_name: "Lowell YMCA Gym",
    address: "35 YMCA Dr, Lowell, MA",
    speaker_names: ["Br. Samir Ali"],
    category: "Sports",
    gender_audience: "Brothers",
    age_group: "Teens",
    registration_url: "https://forms.gle/example-basketball",
    flyer_image_url:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    contact_name: "Br. Omar",
    contact_email: "lowell@ymne.org",
    tags: ["Sports", "Brothers", "Youth Night"],
    status: "published",
    created_by: null,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  },
  {
    id: "demo-5",
    title: "Seerah Series: Mercy in Leadership",
    slug: "seerah-series-mercy-in-leadership",
    description:
      "Part of an ongoing Seerah series looking at prophetic leadership and compassion in community building.",
    start_datetime: at(20, 18),
    end_datetime: at(20, 20),
    region: "YM Worcester (WIC)",
    secondary_regions: ["YM MetroWest"],
    venue_name: "WIC Youth Hall",
    address: "248 East Mountain St, Worcester, MA",
    speaker_names: ["Ustadh Haseeb Khan"],
    category: "Education",
    gender_audience: "Co-ed",
    age_group: "College + Young Professionals",
    registration_url: "https://forms.gle/example-seerah",
    flyer_image_url:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    contact_name: "Br. Bilal",
    contact_email: "worcester@ymne.org",
    tags: ["Education", "Halaqa", "Family"],
    status: "published",
    created_by: null,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  },
  {
    id: "demo-6",
    title: "Community Service Day",
    slug: "community-service-day",
    description: "Serve local neighbors together through a food pantry support project and neighborhood cleanup.",
    start_datetime: at(26, 10),
    end_datetime: at(26, 14),
    region: "YM Pawtucket",
    secondary_regions: ["YM Sharon", "YM Lowell"],
    venue_name: "RI Community Center",
    address: "1 Hope St, Providence, RI",
    speaker_names: ["Br. Zayd Noor"],
    category: "Volunteer",
    gender_audience: "Co-ed",
    age_group: "All Ages",
    registration_url: "https://forms.gle/example-service-day",
    flyer_image_url:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    contact_name: "Sr. Amina",
    contact_email: "service@ymne.org",
    tags: ["Volunteer", "Family", "Youth Night"],
    status: "published",
    created_by: null,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  },
  {
    id: "demo-7",
    title: "Youth Night Bonfire",
    slug: "youth-night-bonfire",
    description:
      "A relaxed community night with reminders, snacks, team games, and space for new attendees to connect.",
    start_datetime: at(42, 19),
    end_datetime: at(42, 22),
    region: "YM MetroWest",
    secondary_regions: ["YM Worcester (WIC)"],
    venue_name: "Camp Cedar Grounds",
    address: "85 Forest Path, Hopkinton, MA",
    speaker_names: ["Br. Hamza Usman"],
    category: "Youth Night",
    gender_audience: "Co-ed",
    age_group: "Teens + Young Adults",
    registration_url: "https://forms.gle/example-bonfire",
    flyer_image_url:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    contact_name: "Br. Kareem",
    contact_email: "bonfire@ymne.org",
    tags: ["Youth Night", "Social", "Family"],
    status: "published",
    created_by: null,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  }
];

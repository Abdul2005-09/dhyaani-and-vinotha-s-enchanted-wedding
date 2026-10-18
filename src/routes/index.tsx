import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/magic/Experience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhyaani weds Vinotha — A Magical Wedding Invitation" },
      { name: "description", content: "Join Dhyaani & Vinotha at The Royal Mahal, Trichy — Reception 21 Nov & Muhurtham 22 Nov 2026." },
      { property: "og:title", content: "Dhyaani weds Vinotha" },
      { property: "og:description", content: "Your Presence, Our Greatest Blessing — 21 & 22 November 2026, The Royal Mahal, Trichy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Experience,
});

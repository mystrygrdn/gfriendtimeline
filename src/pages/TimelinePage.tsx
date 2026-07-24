import GfriendHero from "../components/ui/gfriend-hero";
import { useTimelineStore } from "../store/useTimelineStore";
import type { EraCategory } from "../types";

const categories: { label: string; value: EraCategory | "all" }[] = [
  { label: "Semua", value: "all" },
  { label: "Debut", value: "debut" },
  { label: "Comeback", value: "comeback" },
  { label: "Sub-unit", value: "subunit" },
  { label: "Hiatus", value: "hiatus" },
  { label: "Reunion", value: "reunion" },
];

export default function TimelinePage() {
  const searchQuery = useTimelineStore((state) => state.searchQuery);
  const setSearchQuery = useTimelineStore((state) => state.setSearchQuery);
  const activeCategory = useTimelineStore((state) => state.activeCategory);
  const setActiveCategory = useTimelineStore((state) => state.setActiveCategory);

  return (
    <main>
      <GfriendHero />

    </main>
  );
}
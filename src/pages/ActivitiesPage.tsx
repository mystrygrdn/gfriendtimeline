import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { members } from "../data/albums";
import { activitiesByMember } from "../data/activities";
import ActivityCard, { ActivityCardMember } from "../components/ui/activitycard";
import MemberActivityModal from "../components/ui/member-activity-modal";
import ActivitiesHero from "../components/ui/activities-hero";

export default function ActivitiesPage() {
  const [selectedMember, setSelectedMember] = useState<ActivityCardMember | null>(null);

  return (
    <main className="bg-ink min-h-screen">
      <ActivitiesHero photo="src/components/images/albums/seasonofmemories/som3.webp" />

      <div className="max-w-5xl mx-auto px-4 pt-8 pb-16 md:pt-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {members.map((member, index) => (
            <ActivityCard
              key={member.id}
              member={member}
              index={index}
              onViewMore={setSelectedMember}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedMember && (
            <MemberActivityModal
              member={selectedMember}
              activities={activitiesByMember[selectedMember.id] ?? []}
              onClose={() => setSelectedMember(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
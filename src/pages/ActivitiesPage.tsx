import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { members } from "../data/albums";
import { activitiesByMember } from "../data/activities";
import ActivityCard, { ActivityCardMember } from "../components/ui/activitycard";
import MemberActivityModal from "../components/ui/member-activity-modal";

export default function ActivitiesPage() {
  const [selectedMember, setSelectedMember] = useState<ActivityCardMember | null>(null);

  return (
    <main className="max-w-5xl mx-auto px-4 pt-28 pb-16">
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-ultraviolet">
        Member Activities
      </h1>
      <p className="font-body text-ink/60 mt-3 max-w-xl">
        Kegiatan terbaru masing-masing member.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
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
    </main>
  );
}
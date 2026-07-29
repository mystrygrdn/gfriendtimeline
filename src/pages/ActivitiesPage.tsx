import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { members } from "../data/albums";
import { activitiesByMember } from "../data/activities";
import ActivityCard, { ActivityCardMember } from "../components/ui/activitycard";
import MemberActivityModal from "../components/ui/member-activity-modal";
import ActivitiesHero from "../components/ui/activities-hero";
import Starfield from "../components/ui/starfield";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ActivitiesPage() {
  const [selectedMember, setSelectedMember] = useState<ActivityCardMember | null>(null);

  return (
    <main className="relative bg-ink min-h-screen overflow-hidden">
      <ActivitiesHero photo="src/components/images/albums/seasonofmemories/som3.webp" />

      {/* section grid, dengan atmosfer starry yang menyambung dari hero */}
      <section className="relative">
        <Starfield />
        {/* glow ungu lembut di kiri-kanan supaya ruang kosong tidak terasa mati */}
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-ultraviolet/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-2/3 h-[500px] w-[500px] rounded-full bg-scuba/15 blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-8 pb-24 md:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center md:mb-14"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-lilac">
              Meet The Members
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-cloud md:text-4xl">
              Enam Suara, Enam Cerita
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {members.map((member, index) => (
              <motion.div key={member.id} variants={cardVariants}>
                <ActivityCard
                  member={member}
                  index={index}
                  onViewMore={setSelectedMember}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
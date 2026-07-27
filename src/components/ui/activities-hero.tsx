import { motion } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";

export default function ActivitiesHero({
  photo,
}: {
  photo: string;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${photo})` }}
      />

      {/* dark overlay untuk keterbacaan teks */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      {/* fade transisi menuju section berikutnya (tetap gelap, konsisten dgn homepage) */}
      <div className="absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-b from-transparent to-ink" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-16 md:pb-24">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-lilac"
        >
          Six Voices, One Story
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 font-display text-6xl md:text-8xl font-extrabold leading-none text-cloud"
        >
          Member Activities
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-md font-body text-sm md:text-base text-cloud/70"
        >
          Kegiatan terbaru masing-masing member — ikuti langkah mereka di luar panggung.
        </motion.p>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-cloud/50"
      >
        <IconChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
import { motion } from "framer-motion";
import { IconAward } from "@tabler/icons-react";
import { achievements } from "../data/achievements";

const palette = ["#5F4B8B", "#1F6E8C", "#8672B0", "#3D93B4"];

export default function AchievementsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-ultraviolet">
        Achievements
      </h1>
      <p className="font-body text-ink/60 mt-3 max-w-xl">
        Penghargaan resmi GFRIEND dari panggung musik Korea — dari trofi
        rookie pertama sampai era keemasan mereka.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 gap-5">
        {achievements.map((item, index) => {
          const color = palette[index % palette.length];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
              className="relative overflow-hidden rounded-3xl bg-white/70 border border-white/40 shadow-card p-6"
            >
              {/* Watermark tahun besar — signature visual halaman ini */}
              <span
                className="pointer-events-none absolute -right-2 -top-6 font-display font-extrabold text-7xl md:text-8xl select-none"
                style={{ color, opacity: 0.12 }}
              >
                {item.year}
              </span>

              <div className="relative flex items-start gap-4">
                <div
                  className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${color}22`, color }}
                >
                  <IconAward className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-mono text-xs tracking-widest uppercase text-scuba">
                    {item.year}
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-semibold text-ink leading-snug mt-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-ink/60 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}

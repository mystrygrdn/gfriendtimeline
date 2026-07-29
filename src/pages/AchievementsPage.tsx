import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconAward } from "@tabler/icons-react";
import { achievements } from "../data/achievements";
import Starfield from "../components/ui/starfield";

// Lilac dikeluarkan dari palette card — terlalu terang, kontrasnya rendah
// di atas card putih. Lilac tetap dipakai khusus untuk tombol "Semua".
const palette = ["#5F4B8B", "#1F6E8C", "#8672B0", "#3D93B4", "#3F3061"];
const YEAR_RANGE = Array.from({ length: 2025 - 2015 + 1 }, (_, i) => 2025 - i); // 2025 -> 2015

export default function AchievementsPage() {
  const nodes = useMemo(() => ["all", ...YEAR_RANGE], []);
  const [selectedYear, setSelectedYear] = useState<string | number | "all">("all");

  // Pemetaan warna deterministik per tahun, tidak lagi bergantung index di array
  const yearColor = (year: string | number) => {
    const y = Number(year);
    return palette[y % palette.length];
  };

  const filtered = useMemo(() => {
    if (selectedYear === "all") return achievements;
    return achievements.filter((item) => item.year === selectedYear);
  }, [selectedYear]);

  return (
    <main className="relative bg-ink min-h-screen overflow-hidden">
      <Starfield />
      <div className="pointer-events-none absolute -left-40 top-40 h-[500px] w-[500px] rounded-full bg-ultraviolet/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-[60%] h-[500px] w-[500px] rounded-full bg-scuba/15 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-lilac">
            Hall Of Fame
          </span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-extrabold text-cloud leading-tight">
            Achievements
          </h1>
          <p className="font-body text-cloud/60 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Penghargaan resmi GFRIEND dari panggung musik Korea — dari trofi
            rookie pertama sampai era keemasan mereka.
          </p>
        </motion.div>

        {/* Era select */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none rounded-2xl border border-cloud/10 bg-white/[0.03] p-1.5 max-w-full">
            {nodes.map((node) => {
              const isActive = node === selectedYear;
              const color = node === "all" ? "#C9BBE8" : yearColor(node);
              return (
                <button
                  key={node}
                  onClick={() => setSelectedYear(node)}
                  className="relative shrink-0 w-16 md:w-[72px] py-2.5 rounded-xl font-mono text-[11px] md:text-xs uppercase tracking-wider transition-colors duration-200"
                  style={{ color: isActive ? "#18151F" : "rgba(242,238,230,0.45)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="era-highlight"
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: color }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{node === "all" ? "Semua" : node}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Trophy grid */}
        <div className="mt-12 relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {filtered.map((item, index) => {
                const color = yearColor(item.year);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: (index % 5) * 0.04 }}
                    className="relative overflow-hidden rounded-2xl bg-white/70 border border-white/40 shadow-card p-5"
                  >
                    <span className="absolute left-2 top-2 h-2.5 w-2.5 border-l-2 border-t-2 rounded-tl-sm opacity-40" style={{ borderColor: color }} />
                    <span className="absolute right-2 top-2 h-2.5 w-2.5 border-r-2 border-t-2 rounded-tr-sm opacity-40" style={{ borderColor: color }} />
                    <span className="absolute left-2 bottom-2 h-2.5 w-2.5 border-l-2 border-b-2 rounded-bl-sm opacity-40" style={{ borderColor: color }} />
                    <span className="absolute right-2 bottom-2 h-2.5 w-2.5 border-r-2 border-b-2 rounded-br-sm opacity-40" style={{ borderColor: color }} />

                    <span
                      className="pointer-events-none absolute -right-2 -top-5 font-display font-extrabold text-6xl select-none"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: `1.5px ${color}`,
                        opacity: 0.35,
                      }}
                    >
                      {item.year}
                    </span>

                    <div className="relative">
                      <div className="relative h-11 w-11">
                        <motion.div
                          className="absolute inset-[-6px] rounded-full"
                          style={{ background: `radial-gradient(circle, ${color}55, transparent 70%)` }}
                          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.05, 0.9] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: (index % 5) * 0.3 }}
                        />
                        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                          <polygon
                            points="50,3 95,25 95,75 50,97 5,75 5,25"
                            fill={`${color}1f`}
                            stroke={color}
                            strokeWidth="3"
                          />
                        </svg>
                        <IconAward className="absolute inset-0 m-auto h-5 w-5" style={{ color }} />
                        <motion.span
                          className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: color }}
                          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 + (index % 5) * 0.3 }}
                        />
                      </div>

                      <span className="block font-mono text-[10px] tracking-widest uppercase mt-3" style={{ color }}>
                        {item.year}
                      </span>
                      <h3 className="font-display text-base font-bold text-ink leading-snug mt-1.5">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-ink/60 mt-2 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      <div
                        className="mt-4 h-px w-full"
                        style={{
                          backgroundImage: `repeating-linear-gradient(90deg, ${color}66 0, ${color}66 3px, transparent 3px, transparent 7px)`,
                          opacity: 0.5,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="pt-8 text-center font-body text-cloud/40 text-sm">
              Belum ada pencapaian tercatat untuk era ini.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
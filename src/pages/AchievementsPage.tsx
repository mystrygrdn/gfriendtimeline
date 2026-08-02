import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconAward, IconTrophy, IconCalendarStar, IconMicrophone2 } from "@tabler/icons-react";
import { achievements } from "../data/achievements";
import { musicShowWins } from "../data/musicShowWins";
import Starfield from "../components/ui/starfield";

const palette = ["#5F4B8B", "#1F6E8C", "#8672B0", "#3D93B4", "#3F3061"];

export default function AchievementsPage() {
  const [selectedYear, setSelectedYear] = useState<string | number | "all">("all");

  const yearColor = (year: string | number) => {
    const y = Number(year);
    return palette[y % palette.length];
  };

  // Tahun yang benar-benar punya data (gabungan penghargaan & music show wins),
  // diurutkan turun. Tahun tanpa data sama sekali tidak akan muncul di selector.
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    achievements.forEach((item) => years.add(item.year));
    musicShowWins.forEach((w) => years.add(w.year));
    return Array.from(years).sort((a, b) => b - a);
  }, []);

  const nodes = useMemo(() => ["all", ...availableYears], [availableYears]);

  // --- Penghargaan Musik ---
  const filteredAwards = useMemo(() => {
    if (selectedYear === "all") return achievements;
    return achievements.filter((item) => item.year === selectedYear);
  }, [selectedYear]);

  // --- Music Show Wins, dikelompokkan per lagu ---
  const filteredWins = useMemo(() => {
    if (selectedYear === "all") return musicShowWins;
    return musicShowWins.filter((w) => w.year === selectedYear);
  }, [selectedYear]);

  const winsBySong = useMemo(() => {
    const map = new Map<string, typeof musicShowWins>();
    filteredWins.forEach((w) => {
      const existing = map.get(w.song) ?? [];
      map.set(w.song, [...existing, w]);
    });
    return Array.from(map.entries())
      .map(([song, wins]) => ({
        song,
        wins: wins.sort((a, b) => a.year - b.year),
        firstYear: Math.min(...wins.map((w) => w.year)),
      }))
      .sort((a, b) => b.wins.length - a.wins.length);
  }, [filteredWins]);

  // --- Statistik (selalu dari total keseluruhan, tidak ikut filter tahun) ---
  const stats = useMemo(() => {
    const totalAwards = achievements.length;
    const totalWins = musicShowWins.length;
    const firstYear = achievements.reduce(
      (min, item) => (item.year < min ? item.year : min),
      achievements[0]?.year ?? new Date().getFullYear()
    );
    const countByYear: Record<string, number> = {};
    achievements.forEach((item) => {
      countByYear[item.year] = (countByYear[item.year] ?? 0) + 1;
    });
    const peakYear = Object.entries(countByYear).sort((a, b) => b[1] - a[1])[0]?.[0];
    return { totalAwards, totalWins, firstYear, peakYear };
  }, []);

  const showAwardsSection = filteredAwards.length > 0;
  const showWinsSection = winsBySong.length > 0;

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
            Penghargaan resmi dan kemenangan music show GFRIEND dari panggung
            musik Korea — dari trofi rookie pertama sampai era keemasan mereka.
          </p>
        </motion.div>

        {/* Stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {[
            { icon: IconTrophy, label: "Total Penghargaan", value: stats.totalAwards },
            { icon: IconMicrophone2, label: "Music Show Wins", value: stats.totalWins },
            { icon: IconCalendarStar, label: "Sejak", value: stats.firstYear },
            { icon: IconAward, label: "Puncak", value: stats.peakYear },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-cloud/10 bg-white/[0.03] px-3 py-4 text-center"
            >
              <Icon className="mx-auto h-4 w-4 text-lilac" />
              <div className="mt-2 font-display text-xl md:text-2xl font-bold text-cloud">
                {value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-cloud/40 mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Era timeline selector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 relative"
        >
          <div className="relative flex justify-center overflow-x-auto scrollbar-none">
            <div className="relative flex items-center gap-5 md:gap-7 px-4">
              <div className="absolute left-4 right-4 top-1/2 h-px bg-cloud/10 -translate-y-1/2" />
              {nodes.map((node) => {
                const isActive = node === selectedYear;
                const color = node === "all" ? "#C9BBE8" : yearColor(node);
                return (
                  <button
                    key={node}
                    onClick={() => setSelectedYear(node)}
                    className="relative shrink-0 flex flex-col items-center gap-2 group"
                  >
                    <motion.span
                      className="relative z-10 rounded-full transition-all duration-200"
                      style={{
                        width: isActive ? 14 : 9,
                        height: isActive ? 14 : 9,
                        backgroundColor: isActive ? color : "rgba(242,238,230,0.15)",
                        boxShadow: isActive ? `0 0 0 5px ${color}22` : "none",
                      }}
                    />
                    <span
                      className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider transition-colors duration-200"
                      style={{ color: isActive ? color : "rgba(242,238,230,0.35)" }}
                    >
                      {node === "all" ? "Semua" : node}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Trophy grid — Penghargaan Musik */}
        {showAwardsSection && (
          <div className="mt-14 relative min-h-[240px]">
            <h2 className="font-display text-xl md:text-2xl font-bold text-cloud mb-6 text-center">
              Penghargaan Musik
            </h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={`awards-${selectedYear}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              >
                {filteredAwards.map((item, index) => {
                  const color = yearColor(item.year);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: (index % 5) * 0.04 }}
                      className="relative overflow-hidden rounded-2xl bg-white border border-black/5 shadow-card p-5"
                    >
                      <span className="absolute left-2 top-2 h-2.5 w-2.5 border-l-2 border-t-2 rounded-tl-sm opacity-40" style={{ borderColor: color }} />
                      <span className="absolute right-2 top-2 h-2.5 w-2.5 border-r-2 border-t-2 rounded-tr-sm opacity-40" style={{ borderColor: color }} />
                      <span className="absolute left-2 bottom-2 h-2.5 w-2.5 border-l-2 border-b-2 rounded-bl-sm opacity-40" style={{ borderColor: color }} />
                      <span className="absolute right-2 bottom-2 h-2.5 w-2.5 border-r-2 border-b-2 rounded-br-sm opacity-40" style={{ borderColor: color }} />

                      <span
                        className="pointer-events-none absolute -right-2 -top-5 font-display font-extrabold text-6xl select-none"
                        style={{ color: "transparent", WebkitTextStroke: `1.5px ${color}`, opacity: 0.35 }}
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
                            <polygon points="50,3 95,25 95,75 50,97 5,75 5,25" fill={`${color}1f`} stroke={color} strokeWidth="3" />
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
          </div>
        )}

        {/* Music Show Wins — dikelompokkan per lagu */}
        {showWinsSection && (
          <div className="mt-20 relative min-h-[160px]">
            <h2 className="font-display text-xl md:text-2xl font-bold text-cloud mb-6 text-center">
              Music Show Wins
            </h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={`wins-${selectedYear}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {winsBySong.map(({ song, wins, firstYear }, index) => {
                  const color = yearColor(firstYear);
                  return (
                    <motion.div
                      key={song}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
                      className="relative overflow-hidden rounded-2xl bg-white border border-black/5 shadow-card p-5"
                    >
                      <span className="absolute left-2 top-2 h-2.5 w-2.5 border-l-2 border-t-2 rounded-tl-sm opacity-40" style={{ borderColor: color }} />
                      <span className="absolute right-2 top-2 h-2.5 w-2.5 border-r-2 border-t-2 rounded-tr-sm opacity-40" style={{ borderColor: color }} />
                      <span className="absolute left-2 bottom-2 h-2.5 w-2.5 border-l-2 border-b-2 rounded-bl-sm opacity-40" style={{ borderColor: color }} />
                      <span className="absolute right-2 bottom-2 h-2.5 w-2.5 border-r-2 border-b-2 rounded-br-sm opacity-40" style={{ borderColor: color }} />

                      <div className="relative flex items-start justify-between">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color }}>
                            {firstYear}
                          </span>
                          <h3 className="font-display text-lg font-bold text-ink mt-1">{song}</h3>
                        </div>
                        <div className="text-right shrink-0 pl-3">
                          <div className="font-display text-3xl font-extrabold" style={{ color }}>
                            {wins.length}
                          </div>
                          <div className="font-mono text-[9px] uppercase tracking-widest text-ink/40">
                            {wins.length === 1 ? "Win" : "Wins"}
                          </div>
                        </div>
                      </div>

<div className="relative mt-4 max-h-40 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin-glow">                        {wins.map((w) => (
                          <div
                            key={w.id}
                            className="flex items-center justify-between gap-2 text-xs font-body border-b border-dashed border-ink/10 pb-1.5"
                          >
                            <span className="font-semibold text-ink truncate">{w.show}</span>
                            <span className="text-ink/40 font-mono text-[10px] shrink-0">
                              {w.date}, {w.year}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
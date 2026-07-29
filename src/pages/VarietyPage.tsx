import { useMemo } from "react";
import { motion } from "framer-motion";
import { Carousel, VarietyCard } from "../components/ui/apple-cards-carousel";
import { varietyShows } from "../data/variety";

export default function VarietyPage() {
  const rows = useMemo(() => {
    const order: string[] = [];
    const groups = new Map<string, typeof varietyShows>();

    for (const show of varietyShows) {
      const category = show.category?.trim() || "Others";
      if (!groups.has(category)) {
        groups.set(category, []);
        order.push(category);
      }
      groups.get(category)!.push(show);
    }

    return order.map((category) => {
      const shows = [...groups.get(category)!].sort(
        (a, b) => Number(b.year) - Number(a.year)
      );
      return [category, shows] as const;
    });
  }, []);

  return (
    <main className="relative bg-ink min-h-screen">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 opacity-40"
        style={{ background: "radial-gradient(ellipse at top, #5F4B8B33, transparent 70%)" }}
      />

      <div className="relative z-10">
        <div className="max-w-2xl mx-auto px-6 pt-36 pb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[11px] uppercase tracking-[0.35em] text-lilac/70"
          >
            Watch & Rewatch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 font-display text-5xl md:text-7xl font-extrabold text-cloud leading-tight"
          >
            Variety Shows
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 font-body text-cloud/50 text-base md:text-lg leading-relaxed"
          >
            Konten variety show & behind-the-scenes GFRIEND — geser untuk
            menjelajah, klik untuk baca ceritanya.
          </motion.p>
        </div>

        <div className="space-y-20 md:space-y-24 pb-32">
          {rows.map(([category, shows], rowIndex) => (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: rowIndex * 0.03 }}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-10 mb-5">
                <h2 className="font-display text-xl md:text-2xl font-semibold text-cloud/90">
                  {category}
                </h2>
              </div>

              <Carousel
                items={shows.map((show, index) => (
                  <VarietyCard
                    key={show.id}
                    index={index}
                    card={{
                      src: show.posterColor,
                      category: `${show.category} · ${show.year}`,
                      title: show.title,
                      content: <p>{show.synopsis}</p>,
                    }}
                  />
                ))}
              />
            </motion.section>
          ))}
        </div>

        {rows.length === 0 && (
          <p className="text-center font-body text-cloud/40 text-sm">
            Belum ada konten variety show yang tercatat.
          </p>
        )}
      </div>
    </main>
  );
}
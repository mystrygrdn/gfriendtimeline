import { Carousel, VarietyCard } from "../components/ui/apple-cards-carousel";
import { varietyShows } from "../data/variety";

/**
 * Halaman Variety Shows — dulu grid statis ala "Netflix home",
 * sekarang pakai Apple Cards Carousel (Aceternity UI) supaya bisa
 * discroll horizontal dan tiap kartu bisa dibuka jadi modal detail.
 */
export default function VarietyPage() {
  const cards = varietyShows.map((show, index) => (
    <VarietyCard
      key={show.id}
      index={index}
      card={{
        src: show.posterColor,
        category: `${show.platform} · ${show.year}`,
        title: show.title,
        content: <p>{show.synopsis}</p>,
      }}
    />
  ));

  return (
    <main className="pb-16">
      <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        <h1 className="font-display text-3xl md:text-5xl font-extrabold text-ultraviolet">
          Variety Shows
        </h1>
        <p className="font-body text-ink/60 mt-3 max-w-xl">
          Konten variety show & behind-the-scenes GFRIEND — geser untuk
          menjelajah, klik kartu untuk baca ceritanya.
        </p>
      </div>

      <Carousel items={cards} />
    </main>
  );
}
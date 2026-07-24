import { members } from "../data/albums";

/**
 * MODUL BELAJAR - LATIHAN UNTUK KAMU:
 * Halaman ini sengaja dibuat sederhana (belum pakai Zustand,
 * belum ada data aktivitas asli). Setelah paham pola di
 * TimelinePage + Timeline + TimelineCard, coba kembangkan
 * halaman ini sendiri:
 *
 * 1. Buat `src/data/activities.ts` isi array `Activity[]`
 *    (tipe-nya sudah ada di src/types/index.ts).
 * 2. Buat komponen `ActivityCard.tsx` mirip `TimelineCard.tsx`.
 * 3. (Opsional) tambah state di Zustand store untuk filter
 *    aktivitas per member.
 */
export default function ActivitiesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-ultraviolet">
        Member Activities
      </h1>
      <p className="font-body text-ink/60 mt-3 max-w-xl">
        Kegiatan terbaru masing-masing member. Halaman ini masih kerangka —
        jadikan latihan untuk menerapkan pola yang sudah kamu pelajari dari
        halaman Timeline.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {members.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl bg-white/70 border border-white/40 p-6 shadow-card"
          >
            <h2 className="font-display text-xl font-semibold text-ink">
              {member.name}
            </h2>
            <p className="font-body text-sm text-scuba mt-1">{member.position}</p>
            <p className="font-body text-sm text-ink/40 mt-4 italic">
              Belum ada data aktivitas — tambahkan di src/data/activities.ts
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

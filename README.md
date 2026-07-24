# GFRIEND Hub — Modul Belajar

Project ini bukan cuma "kode jadi" — tiap file punya komentar `MODUL BELAJAR`
yang menjelaskan **kenapa** kodenya ditulis seperti itu, bukan cuma **apa**
yang ditulis. Baca komentarnya sebelum baca kodenya.

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Urutan Baca File yang Disarankan

Baca file dengan urutan ini, bukan berdasar folder — supaya alurnya
nyambung dari konsep paling dasar ke paling kompleks:

1. **`src/types/index.ts`** — mulai dari sini. Ini "kamus" bentuk data
   seluruh aplikasi. Pahami `interface` dan union type (`|`) dulu.
2. **`src/data/albums.ts`** — lihat bagaimana data (fakta rilis album
   GFRIEND) dipisah total dari tampilan.
3. **`src/store/useTimelineStore.ts`** — inti pembelajaran state
   management. Baca pelan-pelan, ini yang paling penting.
4. **`src/components/TimelineCard.tsx`** — contoh komponen dengan props
   ber-tipe, state lokal (`useState`), dan koneksi ke store global.
5. **`src/components/Timeline.tsx`** — bagaimana data + store digabung
   jadi tampilan yang reaktif (otomatis update saat state berubah).
6. **`src/components/Navbar.tsx`** — controlled input yang terhubung ke
   store yang SAMA dengan yang dipakai `Timeline.tsx`, walau kedua
   komponen ini tidak saling kenal secara langsung. Inilah inti kenapa
   state management global berguna.
7. **`src/App.tsx`** — routing, menyatukan semua halaman/menu.

## Kenapa Zustand, Bukan Redux atau Context Saja?

- **Context API** cocok untuk state yang jarang berubah (misal: tema
  dark/light). Kalau dipakai untuk state yang sering berubah (search
  query yang berubah tiap ketikan), semua komponen yang subscribe ke
  context itu bisa re-render lebih sering dari yang dibutuhkan.
- **Redux** sangat powerful tapi butuh banyak boilerplate (actions,
  reducers, store config) — cocok untuk aplikasi besar dengan tim,
  bukan untuk mulai belajar atau project skala GFRIEND Hub ini.
- **Zustand** memberi kemudahan Context API tapi dengan performa dan
  simplicity yang lebih baik untuk kasus seperti ini.

Tapi kamu tetap disarankan bikin versi Context API-nya sendiri sebagai
latihan (lihat rencana belajar sebelumnya) supaya paham bedanya secara
langsung, bukan cuma baca teori.

## Struktur Folder

```
src/
  types/          <- definisi bentuk data (TypeScript)
  data/            <- data mentah (nanti bisa diganti fetch API)
  store/           <- state management global (Zustand)
  components/      <- komponen reusable (Navbar, TimelineCard, dll)
  pages/           <- satu file = satu halaman/menu
```

## Yang Sudah Selesai vs. Latihan Kamu

**Sudah dibangun penuh (pelajari ini dulu):**
- Halaman **Timeline** — big card, animasi expand tracklist, search,
  filter kategori, bookmark — semua state-nya sudah terhubung ke
  Zustand store.

**Sengaja dibuat kerangka kosong (untuk kamu praktikkan sendiri):**
- **Activities** — latihan bikin data + card baru dari nol
- **Achievements** — latihan yang sama, lebih sederhana
- **Variety Shows** — sudah ada layout grid ala Netflix, tapi datanya
  masih hardcoded di dalam komponen (bukan best practice) — pindahkan
  ke `src/data/variety.ts` sebagai latihan pertamamu.

## Langkah Selanjutnya yang Disarankan

1. Jalankan project ini, coba search & filter di halaman Timeline,
   perhatikan bagaimana keduanya saling bekerja lewat satu store yang
   sama.
2. Buka `useTimelineStore.ts`, kerjakan 2 latihan di komentar paling
   bawah file itu.
3. Setelah nyaman, kerjakan halaman **Activities** dari nol mengikuti
   pola Timeline. Ini akan jadi bukti kamu sudah paham pola-nya, bukan
   cuma meniru.
4. Kalau stuck di satu bagian spesifik (misal: error TypeScript,
   bingung Zustand selector), tanya ke Claude dengan tunjukkan kode
   yang bermasalah — supaya penjelasannya spesifik ke masalah kamu.

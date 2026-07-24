import { create } from "zustand";
import type { EraCategory } from "../types";

/**
 * ============================================================
 *  MODUL BELAJAR: State Management dengan Zustand
 * ============================================================
 *
 * KENAPA BUTUH INI (bukan cuma useState)?
 * Bayangkan: SearchBar ada di Navbar, tapi hasil filter-nya
 * harus mempengaruhi TimelineList yang letaknya jauh di komponen
 * lain. Kalau pakai useState biasa, kamu harus "angkat" state itu
 * ke komponen paling atas (App.tsx), lalu oper lewat props ke
 * banyak layer komponen di bawahnya. Ini disebut "prop drilling"
 * dan makin banyak komponen, makin ribet.
 *
 * Zustand menyediakan "kotak state global" yang bisa diakses
 * LANGSUNG oleh komponen manapun, tanpa prop drilling, dan tanpa
 * perlu bungkus <Provider> seperti Context API.
 *
 * CARA BACA KODE DI BAWAH:
 * 1. `interface TimelineState` -> definisikan BENTUK state +
 *    fungsi-fungsi yang boleh mengubahnya (disebut "actions").
 * 2. `create<TimelineState>((set, get) => ({ ... }))` -> ini
 *    yang bikin store-nya. `set` dipakai untuk update state,
 *    `get` dipakai untuk membaca state saat ini di dalam action.
 * 3. Di komponen manapun, tinggal panggil:
 *    `const { searchQuery, setSearchQuery } = useTimelineStore();`
 */

interface TimelineState {
  // ---- state (data) ----
  searchQuery: string;
  activeCategory: EraCategory | "all";
  bookmarkedEraIds: string[];

  // ---- actions (fungsi untuk mengubah state) ----
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: EraCategory | "all") => void;
  toggleBookmark: (eraId: string) => void;
  isBookmarked: (eraId: string) => boolean;
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  // nilai awal state
  searchQuery: "",
  activeCategory: "all",
  bookmarkedEraIds: [],

  setSearchQuery: (query) => set({ searchQuery: query }),

  setActiveCategory: (category) => set({ activeCategory: category }),

  toggleBookmark: (eraId) => {
    const current = get().bookmarkedEraIds;
    const alreadyBookmarked = current.includes(eraId);

    set({
      bookmarkedEraIds: alreadyBookmarked
        ? current.filter((id) => id !== eraId) // hapus dari bookmark
        : [...current, eraId], // tambah ke bookmark
    });
  },

  isBookmarked: (eraId) => get().bookmarkedEraIds.includes(eraId),
}));

/**
 * LATIHAN UNTUK KAMU (setelah paham file ini):
 * 1. Tambahkan action `clearFilters()` yang reset searchQuery
 *    jadi "" dan activeCategory jadi "all".
 * 2. Coba persist `bookmarkedEraIds` ke localStorage supaya
 *    tidak hilang saat refresh (hint: cari "zustand persist
 *    middleware" di dokumentasi resminya).
 */

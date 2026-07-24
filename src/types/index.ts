/**
 * ============================================================
 *  MODUL BELAJAR: TypeScript - Mendefinisikan bentuk data
 * ============================================================
 *
 * File ini adalah "kamus tipe data" untuk seluruh aplikasi.
 * Kenapa ini penting untuk dipelajari duluan?
 * Karena begitu tipe-tipe ini didefinisikan, TypeScript akan
 * otomatis mengecek dan mengingatkan kamu kalau ada bagian
 * kode lain yang salah bentuk datanya, SEBELUM kamu run app.
 *
 * Konsep yang dipakai di sini:
 * 1. `interface`      -> mendefinisikan bentuk sebuah object
 * 2. Union type (`|`) -> membatasi nilai hanya boleh salah satu
 *                        dari beberapa pilihan (mirip "enum" tapi
 *                        lebih ringan)
 * 3. Optional prop (`?`) -> field yang boleh tidak ada
 */

// Union type: category cuma boleh diisi salah satu dari nilai-nilai ini.
// Kalau kamu ngetik "categoy" typo atau "Debut" (huruf besar), TypeScript
// akan langsung error merah. Ini yang disebut "type safety".
export type EraCategory =
  | "debut"
  | "comeback"
  | "subunit"
  | "solo"
  | "hiatus"
  | "disband"
  | "reunion";

export interface Member {
  id: string;
  name: string;
  position: string;
}

// Ini "bentuk data" utama untuk satu album/era di timeline.
export interface TimelineEra {
  id: string;
  date: string; // format ISO "YYYY-MM-DD", supaya gampang di-sort
  albumTitle: string;
  eraName: string;
  category: EraCategory;
  description: string;
  tracklist: string[];
  coverColor: string; // dipakai untuk aksen warna big card (hex)
  membersInvolved: string[]; // array of Member['id']
}

export interface Activity {
  id: string;
  memberName: string;
  title: string;
  type: "music" | "acting" | "variety" | "business";
  date: string;
  description: string;
}

export interface Achievement {
  id: string;
  year: number;
  title: string;
  description: string;
}

export interface VarietyShow {
  id: string;
  title: string;
  year: number;
  platform: string;
  posterColor: string;
  synopsis: string;
}

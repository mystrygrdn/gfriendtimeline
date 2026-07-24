import type { VarietyShow } from "../types";

/**
 * Data variety show & konten behind-the-scenes GFRIEND.
 * `posterColor` dipakai sebagai warna gradient poster (bukan foto asli),
 * biar konsisten sama palet GFRIEND HUB tanpa perlu aset gambar eksternal.
 */
export const varietyShows: VarietyShow[] = [
  {
    id: "meotgool",
    title: "GFRIEND's Meotgool",
    year: 2016,
    platform: "MBC Every1",
    posterColor: "#5F4B8B",
    synopsis:
      "Reality show awal karier GFRIEND yang memperlihatkan sisi ceria dan kekompakan keenam member sebelum comeback-comeback besar mereka.",
  },
  {
    id: "real-gfriend",
    title: "Real GFRIEND",
    year: 2017,
    platform: "Naver TV",
    posterColor: "#8672B0",
    synopsis:
      "Web-variety yang mengikuti keseharian member di dorm, dari latihan koreografi sampai momen santai di balik panggung.",
  },
  {
    id: "moon-night-making",
    title: "Time for the Moon Night: MV Making",
    year: 2018,
    platform: "1theK",
    posterColor: "#1F6E8C",
    synopsis:
      "Behind-the-scenes proses syuting music video paling ikonik GFRIEND, lengkap dengan cerita konsep retro di baliknya.",
  },
  {
    id: "cheese-in-the-trap",
    title: "Cheese in the Trap",
    year: 2016,
    platform: "tvN",
    posterColor: "#3D93B4",
    synopsis:
      "Drama adaptasi webtoon populer dengan SinB dalam salah satu peran pendukung, memperluas jangkauan GFRIEND ke dunia akting.",
  },
  {
    id: "hyena-on-the-keyboard",
    title: "Yerin & Umji: Hyena on the Keyboard",
    year: 2019,
    platform: "MBC",
    posterColor: "#3F3061",
    synopsis:
      "Segmen musikal yang menampilkan sisi vokal akustik member, menunjukkan kedalaman musikalitas di luar panggung comeback.",
  },
  {
    id: "season-of-memories-doc",
    title: "Buddy, Our Season of Memories",
    year: 2025,
    platform: "Weverse",
    posterColor: "#C9BBE8",
    synopsis:
      "Dokumenter singkat perjalanan reuni 10 tahun GFRIEND, merekam proses persiapan comeback 'Season of Memories'.",
  },
];

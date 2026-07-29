/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- Palet warna resmi GFRIEND ----
        // Ini didefinisikan di sini (bukan ditulis hex berulang-ulang di
        // tiap komponen) supaya kalau suatu saat mau ubah nuansa warna,
        // cukup ubah di satu tempat.
        ultraviolet: {
          DEFAULT: "#5F4B8B",
          light: "#8672B0",
          dark: "#3F3061",
        },
        scuba: {
          DEFAULT: "#1F6E8C",
          light: "#3D93B4",
          dark: "#134C63",
        },
        cloud: {
          DEFAULT: "#F2EEE6", // background utama, bukan putih polos
          dark: "#E7E1D4",
        },
        ink: "#18151F", // teks gelap utama
        lilac: "#C9BBE8", // glow / garis penghubung timeline
      },
      fontFamily: {
        display: ["Unbounded", "sans-serif"], // judul besar, poster comeback
        body: ["Plus Jakarta Sans", "sans-serif"], // teks isi
        mono: ["IBM Plex Mono", "monospace"], // tanggal & data
      },
      boxShadow: {
        card: "0 20px 60px -15px rgba(95, 75, 139, 0.35)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        twinkle: "twinkle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
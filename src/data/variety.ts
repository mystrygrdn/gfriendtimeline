export interface VarietyShow {
  id: string;
  title: string;
  category: string;
  year: number;
  posterColor: string; // sementara pakai warna solid, nanti bisa diganti path gambar asli
  synopsis: string;
}

export const varietyShows: VarietyShow[] = [
  // ---- Performance ----
  {
    id: "perf-1",
    title: "Rough Comeback Stage",
    category: "Performance",
    year: 2016,
    posterColor: "#5F4B8B",
    synopsis: "Panggung comeback perdana untuk single Rough di M Countdown.",
  },
  {
    id: "perf-2",
    title: "Fingertip Music Bank Stage",
    category: "Performance",
    year: 2018,
    posterColor: "#1F6E8C",
    synopsis: "Penampilan Fingertip yang jadi salah satu comeback stage paling ikonik.",
  },
  {
    id: "perf-3",
    title: "Time for the Moon Night Live",
    category: "Performance",
    year: 2018,
    posterColor: "#8672B0",
    synopsis: "Panggung live Time for the Moon Night dengan koreografi khas GFRIEND.",
  },

  // ---- YouTube Variety Shows ----
  {
    id: "yt-variety-1",
    title: "GFRIEND's Homework",
    category: "YouTube Variety Shows",
    year: 2017,
    posterColor: "#3D93B4",
    synopsis: "Konten reality ringan GFRIEND mengerjakan berbagai tantangan seru.",
  },
  {
    id: "yt-variety-2",
    title: "Bloom Diary",
    category: "YouTube Variety Shows",
    year: 2020,
    posterColor: "#3F3061",
    synopsis: "Vlog keseharian member selama masa promosi album Season of Memories.",
  },

  // ---- MEMORIA ----
  {
    id: "memoria-1",
    title: "MEMORIA: Behind the Curtain",
    category: "MEMORIA",
    year: 2021,
    posterColor: "#5F4B8B",
    synopsis: "Dokumentasi perjalanan GFRIEND menjelang comeback terakhir mereka.",
  },
  {
    id: "memoria-2",
    title: "MEMORIA: Final Bow",
    category: "MEMORIA",
    year: 2021,
    posterColor: "#1F6E8C",
    synopsis: "Momen-momen penutup era GFRIEND yang penuh haru dan kenangan.",
  },

  // ---- Music Videos ----
  {
    id: "mv-1",
    title: "Rough Official MV",
    category: "Music Videos",
    year: 2016,
    posterColor: "#8672B0",
    synopsis: "Music video resmi untuk title track Rough.",
  },
  {
    id: "mv-2",
    title: "Fingertip Official MV",
    category: "Music Videos",
    year: 2018,
    posterColor: "#3D93B4",
    synopsis: "Music video Fingertip dengan visual dan koreografi yang jadi favorit fans.",
  },
  {
    id: "mv-3",
    title: "MAGO Official MV",
    category: "Music Videos",
    year: 2020,
    posterColor: "#3F3061",
    synopsis: "Music video MAGO, comeback dengan konsep dark fantasy.",
  },

  // ---- G-LOG ----
  {
    id: "glog-1",
    title: "G-LOG: Trip to Jeju",
    category: "G-LOG",
    year: 2019,
    posterColor: "#5F4B8B",
    synopsis: "Vlog perjalanan santai member GFRIEND ke Pulau Jeju.",
  },

  // ---- Special Clips ----
  {
    id: "clip-1",
    title: "Backstage Talk: Season of Memories",
    category: "Special Clips",
    year: 2020,
    posterColor: "#1F6E8C",
    synopsis: "Obrolan santai member di balik panggung comeback Season of Memories.",
  },
  {
    id: "clip-2",
    title: "GFRIEND Photobook Making Film",
    category: "Special Clips",
    year: 2019,
    posterColor: "#8672B0",
    synopsis: "Proses pemotretan photobook spesial GFRIEND.",
  },

  // ---- G-ING ----
  {
    id: "ging-1",
    title: "G-ING Episode 1: Welcome",
    category: "G-ING",
    year: 2019,
    posterColor: "#3D93B4",
    synopsis: "Episode perdana konten reality G-ING bersama member GFRIEND.",
  },

  // ---- Song Covers ----
  {
    id: "cover-1",
    title: "GFRIEND Covers - Latata",
    category: "Song Covers",
    year: 2017,
    posterColor: "#3F3061",
    synopsis: "Member GFRIEND membawakan cover lagu grup idol lain.",
  },

  // ---- Others ----
  {
    id: "others-1",
    title: "Fan Meeting Highlight",
    category: "Others",
    year: 2019,
    posterColor: "#5F4B8B",
    synopsis: "Cuplikan momen seru dari fan meeting GFRIEND bersama Buddy.",
  },
];
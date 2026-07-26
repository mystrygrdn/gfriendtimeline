import type { TimelineEra, Member } from "../types";

/**
 * ============================================================
 *  MODUL BELAJAR: memisahkan "data" dari "tampilan"
 * ============================================================
 * Data timeline sengaja ditaruh di file terpisah dari komponen.
 * Ini pola penting: komponen (Timeline.tsx, TimelineCard.tsx)
 * TIDAK PEDULI datanya dari mana asalnya. Nanti kalau kamu mau
 * ganti sumber data ini jadi hasil fetch dari API/CMS, komponen
 * di src/components TIDAK PERLU diubah sama sekali.
 */

export const members: Member[] = [
  {
  id: "sowon",
  name: "Sowon",
  position: "Leader, Vocalist",
  photo: "src/components/images/members/sowon.webp", // atau URL foto
  color: "#5F4B8B",
  socials: {
    instagram: "https://instagram.com/onedayxne",
    youtube: "https://youtube.com/@3beautysowon",
  },
},
  {
  id: "yerin",
  name: "Yerin",
  position: "Center, Vocalist",
  photo: "src/components/images/members/yerin.webp",
  color: "#5F4B8B",
  socials: {
    instagram: "https://instagram.com/every__nn",
    youtube: "https://youtube.com/@Yerin.official",
    x: "https://x.com/@YERIN_OFFICIAL_",
    tiktok: "https://www.tiktok.com/@official_yerin",
  },
},
  {
  id: "eunha",
  name: "Eunha",
  position: "Lead Vocalist",
  photo: "src/components/images/members/eunha.webp",
  color: "#5F4B8B",
  socials: {
    instagram: "https://instagram.com/rlo.ldl",
    soundcloud: "https://soundcloud.com/user-514825100",
  },
  },
  {
  id: "yuju",
  name: "Yuju",
  position: "Main Vocalist",
  photo: "src/components/images/members/yuju.webp",
  color: "#5F4B8B",
  socials: {
    instagram: "https://instagram.com/yuuzth",
    youtube: "https://youtube.com/@YUJU_atarea",
    x: "https://x.com/@YUJU_atarea",
    tiktok: "https://www.tiktok.com/@yuju_atarea",
  },
},
  {
  id: "sinb",
  name: "SinB",
  position: "Main Dancer, Center, Vocalist",
  photo: "src/components/images/members/sinb.webp",
  color: "#5F4B8B",
  socials: {
    instagram: "https://instagram.com/bscenez",
    youtube: "https://www.youtube.com/@%ED%99%A9%EC%9D%80%EB%B9%84%EC%A7%B1",
  },
  },
  {
  id: "umji",
  name: "Umji",
  position: "Maknae, Vocalist",
  photo: "src/components/images/members/umji.webp",
  color: "#5F4B8B",
  socials: {
    instagram: "https://instagram.com/ummmmm_j.i",
    youtube: "https://www.youtube.com/@umazingday",
    tiktok: "https://www.tiktok.com/@umjimuji",
  },
  },
];

const allMemberIds = members.map((m) => m.id);

export const timelineEras: TimelineEra[] = [
  {
    id: "season-of-glass",
    date: "2015-01-15",
    albumTitle: "Season of Glass",
    eraName: "Debut Era",
    category: "debut",
    description:
      "Mini album debut GFRIEND, memperkenalkan konsep sekolah dan cerita 'Glass Bead' yang jadi ciri khas awal grup.",
    tracklist: ["Intro (Season of Glass)", "Glass Bead", "Neverland", "White"],
    coverColor: "#5F4B8B",
    membersInvolved: allMemberIds,
  },
  {
    id: "flower-bud",
    date: "2015-07-23",
    albumTitle: "Flower Bud",
    eraName: "Flower Bud Era",
    category: "comeback",
    description:
      "Comeback pertama, melanjutkan cerita dari Season of Glass dengan title track 'Me Gustas Tu'.",
    tracklist: ["Intro (Flower Bud)", "Me Gustas Tu", "One", "Sunrise"],
    coverColor: "#8672B0",
    membersInvolved: allMemberIds,
  },
  {
    id: "snowflake",
    date: "2016-01-25",
    albumTitle: "Snowflake",
    eraName: "Snowflake Era",
    category: "comeback",
    description: "Comeback musim dingin dengan title track 'Rough'.",
    tracklist: ["Intro (Snowflake)", "Rough", "Trust", "Snowflake"],
    coverColor: "#1F6E8C",
    membersInvolved: allMemberIds,
  },
  {
    id: "lol",
    date: "2016-07-11",
    albumTitle: "LOL",
    eraName: "LOL Era",
    category: "comeback",
    description:
      "Full album pertama GFRIEND, title track 'Navillera' menutup trilogi cerita coming-of-age mereka.",
    tracklist: ["Intro", "Navillera", "Boy", "Water Color"],
    coverColor: "#3D93B4",
    membersInvolved: allMemberIds,
  },
  {
    id: "the-awakening",
    date: "2017-03-06",
    albumTitle: "The Awakening",
    eraName: "The Awakening Era",
    category: "comeback",
    description:
      "Perubahan konsep besar-besaran, lebih dewasa dan kuat, title track 'Fingertip'.",
    tracklist: ["Hear the Wind Song", "Fingertip", "Sea of Love"],
    coverColor: "#3F3061",
    membersInvolved: allMemberIds,
  },
  {
    id: "rainbow",
    date: "2017-09-13",
    albumTitle: "Rainbow",
    eraName: "Rainbow Era",
    category: "comeback",
    description: "Repackage dari Parallel dengan title track 'Rainbow'.",
    tracklist: ["Intro (Belief)", "Rainbow", "I Am"],
    coverColor: "#C9BBE8",
    membersInvolved: allMemberIds,
  },
  {
    id: "time-for-the-moon-night",
    date: "2018-04-30",
    albumTitle: "Time for the Moon Night",
    eraName: "Time for the Moon Night Era",
    category: "comeback",
    description:
      "Salah satu era paling populer GFRIEND, kembali ke konsep manis dengan nuansa retro.",
    tracklist: ["Intro (Daytime)", "Time for the Moon Night", "Sunrise"],
    coverColor: "#5F4B8B",
    membersInvolved: allMemberIds,
  },
  {
    id: "sunny-summer",
    date: "2018-07-19",
    albumTitle: "Sunny Summer",
    eraName: "Summer Special",
    category: "subunit",
    description: "Mini album spesial musim panas dengan title track 'Sunny Summer'.",
    tracklist: ["Sunny Summer", "Bestie", "Season of Love"],
    coverColor: "#1F6E8C",
    membersInvolved: allMemberIds,
  },
  {
    id: "walpurgis-night",
    date: "2020-11-09",
    albumTitle: "回:Walpurgis Night",
    eraName: "Walpurgis Night Era",
    category: "comeback",
    description:
      "Album studio terakhir sebelum hiatus, title track 'MAGO' membawa tema pemberdayaan perempuan.",
    tracklist: ["Intro", "MAGO", "Apple", "Crossroads"],
    coverColor: "#18151F",
    membersInvolved: allMemberIds,
  },
  {
    id: "hiatus-2021",
    date: "2021-05-22",
    albumTitle: "—",
    eraName: "Hiatus",
    category: "hiatus",
    description:
      "Kontrak keenam member dengan Source Music berakhir dan tidak diperpanjang; masing-masing member melanjutkan aktivitas individu.",
    tracklist: [],
    coverColor: "#8672B0",
    membersInvolved: allMemberIds,
  },
  {
    id: "season-of-memories",
    date: "2025-01-13",
    albumTitle: "Season of Memories",
    eraName: "10th Anniversary Reunion",
    category: "reunion",
    description:
      "Single album spesial merayakan 10 tahun debut, comeback pertama keenam member bersama sejak 2020.",
    tracklist: ["Season of Memories"],
    coverColor: "#5F4B8B",
    membersInvolved: allMemberIds,
  },
];

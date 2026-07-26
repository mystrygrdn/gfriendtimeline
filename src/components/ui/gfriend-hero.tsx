import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import AlbumDetailModal from "./album-detail-modal";

/**
 * ============================================================
 *  GfriendHero — diadaptasi dari referensi "horizon-hero-section"
 * ============================================================
 * Perbedaan dari referensi asli:
 * - Starfield & nebula direcolor pakai palet GFRIEND (ultraviolet/
 *   scuba/lilac), bukan biru-emas generik.
 * - "Mountains" 3D + post-processing bloom dihapus supaya lebih
 *   ringan & stabil, diganti glow gradient CSS di belakang teks.
 * - Progress scroll dihitung dari TINGGI KONTAINER INI SENDIRI
 *   (bukan seluruh document), lewat elemen `sticky`, supaya efek
 *   ini tetap terkontrol walau ada konten lain di bawahnya.
 * - Tiap section (kalau ada `album`-nya) dapet tombol "Album Details"
 *   yang buka popup — bukan pindah halaman — isinya galeri foto ala
 *   polaroid (bisa di-drag), tracklist, dan achievement.
 * - Warna & posisi kamera tiap section DI-GENERATE OTOMATIS dari
 *   panjang `rawSections` (lihat `colorAtProgress` & `cameraPositions`
 *   di bawah), jadi selalu proporsional berapa pun banyaknya era.
 * - SEMUA judul, TANPA KECUALI, pakai satu ukuran font yang sama dan
 *   satu animasi yang sama (fade + slide). Judul yang kepanjangan
 *   (kayak "Memoria / 夜 (Time for the moon night)") cukup wrap ke
 *   baris kedua secara natural, gak dikecilin/dibedain sama sekali -
 *   biar konsisten dari section pertama sampai terakhir.
 */

interface AlbumData {
  cover: string; // path/URL foto cover utama - taruh file asli di /public/albums/...
  teasers?: string[]; // foto-foto tambahan buat galeri polaroid
  tracklist: string[];
  achievements?: string[];
}

interface HeroSection {
  eyebrow: string;
  title: string;
  lines: string[];
  color: string; // hex, dipakai untuk nebula/starfield tint & glow
  album?: AlbumData; // opsional - kalau ada, tombol "Album Details" muncul
}

// Data mentah tiap era - TANPA `color`, soalnya warnanya di-generate
// otomatis di bawah berdasarkan posisi era ini di sepanjang timeline.
const rawSections: Omit<HeroSection, "color">[] = [
  {
    eyebrow: "2015 — Forever",
    title: "GFRIEND",
    lines: ["Six Voices, One Journey.", "From Season of Glass to Season of Memories."],
    // section intro sengaja gak dikasih `album`, jadi tombolnya gak muncul di sini
  },
  {
    eyebrow: "Debut  · 15 Jan 2015",
    title: "SEASON OF GLASS",
    lines: ["A debut wrapped in schoolyard innocence,", "framed by the fragile shimmer of a glass bead."],
    album: {
      cover: "/albums/season-of-glass/cover.jpg",
      teasers: [
        "/albums/season-of-glass/teaser-1.jpg",
        "/albums/season-of-glass/teaser-2.jpg",
        "/albums/season-of-glass/teaser-3.jpg",
      ],
      tracklist: ["Intro (Season of Glass)", "Glass Bead", "Neverland", "White", "Glass Bead (Instrumental)"],
      achievements: [
        "Debut mini album, memperkenalkan konsep 'Glass Bead'",
        "Title track masuk chart musik digital domestik",
      ],
    },
  },
  {
    eyebrow: "The 2nd Mini Album · 23 Jul 2015",
    title: "FLOWER BUD",
    lines: ["Blooming into their brightest colors,", "a whirlwind crush wrapped in sunny rhythm."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Intro (Flower Bud)", "Me Gustas Tu", "Under the Sky", "One", "My Buddy", "Me Gustas Tu (Instrumental)"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 3rd Mini Album · 25 Jan 2016",
    title: "SNOWFLAKE",
    lines: ["A colder, sharper edge emerges,", "vulnerability dressed in a bolder sound."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Intro (Snowflake)", "Rough", "Say my name", "Luv Star", "Someday", "TRUST", "Rough (Inst.)"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 1st Studio Albums · 11 Jul 2016",
    title: "LOL",
    lines: ["Laughter and heartbreak intertwined,", "a fuller sound for a fuller story."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["INTRO", "Fall in Love", "NAVILLERA", "LOL", "Distance", "Water Flower", "Mermaid", "Sunshine", "Compas", "Click", "Gone with the wind", "NAVILLERA (Instrumental)"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 4th Mini Album  · 6 Mar 2017",
    title: "THE AWAKENING",
    lines: ["Stepping out of the schoolyard for good,", "a quiet awakening into womanhood."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Hear The Wind Sing", "FINGERTIP", "Contrail", "Please Save My Earth", "Rain In The Spring Time", "Crush"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 5th Mini Album · 1 Aug 2017",
    title: "PARALLEL",
    lines: ["A fairytale whispered just for two,", "innocence and longing walking side by side."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["INTRO (BELIEF)", "LOVE WHISPER", "AVE MARIA", "ONE-HALF", "LIFE IS A PARTY", "RED UMBRELLA", "FALLING ASLEEP AGAIN", "LOVE WHISPER (Instrumental)"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 1st Repackage Album · 13 Sep 2017",
    title: "RAINBOW",
    lines: ["Color returns after the rain,", "a rainbow repackaged with new light."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Intro (Belief)", "Love Whisper", "Summer Rain", "Rainbow", "Ave Maria", "One-Half", "Life Is A Party", "Red Umbrella", "Falling Asleep Again", "Summer Rain (Intstrumental)"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 6th Mini Album · 30 Apr 2018",
    title: "TIME FOR THE MOON NIGHT",
    lines: ["Under a moonlit sky they gather,", "a fantasy spun from starlight and longing."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Intro (Daytime)", "Time for the moon night", "Love Bug", "Flower Garden", "Tik Tik", "Bye", "You are my star", "Time for the moon night (Intstrumental)"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 1st Japanese Best Album  · 23 May 2018",
    title: "GFRIEND 1st BEST",
    lines: ["Their story retold in another tongue,", "a first best-of for fans across the sea."],
    album: {
      cover: "/albums/season-of-glass/cover.jpg",
      teasers: [
        "/albums/season-of-glass/teaser-1.jpg",
        "/albums/season-of-glass/teaser-2.jpg",
        "/albums/season-of-glass/teaser-3.jpg",
      ],
      tracklist: ["Glass Bead -JP ver.-", "Me Gustas Tu -JP ver.-", "Rough -JP ver.-", "NAVILLERA -JP ver.-", "Love Whisper -JP ver.-", "TRUST -JP ver.-"],
      achievements: [
        "Debut mini album, memperkenalkan konsep 'Glass Bead'",
        "Title track masuk chart musik digital domestik",
      ],
    },
  },
  {
    eyebrow: "The 7th Mini Album · 19 Jul 2018",
    title: "SUNNY SUMMER",
    lines: ["A bright detour into summer sunshine,", "lighthearted days before the season turns."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Sunny Summer", "Vacation", "Sweety", "Windy Windy", "Love In The Air"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 1st Japanese Single · 25 Jan 2016",
    title: "Memoria / 夜 (Time for the moon night)",
    lines: ["A memory carried across borders,", "a night that lingers long after it ends."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Memoria", "Time for the moon night -JP ver.-"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 2nd Studio Album · 14 Jan 2019",
    title: "TIME FOR US",
    lines: ["Six voices finding their own time,", "an album built for growing up together."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Sunrise", "You are not alone", "L.U.V.", "GLOW", "Our Secret", "Only 1", "Truly Love", "Show Up", "It's You", "A Starry Sky", "Love Oh Love", "Memoria (Korean Ver.)", "Sunrise (Instrumental)"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 2nd Japanese Single  · 13 Feb 2019",
    title: "SUNRISE",
    lines: ["A new dawn opens over old ground,", "hope rising quietly with the morning light."],
    album: {
      cover: "/albums/season-of-glass/cover.jpg",
      teasers: [
        "/albums/season-of-glass/teaser-1.jpg",
        "/albums/season-of-glass/teaser-2.jpg",
        "/albums/season-of-glass/teaser-3.jpg",
      ],
      tracklist: ["Sunrise -JP ver.-", "La pam pam", "Sunrise (Instrumental)", "La pam pam (Instrumental)"],
      achievements: [
        "Debut mini album, memperkenalkan konsep 'Glass Bead'",
        "Title track masuk chart musik digital domestik",
      ],
    },
  },
  {
    eyebrow: "The 3rd Japanese Single · 13 Mar 2019",
    title: "FLOWER",
    lines: ["A single bloom carried overseas,", "beauty translated into a new language."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["FLOWER", "Beautiful", "FLOWER (Instrumental)", "Beautiful (Instrumental)"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 8th Mini Album · 1 Jul 2019",
    title: "FEVER SEASON",
    lines: ["A fever of color after the heat,", "playful again, but wiser than before."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Fever", "Mr. Blue", "Smile", "Wish", "Paradise", "Hope", "FLOWER (Korean Version)", "Fever (Instrumental)"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 1st Japanese Studio Album · 13 Nov 2019",
    title: "FALLIN' LIGHT",
    lines: ["Falling gently into softer light,", "a full-length letter written just for Japan."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Fallin' Light", "Emotional Days", "Memoria", "The Beginning of Love", "Flower", "My My My!", "Time for the moon night -JP ver.-", "Sunrise -JP ver.-", "La pam pam", "Beautiful", "My Buddy -JP ver.-"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 9th Mini Album  · 3 Feb 2020",
    title: "回:LABYRINTH",
    lines: ["Wandering deeper into a maze of feeling,", "their first step into a darker, braver sound."],
    album: {
      cover: "/albums/season-of-glass/cover.jpg",
      teasers: [
        "/albums/season-of-glass/teaser-1.jpg",
        "/albums/season-of-glass/teaser-2.jpg",
        "/albums/season-of-glass/teaser-3.jpg",
      ],
      tracklist: ["Labyrinth", "Crossroads", "Here We Are", "Eclipse", "Dreamcatcher", "From Me"],
      achievements: [
        "Debut mini album, memperkenalkan konsep 'Glass Bead'",
        "Title track masuk chart musik digital domestik",
      ],
    },
  },
  {
    eyebrow: "The 10th Mini Album · 13 Jul 2020",
    title: "回:Song of the Sirens",
    lines: ["A siren's song pulling them somewhere new,", "temptation dressed in their boldest color yet."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Apple", "Eye of the Storm", "Room of Mirrors", "Tarot Cards", "Crème Brûlée", "Stairs in The North"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 3rd Studio Album · 9 Nov 2020",
    title: "回:Walpurgis Night",
    lines: ["A night of spells before the long silence,", "their most daring chapter, cast just before dawn."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["MAGO", "Love Spell", "Three Of Cups", "GRWM", "Secret Diary", "Better Me", "Night Drive", "Apple", "Crossroads", "Labyrinth", "Wheel of the year"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The Special Album · 13 Jan 2025",
    title: "SEASON OF MEMORIES",
    lines: ["Ten years later, the circle closes,", "six voices returning to where it all began."],
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Season of Memories", "Always"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
];

// Palet warna acuan buat era-era GFRIEND: dari ungu tua yang dingin
// (debut) -> lebih hangat/ceria (kejayaan) -> lilac terang (rilisan
// Jepang/side track) -> balik lagi ke ungu tua di penghujung (reunion,
// biar terasa "pulang" ke nuansa awal). Warna tiap section nanti
// di-interpolasi otomatis dari sini berdasarkan POSISI section itu di
// sepanjang timeline (lihat `colorAtProgress`), jadi kalau nanti kamu
// nambah/ngurangin era, warnanya otomatis ikut nyesuain proporsinya -
// gak perlu di-hardcode manual satu-satu lagi.
const ERA_PALETTE = [
  "#5F4B8B", // ultraviolet gelap - era debut
  "#1F6E8C", // scuba - kejayaan awal, ceria
  "#8672B0", // ungu lilac - pertengahan
  "#3D93B4", // scuba muda - era matang
  "#C9BBE8", // lilac terang - rilisan Jepang / side track
  "#5F4B8B", // balik ke ultraviolet - reunion, "pulang ke awal"
];

function colorAtProgress(progress: number) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const segment = clamped * (ERA_PALETTE.length - 1);
  const idx = Math.min(Math.floor(segment), ERA_PALETTE.length - 2);
  const local = segment - idx;
  const mixed = new THREE.Color(ERA_PALETTE[idx]).lerp(
    new THREE.Color(ERA_PALETTE[idx + 1]),
    local
  );
  return `#${mixed.getHexString()}`;
}

const sections: HeroSection[] = rawSections.map((section, i) => ({
  ...section,
  color: colorAtProgress(
    rawSections.length > 1 ? i / (rawSections.length - 1) : 0
  ),
}));

// Lintasan kamera di-generate otomatis mengikuti PANJANG timeline
// (sections.length) - bukan array statis 4 posisi yang diulang-ulang.
// Diulang bikin kamera kerasa "loncat balik" tiap 4 section sekali;
// sekarang kamera terus bergerak maju (z makin negatif/menjauh) secara
// konsisten dari awal sampai akhir timeline, dengan sedikit ayunan
// halus di x/y biar gak terasa monoton lurus kayak rel kereta.
const cameraPositions = sections.map((_, i) => {
  const t = sections.length > 1 ? i / (sections.length - 1) : 0;
  return {
    x: Math.sin(i * 0.8) * 10,
    y: 15 + Math.sin(i * 0.5) * 12,
    z: 140 - t * 680,
  };
});

function hexToVec3(hex: string) {
  const c = new THREE.Color(hex);
  return c;
}

export default function GfriendHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [sectionIndex, setSectionIndex] = useState(0);
  const [, setReady] = useState(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  const three = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    animId: number | null;
    targetCam: { x: number; y: number; z: number };
    smoothCam: { x: number; y: number; z: number };
    targetColor: THREE.Color;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    stars: [],
    nebula: null,
    animId: null,
    targetCam: { x: 0, y: 15, z: 140 },
    smoothCam: { x: 0, y: 15, z: 140 },
    targetColor: new THREE.Color(sections[0].color),
  });

  // ---- init three.js scene ----
  useEffect(() => {
    const refs = three.current;
    if (!canvasRef.current) return;

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x18151f, 0.0018);

    refs.camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    refs.camera.position.set(0, 15, 140);

    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.9;

    // starfield — 2 layers, tinted lilac/ultraviolet/scuba
    const starCount = 2200;
    for (let i = 0; i < 2; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      const palette = [
        new THREE.Color("#C9BBE8"),
        new THREE.Color("#8672B0"),
        new THREE.Color("#3D93B4"),
        new THREE.Color("#F2EEE6"),
      ];

      for (let j = 0; j < starCount; j++) {
        const radius = 150 + Math.random() * 700;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        const color = palette[Math.floor(Math.random() * palette.length)];
        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;

        sizes[j] = Math.random() * 2 + 0.5;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 pos = position;
            float angle = time * 0.03 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const stars = new THREE.Points(geometry, material);
      refs.scene.add(stars);
      refs.stars.push(stars);
    }

    // nebula plane, tint interpolates towards current section color
    const nebulaGeo = new THREE.PlaneGeometry(4000, 2000, 60, 60);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color("#5F4B8B") },
        color2: { value: new THREE.Color("#1F6E8C") },
        opacity: { value: 0.22 },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elevation = sin(pos.x * 0.008 + time) * cos(pos.y * 0.008 + time) * 16.0;
          pos.z += elevation;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        void main() {
          float mixFactor = sin(vUv.x * 8.0 + time) * cos(vUv.y * 8.0 + time);
          vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          gl_FragColor = vec4(color, max(alpha, 0.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.z = -500;
    refs.scene.add(nebula);
    refs.nebula = nebula;

    const animate = () => {
      refs.animId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      refs.stars.forEach((s) => {
        const mat = s.material as THREE.ShaderMaterial;
        if (mat.uniforms) mat.uniforms.time.value = time;
      });

      if (refs.nebula) {
        const mat = refs.nebula.material as THREE.ShaderMaterial;
        if (mat.uniforms) {
          mat.uniforms.time.value = time * 0.4;
          const c2 = mat.uniforms.color2.value as THREE.Color;
          c2.lerp(refs.targetColor, 0.03);
        }
      }

      // smooth camera follow
      const smoothing = 0.06;
      refs.smoothCam.x += (refs.targetCam.x - refs.smoothCam.x) * smoothing;
      refs.smoothCam.y += (refs.targetCam.y - refs.smoothCam.y) * smoothing;
      refs.smoothCam.z += (refs.targetCam.z - refs.smoothCam.z) * smoothing;

      if (refs.camera) {
        const floatX = Math.sin(time * 0.12) * 1.5;
        const floatY = Math.cos(time * 0.16) * 0.8;
        refs.camera.position.set(
          refs.smoothCam.x + floatX,
          refs.smoothCam.y + floatY,
          refs.smoothCam.z
        );
        refs.camera.lookAt(0, 10, refs.smoothCam.z - 300);
      }

      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera);
      }
    };
    animate();
    setReady(true);

    const handleResize = () => {
      if (!refs.camera || !refs.renderer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (refs.animId) cancelAnimationFrame(refs.animId);
      refs.stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }
      refs.renderer?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- scroll progress, scoped to this container only ----
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const maxScroll = el.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrolled / Math.max(maxScroll, 1), 0), 1);

      const totalProgress = progress * (sections.length - 1);
      const idx = Math.min(Math.floor(totalProgress), sections.length - 1);
      const localProgress = totalProgress - idx;

      setSectionIndex(idx);

      const refs = three.current;
      const current = cameraPositions[idx] ?? cameraPositions[0];
      const next = cameraPositions[idx + 1] ?? current;
      refs.targetCam = {
        x: current.x + (next.x - current.x) * localProgress,
        y: current.y + (next.y - current.y) * localProgress,
        z: current.z + (next.z - current.z) * localProgress,
      };
      refs.targetColor = hexToVec3(sections[idx].color);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const active = sections[sectionIndex];

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${sections.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Glow tint behind text, transisi warna per section */}
        <div
          className="pointer-events-none absolute inset-0 transition-colors duration-1000"
          style={{
            background: `radial-gradient(60% 50% at 50% 45%, ${active.color}33, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.eyebrow}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-lilac mb-4"
            >
              {active.eyebrow}
            </motion.div>
          </AnimatePresence>

          {/* Judul - satu ukuran font & satu animasi (fade + slide) yang
              SAMA PERSIS buat semua section, gak ada pengecualian. Judul
              panjang cukup wrap natural ke baris kedua. */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-cloud leading-tight tracking-tight max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={active.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5 }}
                className="block"
              >
                {active.title}
              </motion.span>
            </AnimatePresence>
          </h1>

          <div className="mt-6 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.lines.join("-")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                {active.lines.map((line) => (
                  <p key={line} className="font-body text-cloud/70 text-sm md:text-base">
                    {line}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tombol popup album - cuma muncul kalau section ini punya `album`.
              Sengaja BUKAN <Link>/navigasi halaman, cuma buka state modal. */}
          <AnimatePresence mode="wait">
            {active.album && (
              <motion.button
                key={`album-btn-${active.title}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                onClick={() => setIsAlbumOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-full border
                  border-cloud/30 bg-cloud/10 px-6 py-2.5 font-body text-sm text-cloud
                  backdrop-blur-sm transition-colors hover:bg-cloud hover:text-ink"
              >
                Album Details
                <IconArrowRight className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Popup detail album - ditaruh di luar div sticky/overflow-hidden
          supaya render-nya gak ke-clip, walau posisinya `fixed`. */}
      <AnimatePresence>
        {isAlbumOpen && active.album && (
          <AlbumDetailModal
            album={{
              eyebrow: active.eyebrow,
              title: active.title,
              color: active.color,
              cover: active.album.cover,
              teasers: active.album.teasers,
              tracklist: active.album.tracklist,
              achievements: active.album.achievements,
            }}
            onClose={() => setIsAlbumOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
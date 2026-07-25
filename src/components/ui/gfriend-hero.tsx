import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
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
 * - Tiap section (kalau ada `album`-nya) dapet tombol "Lihat Detail
 *   Album" yang buka popup — bukan pindah halaman — isinya galeri
 *   foto ala polaroid (bisa di-drag), tracklist, dan achievement.
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
  album?: AlbumData; // opsional - kalau ada, tombol "Lihat Detail Album" muncul
}

const sections: HeroSection[] = [
  {
    eyebrow: "2015 — Forever",
    title: "GFRIEND",
    lines: ["Six Voices, One Journey.", "From Season of Glass to Today."],
    color: "#8672B0",
    // section intro sengaja gak dikasih `album`, jadi tombolnya gak muncul di sini
  },
  {
    eyebrow: "Debut  · 15 Jan 2015",
    title: "SEASON OF GLASS",
    lines: ["Kisah dimulai di lorong sekolah,", "dari setangkai 'Glass Bead'."],
    color: "#5F4B8B",
    album: {
      cover: "/albums/season-of-glass/cover.jpg",
      teasers: [
        "/albums/season-of-glass/teaser-1.jpg",
        "/albums/season-of-glass/teaser-2.jpg",
        "/albums/season-of-glass/teaser-3.jpg",
      ],
      tracklist: ["Intro (Season of Glass)", "Glass Bead", "Neverland", "White"],
      achievements: [
        "Debut mini album, memperkenalkan konsep 'Glass Bead'",
        "Title track masuk chart musik digital domestik",
      ],
    },
  },
  {
    eyebrow: "The 2nd Mini Album · 23 Jul 2015",
    title: "FLOWER BUD",
    lines: ["Nuansa retro manis di bawah cahaya bulan —", "puncak kejayaan GFRIEND."],
    color: "#1F6E8C",
    album: {
      cover: "/albums/flower-bud/cover.jpg",
      teasers: [
        "/albums/flower-bud/teaser-1.jpg",
        "/albums/flower-bud/teaser-2.jpg",
      ],
      tracklist: ["Luv Star", "Me Gustas Tu", "One", "Trust"],
      achievements: ["Comeback pertama, mulai dikenal luas lewat 'Me Gustas Tu'"],
    },
  },
  {
    eyebrow: "The 3rd Mini Album · 25 Jan 2016",
    title: "SNOWFLAKE",
    lines: ["Sepuluh tahun kemudian,", "keenam Buddy kembali bersama."],
    color: "#3D93B4",
    // TODO: isi `album` di sini kalau mau tombolnya aktif juga, formatnya
    // sama kayak SEASON OF GLASS / FLOWER BUD di atas.
  },
  {
    eyebrow: "The 1st Studio Albums · 11 Jul 2016",
    title: "LOL",
    lines: ["Six Voices, One Journey.", "From Season of Glass to Today."],
    color: "#8672B0",
  },
  {
    eyebrow: "The 4th Mini Album  · 6 Mar 2017",
    title: "THE AWAKENING",
    lines: ["Kisah dimulai di lorong sekolah,", "dari setangkai 'Glass Bead'."],
    color: "#5F4B8B",
  },
  {
    eyebrow: "The 5th Mini Album · 1 Aug 2017",
    title: "PARALLEL",
    lines: ["Nuansa retro manis di bawah cahaya bulan —", "puncak kejayaan GFRIEND."],
    color: "#1F6E8C",
  },
  {
    eyebrow: "The 1st Repackage Album · 13 Sep 2017",
    title: "RAINBOW",
    lines: ["Sepuluh tahun kemudian,", "keenam Buddy kembali bersama."],
    color: "#3D93B4",
  },
];

const cameraPositions = [
  { x: 0, y: 15, z: 140 },
  { x: 0, y: 25, z: 40 },
  { x: 0, y: 20, z: -60 },
  { x: 0, y: 30, z: -160 },
  { x: 0, y: 15, z: 140 },
  { x: 0, y: 25, z: 40 },
  { x: 0, y: 20, z: -60 },
  { x: 0, y: 30, z: -160 },
];

function hexToVec3(hex: string) {
  const c = new THREE.Color(hex);
  return c;
}

export default function GfriendHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  const [sectionIndex, setSectionIndex] = useState(0);
  const [ready, setReady] = useState(false);
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

  // ---- gsap intro entrance ----
  useEffect(() => {
    if (!ready) return;
    const tl = gsap.timeline();
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".title-char");
      tl.from(chars, {
        y: 120,
        opacity: 0,
        duration: 1.1,
        stagger: 0.04,
        ease: "power4.out",
      });
    }
    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll(".subtitle-line");
      tl.from(
        lines,
        { y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
        "-=0.6"
      );
    }
    return () => {
      tl.kill();
    };
  }, [ready]);

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

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="title-char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

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

          <h1
            ref={titleRef}
            className="font-display text-4xl sm:text-6xl md:text-8xl font-extrabold text-cloud leading-none tracking-tight"
          >
            {sectionIndex === 0 ? (
              splitChars(active.title)
            ) : (
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
            )}
          </h1>

          <div ref={subtitleRef} className="mt-6 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.lines.join("-")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                {active.lines.map((line) => (
                  <p key={line} className="subtitle-line font-body text-cloud/70 text-sm md:text-base">
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
                Lihat Detail Album
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
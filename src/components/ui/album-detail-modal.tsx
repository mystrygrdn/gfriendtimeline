import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconX, IconTrophy, IconPhoto } from "@tabler/icons-react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { DraggableCardContainer, DraggableCardBody } from "./draggable-card";

// Foto boleh dikirim sebagai string biasa (default: persegi, kayak
// sebelumnya) ATAU sebagai object kalau mau atur orientasinya sendiri.
export type AlbumPhoto =
  | string
  | { src: string; orientation?: "square" | "landscape" | "portrait" };

export interface AlbumDetail {
  eyebrow: string;
  title: string;
  color: string;
  cover: AlbumPhoto;
  teasers?: AlbumPhoto[];
  tracklist: string[];
  achievements?: string[];
}

const ROTATIONS = [
  "-rotate-6",
  "rotate-3",
  "-rotate-2",
  "rotate-6",
  "rotate-2",
  "-rotate-4",
];

// Ubah bentuk apa pun (string atau object) jadi bentuk seragam,
// default-nya "square" biar kompatibel sama data lama kamu.
function normalizePhoto(photo: AlbumPhoto) {
  if (typeof photo === "string") {
    return { src: photo, orientation: "square" as const };
  }
  return { src: photo.src, orientation: photo.orientation ?? "square" };
}

// Tiap orientasi punya rasio + lebar kartu beda, biar landscape gak
// kepaksa muat di kotak persegi yang sempit.
const ORIENTATION_STYLES = {
  square: { aspect: "aspect-square", width: "w-28 sm:w-32 md:w-36" },
  landscape: { aspect: "aspect-[4/3]", width: "w-36 sm:w-44 md:w-52" },
  portrait: { aspect: "aspect-[3/4]", width: "w-24 sm:w-28 md:w-32" },
};

export default function AlbumDetailModal({
  album,
  onClose,
}: {
  album: AlbumDetail;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useOutsideClick(panelRef, onClose);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const photos = [album.cover, ...(album.teasers ?? [])].map(normalizePhoto);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-md px-4 py-8"
    >
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden
          rounded-[28px] bg-cloud shadow-card md:max-h-[85vh] md:grid-cols-2"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center
            rounded-full border border-ink/10 bg-cloud/90 text-ink/60 transition-colors
            hover:bg-white hover:text-ink"
        >
          <IconX className="h-4 w-4" />
        </button>

        <div
          className="relative h-64 overflow-hidden md:h-full md:min-h-[420px]"
          style={{
            background: `radial-gradient(120% 100% at 50% 0%, ${album.color}22, transparent 70%)`,
          }}
        >
          <DraggableCardContainer className="absolute inset-0">
            {photos.map((photo, i) => (
              <DraggableCardBody
                key={photo.src + i}
                className={`absolute ${ORIENTATION_STYLES[photo.orientation].width} ${ROTATIONS[i % ROTATIONS.length]}`}
                style={{
                  left: `${12 + (i % 3) * 24}%`,
                  top: `${10 + Math.floor(i / 3) * 32}%`,
                }}
              >
                <PolaroidImage
                  src={photo.src}
                  color={album.color}
                  label={i === 0 ? "Cover" : `Teaser ${i}`}
                  aspectClass={ORIENTATION_STYLES[photo.orientation].aspect}
                />
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>

        <div className="overflow-y-auto p-6 md:p-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-scuba">
            {album.eyebrow}
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
            {album.title}
          </h2>

          <div className="mt-8">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-ink/40">
              Tracklist
            </h3>
            <ul className="space-y-2">
              {album.tracklist.map((track, i) => (
                <li key={track} className="flex gap-3 font-body text-sm text-ink/80">
                  <span className="font-mono text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {track}
                </li>
              ))}
            </ul>
          </div>

          {album.achievements && album.achievements.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-ink/40">
                Achievement
              </h3>
              <ul className="space-y-2">
                {album.achievements.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-body text-sm text-ink/80">
                    <IconTrophy className="mt-0.5 h-4 w-4 shrink-0 text-ultraviolet" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function PolaroidImage({
  src,
  color,
  label,
  aspectClass,
}: {
  src: string;
  color: string;
  label: string;
  aspectClass: string;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="rounded-md border border-white/60 bg-white p-2 pb-5 shadow-card">
      <div
        className={`relative ${aspectClass} overflow-hidden rounded-sm`}
        style={{ backgroundColor: `${color}22` }}
      >
        {!broken ? (
          <img
            src={src}
            alt={label}
            draggable={false}
            onError={() => setBroken(true)}
            className="pointer-events-none h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ color }}>
            <IconPhoto className="h-7 w-7 opacity-40" />
          </div>
        )}
      </div>
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-ink/40">
        {label}
      </p>
    </div>
  );
}
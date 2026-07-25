import { createContext, useContext, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * DraggableCard — diadaptasi dari referensi Aceternity, tapi ditulis ulang
 * pakai kapabilitas `drag` bawaan framer-motion (yang udah jadi dependency
 * project ini), jadi gak perlu tambah library baru.
 *
 * Beda dari referensi asli:
 * - Container nyediain `dragConstraints` lewat Context, supaya foto gak
 *   bisa ke-drag keluar dari kotak popup (di referensi aslinya bebas
 *   penuh 1 layar, di sini kotaknya kecil jadi perlu dibatasi).
 * - Rotasi dihitung dari posisi drag (x/y), bukan tracking mouse 3D
 *   penuh — cukup buat kesan "polaroid ditumpuk di atas meja", tapi
 *   jauh lebih ringan.
 */

const DragConstraintsContext =
  createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <DragConstraintsContext.Provider value={containerRef}>
      <div ref={containerRef} className={cn(className)}>
        {children}
      </div>
    </DragConstraintsContext.Provider>
  );
};

export const DraggableCardBody = ({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => {
  const constraintsRef = useContext(DragConstraintsContext);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Rotasi ngikutin seberapa jauh kartu ditarik dari posisi asal —
  // makin ditarik ke kanan/bawah, makin miring. Di-spring biar halus.
  const rotateRaw = useTransform([x, y], ([latestX, latestY]: number[]) => {
    return latestX / 20 - latestY / 30;
  });
  const rotate = useSpring(rotateRaw, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef ?? undefined}
      dragElastic={0.35}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 24 }}
      whileTap={{ scale: 1.08, zIndex: 30 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{ ...style, x, y, rotate }}
      className={cn(
        "cursor-grab select-none touch-none active:cursor-grabbing",
        isDragging && "z-30",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
import { cn } from "../../lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

/**
 * FloatingDock — diadaptasi dari Aceternity UI untuk dipakai sebagai
 * menu navigasi utama GFRIEND HUB. Bedanya dari versi asli:
 * - <a href> diganti <NavLink to> supaya terintegrasi react-router
 * - Warna diselaraskan ke palet ultraviolet/scuba/cloud
 * - Item aktif (halaman yang sedang dibuka) mendapat aksen warna
 * - Container desktop `items-center` + magnify max dikecilin, supaya
 *   ikon yang membesar gak nongol keluar dari pil-nya sendiri.
 * - Tooltip label (nama menu pas di-hover) sekarang muncul DI BAWAH
 *   ikon, bukan di atas — soalnya dock ini sekarang nempel di paling
 *   atas layar (header fixed), jadi ruang di atas ikon kehabisan
 *   tempat dan labelnya kepotong sama tepi browser.
 */
export type DockItem = {
  title: string;
  icon: React.ReactNode;
  to: string;
};

export const FloatingDock = ({
  items,
  className,
  mobileClassName,
}: {
  items: DockItem[];
  className?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={className} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="dock-mobile-nav"
            className="absolute bottom-full right-0 mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => {
              const isActive = location.pathname === item.to;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: idx * 0.04 },
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: { delay: (items.length - 1 - idx) * 0.04 },
                  }}
                >
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full shadow-card border",
                      isActive
                        ? "bg-ultraviolet border-ultraviolet text-cloud"
                        : "bg-cloud border-white/60 text-ink/60"
                    )}
                  >
                    <div className="h-5 w-5">{item.icon}</div>
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Buka menu"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 border border-white/60 shadow-card"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "h-5 w-5 text-ultraviolet transition-transform",
            open && "rotate-90"
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 items-center gap-3 rounded-2xl px-4 py-3",
        "bg-white/60 backdrop-blur-md border border-white/50 shadow-card",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  to,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  to: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 28, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 28, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <NavLink to={to}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full transition-colors",
          isActive ? "bg-ultraviolet" : "bg-cloud-dark hover:bg-white"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -6, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -6, x: "-50%" }}
              className="absolute top-full left-1/2 mt-2 w-fit whitespace-pre rounded-md
                border border-white/50 bg-white/90 px-2.5 py-0.5 text-xs font-body
                font-medium text-ink shadow-card"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={cn(
            "flex items-center justify-center",
            isActive ? "text-cloud" : "text-ultraviolet-dark"
          )}
        >
          {icon}
        </motion.div>
      </motion.div>
    </NavLink>
  );
}
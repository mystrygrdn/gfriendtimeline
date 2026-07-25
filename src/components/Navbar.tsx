import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  IconHome2,
  IconUsers,
  IconTrophy,
  IconDeviceTv,
} from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";
import type { DockItem } from "./ui/floating-dock";

const dockItems: DockItem[] = [
  { title: "Timeline", icon: <IconHome2 className="h-full w-full" />, to: "/" },
  { title: "Activities", icon: <IconUsers className="h-full w-full" />, to: "/activities" },
  { title: "Achievements", icon: <IconTrophy className="h-full w-full" />, to: "/achievements" },
  { title: "Variety Shows", icon: <IconDeviceTv className="h-full w-full" />, to: "/variety" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  // Sembunyi pas scroll ke bawah, muncul lagi pas scroll ke atas (walau
  // cuma dikit). Di dekat paling atas halaman, dipaksa selalu tampil
  // supaya gak "kedip" pas orang baru buka halaman.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY.current;
    const delta = latest - previous;

    if (latest < 80) {
      setHidden(false);
    } else if (delta > 4) {
      setHidden(true);
    } else if (delta < -4) {
      setHidden(false);
    }
    lastY.current = latest;
  });

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-30"
    >
      {/* Sengaja TANPA background/border selebar layar - biar apa pun
          yang ada di belakangnya (hero, atau halaman lain) tetap
          kelihatan penuh. Yang punya "badan" visual cuma pil logo &
          pil dock-nya sendiri, ngambang independen. */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-center">
        <FloatingDock items={dockItems} mobileClassName="relative" />
      </div>
    </motion.header>
  );
}
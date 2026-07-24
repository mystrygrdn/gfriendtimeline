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
  return (
    <header className="sticky top-0 z-30 bg-cloud/70 backdrop-blur-md border-b border-ink/5">
      {/* relative + justify-center: logo dilepas dari flow (absolute) supaya
          dock BENERAN center relatif ke lebar penuh header, bukan cuma
          "sisa ruang setelah logo". Ini yang bikin dia gak lari ke luar
          layar lagi di layar sempit. */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-center min-h-[56px]">
        <span className="absolute left-4 md:left-6 font-display text-lg font-extrabold text-ultraviolet">
          GFRIEND HUB
        </span>

        <FloatingDock items={dockItems} mobileClassName="relative" />
      </div>
    </header>
  );
}
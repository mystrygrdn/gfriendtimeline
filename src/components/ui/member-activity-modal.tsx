import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconX, IconCalendarEvent } from "@tabler/icons-react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { getSocialLinks, type ActivityCardMember } from "./activitycard";

export interface Activity {
  id: string;
  date: string;
  title: string;
  description: string;
}

export default function MemberActivityModal({
  member,
  activities,
  onClose,
}: {
  member: ActivityCardMember;
  activities: Activity[];
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

  const color = member.color ?? "#7c3aed";
  const socialLinks = getSocialLinks(member.socials);

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
        className="relative w-full max-w-2xl overflow-hidden rounded-[28px] bg-cloud shadow-card md:max-h-[85vh]"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-cloud/90 text-ink/60 transition-colors hover:bg-white hover:text-ink"
        >
          <IconX className="h-4 w-4" />
        </button>

        <div
          className="flex items-center gap-4 p-6 md:p-8"
          style={{ background: `radial-gradient(120% 100% at 0% 0%, ${color}22, transparent 70%)` }}
        >
          <div
            className="h-16 w-16 shrink-0 rounded-full bg-cover bg-center border-2"
            style={{
              backgroundImage: member.photo ? `url(${member.photo})` : undefined,
              backgroundColor: member.photo ? undefined : `${color}33`,
              borderColor: `${color}55`,
            }}
          />
          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink">{member.name}</h2>
            <p className="font-body text-sm text-scuba">{member.position}</p>
            {socialLinks.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                {socialLinks.map((social) => {
                  const SocialIcon = social.Icon;
                  return (
                    <a
                      key={social.key}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition-colors hover:text-ink"
                    >
                      <SocialIcon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-y-auto px-6 pb-8 md:px-8" style={{ maxHeight: "55vh" }}>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-ink/40">
            Recent Activities
          </h3>
          {activities.length === 0 ? (
            <p className="font-body text-sm italic text-ink/40">
              Belum ada aktivitas untuk member ini.
            </p>
          ) : (
            <ul className="space-y-4">
              {activities.map((activity) => (
                <li key={activity.id} className="rounded-xl border border-ink/5 bg-white/60 p-4">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink/40">
                    <IconCalendarEvent className="h-3.5 w-3.5" />
                    {activity.date}
                  </div>
                  <h4 className="mt-1 font-display text-base font-semibold text-ink">
                    {activity.title}
                  </h4>
                  <p className="mt-1 font-body text-sm text-ink/70">{activity.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
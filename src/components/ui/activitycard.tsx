import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconBrandSoundcloud,
} from "@tabler/icons-react";

export interface ActivityCardMember {
  id: string;
  name: string;
  position: string;
  photo?: string;
  color?: string;
  socials?: {
    instagram?: string;
    x?: string;
    tiktok?: string;
    youtube?: string;
    soundcloud?: string;
  };
}

const FALLBACK_COLORS = ["#7c3aed", "#0ea5e9", "#f97316", "#ec4899", "#22c55e"];

export function getSocialLinks(socials?: ActivityCardMember["socials"]) {
  const links: { key: string; url: string; Icon: typeof IconBrandInstagram }[] = [];
  if (!socials) return links;
  if (socials.instagram) links.push({ key: "instagram", url: socials.instagram, Icon: IconBrandInstagram });
  if (socials.x) links.push({ key: "x", url: socials.x, Icon: IconBrandX });
  if (socials.tiktok) links.push({ key: "tiktok", url: socials.tiktok, Icon: IconBrandTiktok });
  if (socials.youtube) links.push({ key: "youtube", url: socials.youtube, Icon: IconBrandYoutube });
  if (socials.soundcloud) links.push({ key: "soundcloud", url: socials.soundcloud, Icon: IconBrandSoundcloud });
  return links;
}

export default function ActivityCard({
  member,
  index,
  onViewMore,
}: {
  member: ActivityCardMember;
  index: number;
  onViewMore: (member: ActivityCardMember) => void;
}) {
  const color = member.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
  const socialLinks = getSocialLinks(member.socials);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-card transition-shadow duration-500 ease-in-out"
      style={{ boxShadow: `0 0 40px -18px ${color}80` }}
    >
      {member.photo ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
          style={{ backgroundImage: `url(${member.photo})` }}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center text-4xl font-display font-extrabold text-white/80"
          style={{ backgroundColor: `${color}33` }}
        >
          {member.name.charAt(0)}
        </div>
      )}

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${color}e6, ${color}99 35%, transparent 65%)`,
        }}
      />

      <div className="relative flex h-full flex-col justify-end p-5 text-white">
        <h2 className="font-display text-xl font-bold leading-tight">{member.name}</h2>
        <p className="font-body text-sm text-white/80 mt-0.5">{member.position}</p>

        {socialLinks.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            {socialLinks.map((social) => {
              const SocialIcon = social.Icon;
              return (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 transition-colors hover:bg-white/30"
                >
                  <SocialIcon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        )}

        <button
          onClick={() => onViewMore(member)}
          className="mt-4 flex items-center justify-between rounded-lg border px-4 py-2.5 backdrop-blur-md transition-all duration-300"
          style={{ backgroundColor: `${color}33`, borderColor: `${color}55` }}
        >
          <span className="text-sm font-semibold tracking-wide">View More</span>
          <IconArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
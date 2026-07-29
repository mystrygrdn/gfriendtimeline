import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconX,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

export type Card = {
  src: string;
  category: string;
  title: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  const scrollLeft = () => carouselRef.current?.scrollBy({ left: 560, behavior: "smooth" });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 560, behavior: "smooth" });

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 768 ? 320 : 440;
      const gap = 28;
      carouselRef.current.scrollTo({ left: (cardWidth + gap) * (index + 1), behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="group/carousel relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row justify-start gap-6 md:gap-7 max-w-7xl mx-auto px-6 md:px-10 w-full">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.04 * index, ease: "easeOut" }}
                key={"card" + index}
                className="shrink-0"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {canScrollLeft && (
          <button
            onClick={() => carouselRef.current?.scrollBy({ left: -560, behavior: "smooth" })}
            aria-label="Sebelumnya"
            className="absolute left-3 top-[38%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-ink/60 backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          >
            <IconChevronLeft className="h-5 w-5 text-cloud/80" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            aria-label="Berikutnya"
            className="absolute right-3 top-[38%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-ink/60 backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          >
            <IconChevronRight className="h-5 w-5 text-cloud/80" />
          </button>
        )}
      </div>
    </CarouselContext.Provider>
  );
};

export const VarietyCard = ({ card, index }: { card: Card; index: number }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.body.style.overflow = open ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => setOpen(false));

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/90 backdrop-blur-md"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              ref={containerRef}
              className="relative z-[60] mx-auto my-12 max-w-2xl rounded-2xl bg-[#221E2C] overflow-hidden"
            >
              <div className="relative aspect-video w-full" style={{ backgroundColor: "#2A2536" }}>
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(160deg, ${card.src}40, transparent 70%)` }}
                />
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/50 backdrop-blur-sm"
                  aria-label="Tutup"
                >
                  <IconX className="h-4 w-4 text-cloud" />
                </button>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cloud">
                    <IconPlayerPlayFilled className="h-5 w-5 text-ink translate-x-[1px]" />
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <p className="font-mono text-xs tracking-widest uppercase text-cloud/40">
                  {card.category}
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold text-cloud">
                  {card.title}
                </h3>
                <div className="mt-4 text-cloud/55 leading-relaxed text-base">
                  {card.content}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col text-left w-[320px] md:w-[440px] shrink-0"
      >
        <div
          className="relative aspect-video w-full overflow-hidden rounded-2xl"
          style={{ backgroundColor: "#26222F" }}
        >
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ background: `linear-gradient(150deg, ${card.src}66, transparent 75%)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cloud/95">
              <IconPlayerPlayFilled className="h-5 w-5 text-ink translate-x-[1px]" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <p className="font-mono text-[11px] tracking-widest uppercase text-cloud/35">
            {card.category}
          </p>
          <p className="mt-1.5 font-display text-lg font-semibold text-cloud/90 leading-snug line-clamp-1">
            {card.title}
          </p>
        </div>
      </motion.button>
    </>
  );
};
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

export type Card = {
  src: string; // dipakai sebagai warna poster (bukan URL gambar)
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
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 768 ? 230 : 320;
      const gap = window.innerWidth < 768 ? 16 : 24;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-6 [scrollbar-width:none] md:py-10"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row justify-start gap-4 pl-4 md:gap-6 md:pl-6 max-w-6xl mx-auto">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 * index, ease: "easeOut" }}
                key={"card" + index}
                className="rounded-3xl last:pr-4 md:last:pr-6"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pr-4 md:pr-6 mt-2">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 border border-white/60 shadow-card disabled:opacity-40"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Sebelumnya"
          >
            <IconArrowNarrowLeft className="h-5 w-5 text-ultraviolet-dark" />
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 border border-white/60 shadow-card disabled:opacity-40"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Berikutnya"
          >
            <IconArrowNarrowRight className="h-5 w-5 text-ultraviolet-dark" />
          </button>
        </div>
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
              className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              ref={containerRef}
              className="relative z-[60] mx-auto my-10 max-w-2xl rounded-3xl bg-cloud p-6 md:p-10 font-body shadow-card"
            >
              <button
                onClick={handleClose}
                className="sticky top-4 float-right flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-card"
                aria-label="Tutup"
              >
                <IconX className="h-5 w-5 text-ink" />
              </button>
              <p className="font-mono text-xs tracking-widest uppercase text-scuba">
                {card.category}
              </p>
              <h3 className="mt-2 font-display text-2xl md:text-4xl font-bold text-ink">
                {card.title}
              </h3>
              <div className="mt-6 text-ink/70 leading-relaxed">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(true)}
        className="relative z-10 flex h-72 w-56 flex-col items-start justify-end overflow-hidden rounded-3xl text-left md:h-[26rem] md:w-72
          shadow-card border border-white/30"
        style={{
          background: `linear-gradient(160deg, ${card.src}, ${card.src}dd 55%, #18151F 130%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="relative z-10 p-5 md:p-6">
          <p className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-cloud/70">
            {card.category}
          </p>
          <p className="mt-1 font-display text-lg md:text-2xl font-semibold text-cloud leading-tight">
            {card.title}
          </p>
        </div>
      </motion.button>
    </>
  );
};

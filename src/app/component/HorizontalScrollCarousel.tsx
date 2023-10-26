"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIsClient } from "./IsClientCtx";

// width of the card in px
const CARD_WIDTH = 450;

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/imgs/1.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/imgs/2.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/imgs/3.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/imgs/4.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/imgs/5.jpg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/imgs/6.jpg",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/imgs/7.jpg",
    title: "Title 7",
    id: 7,
  },
];

const HorizontalScrollCarousel = ({
  direction,
}: {
  direction: "left" | "right";
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const motionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const [width, setWidth] = useState<number>(1850);
  // motion.div range settings state
  const [motionRange, setMotionRange] = useState({
    start: "1%",
    end: "-47.5%",
  });
  const isClient = useIsClient();
  const isMobile = width <= CARD_WIDTH;

  useEffect(() => {
    // getting window width
    if (isClient) {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isClient]);

  // adjusting motion.div settings for different screen size
  useEffect(() => {
    const start = isMobile ? "0%" : "1%";
    const end = motionRef.current
      ? `${
          (width / motionRef.current.scrollWidth) * 100 - (isMobile ? 100 : 101)
        }%`
      : "-47.5%";
    setMotionRange({ start, end });
  }, [width, isMobile]);

  // transforming Y scroll to X scroll
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [
      direction === "right" ? motionRange.end : motionRange.start,
      direction === "right" ? motionRange.start : motionRange.end,
    ]
  );

  return (
    <section className="relative h-[300vh] bg-neutral-900" ref={sectionRef}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className={isMobile ? "flex gap-1" : "flex gap-4"}
          ref={motionRef}
        >
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
      // className={`group relative h-[${CARD_WIDTH}px] w-[${CARD_WIDTH}px] overflow-hidden bg-neutral-200`}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;

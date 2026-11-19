import Section from '@/components/Section';
import Title from '@/components/Title';
import { StarsBackground } from '@/components/ui/stars-background';
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useRef } from 'react';

const HEADLINE = 'From a single point of light, we build entire worlds.';
const WORDS = HEADLINE.split(' ');

/* ---------- كل كلمة ليها أنيميشن لوحدها (blur -> واضحة) ---------- */
type WordProps = {
  word: string;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
};

const Word = ({ word, index, progress, reduce }: WordProps) => {
  // الكلمات بتظهر ورا بعض بين 8% و 65% من السكرول
  const start = 0.08 + (index / WORDS.length) * 0.57;
  const end = start + 0.14;

  const opacity = useTransform(progress, [start, end], [reduce ? 1 : 0.08, 1]);
  const y = useTransform(progress, [start, end], [reduce ? 0 : 24, 0]);
  const blur = useTransform(progress, [start, end], [reduce ? 0 : 14, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className="mr-[0.25em] inline-block will-change-[opacity,filter,transform]"
    >
      {word}
    </motion.span>
  );
};

const Approach = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  // الـ wrapper طويل (300svh) والسيكشن جواه sticky = نفس تأثير pin في GSAP
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
  });

  /* Plantt */
  const planetX = useTransform(smooth, [0, 0.6], ['-60vw', '0vw']);
  const planetScale = useTransform(smooth, [0, 0.6, 1], [0.5, 1.6, 1.9]);
  const planetOpacity = useTransform(smooth, [0, 0.4], [0, 0.55]);
  const planetY = useTransform(smooth, [0.6, 1], [0, -60]);

  // Statement
  const subOpacity = useTransform(smooth, [0.62, 0.8], [0, 1]);
  const subY = useTransform(smooth, [0.62, 0.8], [reduce ? 0 : 30, 0]);
  const subBlur = useTransform(smooth, [0.62, 0.8], [reduce ? 0 : 10, 0]);
  const subFilter = useMotionTemplate`blur(${subBlur}px)`;

  return (
    <div ref={ref} className="relative h-[300svh]">
      <Section style="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        {/* BACKGROUND */}
        <StarsBackground
          starDensity={0.0005}
          allStarsTwinkle
          twinkleProbability={0.9}
          minTwinkleSpeed={0.5}
          maxTwinkleSpeed={2}
        />

        {/* SATURN + ORBIT (ورا النص) */}
        <motion.div
          aria-hidden="true"
          style={
            reduce
              ? undefined
              : {
                  x: planetX,
                  y: planetY,
                  scale: planetScale,
                  opacity: planetOpacity,
                }
          }
          className="pointer-events-none absolute z-0 w-[55vw] opacity-50 sm:w-[40vw] md:w-[30vw] xl:w-[24vw] 2xl:w-100"
        >
          <img
            src="/img/saturn.webp"
            alt=""
            className="w-full select-none"
            draggable={false}
          />
        </motion.div>

        {/* TITLE */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
          <Title title="THE APPROACH" />

          <h1
            aria-label={HEADLINE}
            className="my-2 max-w-xs text-2xl leading-tight font-bold text-white sm:max-w-xl sm:text-4xl md:max-w-3xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span aria-hidden="true">
              {WORDS.map((w, i) => (
                <Word
                  key={i}
                  word={w}
                  index={i}
                  progress={smooth}
                  reduce={reduce}
                />
              ))}
            </span>
          </h1>

          <motion.p
            style={{ opacity: subOpacity, y: subY, filter: subFilter }}
            className="max-w-lg text-xs leading-relaxed text-gray-400 sm:text-base md:text-lg"
          >
            Precision-engineered brands, interfaces, and films — calibrated to
            the last frame.
          </motion.p>
        </div>
      </Section>
    </div>
  );
};

export default Approach;

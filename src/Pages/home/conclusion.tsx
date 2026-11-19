import Section from '@/components/Section';
import Title from '@/components/Title';
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

const TESTIMONIAL = {
  quote:
    'VESPER didn’t just redesign our brand — they gave it gravity. A year on, it still feels three years ahead of everyone else.',
  name: 'Aniela Voss',
  role: 'VP Brand · Helios Aerospace',
};




const WORDS = TESTIMONIAL.quote.split(' ');



type WordProps = {
  word: string;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
};

// MOTION STATMENT
const Word = ({ word, index, progress, reduce }: WordProps) => {
  const start = (index / WORDS.length) * 0.75;
  const end = start + 0.15;

  const opacity = useTransform(progress, [start, end], [reduce ? 1 : 0.1, 1]);
  const y = useTransform(progress, [start, end], [reduce ? 0 : 16, 0]);
  const blur = useTransform(progress, [start, end], [reduce ? 0 : 10, 0]);
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

const Conclusion = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'center 45%'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  //   Content
  const authorOpacity = useTransform(smooth, [0.75, 1], [0, 1]);
  const authorY = useTransform(smooth, [0.75, 1], [reduce ? 0 : 20, 0]);
  const lineScale = useTransform(smooth, [0.7, 0.95], [0, 1]);

  // Qutes
  const quoteMarkOpacity = useTransform(smooth, [0, 0.4], [0, 1]);
  const quoteMarkY = useTransform(smooth, [0, 1], [reduce ? 0 : 40, 0]);

  return (
    <Section style="relative flex min-h-svh items-center justify-center overflow-hidden py-20 sm:py-24 [@media(max-height:500px)]:py-10">
      <div
        ref={ref}
        className="relative flex w-full max-w-5xl flex-col items-center px-5 text-center sm:px-10 lg:px-16"
      >
        
        <motion.span
          aria-hidden="true"
          style={{ opacity: quoteMarkOpacity, y: quoteMarkY }}
          className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 font-sans text-[10rem] leading-none font-black text-white/6 select-none min-[400px]:text-[12rem] sm:-top-24 sm:text-[18rem] lg:-top-28 lg:text-[22rem] [@media(max-height:500px)]:-top-8 [@media(max-height:500px)]:text-[9rem]"
        >
          “
        </motion.span>

        {/* TITLE */}
        <div className="relative z-10 mb-6 sm:mb-10 [@media(max-height:500px)]:mb-3">
          <Title title="IN THEIR WORDS" />
        </div>

        {/* QUOTE */}
        <blockquote className="relative z-10">
          <p
            aria-label={TESTIMONIAL.quote}
            className="max-w-76 text-[1.65rem] leading-snug font-bold tracking-tight text-white min-[400px]:max-w-sm min-[400px]:text-3xl sm:max-w-xl sm:text-4xl md:max-w-3xl md:text-5xl lg:max-w-4xl xl:text-6xl [@media(max-height:500px)]:max-w-2xl [@media(max-height:500px)]:text-xl"
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
          </p>

          {/* AUTHOR */}
          <motion.footer
            style={{ opacity: authorOpacity, y: authorY }}
            className="mt-8 flex flex-col items-center gap-2.5 sm:mt-14 sm:gap-3 [@media(max-height:500px)]:mt-4 [@media(max-height:500px)]:gap-1.5"
          >
            <motion.span
              aria-hidden="true"
              style={{ scaleX: lineScale }}
              className="block h-px w-10 origin-center bg-white/30"
            />
            <cite className="text-sm font-bold text-white not-italic sm:text-base">
              {TESTIMONIAL.name}
            </cite>
            <span className="text-[11px] font-medium tracking-wider text-gray-400 uppercase sm:text-xs">
              {TESTIMONIAL.role}
            </span>
          </motion.footer>
        </blockquote>
      </div>
    </Section>
  );
};

export default Conclusion;

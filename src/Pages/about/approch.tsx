import Section from '@/components/Section';
import Title from '@/components/Title';
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: 12, suffix: '+', label: 'Years in operation' },
  { value: 180, suffix: '', label: 'Projects shipped' },
  { value: 60, suffix: '', label: 'Clients worldwide' },
  { value: 14, suffix: '', label: 'Awards & honors' },
];

/* Border / padding per stat so dividers work on 2-col (mobile) and 4-col (desktop) */
const STAT_LAYOUT = [
  '',
  'border-l border-white/10 pl-6 lg:pl-10',
  'lg:border-l lg:border-white/10 lg:pl-10',
  'border-l border-white/10 pl-6 lg:pl-10',
];

/* ---------- Count-up number ---------- */
type CounterProps = {
  to: number;
  suffix?: string;
  reduce: boolean;
  active: boolean;
};

const Counter = ({ to, suffix = '', reduce, active }: CounterProps) => {
  const [display, setDisplay] = useState(to); // final value is always rendered by default

  useEffect(() => {
    if (!active || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => setDisplay(to),
    });
    return () => controls.stop();
  }, [active, reduce, to]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
};

/* ---------- Stats (single observer, works on small screens) ---------- */
const StatsBlock = ({ reduce }: { reduce: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 'some' });

  const line = (delay: number) => ({
    initial: { scaleX: reduce ? 1 : 0 },
    animate: { scaleX: inView || reduce ? 1 : 0 },
    transition: {
      duration: reduce ? 0 : 1.4,
      ease: EASE,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <div ref={ref} className="relative mt-16 py-10 sm:mt-20 lg:mt-28 lg:py-14">
      <motion.span
        aria-hidden="true"
        {...line(0)}
        style={{ transformOrigin: 'left' }}
        className="absolute top-0 left-0 h-px w-full bg-white/10"
      />
      <motion.span
        aria-hidden="true"
        {...line(0.3)}
        style={{ transformOrigin: 'left' }}
        className="absolute bottom-0 left-0 h-px w-full bg-white/10"
      />

      <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <div key={stat.label} className={`group ${STAT_LAYOUT[i]}`}>
            <span className="font-space text-zumthor block text-4xl leading-none font-extrabold tracking-tight tabular-nums transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[#5b6cff] sm:text-5xl lg:text-6xl">
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                reduce={reduce}
                active={inView}
              />
            </span>
            <span className="font-space text-gray mt-4 block text-[0.68rem] font-bold tracking-[0.16em] uppercase sm:mt-5 sm:text-xs">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- Main component ---------- */
const Approach = () => {
  const reduce = !!useReducedMotion();

  const fadeUp = (delay = 0, distance = 24): Variants => ({
    hidden: {
      opacity: 0,
      y: reduce ? 0 : distance,
      filter: reduce ? 'blur(0px)' : 'blur(6px)',
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: reduce ? 0 : 0.9,
        ease: EASE,
        delay: reduce ? 0 : delay,
      },
    },
  });

  const view = { once: true, amount: 0.3 } as const;

  const headingText =
    'We believe the most powerful design feels less like decoration and more like gravity — quiet, certain, and impossible to argue with.';
  const words = headingText.split(' ');

  return (
    <Section>
      {/* LABEL */}
      <motion.div
        variants={fadeUp(0, 20)}
        initial="hidden"
        whileInView="show"
        viewport={view}
      >
        <Title title="Our approach" />
      </motion.div>

      {/* MAIN HEADING — word-by-word masked reveal */}
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={view}
        transition={{
          staggerChildren: reduce ? 0 : 0.04,
          delayChildren: reduce ? 0 : 0.15,
        }}
        aria-label={headingText}
        className="font-space text-zumthor mt-10 max-w-6xl text-2xl leading-tight font-semibold tracking-tight sm:mt-12 sm:text-3xl md:text-4xl lg:max-w-5xl lg:text-5xl"
      >
        {words.map((word, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="mr-[0.25em] mb-[-0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: reduce ? '0%' : '110%' },
                show: {
                  y: '0%',
                  transition: { duration: reduce ? 0 : 0.9, ease: EASE },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {/* CONTENT GRID */}
      <div className="mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:mt-14 md:grid-cols-2 md:gap-12 lg:mt-16 lg:gap-16">
        <motion.p
          variants={fadeUp(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={view}
          className="font-space text-gray text-sm leading-relaxed sm:text-base md:leading-loose"
        >
          Every project begins in research and restraint. We strip a brand back
          to its single truest idea, then build a system precise enough to carry
          it across a launch film, a product interface, and a hundred screens
          we’ll never see. Nothing is added that doesn’t earn its place.
        </motion.p>

        <motion.p
          variants={fadeUp(0.45)}
          initial="hidden"
          whileInView="show"
          viewport={view}
          className="font-space text-gray text-sm leading-relaxed sm:text-base md:leading-loose"
        >
          We work in the dark on purpose. Near-black canvases, deliberate light,
          and motion that resolves rather than shouts. The result is work that
          feels engineered and human at once — calm on the surface, relentless
          underneath.
        </motion.p>
      </div>

      {/* STATS */}
      <StatsBlock reduce={reduce} />
    </Section>
  );
};

export default Approach;

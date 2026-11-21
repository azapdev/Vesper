import Section from '@/components/Section';
import Title from '@/components/Title';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS = [
  {
    id: '01',
    title: 'Brand Identity',
    text: 'Names, marks, and complete visual systems built to last.',
  },
  {
    id: '02',
    title: 'Web Experience',
    text: 'Sites and products that feel cinematic and load like lightning.',
  },
  {
    id: '03',
    title: 'Motion & Film',
    text: 'Launch films, title sequences, and motion systems with intent.',
  },
  {
    id: '04',
    title: 'Spatial / WebGL',
    text: 'Real-time 3D and immersive worlds running in the browser.',
  },
  {
    id: '05',
    title: 'Art Direction',
    text: 'A single, uncompromising visual point of view across every frame.',
  },
];

const Disciplines = () => {
  const reduce = !!useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);

  /* ---- hover variants (propagate from the row to its children) ---- */
  const bg: Variants = {
    rest: { scaleY: 0 },
    hover: { scaleY: 1 },
  };
  const line: Variants = {
    rest: { scaleX: 0 },
    hover: { scaleX: 1 },
  };
  const num: Variants = {
    rest: { color: '#5b6cff', x: 0 },
    hover: { color: '#ffffff', x: reduce ? 0 : 4 },
  };
  const title: Variants = {
    rest: { x: 0 },
    hover: { x: reduce ? 0 : 14 },
  };
  const desc: Variants = {
    rest: { x: 0, opacity: 0.7 },
    hover: { x: reduce ? 0 : -10, opacity: 1 },
  };
  const arrow: Variants = {
    rest: {
      x: 0,
      y: 0,
      rotate: 0,
      color: '#a3a3a3',
      backgroundColor: 'rgba(91,108,255,0)',
    },
    hover: {
      x: reduce ? 0 : 4,
      y: reduce ? 0 : -4,
      rotate: 0,
      color: '#ffffff',
      backgroundColor: '#5b6cff',
    },
  };

  const t = { duration: dur(0.5), ease: EASE };

  return (
    <Section>
      {/* LABEL */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: dur(0.8), ease: EASE }}
      >
        <Title title="What we do" />
      </motion.div>

      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: dur(0.9), ease: EASE, delay: dur(0.1) }}
        className="font-space text-zumthor mt-6 max-w-5xl text-3xl leading-tight font-extrabold tracking-tight sm:mt-8 sm:text-4xl md:text-5xl"
      >
        Disciplines we obsess over
      </motion.h2>

      {/* LIST */}
      <ul className="mt-12 border-t border-white/10 sm:mt-16 lg:mt-20">
        {ITEMS.map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: reduce ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{
              duration: dur(0.8),
              ease: EASE,
              delay: dur(i * 0.08),
            }}
            className="border-b border-white/10"
          >
            <motion.div
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="group relative grid grid-cols-[2.25rem_1fr_2.25rem] items-center gap-x-3 gap-y-2 px-2 py-6 sm:grid-cols-[3.5rem_1fr_minmax(0,22rem)_2.5rem] sm:gap-x-6 sm:px-4 md:py-9"
            >
              {/* sweeping background (rises from the bottom) */}
              <motion.span
                aria-hidden="true"
                variants={bg}
                transition={{ duration: dur(0.55), ease: EASE }}
                style={{ transformOrigin: 'bottom' }}
                className="pointer-events-none absolute inset-0 bg-white/4"
              />
              {/* accent underline */}
              <motion.span
                aria-hidden="true"
                variants={line}
                transition={{ duration: dur(0.7), ease: EASE }}
                style={{ transformOrigin: 'left' }}
                className="pointer-events-none absolute -bottom-px left-0 h-px w-full bg-[#5b6cff]"
              />

              {/* number */}
              <motion.span
                variants={num}
                transition={t}
                className="font-space relative text-xs tracking-widest tabular-nums sm:text-sm"
              >
                {item.id}
              </motion.span>

              {/* title */}
              <motion.h3
                variants={title}
                transition={t}
                className="font-space text-zumthor relative text-xl leading-tight font-extrabold tracking-tight sm:text-2xl md:text-3xl"
              >
                {item.title}
              </motion.h3>

              {/* description */}
              <motion.p
                variants={desc}
                transition={t}
                className="font-space text-gray relative col-start-2 row-start-2 text-sm leading-relaxed sm:col-start-3 sm:row-start-1 sm:text-right"
              >
                {item.text}
              </motion.p>

              {/* arrow */}
              <motion.span
                variants={arrow}
                transition={t}
                aria-hidden="true"
                className="relative col-start-3 row-span-2 row-start-1 flex h-9 w-9 items-center justify-center justify-self-end rounded-full sm:col-start-4 sm:row-span-1"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </motion.span>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
};

export default Disciplines;

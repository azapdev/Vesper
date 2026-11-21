'use client';

import Section from '@/components/Section';
import Title from '@/components/Title';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADING = 'Let’s build something beyond the dark.';
const EMAIL = 'hello@vesper.studio';

const Contact = () => {
  const reduce = !!useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);
  const view = { once: true, amount: 'some' } as const;
  const words = HEADING.split(' ');

  return (
    <Section style="relative overflow-hidden">
      {/* soft glow behind the content */}
      <motion.div
        aria-hidden="true"
        animate={
          reduce
            ? undefined
            : { opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-104 w-104 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5b6cff]/20 blur-[120px] sm:h-136 sm:w-136"
      />

      <div className="relative flex flex-col items-center py-12 text-center sm:py-20 lg:py-28">
        {/* LABEL */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: dur(0.8), ease: EASE }}
          className="flex justify-center"
        >
          <Title title="Let’s talk" />
        </motion.div>

        {/* HEADING — word-by-word masked reveal */}
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={view}
          transition={{
            staggerChildren: reduce ? 0 : 0.06,
            delayChildren: reduce ? 0 : 0.1,
          }}
          aria-label={HEADING}
          className="font-space text-zumthor mt-6 max-w-[13em] text-4xl leading-[1.05] font-extrabold tracking-tight sm:mt-8 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {words.map((word, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="mr-[0.25em] mb-[-0.12em] inline-block overflow-hidden pb-[0.12em] align-top last:mr-0"
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: reduce ? '0%' : '110%' },
                  show: {
                    y: '0%',
                    transition: { duration: dur(0.9), ease: EASE },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: dur(0.9), ease: EASE, delay: dur(0.5) }}
          className="mt-10 sm:mt-12"
        >
          <motion.div
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileTap={{ scale: reduce ? 1 : 0.97 }}
            variants={{
              rest: { scale: 1, borderColor: 'rgba(255,255,255,0.15)' },
              hover: {
                scale: reduce ? 1 : 1.05,
                borderColor: 'rgba(91,108,255,0.9)',
              },
            }}
            transition={{ duration: dur(0.4), ease: EASE }}
            className="relative inline-block overflow-hidden rounded-full border border-white/15 bg-white/4"
          >
            {/* fill that sweeps in from the left */}
            <motion.span
              aria-hidden="true"
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: dur(0.55), ease: EASE }}
              style={{ transformOrigin: 'left' }}
              className="absolute inset-0 bg-[#5b6cff]"
            />

            <Link
              to="/contact"
              className="font-space text-zumthor relative flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-bold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-[#7f9bff] sm:px-8 sm:py-4 sm:text-base"
            >
              <span>Start a project</span>
              <motion.svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  rest: { x: 0, y: 0 },
                  hover: { x: reduce ? 0 : 3, y: reduce ? 0 : -3 },
                }}
                transition={{ duration: dur(0.4), ease: EASE }}
              >
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* EMAIL */}
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: dur(0.9), ease: EASE, delay: dur(0.65) }}
          className="font-space group mt-8 text-sm text-[#7f9bff] sm:mt-10"
        >
          <span className="relative inline-block cursor-default pb-1">
            {EMAIL}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#7f9bff] transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
          </span>
        </motion.p>
      </div>
    </Section>
  );
};

export default Contact;

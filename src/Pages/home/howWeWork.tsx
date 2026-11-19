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

type Step = {
  id: number;
  title: string;
  content: string;
  index: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    title: 'Discovery',
    content:
      'We map the terrain — audience, market, and the truth the brand is circling. No pixels until the problem is clear.',
    index: '01',
  },
  {
    id: 2,
    title: 'Direction',
    content:
      'We find the single idea worth betting on, then set the visual and motion language that will carry it everywhere.',
    index: '02',
  },
  {
    id: 3,
    title: 'Build',
    content:
      'We engineer the system end to end — identity, interface, motion — precise enough to scale without losing its center.',
    index: '03',
  },
  {
    id: 4,
    title: 'Launch',
    content:
      'We ship, measure, and refine. The work keeps earning its place long after it goes live.',
    index: '04',
  },
];

const N = STEPS.length;
const FADE = 0.04; // مدة الانتقال بين الخطوات (من التقدم الكلي)

/**
 * بتبني خريطة (input -> output) لخطوة معينة.
 * جوه الخطوة = inside ، بره الخطوة = outsideIn (قبلها) / outsideOut (بعدها).
 * أول خطوة بتبدأ ظاهرة، وآخر خطوة بتفضل ظاهرة لحد الآخر.
 */
const buildMap = (
  i: number,
  inside: number,
  outsideIn: number,
  outsideOut: number = outsideIn
) => {
  const s = i / N;
  const e = (i + 1) / N;
  const input: number[] = [];
  const output: number[] = [];

  if (i > 0) {
    input.push(s, s + FADE);
    output.push(outsideIn, inside);
  } else {
    input.push(0);
    output.push(inside);
  }

  if (i < N - 1) {
    input.push(e - FADE, e);
    output.push(inside, outsideOut);
  } else {
    input.push(1);
    output.push(inside);
  }

  return { input, output };
};

/* ---------- محتوى الخطوة: رقم كبير + عنوان + وصف ---------- */
type StepProps = {
  step: Step;
  i: number;
  progress: MotionValue<number>;
  reduce: boolean;
};

const StepPanel = ({ step, i, progress, reduce }: StepProps) => {
  const o = buildMap(i, 1, 0);
  const b = buildMap(i, 0, reduce ? 0 : 14);
  const y = buildMap(i, 0, reduce ? 0 : 28, reduce ? 0 : -28);

  const opacity = useTransform(progress, o.input, o.output);
  const blur = useTransform(progress, b.input, b.output);
  const translateY = useTransform(progress, y.input, y.output);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{ opacity, y: translateY, filter }}
      className="pointer-events-none absolute inset-0 flex items-center will-change-[opacity,filter,transform]"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 text-[40vw] leading-none font-extrabold text-white/4.5 select-none sm:text-[26vw] [@media(max-height:500px)]:text-[45vh]"
      >
        {step.index}
      </span>

      <div className="relative">
        <h2 className="mb-3 text-4xl font-extrabold tracking-tight text-white sm:mb-4 sm:text-6xl md:text-7xl lg:text-8xl [@media(max-height:500px)]:mb-1 [@media(max-height:500px)]:text-3xl">
          {step.title}
        </h2>
        <p className="max-w-[18rem] text-sm leading-relaxed text-gray-400 sm:max-w-md sm:text-base md:text-lg [@media(max-height:500px)]:text-xs">
          {step.content}
        </p>
      </div>
    </motion.div>
  );
};

/* ---------- عنصر القايمة الشمال ---------- */
type NavItemProps = StepProps & { onClick: () => void };

const NavItem = ({ step, i, progress, reduce, onClick }: NavItemProps) => {
  const a = buildMap(i, 1, 0);
  const active = useTransform(progress, a.input, a.output);

  const opacity = useTransform(active, [0, 1], [0.35, 1]);
  const x = useTransform(active, [0, 1], [0, reduce ? 0 : 6]);
  const numOpacity = useTransform(active, [0, 1], [0.5, 1]);

  return (
    <li>
      <motion.button
        type="button"
        onClick={onClick}
        style={{ opacity, x }}
        className="flex cursor-pointer items-baseline gap-3 text-left text-base font-bold text-white sm:text-lg"
      >
        <motion.small
          style={{ opacity: numOpacity }}
          className="text-[11px] font-medium text-indigo-400"
        >
          {step.index}
        </motion.small>
        {step.title}
      </motion.button>
    </li>
  );
};

const HowWeWork = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  // الـ wrapper طويل (100svh لكل خطوة) والسيكشن جواه sticky
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  // الخط الأزرق جنب القايمة بيتملي مع السكرول
  const fillScale = useTransform(smooth, [0, 1], [0, 1]);

  // الضغط على خطوة يسكرول لحد مكانها
  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + (scrollable * (i + 0.5)) / N,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  return (
    <div ref={ref} className="relative" style={{ height: `${N * 100}svh` }}>
      <Section style="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
        <div className="flex w-full max-w-7xl flex-col gap-8 px-6 sm:gap-12 sm:px-10 [@media(max-height:500px)]:gap-3">
          <Title title="HOW WE WORK" />

          <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-center md:gap-16 lg:gap-24 [@media(max-height:500px)]:gap-4">
            {/* NAV */}
            <ul className="relative flex shrink-0 flex-row flex-wrap gap-x-5 gap-y-2 pb-3 md:flex-col md:gap-5 md:pb-0 md:pl-6">
              {/* TRACK: خط أفقي تحت القايمة في الموبايل، وعمودي جنبها من md */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-full bg-white/15 md:top-0 md:h-full md:w-0.5"
              />
              {/* FILL (موبايل): بيتملي أفقي */}
              <motion.span
                aria-hidden="true"
                style={{ scaleX: fillScale }}
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.7)] md:hidden"
              />
              {/* FILL (md+): بيتملي عمودي */}
              <motion.span
                aria-hidden="true"
                style={{ scaleY: fillScale }}
                className="absolute top-0 left-0 hidden h-full w-0.5 origin-top bg-linear-to-b from-indigo-400 to-indigo-700 shadow-[0_0_12px_rgba(129,140,248,0.7)] md:block"
              />
              {STEPS.map((step, i) => (
                <NavItem
                  key={step.id}
                  step={step}
                  i={i}
                  progress={smooth}
                  reduce={reduce}
                  onClick={() => goTo(i)}
                />
              ))}
            </ul>

            {/* CARDS + ANIMATION: كل الخطوات فوق بعض والسكرول بيبدّل بينهم */}
            <div className="relative h-52 w-full sm:h-64 md:h-80 md:flex-1 [@media(max-height:500px)]:h-40">
              {STEPS.map((step, i) => (
                <StepPanel
                  key={step.id}
                  step={step}
                  i={i}
                  progress={smooth}
                  reduce={reduce}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HowWeWork;

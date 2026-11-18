import Section from '@/components/Section';
import Title from '@/components/Title';
import type { ServiceType } from '@/Types';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

const data: ServiceType[] = [
  {
    index: '01',
    title: 'Brand Identity',
    percent: 15,
    sevices: 'Names, marks, and complete visual systems built to last.',
  },
  {
    index: '02',
    title: 'Web Experience',
    percent: 66,
    sevices: 'Sites and products that feel cinematic and load like lightning.',
  },
  {
    index: '03',
    title: 'Motion & Film',
    percent: 55,
    sevices: 'Launch films, title sequences, and motion systems with intent.',
  },
  {
    index: '04',
    title: 'Spatial / WebGL',
    percent: 40,
    sevices: 'Real-time 3D and immersive worlds running in the browser.',
  },
  {
    index: '05',
    title: 'Art Direction',
    percent: 80,
    sevices:
      'A single, uncompromising visual point of view across every frame.',
  },
  {
    index: '06',
    title: 'Design Systems',
    percent: 60,
    sevices: 'Scalable foundations that keep fast-moving teams consistent.',
  },
];

const ServiceRow = ({ item }: { item: ServiceType }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.10'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 1,
  });

  const lineWidth = useTransform(smooth, [0, 1], ['0%', `${item.percent}%`]);
  const opacity = useTransform(smooth, [0, 1], [0, 1]);
  const y = useTransform(smooth, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="group relative flex w-full cursor-pointer flex-col gap-3 border-b border-white/10 py-6 pr-10 text-left outline-none sm:py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:pr-0 lg:py-12"
    >
      {/* INDEX + TITLE */}
      <span className="flex items-center gap-4 transition-transform duration-500 ease-out group-hover:translate-x-2 group-focus-visible:translate-x-2 sm:gap-8 lg:gap-16">
        <span className="text-cornflower-blue w-6 text-sm sm:text-base lg:text-lg">
          {item.index}
        </span>
        <span className="text-xl font-bold text-white min-[380px]:text-2xl sm:text-3xl lg:text-4xl">
          {item.title}
        </span>
      </span>

      {/* DESCRIPTION */}
      <span className="pl-10 text-xs leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/90 sm:pl-14 sm:text-sm md:max-w-xs md:pl-0 md:text-right">
        {item.sevices}
      </span>

      {/* LINE 1: scroll-driven */}
      <motion.span
        aria-hidden
        style={{ width: lineWidth }}
        className="bg-cornflower-blue text-cornflower-blue absolute bottom-0 left-0 h-0.5 shadow-[0_0_12px_currentColor]"
      />

      {/* LINE 2*/}
      <span
        aria-hidden
        className="bg-cornflower-blue text-cornflower-blue absolute bottom-0 left-0 h-0.5 w-0 shadow-[0_0_12px_currentColor] transition-[width] duration-700 ease-out motion-reduce:transition-none"
      />
    </motion.div>
  );
};

const Services = () => (
  <Section>
    <div>
      <Title title="CAPABILITIES" />
      <h2 className="mt-2 text-2xl leading-tight font-bold tracking-tight text-[#e5e5e5] min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        Built end to end, in the dark
      </h2>
    </div>

    <div className="mt-10 border-t border-white/10 sm:mt-14 lg:mt-16">
      {data.map((item) => (
        <ServiceRow key={item.index} item={item} />
      ))}
    </div>
  </Section>
);

export default Services;

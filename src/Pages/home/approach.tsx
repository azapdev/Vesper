import Section from '@/components/Section';
import Title from '@/components/Title';
import { StarsBackground } from '@/components/ui/stars-background';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

const Approach = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    mass: 1,
  });

  const x = useTransform(smooth, [0, 1], ['-100vw', '0vw']);
  const scale = useTransform(smooth, [0, 1], [-1, 2.2]);

  return (
    <Section style="relative h-svh flex items-center justify-center overflow-hidden">
      
      {/* عنصر مرجعي للسكرول */}
      <div ref={ref} className="pointer-events-none absolute inset-0" />

      {/* TITLE */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <Title title="THE APPROACH" />
        <h1 className="max-w-xs text-2xl my-2 leading-tight font-bold text-white sm:max-w-xl sm:text-4xl md:max-w-3xl md:text-5xl lg:text-6xl xl:text-7xl">
          From a single point of light, we build entire worlds.
        </h1>
      </div>

      {/* SATURN BEHIND THE TITLE */}
      <motion.div
        style={{ x, scale }}
        className="pointer-events-none absolute z-0 w-[55vw] opacity-50 sm:w-[40vw] md:w-[30vw] xl:w-[24vw] 2xl:w-100"
      >
        <img src="/img/saturn.webp" alt="" className="w-full" />
      </motion.div>

      {/* BACKGROUND */}
      <StarsBackground
        starDensity={0.0005}
        allStarsTwinkle={true}
        twinkleProbability={0.9}
        minTwinkleSpeed={0.5}
        maxTwinkleSpeed={2}
      />
    </Section>
  );
};

export default Approach;

import Section from '@/components/Section';
import { motion, useReducedMotion } from 'framer-motion';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <Section>
      <motion.div
        className="mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LABEL */}
        <motion.div
          variants={textVariants}
          className="mb-8 flex items-center gap-3 sm:mb-10"
        >
          <motion.span
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="bg-cornflower-blue shadow-cornflower-blue/50 size-1.5 shrink-0 rounded-full shadow-lg"
          />

          <span className="text-zumthor text-[10px] font-semibold tracking-[0.2em] uppercase sm:text-xs">
            Selected Projects
          </span>
        </motion.div>

        {/* MAIN HEADING */}
        <motion.h1
          variants={containerVariants}
          className="font-space max-w-7xl text-4xl leading-[1.12] font-extrabold tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <motion.span variants={textVariants} className="text-gray inline">
            A closer look at{' '}
          </motion.span>

          <motion.span variants={textVariants} className="text-zumthor inline">
            what we create.
          </motion.span>

          <motion.span variants={textVariants} className="text-gray inline">
            {' '}
            A collection of identities, experiences, and digital worlds{' '}
          </motion.span>

          <motion.span variants={textVariants} className="text-zumthor inline">
            shaped by curiosity.
          </motion.span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          variants={textVariants}
          className="text-zumthor/70 mt-8 max-w-xl text-sm leading-relaxed sm:mt-10 sm:text-base md:text-lg"
        >
          Crafted with precision and driven by ideas that refuse to stand still.
          Explore the work, the thinking, and the worlds behind every project.
        </motion.p>
      </motion.div>
    </Section>
  );
};

export default Hero;

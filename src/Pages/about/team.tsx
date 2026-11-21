import Section from '@/components/Section';
import Title from '@/components/Title';
import useData from '@/Hooks/useData';
import type { Member } from '@/Types';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const Team = () => {
  const reduce = !!useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);

  const { data, isLoading, isError } = useData('TEAM');
  const team: Member[] = Array.isArray(data) ? data : [];

  return (
    <Section>
      {/* LABEL */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: dur(0.8), ease: EASE }}
      >
        <Title title="The team" />
      </motion.div>

      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: dur(0.9), ease: EASE, delay: dur(0.1) }}
        className="font-space text-zumthor mt-6 max-w-5xl text-3xl leading-tight font-extrabold tracking-tight sm:mt-8 sm:text-4xl md:text-5xl"
      >
        The people behind the work
      </motion.h2>

      {/* LOADING */}
      {isLoading && (
        <div
          aria-busy="true"
          className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:mt-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-8"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-3/4 w-full animate-pulse rounded-2xl border border-white/10 bg-white/4" />
              <div className="mt-5 h-5 w-1/2 animate-pulse rounded bg-white/6" />
              <div className="mt-3 h-3 w-1/3 animate-pulse rounded bg-white/6" />
            </div>
          ))}
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <p className="font-space text-gray mt-12 text-sm">
          Couldn’t load the team right now. Please try again later.
        </p>
      )}

      {/* GRID */}
      {!isLoading && !isError && (
        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:mt-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {team.map((member, i) => (
            <motion.li
              key={member.name}
              initial={{ opacity: 0, y: reduce ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{
                duration: dur(0.9),
                ease: EASE,
                /* stagger inside each row so cards don't all wait on the first one */
                delay: dur((i % 3) * 0.12),
              }}
              whileHover={{ y: reduce ? 0 : -8 }}
              className="group"
            >
              {/* PHOTO */}
              <div className="group-hover:border-corbg-cornflower-blue/60 relative aspect-3/4 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-colors duration-500">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}

                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover grayscale-35 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                {/* bottom gradient + accent line on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="bg-cornflower-blue pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
              </div>

              {/* INFO */}
              <h3 className="font-space text-zumthor mt-5 text-lg leading-tight font-extrabold tracking-tight transition-transform duration-500 group-hover:translate-x-1 sm:text-xl">
                {member.name}
              </h3>
              <p className="font-space text-corbg-cornflower-blue mt-2 text-[0.7rem] font-bold tracking-[0.14em] uppercase sm:text-xs">
                {member.role}
              </p>
              <p className="font-space text-gray mt-3 max-w-sm text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.li>
          ))}
        </ul>
      )}
    </Section>
  );
};

export default Team;

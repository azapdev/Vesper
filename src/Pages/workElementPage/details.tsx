import Section from '@/components/Section';
import { Links } from '@/Routes/routes';
import type { Project, ProjectSection } from '@/Types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Props = {
  project: Project;
  nextProject?: Project;
};

const Details = ({ project, nextProject }: Props) => {
  if (!project?.sections || project.sections.length === 0) return null;
  const targetNextLink = nextProject
    ? `${Links.WORK}/${nextProject.slug}`
    : Links.WORK;

  return (
    <Section>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 md:gap-16">
          {project.sections.map((section: ProjectSection, index: number) => {
            const formattedNumber = String(index + 1).padStart(2, '0');
            const totalSections = String(project.sections.length).padStart(
              2,
              '0'
            );

            return (
              <motion.div
                key={section.number || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="grid grid-cols-1 items-start gap-6 border-b border-zinc-800/85 pb-10 transition-colors duration-300 md:grid-cols-12 md:gap-12 md:pb-16"
              >
                {/* Left Side: Number & Heading with Blue Dot */}
                <div className="flex flex-col gap-3 md:col-span-3">
                  <span className="text-gray font-mono text-xs tracking-widest uppercase">
                    {formattedNumber} / {totalSections}
                  </span>

                  <div className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: 'var(--color-cornflower-blue)',
                      }}
                    />
                    <h2 className="text-xl font-bold tracking-tight wrap-break-word text-white sm:text-2xl">
                      {section.heading}
                    </h2>
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="md:col-span-9">
                  <p className="text-gray text-base leading-relaxed font-normal wrap-break-word sm:text-lg">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* img RELATED TO PROJECT */}
          {(project.image2 || project.image3) && (
            <div className="grid grid-cols-1 gap-5 pt-4 md:grid-cols-2">
              {project.image2 && (
                <div className="relative h-75 overflow-hidden rounded-xl sm:h-100 md:h-125">
                  <motion.img
                    loading="lazy"
                    src={project.image2}
                    alt={`${project.title} image 1`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {project.image3 && (
                <div className="relative h-75 overflow-hidden rounded-xl sm:h-100 md:h-125">
                  <motion.img
                    loading="lazy"
                    src={project.image3}
                    alt={`${project.title} image 2`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="h-full w-full object-cover duration-300 hover:scale-105"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* GO TO ALL WoRKS */}
        <div className="mx-auto max-w-7xl border-t border-zinc-800/85 px-4 pt-12 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <Link to={targetNextLink} className="group block">
              <motion.div
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between gap-4 py-6"
              >
                <h2 className="group-hover:text-cornflower-blue text-3xl font-bold tracking-tight text-white transition-colors sm:text-5xl md:text-6xl">
                  {nextProject ? nextProject.title : 'Explore All Works'}
                </h2>

                <div className="group-hover:border-cornflower-blue group-hover:bg-cornflower-blue/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 transition-all sm:h-16 sm:w-16">
                  <span className="text-xl text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                    →
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Details;

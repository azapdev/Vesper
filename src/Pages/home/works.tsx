import Section from '@/components/Section';
import Title from '@/components/Title';
import useProjects from '@/Hooks/useData';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const Works = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // بنبعت الـ inView للـ Hook
  const { data, isPending, error } = useProjects();

  return (
    <div ref={ref}>
      <Section>
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col items-start">
            <Title title="SELECTED WORK" />
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
              Recent transmissions
            </h1>
          </div>

          <p className="max-w-75 text-sm leading-7 text-white/50 md:text-right">
            A selection of brand, web, and motion work from 2024 — 2026.
          </p>
        </div>
        {!inView ? (
          <div className="min-h-[40vh]" />
        ) : // is pendiing
        isPending ? (
          <div className="flex min-h-[40vh] items-center justify-center text-white">
            <div className="flex flex-col items-center gap-5">
              <div className="relative flex size-14 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-[#6489ff]" />
                <div className="size-2 rounded-full bg-[#6489ff] shadow-[0_0_15px_#6489ff]" />
              </div>
              <div className="space-y-2 text-center">
                <p className="text-sm font-medium tracking-[0.25em] text-white/80">
                  LOADING PROJECTS
                </p>
                <p className="text-xs text-white/35">
                  Preparing selected work...
                </p>
              </div>
            </div>
          </div>
        ) : error ? (
          /* لو حصل خطأ */
          <div className="flex min-h-[40vh] items-center justify-center text-center text-white">
            <div>
              <h2 className="mb-3 text-2xl font-bold">Something went wrong</h2>
              <p className="text-sm text-white/50">
                Failed to load projects. Please try again.
              </p>
            </div>
          </div>
        ) : !data?.length ? (
          /* لو مفيش داتا */
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-sm tracking-widest text-white/40">
              NO PROJECTS FOUND
            </p>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {data.map((project) => (
              <div key={project.title} className="group relative">
                {/* Cornflower Blue Glow Shadow */}
                <div className="bg-cornflower-blue absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-all duration-500 group-hover:opacity-30" />

                <article className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#101010] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#6489ff]/40">
                  {/* Image */}
                  <div className="relative aspect-[1.65/1] overflow-hidden bg-linear-to-br from-[#17212b] via-[#0b1118] to-black">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />

                    <div className="absolute top-5 left-5">
                      <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[11px] font-semibold tracking-wider text-white/85 backdrop-blur-md">
                        <span className="size-2 rounded-full bg-[#6489ff] shadow-[0_0_10px_#6489ff]" />
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between gap-2 text-xs font-semibold tracking-wider text-white/55 uppercase">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-xl font-bold tracking-tighter text-white transition-colors duration-300 group-hover:text-[#6489ff]">
                        {project.title}
                      </h2>

                      <Link
                        to={`/works/${project.slug}`}
                        className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-[#6489ff] group-hover:text-[#6489ff]"
                      >
                        ↗
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default Works;

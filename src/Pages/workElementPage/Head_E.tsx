import Section from '@/components/Section';
import Title from '@/components/Title';
import { Links } from '@/Routes/routes';
import type { Project } from '@/Types';
import { Link } from 'react-router-dom';

type Props = {
  project: Project;
};

const Heroo = ({ project }: Props) => {
  return (
    <Section>
      {/* Container with Flex Col and Gap */}

      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:gap-12">
        {/* Top Bar: Back Link */}
        <div>
          <Link
            to={Links.WORK}
            className="text-gray inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-colors hover:text-white"
          >
            <span>←</span> Back To Work
          </Link>
        </div>

        {/* Header Group: Title & Discipline */}
        <div className="flex flex-col gap-4">
          <Title title={project.discipline} />

          {/* Title */}
          <h1 className="text-2xl font-bold tracking-wider wrap-break-word text-white sm:text-6xl md:text-7xl">
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-gray max-w-2xl text-sm leading-relaxed font-normal sm:text-lg md:text-xl">
            {project.description}
          </p>
        </div>

        {/* Details Section */}
        <div className="grid max-w-2xl grid-cols-1 gap-6 border-t border-zinc-800/85 pt-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8 md:pt-8">
          {/* Client */}
          <div className="border-e md:border-e-zinc-800/85 md:pe-8">
            <span className="text-gray mb-1.5 block text-xs tracking-widest uppercase md:mb-2">
              Client
            </span>
            <span className="text-sm font-medium text-white sm:text-base">
              {project.client}
            </span>
          </div>

          {/* Year */}
          <div className="border-e md:border-e-zinc-800/85 md:pe-8">
            <span className="text-gray mb-1.5 block text-xs tracking-widest uppercase md:mb-2">
              Year
            </span>
            <span className="text-sm font-medium text-white sm:text-base">
              {project.year}
            </span>
          </div>

          {/* Discipline */}
          <div className="sm:col-span-2 md:col-span-1">
            <span className="text-gray mb-1.5 block text-xs tracking-widest uppercase md:mb-2">
              Discipline
            </span>
            <span className="text-sm font-medium text-white sm:text-base">
              {project.discipline}
            </span>
          </div>
        </div>

        {/* MAIN IMG */}
        <div className="group mt-8 md:h-130 w-full overflow-hidden rounded-3xl border border-zinc-800/85">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
      </div>
    </Section>
  );
};

export default Heroo;

import Section from '@/components/Section';
import Title from '@/components/Title';

const Manifesto = () => {
  return (
    <Section style="flex flex-col items-start justify-start text-white">
      <div className="w-full max-w-6xl space-y-6 sm:space-y-8 md:space-y-12">
        {/* Title Component */}
        <Title title="MANIFESTO" />

        {/* Manifesto Content */}
        <h2 className="text-2xl leading-tight font-bold tracking-tight wrap-break-word text-[#e5e5e5] min-[380px]:text-3xl sm:text-4xl sm:leading-15 md:text-5xl md:leading-20 lg:text-6xl xl:text-7xl">
          We work in the
          <span className="text-cornflower-blue inline font-semibold">
            dark
          </span>
          on purpose — reducing each brand to one true
          <span className="text-cornflower-blue inline font-semibold">
            signal,
          </span>
          then building it into something that feels
          <span className="text-cornflower-blue inline font-medium">
            inevitable.
          </span>
        </h2>
      </div>
    </Section>
  );
};

export default Manifesto;

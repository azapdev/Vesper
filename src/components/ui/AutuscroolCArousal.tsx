const TrustedBrands = () => {
  const brands = [
    'ATLAS',
    'ZENITH',
    'NEBULA',
    'AXIOM',
    'HALCYON',
    'VERTEX',
    'PULSAR',
    'SYNAPSE',
  ];

  return (
    <section className="w-full overflow-hidden bg-black py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4">
        {/* Subtitle with dots */}
        <div className="flex items-center gap-3 text-xs font-medium tracking-[0.25em] text-gray-400 uppercase sm:text-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
          <span>Trusted by teams shaping what comes next</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="animate-marquee flex w-max items-center gap-16 hover:[animation-play-state:paused] md:gap-24">
            {[...brands, ...brands].map((brand, index) => (
              <span
                key={index}
                className="cursor-pointer text-xl font-extrabold tracking-wider text-gray-500 transition-colors duration-300 select-none hover:text-white sm:text-2xl md:text-3xl"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;

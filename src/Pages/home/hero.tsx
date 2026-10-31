import HeroOrbCanvas from '@/components/ui/HeroOrb';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';

export function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <div className="relative flex h-160 w-full flex-col items-center justify-center overflow-hidden rounded-md bg-black">
      {/* Hero */}
      <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">

        <HeroOrbCanvas />

        <div className="relative z-10 flex w-full flex-col items-center gap-4 px-4 text-center sm:gap-5 md:gap-6">

          {/* EST */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="bg-cornflower-blue h-2 w-2 shrink-0 rounded-full shadow-[0_0_10px_#6390ff]" />
            <p className="text-xs font-bold tracking-[0.2em] text-white sm:text-sm md:text-base">
              CREATIVE STUDIO — EST. 2026
            </p>
          </div>

          {/* Heading */}
          <h2 className="max-w-4xl text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            We build worlds beyond the dark
          </h2>

          {/* Description */}
          <p className="max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
            An independent design studio crafting cinematic brands, products,
            and digital worlds for companies reaching further than before.
          </p>

          <div className="mt-4">
            <a
              href="#contact"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
            >
              Start a project
            </a>
          </div>
          
        </div>
      </main>

      <ShootingStars
        minSpeed={3}
        maxSpeed={6}
        minDelay={300}
        maxDelay={3500}
        starWidth={120}
        starHeight={2}
        starColor="#ffffff"
        trailColor="#a78bfa"
      />

      <StarsBackground
        starDensity={0.0005}
        allStarsTwinkle={true}
        twinkleProbability={0.9}
        minTwinkleSpeed={0.5}
        maxTwinkleSpeed={2}
      />
    </div>
  );
}

import { Button } from '@/components/Button';
import Section from '@/components/Section';
import Title from '@/components/Title';
import HeroOrbCanvas from '@/components/ui/HeroOrb';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';
import { Links } from '@/Routes/routes';

export function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <Section style="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-md ">
      {/* Hero */}
      <main className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black">
        <HeroOrbCanvas />

        <div className="relative z-10 flex w-full flex-col items-center gap-4 px-4 text-center sm:gap-5 md:gap-6">
          {/* EST */}
          <Title title="CREATIVE STUDIO — EST. 2026" />

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
            <Button title="Start Project" to={Links.CONTACT} />
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
    </Section>
  );
}

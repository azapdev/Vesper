export default function WaitingScreen() {
  return (
    <div className="text-zumthor relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#0b0c10] p-4 font-['Space_Grotesk',sans-serif] select-none sm:p-6 md:p-8">
      {/* Background Glow - Scaled responsively for screens */}
      <div className="bg-cornflower-blue pointer-events-none absolute h-62.5 w-62.5 animate-pulse rounded-full opacity-15 blur-[70px] sm:h-87.5 sm:w-87.5 sm:blur-[100px] lg:h-112.5 lg:w-112.5" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[90%] flex-col items-center justify-center gap-6 text-center sm:max-w-md sm:gap-8 md:max-w-lg">
        {/* Spinner Wrapper */}
        <div className="relative flex h-16 w-16 items-center justify-center transition-all duration-300 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
          {/* Rotating Ring */}
          <div className="border-zumthor/10 border-t-cornflower-blue border-r-cornflower-blue h-full w-full animate-spin rounded-full border-[2.5px] shadow-[0_0_20px_rgba(99,144,255,0.25)] sm:border-3" />

          {/* Glowing Center Core */}
          <div className="bg-zumthor absolute h-2 w-2 rounded-full shadow-[0_0_12px_var(--color-zumthor)] sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3" />
        </div>

        {/* Text Details */}
        <div className="w-full space-y-2 sm:space-y-3">
          <h1 className="text-zumthor text-xl leading-tight font-bold tracking-tight sm:text-2xl md:text-3xl">
            Coming Soon....
          </h1>
          <p className="text-gray mx-auto max-w-xs text-xs leading-relaxed sm:max-w-sm sm:text-sm md:max-w-md md:text-base">
            We are preparing everything for you, it will only take a moment.
          </p>
        </div>
      </div>
    </div>
  );
}

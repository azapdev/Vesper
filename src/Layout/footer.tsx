import { Link } from 'react-router-dom';
import { Links } from '../Routes/routes';

const Footer = () => {
  const NavLinks = [
    { to: Links.WORK, Title: 'WORK' },
    { to: Links.ABOUT, Title: 'ABOUT' },
    { to: Links.CONTACT, Title: 'CONTACT' },
  ];

  return (
    <footer className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 md:py-14">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        {/* BRAND */}
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <span className="bg-cornflower-blue h-2 w-2 shrink-0 rounded-full shadow-[0_0_10px_#6390ff]" />

            <Link
              to={Links.HOME}
              className="text-xl font-bold tracking-widest text-white"
            >
              VESPER
            </Link>
          </div>

          <p className="my-3 max-w-64 text-sm leading-relaxed text-gray-400">
            A creative studio building brands, interfaces, and films beyond the
            dark.
          </p>

          <a
            href="mailto:hello@vesper.studio"
            className="mt-4 inline-block text-sm text-gray-400 transition-colors duration-200 hover:text-white"
          >
            hello@vesper.studio
          </a>
        </div>

        {/* SITEMAP */}
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <p className="mb-1 text-sm font-semibold tracking-widest text-white">
            SITEMAP
          </p>

          {NavLinks.map((route) => (
            <Link
              key={route.to}
              to={route.to}
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {route.Title}
            </Link>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-10 border-t border-white/10 pt-5">
        <p className="text-xs text-gray-500">
          © 2026 VESPER Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

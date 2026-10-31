import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Links } from '../Routes/routes';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = [
    { to: Links.WORK, Title: 'WORK' },
    { to: Links.ABOUT, Title: 'ABOUT' },
    { to: Links.CONTACT, Title: 'CONTACT' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 px-5 py-4 backdrop-blur-2xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* LOGO */}
          <Link
            to={Links.HOME}
            onClick={closeMenu}
            className="text-lg font-bold tracking-widest text-white"
          >
            VESPER
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 text-xs md:flex">
            {NavLinks.map((route) => (
              <Link
                key={route.to}
                to={route.to}
                className="text-gray transition-colors duration-200 hover:text-white"
              >
                {route.Title}
              </Link>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                isOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                isOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>

          {/* MOBILE DROPDOWN */}
          <nav
            className={`absolute top-full left-0 w-full overflow-hidden border-b border-white/10 bg-black/80 px-6 backdrop-blur-2xl transition-all duration-300 ease-out md:hidden ${
              isOpen
                ? 'visible max-h-72 translate-y-0 py-6 opacity-100'
                : 'invisible max-h-0 -translate-y-3 py-0 opacity-0'
            }`}
          >
            <div className="flex flex-col gap-6">
              {NavLinks.map((route) => (
                <Link
                  key={route.to}
                  to={route.to}
                  onClick={closeMenu}
                  className="text-sm tracking-widest text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  {route.Title}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;

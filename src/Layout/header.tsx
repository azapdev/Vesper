import { Link } from 'react-router-dom';
import { Links } from '../Routes/routes';

const Header = () => {
  // NavLinks
  const NavLinks = [
    {
      to: Links.WORK,
      Title: 'WORK',
    },
    {
      to: Links.ABOUT,
      Title: 'ABOUT',
    },
    {
      to: Links.CONTACT,
      Title: 'CONTACT',
    },
  ];

  return (
    <section className="border-b-gray border-b bg-transparent px-8 py-2 backdrop-blur-2xl">
      {/* DESKTOP_NAVBAR */}
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to={Links.HOME} className="text-xl font-bold tracking-widest">
          VESPER
        </Link>
        <div className="flex gap-8 text-xs">
          {NavLinks.map((route) => (
            <Link
              to={route.to}
              className="text-grey duration-200 hover:text-white"
            >
              {route.Title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;

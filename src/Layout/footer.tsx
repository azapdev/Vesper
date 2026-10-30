import { Link } from 'react-router-dom';
import { Links } from '../Routes/routes';

const Footer = () => {
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
    <section className="mx-auto flex w-full max-w-7xl items-center justify-between">
      {/* VESPER */}
      <div>
        {/* MAin_LINK */}
        <div className="flex items-center gap-1">
          <span className="bg-cornflower-blue h-2 w-2 rounded-full shadow-[0_0_10px_#6390ff]"></span>{' '}
          <Link to={Links.HOME} className="text-xl font-bold tracking-widest">
            VESPER
          </Link>
        </div>
        <h2 className="text-gray my-2 max-w-40 text-sm">
          A creative studio building brands, interfaces, and films beyond the
          dark.
        </h2>
        <p className="text-gray my-4 max-w-40 cursor-pointer text-sm duration-200 hover:text-white">
          hello@vesper.studio
        </p>
      </div>

      {/* SITEMAP */}
      <div className="flex flex-col items-center gap-2 text-xs">
        <p className="text-gray text-lg duration-200">Sitemap</p>
        {NavLinks.map((route) => (
          <Link
            to={route.to}
            className="text-gray duration-200 hover:text-white"
          >
            {route.Title}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Footer;

import { About, Contact, Home, Work } from '../Pages';

export const Links = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  CONTACT: '/contact',
};

export const routes = [
  {
    path: Links.HOME,
    element: <Home />,
  },
  {
    path: Links.WORK,
    element: <Work />,
  },
  {
    path: Links.ABOUT,
    element: <About />,
  },
  {
    path: Links.CONTACT,
    element: <Contact />,
  },
];

import About from "@/Pages/about";
import Contact from "@/Pages/contact";
import Home from "@/Pages/home";
import Work from "@/Pages/work";

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

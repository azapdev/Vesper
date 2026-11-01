import { type ReactNode } from 'react';
type Props = {
  children: ReactNode;
  style?: string;
};
const Section = ({ children, style }: Props) => {
  return (
    <section
      className={`px-4 py-15 sm:px-8 sm:py-24 md:px-16 md:py-20 ${style}`}
    >
      {children}
    </section>
  );
};

export default Section;

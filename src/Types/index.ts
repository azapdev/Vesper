export type ProjectSection = {
  number: string;
  heading: string;
  content: string;
};

export type Project = {
  category: string;
  slug: string;
  title: string;
  description: string;
  client: string;
  year: number;
  image: string;
  image2: string;
  image3: string;
  discipline: string;
  sections: ProjectSection[];
};

export type ServiceType = {
  index: string;
  title: string;
  percent: number;
  sevices: string;
};
export type Member = {
  name: string;
  role: string;
  description: string;
  image: string;
};

export interface ProjectSection {
  number: string;
  heading: string;
  content: string;
}

export interface Project {
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
}

export default interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  pageUrl?: string;
  githubUrl?: string;
}
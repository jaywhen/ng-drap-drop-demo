export interface CategoryOption {
  name: string;
  projects: Project[];
}

export interface Project {
  name: string;
  category: string;
}

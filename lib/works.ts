import projectsData from "@/data/projects.json"

export type Project = {
  title: string
  description: string
  image: string
  tags: string[]
  href: string
  "git-repo": string
}

export const projects: Project[] = projectsData as Project[]

import fs from 'fs'
import path from 'path'

export function getAllProjects(): { slug: string }[] {
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects')
  const filenames = fs.readdirSync(projectsDirectory)

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ''),
  }))
}
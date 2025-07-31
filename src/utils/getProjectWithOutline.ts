// lib/mdx.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'

export async function getProjectWithOutline(slug: string) {
  const filePath = path.join(process.cwd(), 'src/content/projects', `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(fileContent)

  // Extract headings
  const headings: Array<{ level: number; text: string; id: string }> = []

  remark()
    .use(() => (tree) => {
      visit(tree, 'heading', (node: any) => {
        const text = node.children
          .filter((child: any) => child.type === 'text')
          .map((child: any) => child.value)
          .join('')

        headings.push({
          level: node.depth,
          text,
          id: text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        })
      })
    })
    .process(content)

  // Return the MDX content string instead
  return {
    headings,
    content, // this is the raw MDX string
    frontmatter
  }
}
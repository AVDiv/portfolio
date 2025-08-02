import { getAllProjectSlugs } from '@/utils/allProjectSlugs';
import { getProjectWithOutline } from '@/utils/getProjectWithOutline';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';
import ProjectSidebar from '@/components/Sidebar/ProjectSidebar';
import './article.css';
import Noise from '@/components/Animations/Noise/Noise';
import Dither from '@/components/Animations/Dither/Dither';

interface StaticParam {
  slug: string
}

type Params = Promise<{
  slug: string;
}>;

export async function generateStaticParams() {
  const projects: StaticParam[] = getAllProjectSlugs()

  return projects.map((project: StaticParam): StaticParam => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { content, headings, frontmatter } = await getProjectWithOutline((await params).slug)
  const components = useMDXComponents();
  return (
    <div className="flex flex-row bg-black p-5 w-screen min-h-screen">
      <div className="fixed top-0 left-0 h-full w-screen z-20 pointer-events-none">
        <Noise 
          patternSize={1}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={1}
          patternAlpha={20}
        />
      </div>
      <ProjectSidebar>
        {headings.map((heading) => (
          <a 
            key={heading.id}
            href={`#${heading.id}`}
            className={`block py-1 ${heading.level === 2 ? 'ml-4' : heading.level === 3 ? 'ml-8' : ''}`}
          >
            {heading.text}
          </a>
        ))}
      </ProjectSidebar>
      <main className="flex-1 w-full h-full min-h-[calc(100vh-2.5rem)] overflow-y-auto overflow-x-hidden bg-white rounded-2xl">
        <div className='w-full h-96 relative'>
          <div className='absolute h-full w-full inset-0 z-10 bg-gradient-to-t from-20% from-white to-transparent pointer-events-none'></div>
          <div className='absolute inset-0 z-0 pb-5 duration-300 ease-in-out blur-sm hover:blur-none -top-3 -left-3 -right-80'>
            <Dither
              waveColor={[1, 0, 0]}
              disableAnimation={false}
              enableMouseInteraction={true}
              mouseRadius={0.3}
              colorNum={4}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.05}
            />
          </div>
          <div className='w-full h-full flex flex-col z-20 relative justify-center items-center p-5 pointer-events-none'>
            <h1 className='text-4xl md:text-5xl font-bold'>{frontmatter.title}</h1>
            {frontmatter.note && (
              <p className='text-base pt-3 text-slate-700'>{frontmatter.note}</p>
            )}
            {frontmatter.duration && (
              <p className='text-sm pt-1 text-slate-500'>{frontmatter.duration}</p>
            )}
          </div>
        </div>
        <article className="px-10 pb-10">
          <MDXRemote source={content} components={components} />
        </article>
      </main>
    </div>
  )
}
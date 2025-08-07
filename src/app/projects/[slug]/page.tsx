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
    <div className="flex flex-col lg:flex-row bg-black p-2 sm:p-3 md:p-4 lg:p-5 w-screen min-h-screen">
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
            className={`block py-1.5 text-sm lg:text-base transition-colors hover:text-red-500
              ${heading.level === 2 ? 'ml-4' : heading.level === 3 ? 'ml-8' : ''}`}
          >
            {heading.text}
          </a>
        ))}
      </ProjectSidebar>
      <main className="flex-1 w-full h-full min-h-[calc(100vh-1rem)] overflow-y-auto overflow-x-hidden bg-white rounded-xl lg:rounded-2xl">
        <div className='w-full h-48 sm:h-64 md:h-80 lg:h-96 relative'>
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
          <div className='w-full h-full flex flex-col z-20 relative justify-center items-center p-4 sm:p-5 pointer-events-none'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center'>{frontmatter.title}</h1>
            {frontmatter.note && (
              <p className='text-sm sm:text-base pt-2 sm:pt-3 text-slate-700 text-center max-w-2xl'>{frontmatter.note}</p>
            )}
            {frontmatter.duration && (
              <p className='text-xs sm:text-sm pt-1 text-slate-500'>{frontmatter.duration}</p>
            )}
          </div>
        </div>
        <div className='w-full h-full flex flex-col items-center justify-start pt-6 sm:pt-8 lg:pt-10'>
          <article className="px-4 sm:px-6 md:px-8 lg:px-10 pb-10 w-full max-w-[90rem] prose-sm sm:prose-base md:prose-lg prose-slate
            prose-headings:text-black prose-h1:text-3xl sm:prose-h1:text-4xl md:prose-h1:text-5xl
            prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl
            prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl
            prose-p:text-slate-700
            prose-strong:text-black prose-strong:font-semibold
            prose-a:text-red-600 prose-a:no-underline hover:prose-a:text-red-700
            prose-code:text-red-600 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
            prose-pre:bg-slate-900 prose-pre:rounded-xl
            prose-img:rounded-xl prose-img:shadow-lg
            prose-hr:border-slate-200
            prose-ul:list-disc prose-ol:list-decimal
            prose-li:text-slate-700
            prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:pl-4 prose-blockquote:italic
            prose-table:border-collapse prose-table:w-full
            prose-th:border prose-th:border-slate-300 prose-th:bg-slate-100 prose-th:p-2 prose-th:text-left
            prose-td:border prose-td:border-slate-300 prose-td:p-2">
            <MDXRemote source={content} components={components} />
          </article>
        </div>
      </main>
    </div>
  )
}
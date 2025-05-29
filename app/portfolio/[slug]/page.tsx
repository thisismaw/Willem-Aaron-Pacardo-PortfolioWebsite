import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';
import { PortfolioItem, getPortfolioItemBySlug, getAllPortfolioItems } from '@/lib/portfolioApi';

// Most basic prop typing for dynamic segment pages in Next.js App Router
interface PageProps {
  params: { slug: string };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Optional, if you use search params
}

export async function generateMetadata(
  { params }: PageProps, 
  parent: ResolvingMetadata
): Promise<Metadata> {
  const item = getPortfolioItemBySlug(params.slug);

  if (!item) {
    return {
      title: 'Project Not Found',
    }
  }
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${item.title || 'Portfolio Project'} | AssistbyAaron`,
    description: item.shortDescription || 'Details about this project.',
    openGraph: {
      title: item.title,
      description: item.shortDescription,
      images: item.imageUrl ? [item.imageUrl, ...previousImages] : previousImages,
      type: 'article', 
    },
  }
}


export async function generateStaticParams(): Promise<{ slug: string }[]> { 
  const allItems = getAllPortfolioItems();
  return allItems.map((item) => ({
    slug: item.slug,
  }));
}

export default function PortfolioItemPage({ params }: PageProps) { 
  const item = getPortfolioItemBySlug(params.slug);

  if (!item) {
    return notFound(); 
  }

  const fullDescriptionHtml = item.fullDescription?.split('\n\n').map((p, i) => `<p class="mb-4">${p}</p>`).join('') || `<p>${item.shortDescription}</p>`;


  return (
    <div className="bg-white py-12 sm:py-16">
      <article className="container mx-auto px-4 sm:px-6 max-w-4xl"> 
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 leading-tight">
            {item.title}
          </h1>
          <p className="text-lg text-cyan-700 font-semibold">{item.category}</p>
          {item.client && <p className="text-md text-slate-500 mt-1">Client: {item.client}</p>}
        </header>

        {item.imageUrl && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-8 sm:mb-10 shadow-xl">
            <Image
              src={item.imageUrl}
              alt={item.title || 'Project main image'}
              fill
              sizes="(max-width: 1024px) 100vw, 900px" 
              className="object-cover"
              priority
            />
          </div>
        )}
        
        <div className="prose prose-slate lg:prose-lg xl:prose-xl max-w-none mx-auto">
            {item.challenge && (
                <>
                    <h2 className="text-2xl font-semibold text-slate-700 mt-8 mb-2">The Challenge</h2>
                    <p>{item.challenge}</p>
                </>
            )}
            {item.solution && (
                 <>
                    <h2 className="text-2xl font-semibold text-slate-700 mt-6 mb-2">My Solution</h2>
                    <p>{item.solution}</p>
                </>
            )}
            <h2 className="text-2xl font-semibold text-slate-700 mt-6 mb-2">Project Details</h2>
            <div dangerouslySetInnerHTML={{ __html: fullDescriptionHtml }} />


            {item.results && item.results.length > 0 && (
                <>
                    <h2 className="text-2xl font-semibold text-slate-700 mt-6 mb-2">Key Results &amp; Impact</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {item.results.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                </>
            )}
            {item.tags && item.tags.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-2">Technologies &amp; Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="bg-cyan-100 text-cyan-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>

        {item.liveLink && item.liveLink !== "#" && (
            <div className="mt-10 text-center">
                <Link href={item.liveLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors">
                    View Live Project
                </Link>
            </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <Link href="/portfolio" className="text-cyan-700 hover:text-cyan-800 font-semibold hover:underline">
              &larr; Back to All Projects
          </Link>
        </div>
      </article>
    </div>
  );
}
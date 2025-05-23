import { getPostBySlug, getAllPosts, PostData } from '@/lib/blogApi';
import markdownToHtml from '@/lib/markdownToHtml';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPostBySlug(params.slug, ['title', 'excerpt', 'coverImage', 'author', 'date']);

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${post.title || 'Blog Post'} | Willem Pacardo`,
    description: post.excerpt || 'Read this blog post by Willem Pacardo.',
    authors: post.author ? [{ name: post.author }] : [],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage, ...previousImages] : previousImages,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : [],
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts(['slug']);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
    'tags',
  ]);

  if (!post || !post.content) {
    return notFound(); 
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <div className="bg-white py-12 sm:py-16">
      <article className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 leading-tight">
            {post.title}
          </h1>
          {post.date && (
            <p className="text-sm text-slate-500">
              Posted on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              {post.author && ` by ${post.author}`}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3">
              {post.tags.map(tag => (
                <span key={tag} className="inline-block bg-cyan-100 text-cyan-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.coverImage && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-8 sm:mb-10 shadow-lg">
            <Image
              src={post.coverImage}
              alt={post.title || 'Blog post cover image'}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
              priority 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.style.display = 'none'; 
                target.parentElement?.classList.add('bg-slate-200'); 
                console.error(`Failed to load cover image for post: ${post.slug}`);
              }}
            />
          </div>
        )}
        
        <div 
          className="prose prose-slate lg:prose-lg xl:prose-xl max-w-none mx-auto
                     prose-headings:text-slate-800 prose-a:text-cyan-600 hover:prose-a:text-cyan-700
                     prose-strong:text-slate-700 prose-blockquote:border-cyan-500 prose-blockquote:text-slate-600
                     prose-code:text-cyan-700 prose-code:bg-slate-100 prose-code:p-1 prose-code:rounded-md
                     prose-img:rounded-lg prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: contentHtml }} 
        />

        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <Link href="/blog" legacyBehavior>
            <a className="text-cyan-700 hover:text-cyan-800 font-semibold hover:underline">
              &larr; Back to All Blog Posts
            </a>
          </Link>
        </div>
      </article>
    </div>
  );
}

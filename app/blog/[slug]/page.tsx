// app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/blogApi'; // You'll create these helper functions
import { notFound } from 'next/navigation';
import markdownToHtml from '@/lib/markdownToHtml'; // Helper function using remark, etc.

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = getAllPosts(['slug']); // Get all slugs
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
   const post = getPostBySlug(params.slug, ['title', 'excerpt']);
   if (!post) {
       return notFound();
   }
   return {
       title: post.title,
       description: post.excerpt,
       // Add other metadata like openGraph images etc.
   };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
  ]);

  if (!post) {
    return notFound();
  }

  const contentHtml = await markdownToHtml(post.content || '');

  return (
    <article className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-2">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="w-full h-auto rounded-lg my-4 sm:my-6" />
      )}
      <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}

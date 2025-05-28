import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // For parsing frontmatter

const postsDirectory = path.join(process.cwd(), '_posts');

export interface PostData {
  slug: string;
  title?: string;
  date?: string; // Make sure your Markdown frontmatter includes a date
  author?: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  content?: string;
  [key: string]: any; // Allow other frontmatter fields
}

export function getPostSlugs() {
  try {
    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map(filename => filename.replace(/\.(md|mdx)$/, ''));
  } catch (error) {
    console.error("Error reading posts directory in getPostSlugs:", error);
    return []; 
  }
}

export function getPostBySlug(slug: string, fields: string[] = []): PostData | null {
  const realSlug = slug.replace(/\.(md|mdx)$/, '');
  let fullPath = path.join(postsDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Post not found for slug: ${realSlug} at path ${fullPath}`);
      return null; 
    }
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents); 

    const items: PostData = { slug: realSlug };

    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug;
      }
      if (field === 'content') {
        items[field] = content;
      }
      if (typeof data[field] !== 'undefined') {
        items[field] = data[field];
      }
    });
    return items;
  } catch (error) {
    console.error(`Error reading or parsing post ${realSlug}:`, error);
    return null;
  }
}

export function getAllPosts(fields: string[] = []): PostData[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post): post is PostData => post !== null) 
    .sort((post1, post2) => (post1.date && post2.date && new Date(post1.date) > new Date(post2.date) ? -1 : 1));
  return posts;
}

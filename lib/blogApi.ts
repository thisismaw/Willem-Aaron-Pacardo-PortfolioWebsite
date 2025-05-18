import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // For parsing frontmatter

// Define the path to your posts directory
// Adjust this if you named your posts folder differently (e.g., 'content/blog')
const postsDirectory = path.join(process.cwd(), '_posts');

export interface PostData {
  slug: string;
  title?: string;
  date?: string;
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
    console.error("Error reading posts directory:", error);
    return []; // Return empty array if directory doesn't exist or error occurs
  }
}

export function getPostBySlug(slug: string, fields: string[] = []): PostData | null {
  const realSlug = slug.replace(/\.(md|mdx)$/, '');
  let fullPath = path.join(postsDirectory, `${realSlug}.md`);
  
  // Check for .mdx if .md is not found
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Post not found for slug: ${realSlug}`);
      return null; // Post not found
    }
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents); // Parse frontmatter and content

    const items: PostData = { slug: realSlug };

    // Ensure only the minimal needed data is exposed
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
    .filter((post): post is PostData => post !== null) // Type guard to filter out nulls
    // Sort posts by date in descending order (newest first)
    .sort((post1, post2) => (post1.date && post2.date && post1.date > post2.date ? -1 : 1));
  return posts;
}
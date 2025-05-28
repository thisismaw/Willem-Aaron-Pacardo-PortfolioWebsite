import { remark } from 'remark';
import html from 'remark-html';
// import prism from 'remark-prism'; // Temporarily commented out to isolate the ENOENT error

export default async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html, { sanitize: false }) // Be cautious with sanitize: false if content is user-generated
    // .use(prism) // Temporarily commented out
    .process(markdown);
  return result.toString();
}

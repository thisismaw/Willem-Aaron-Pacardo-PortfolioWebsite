import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';
import { PortfolioItem } from '@/app/portfolio/page'; // Import the interface

// Sample data - In a real app, you'd fetch this from a CMS or a more robust data source
// For now, we'll reuse the portfolioData from the listing page for simplicity.
// In a real scenario, getPortfolioItemBySlug would fetch from your data source.
const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    slug: "wordpress-client-site",
    title: "Client Website Redesign",
    category: "WordPress",
    imageUrl: "/images/portfolio/social-PH.jpg", 
    shortDescription: "Complete redesign for a local bakery, boosting online orders by 30%.",
    fullDescription: "The client, 'The Sweet Spot Bakery', approached me with an outdated website that wasn't mobile-friendly and lacked any e-commerce capabilities. Their primary goal was to increase online visibility and allow customers to place orders directly through the site. \n\nI developed a fully custom, responsive WordPress theme from scratch, focusing on a clean, appetizing design that reflected their brand. Key features included an intuitive online ordering system integrated with WooCommerce, optimized product pages with high-quality imagery, and a streamlined checkout process. Local SEO best practices were implemented throughout the site. \n\nPost-launch, the bakery saw a 30% increase in online orders within the first two months and a significant improvement in their local search engine rankings, often appearing in the top 3 results for relevant keywords. The bounce rate also decreased by 50%, indicating a much-improved user experience.",
    client: "The Sweet Spot Bakery",
    challenge: "Outdated website with no e-commerce functionality and poor mobile experience, leading to missed sales opportunities.",
    solution: "Developed a custom, responsive WordPress theme with WooCommerce integration. Implemented an intuitive online ordering system, optimized product pages for conversions, and improved local SEO.",
    results: ["30% increase in online orders within 2 months.", "Improved local SEO ranking to top 3 for key search terms.", "50% reduction in website bounce rate.", "Enhanced brand image and customer satisfaction."],
    liveLink: "#", 
    tags: ["WordPress", "E-commerce", "Web Design", "SEO", "WooCommerce"],
  },
  {
    id: 2,
    slug: "social-media-campaign-xyz",
    title: "Social Media Campaign XYZ",
    category: "Social Media",
    imageUrl: "/images/portfolio/social-PH.jpg",
    shortDescription: "Managed a 3-month campaign increasing engagement by 150%.",
    fullDescription: "Tech Startup Inc. needed to generate buzz and leads for their new SaaS product. I was tasked with creating and managing a 3-month targeted social media campaign across LinkedIn and Twitter. \n\nMy role involved developing the overall content strategy, crafting compelling ad copy and visuals (including short video ads edited with CapCut), setting up and optimizing ad targeting, managing the budget, and providing weekly performance reports. We utilized A/B testing for ad creatives and continuously refined our approach based on data. \n\nThe campaign successfully surpassed all key performance indicators. We achieved a 150% increase in overall engagement (likes, shares, comments) compared to previous benchmarks and generated a 70% growth in qualified leads through targeted landing pages. The client was extremely pleased with the ROI and brand visibility achieved.",
    client: "Tech Startup Inc.",
    tags: ["Social Media Marketing", "Content Creation", "Ad Campaign", "Lead Generation", "CapCut"],
  },
  {
    id: 3,
    slug: "capcut-video-series",
    title: "Explainer Video Series",
    category: "Video Editing",
    imageUrl: "/images/portfolio/social-PH.jpg",
    shortDescription: "Produced 10 engaging explainer videos using CapCut & DaVinci Resolve.",
    fullDescription: "LearnWell Platform, an online education provider, required a series of 10 short, animated explainer videos to simplify complex topics for their students. I worked closely with their subject matter experts to review scripts and storyboards. \n\nUsing CapCut for initial edits and mobile-friendly aspects, and DaVinci Resolve for more advanced color grading and effects, I produced the full series. This included sourcing appropriate B-roll footage and stock animations, creating custom motion graphics for titles and callouts, and ensuring consistent branding across all videos. \n\nThe videos have received excellent feedback from students for their clarity and engaging style, contributing to higher course completion rates.",
    client: "LearnWell Platform",
    tags: ["Video Editing", "CapCut", "DaVinci Resolve", "Motion Graphics", "Educational Content"],
  },
   {
    id: 4,
    slug: "notion-startup-os",
    title: "Startup Operations Hub",
    category: "Notion",
    imageUrl: "/images/portfolio/social-PH.jpg",
    shortDescription: "Built a custom Notion dashboard for a tech startup, improving team productivity.",
    fullDescription: "A fast-growing tech startup was struggling with scattered project information, inefficient task tracking, and a lack of a central knowledge base. I designed and implemented a comprehensive 'Startup OS' within Notion. \n\nThis involved creating interconnected databases for projects, tasks (with assignments, deadlines, and progress tracking), a client CRM, a content calendar, and a company wiki for SOPs and resources. Custom dashboards were built for different team roles, providing personalized views of relevant information. \n\nThe new Notion system led to a significant improvement in team productivity, with an estimated 10+ hours saved per week collectively on project management and information retrieval. It also fostered better collaboration and transparency across the organization.",
    client: "Innovatech Solutions",
    tags: ["Notion", "Project Management", "Workflow Automation", "CRM", "Knowledge Base"],
  },
  {
    id: 5,
    slug: "google-workspace-streamline",
    title: "Workspace Optimization",
    category: "Google Workspace",
    imageUrl: "/images/portfolio/social-PH.jpg",
    shortDescription: "Streamlined email and file management for a small consultancy.",
    fullDescription: "A small consultancy firm was facing challenges with inefficient email management, disorganized Google Drive files, and inconsistent calendar scheduling. I conducted an audit of their Google Workspace usage and implemented several optimizations. \n\nThis included setting up shared drives with clear folder structures and permissions, creating email filters and templates in Gmail to manage high volumes of communication, and standardizing their Google Calendar usage for team scheduling. I also provided training to their team on best practices. \n\nThe result was a more organized and efficient digital workspace, reducing time spent searching for files and improving internal communication.",
    client: "Synergy Consultants",
    tags: ["Google Workspace", "Productivity", "File Management", "Email Management", "Admin Support"],
  },
  {
    id: 6,
    slug: "canva-brand-assets",
    title: "Brand Asset Creation",
    category: "Canva",
    imageUrl: "/images/portfolio/social-PH.jpg",
    shortDescription: "Designed a complete set of social media templates and brand assets.",
    fullDescription: "A new lifestyle blogger needed a cohesive set of brand assets for her online presence. Using Canva, I designed a suite of templates including Instagram post and story graphics, Pinterest pins, YouTube channel art, and a simple logo. \n\nThe designs focused on her brand's aesthetic – minimalist and modern with a touch of warmth. I provided a set of editable Canva templates so she could easily create new content while maintaining brand consistency. This empowered her to quickly produce professional-looking visuals without needing advanced design skills.",
    client: "Lifestyle Blogger",
    tags: ["Canva", "Graphic Design", "Social Media Graphics", "Branding"],
  },
];

export function getPortfolioItemBySlug(slug: string): PortfolioItem | undefined {
  return portfolioData.find(item => item.slug === slug);
}


type PortfolioPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: PortfolioPageProps,
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


export async function generateStaticParams() {
  return portfolioData.map((item) => ({
    slug: item.slug,
  }));
}

export default function PortfolioItemPage({ params }: PortfolioPageProps) {
  const item = getPortfolioItemBySlug(params.slug);

  if (!item) {
    return notFound(); 
  }

  const fullDescriptionHtml = item.fullDescription?.split('\n\n').map((p, i) => `<p class="mb-4">${p}</p>`).join('') || '<p>No detailed description available.</p>';


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
              // Removed onError as it's problematic in Server Components for this use case
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
                    <h2 className="text-2xl font-semibold text-slate-700 mt-6 mb-2">Key Results & Impact</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {item.results.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                </>
            )}
            {item.tags && item.tags.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-2">Technologies & Skills</h3>
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
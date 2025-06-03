export interface PortfolioItem { 
  id: number;
  slug: string; 
  title: string;
  category: string; 
  imageUrl: string; // Main thumbnail/cover image
  shortDescription: string;
  fullDescription?: string; 
  client?: string;          
  challenge?: string;       
  solution?: string;        
  results?: string[];       
  liveLink?: string; 
  downloadUrl?: string; 
  galleryImages?: string[]; // New: Array of image URLs for a series
   youtubeVideoId?: string; // New: For embedding YouTube videos
  tags?: string[];          
  delay?: string; 
}

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    slug: "wordpress-client-site",
    title: "Client Website Redesign",
    category: "WordPress",
    imageUrl: "/images/portfolio/social-PH.jpg",
    shortDescription: "Complete redesign for a local bakery, boosting online orders by 30%.",
    fullDescription: "The client, 'The Sweet Spot Bakery', approached me with an outdated website that wasn&apos;t mobile-friendly and lacked any e-commerce capabilities. Their primary goal was to increase online visibility and allow customers to place orders directly through the site. \n\nI developed a fully custom, responsive WordPress theme from scratch, focusing on a clean, appetizing design that reflected their brand. Key features included an intuitive online ordering system integrated with WooCommerce, optimized product pages with high-quality imagery, and a streamlined checkout process. Local SEO best practices were implemented throughout the site. \n\nPost-launch, the bakery saw a 30% increase in online orders within the first two months and a significant improvement in their local search engine rankings, often appearing in the top 3 results for relevant keywords. The bounce rate also decreased by 50%, indicating a much-improved user experience.",
    client: "The Sweet Spot Bakery",
    challenge: "Outdated website with no e-commerce functionality and poor mobile experience, leading to missed sales opportunities.",
    solution: "Developed a custom, responsive WordPress theme with WooCommerce integration. Implemented an intuitive online ordering system, optimized product pages for conversions, and improved local SEO.",
    results: ["30% increase in online orders within 2 months.", "Improved local SEO ranking to top 3 for key search terms.", "50% reduction in website bounce rate.", "Enhanced brand image and customer satisfaction."],
    liveLink: "#", 
    tags: ["WordPress", "E-commerce", "Web Design", "SEO", "WooCommerce"],
    delay: "0s",
  },
  {
  id: 2,
  slug: "crypto-fb-page-management",
  title: "Crypto Facebook Page Management",
  category: "Graphic Design",
  imageUrl: "/images/portfolio/cryptographics/btc4.webp", // Cover image for the series
  shortDescription: "Managed and designed content for a crypto-focused Facebook page.",
  fullDescription: "I made and managed a crypto informative Facebook page. I edited content and created graphics tailored to the audience. The goal was to maintain an active and visually consistent page that simplified complex crypto concepts for everyday users.",
  client: "Personal Project",
  challenge: "Creating consistent, engaging visuals and simplified content in a fast-moving niche like cryptocurrency.",
  solution: "Used Canva to design clear, informative graphics. Regularly posted bite-sized crypto updates and educational content to grow and engage the audience.",
  results: [
    "Built and maintained a niche-specific crypto audience.",
    "Improved engagement with visually optimized and easy-to-digest posts.",
    "Established a consistent brand tone and visual style."
  ],
  galleryImages: [
    "/images/portfolio/cryptographics/btc1.webp",
    "/images/portfolio/cryptographics/btc2.webp",
    "/images/portfolio/cryptographics/btc5.webp",
    "/images/portfolio/cryptographics/btc3.webp"
  ],
  tags: ["Canva", "Content Management", "Crypto", "Facebook Marketing", "Graphic Design"],
  delay: "0.1s"
  },
  {
    id: 3,
    slug: "travel-itinerary-planning",
    title: "An Arctic Tapestry",
    category: "Document Creation",
    imageUrl: "/images/thumbnail/arctic-thumbnail.png",
    shortDescription: "A detailed travel itinerary to Norway showcasing planning and organizational skills. Click to download",
    fullDescription: "This is 14-day travel itinerary for a trip to Norway demonstrates meticulous planning, research, and organizational skills. It includes daily schedules, booking confirmations, budget considerations, transportation details, and recommendations for activities and dining. The document is designed to be clear, easy to follow, and visually appealing, providing a seamless travel experience.",
    client: "NDA",
    challenge: "Creating a comprehensive yet easy-to-follow travel plan for a multi-day trip.",
    solution: "Researched and compiled all necessary travel information, organized it into a comfortable schedule, and presented it in a clear, user-friendly PDF format.",
    results: ["Demonstrates strong organizational and research skills.", "Showcases ability to create professional, detailed documents.", "Provides a tangible example of planning capabilities."],
    downloadUrl: "/downloads/An-Arctic-Tapestry.pdf", // Ensure this file exists in public/downloads/
    tags: ["Travel Planning", "Document Creation", "Organization", "Research"],
    delay: "0.2s",
  },
  {
  id: 4,
  slug: "mawi-travels-video-editing",
  title: "Mawi Travels - YouTube Video Edits",
  category: "Video Editing / Travel",
  imageUrl: "/images/thumbnail/arctic-thumbnail.png", // Replace with actual video thumbnail URL
  shortDescription: "Edited both Shorts and long-form travel vlogs for my personal channel, Mawi Travels.",
  fullDescription: "For my YouTube channel 'Mawi Travels,' I edited a variety of travel videos, including both long-form vlogs and YouTube Shorts. The focus was on clean, simple storytelling through clips, pacing, and music, without using motion graphics or advanced sound design. The goal was to showcase destinations through a minimalist and immersive edit.",
  client: "Personal Project - Mawi Travels (YouTube)",
  challenge: "Creating engaging travel content using only basic editing techniques and natural footage.",
  solution: "Used CapCut to trim footage, arrange story flow, apply simple transitions, add text overlays when needed, and match visuals to music. Prioritized authentic visuals over effects.",
  results: [
    "Built a library of travel content for YouTube Shorts and vlogs.",
    "Improved storytelling and pacing with minimalist editing.",
    "Consistent visual style and growing viewer interest (mock)."
  ],
  youtubeVideoId: "dQw4w9WgXcQ", // Replace with actual video ID from Mawi Travels
  liveLink: "https://www.youtube.com/@mawmawmawi", // Replace with your actual channel link if available
  tags: ["Video Editing", "CapCut", "Travel Vlog", "YouTube Shorts", "Simple Edits"],
  delay: "0.3s"
  },
  {
    id: 5,
    slug: "nature-retreat-drone-edit",
    title: "Nature Retreat - Drone & GoPro Edit",
    category: "Video Editing / Travel",
    imageUrl: "/images/thumbnail/arctic-thumbnail.png", // Replace with actual video thumbnail URL
    shortDescription: "Scenic drone and GoPro footage compiled into a serene travel montage. Edited with DaVinci Resolve.",
    fullDescription: "A calming montage of a nature retreat, featuring stunning drone aerials and immersive GoPro shots. Edited in DaVinci Resolve, with a focus on smooth transitions, cinematic color grading, and evocative sound design to highlight the tranquility of the location.",
    client: "Travel Vlogger (Collaboration)",
    challenge: "Combining diverse footage types (drone, GoPro) into a cohesive and emotionally resonant video.",
    solution: "Leveraged DaVinci Resolve for advanced color grading, clip stabilization, and audio mixing. Created a narrative flow that guides the viewer through the experience.",
    results: ["Effectively captured the serene beauty of the location.", "Showcases skills in DaVinci Resolve and handling different video formats.", "Enhanced the client's vlog series with a professional touch."],
    youtubeVideoId: "rokGy0huYEA", // Example: Relaxing Music video ID, REPLACE THIS
    liveLink: "https://www.youtube.com/watch?v=rokGy0huYEA",
    tags: ["Video Editing", "DaVinci Resolve", "Drone Footage", "GoPro", "Color Grading", "Sound Design"],
    delay: "0.4s",
  }
];

export function getAllPortfolioItems(): PortfolioItem[] {
  return portfolioData;
}
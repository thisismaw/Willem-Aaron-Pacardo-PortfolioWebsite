import type { Metadata } from 'next';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 
import './globals.css'; 
import { Inter, Rock_Salt } from 'next/font/google'; // Import next/font

// Configure Inter font for the body
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable name
  display: 'swap',
});

// Configure Rock Salt font for the logo
const rockSalt = Rock_Salt({
  weight: ['400'], // Rock Salt typically only has a 400 weight
  subsets: ['latin'],
  variable: '--font-rock-salt', // CSS variable name
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AssistbyAaron - Freelance Digital Expert', 
  description: 'Freelance services in video editing, social media, web development, and e-commerce.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Apply font variables to the html tag
    <html lang="en" className={`${inter.variable} ${rockSalt.variable}`}>
      <head>
        {/* Google Font <link> tags are no longer needed here if using next/font */}
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased font-sans"> 
        <Navbar />
        <main>{children}</main> 
        <Footer />
      </body>
    </html>
  );
}
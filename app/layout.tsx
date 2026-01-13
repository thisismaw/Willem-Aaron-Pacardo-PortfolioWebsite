import type { Metadata } from 'next';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 
import './globals.css'; 
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// New Bold Branding Font
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'AssistByAaron | Digital Operations & Web Solutions',
  description: 'Specializing in automation, WordPress development, and operational support to scale your business.',
  openGraph: {
    title: 'AssistByAaron',
    description: 'Streamlined digital operations and web development.',
    url: 'https://assistbyaaron.com',
    siteName: 'AssistByAaron',
    images: [
      {
        url: '/og-image.png', // Add a nice preview image in your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

// Inside layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-white text-slate-900 antialiased font-sans"> 
        <Navbar />
        <main>{children}</main> 
        <Footer />
      </body>
    </html>
  );
}


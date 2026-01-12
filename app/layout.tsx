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

export const metadata: Metadata = {
  title: 'AssistByAaron - Digital Growth & Development', 
  description: 'Freelance services in web development, operations, and creative content.',
};

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
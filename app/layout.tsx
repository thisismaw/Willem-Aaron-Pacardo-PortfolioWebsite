// File: app/layout.tsx (This is the root layout)
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer';
import './globals.css'; 

export const metadata: Metadata = {
  title: 'Your Name - Freelance Digital Expert',
  description: 'Freelance services in video editing, social media, web development, and e-commerce.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className="bg-slate-50 text-gray-800 antialiased"> 
        <Navbar />
        <main>{children}</main> 
        <Footer />
      </body>
    </html>
  );
}

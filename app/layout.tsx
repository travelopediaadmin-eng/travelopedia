import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The TraveloPedia | Curated Luxury Tours & Customized Holidays (Surat)',
  description: 'Experience handcrafted domestic & international luxury travel with The TraveloPedia, Surat’s premier travel designers. Dubai, Bali, Europe, Kashmir, Kerala & beyond. 7, E-Space, VIP Road, Vesu.',
  keywords: 'The TraveloPedia, Luxury Travel Agency Surat, Tour Packages Surat, Custom Tours Vesu Surat, Cox and Kings style tours, International Holidays Gujarat',
  openGraph: {
    title: 'The TraveloPedia | Curated Luxury Journeys',
    description: 'Surat’s premier luxury holiday planners. Personalized itineraries, 5-star stays, and 24x7 travel concierge.',
    url: 'https://thetravelopedia.com',
    siteName: 'The TraveloPedia',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'The TraveloPedia Luxury Holidays',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${sansFont.variable} ${serifFont.variable}`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingConcierge from '@/components/FloatingConcierge';
import LiveSocialProof from '@/components/LiveSocialProof';
import WorldMapBackground from '@/components/WorldMapBackground';
import TripComparisonDrawer from '@/components/TripComparisonDrawer';
import TravelWishlistDrawer from '@/components/TravelWishlistDrawer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Global Ultra-Light World Map Watermark across entire website */}
      <WorldMapBackground />
      <Navbar />
      <main className={`flex-1 relative z-10 ${!isHomepage ? 'pt-[72px] sm:pt-[80px]' : ''}`}>
        {children}
      </main>
      <Footer />
      <FloatingConcierge />
      <LiveSocialProof />
      <TripComparisonDrawer />
      <TravelWishlistDrawer />
    </div>
  );
}

import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://travel-trucks.example.com'),
  title: {
    default: 'TravelTrucks — Camper rental',
    template: '%s',
  },
  description:
    'Rent the camper of your dreams with TravelTrucks. Browse our catalog, filter by location, vehicle type, engine and transmission, and book online.',
  keywords: ['camper rental', 'RV rental', 'travel trucks', 'campervan', 'motorhome'],
  openGraph: {
    title: 'TravelTrucks — Camper rental',
    description: 'Find and book the camper of your dreams.',
    type: 'website',
    siteName: 'TravelTrucks',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
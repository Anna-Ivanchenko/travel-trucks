import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-family',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--second-family',
  display: 'swap',
});

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
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
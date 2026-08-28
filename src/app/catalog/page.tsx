import type { Metadata } from 'next';
import Header from '@/components/Header';
import CatalogView from './CatalogView';

export const metadata: Metadata = {
  title: 'Catalog -TravelTrucks',
  description: 'Browse our full catalog of campers and filter by location, vehicle type,engine and trasmission.',
};

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main>
        <CatalogView />
      </main>
    </>
  );
}
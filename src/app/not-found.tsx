import Link from 'next/link';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1>Camper not found</h1>
        <p style={{ margin: '16px 0' }}>We couldn&rsquo;t find the camper you were looking for.</p>
        <Link href="/catalog" className="btn">
          Back to catalog
        </Link>
      </main>
    </>
  );
}

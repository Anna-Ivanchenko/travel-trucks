'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isCatalog = pathname?.startsWith('/catalog');

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo.svg" alt="TravelTrucks" width={136} height={16} priority />
        </Link>
        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navLink} ${isHome ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${styles.navLink} ${isCatalog ? styles.active : ''}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}

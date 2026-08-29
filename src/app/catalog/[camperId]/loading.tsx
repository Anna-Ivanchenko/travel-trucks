import Header from '@/components/Header';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <>
      <Header />
      <main className="container">
        <div className={styles.wrap}>
          <span className={styles.spinner} />
          <p>Loading camper details…</p>
        </div>
      </main>
    </>
  );
}

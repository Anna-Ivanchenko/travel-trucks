import Link from "next/link";
import Header from "@/components/Header";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Campers of your dreams</h1>
            <p className={styles.subtitle}>
              You can find everything you want in our catalog
            </p>
            <Link href="/catalog" className={`btn ${styles.cta}`}>
              View Now
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
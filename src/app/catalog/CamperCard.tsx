import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { GiGasPump, GiGearStick } from 'react-icons/gi';
import { TbHomeStar } from 'react-icons/tb';
import type { Camper } from '@/lib/types';
import styles from './CamperCard.module.css';

export default function CamperCard({ camper }: { camper: Camper }) {
  const image = camper.coverImage;
  const reviewsCount = camper.totalReviews ?? camper.reviews?.length ?? 0;

  return (
    <li className={styles.card}>
      <div className={styles.imageWrap}>
        {image ? (
          <Image src={image} alt={camper.name} fill sizes="292px" className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.headRow}>
          <h3 className={styles.name}>{camper.name}</h3>
          <span className={styles.price}>&euro;{camper.price}</span>
        </div>

        <div className={styles.meta}>
          <span className={styles.rating}>
            <FaStar aria-hidden className={styles.star} /> {camper.rating.toFixed(1)} ({reviewsCount} Reviews)
          </span>
          <span className={styles.location}>
            <FiMapPin aria-hidden /> {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <ul className={styles.tags}>
          <li className={styles.tag}>
            <GiGasPump aria-hidden /> {camper.engine}
          </li>
          <li className={styles.tag}>
            <GiGearStick aria-hidden /> {camper.transmission}
          </li>
          <li className={styles.tag}>
            <TbHomeStar aria-hidden /> {camper.form.replace(/_/g, ' ')}
          </li>
        </ul>

        <a
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${styles.showMore}`}
        >
          Show more
        </a>
      </div>
    </li>
  );
}
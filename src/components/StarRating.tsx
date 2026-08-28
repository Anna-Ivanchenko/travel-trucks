import { FaStar, FaRegStar } from 'react-icons/fa';
import styles from './StarRating.module.css';

export default function StarRating({ value }: { value: number }) {
  const rounded = Math.round(value);

  return (
    <span className={styles.stars} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < rounded ? (
          <FaStar key={i} aria-hidden className={styles.filled} />
        ) : (
          <FaRegStar key={i} aria-hidden className={styles.empty} />
        )
      )}
    </span>
  );
}
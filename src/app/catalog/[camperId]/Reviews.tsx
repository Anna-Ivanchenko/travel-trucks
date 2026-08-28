import StarRating from '@/components/StarRating';
import type { Review } from '@/lib/types';
import styles from './Reviews.module.css';

export default function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return <p className={styles.empty}>No reviews yet for this camper.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review, i) => (
        <li key={i} className={styles.item}>
          <div className={styles.avatar}>{review.reviewer_name.charAt(0).toUpperCase()}</div>
          <div className={styles.content}>
            <div className={styles.headRow}>
              <span className={styles.name}>{review.reviewer_name}</span>
            </div>
            <StarRating value={review.reviewer_rating} />
            <p className={styles.comment}>{review.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
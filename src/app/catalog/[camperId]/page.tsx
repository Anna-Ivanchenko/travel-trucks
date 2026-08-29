import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { FaStar } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { getCamperById, getCamperReviews } from '@/lib/api';
import type { GalleryImage } from '@/lib/types';
import Gallery from './Gallery';
import Reviews from './Reviews';
import BookingForm from './BookingForm';
import styles from './Details.module.css';

interface Props {
  params: { camperId: string };
}

/**
 * The confirmed live API returns a single `coverImage` string on list items;
 * the exact shape of a per-camper `gallery` field on GET /campers/:id hasn't
 * been confirmed yet (could be string[], {thumb,original}[], or absent).
 * This normalizes whatever comes back into GalleryImage[] so the Swiper
 * component always has something sane to render.
 */
function normalizeGallery(raw: unknown, coverImage?: string): GalleryImage[] {
  if (Array.isArray(raw) && raw.length > 0) {
    if (typeof raw[0] === 'string') {
      return (raw as string[]).map((url) => ({ thumb: url, original: url }));
    }
    if (typeof raw[0] === 'object' && raw[0] !== null) {
      return raw as GalleryImage[];
    }
  }
  return coverImage ? [{ thumb: coverImage, original: coverImage }] : [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const camper = await getCamperById(params.camperId);
    return {
      title: `${camper.name} — TravelTrucks`,
      description: camper.description,
    };
  } catch {
    return { title: 'Camper details — TravelTrucks' };
  }
}

const DETAIL_ROWS: { key: keyof Awaited<ReturnType<typeof getCamperById>>; label: string }[] = [
  { key: 'form', label: 'Form' },
  { key: 'length', label: 'Length' },
  { key: 'width', label: 'Width' },
  { key: 'height', label: 'Height' },
  { key: 'tank', label: 'Tank' },
  { key: 'consumption', label: 'Consumption' },
];

const AMENITY_LABELS: Record<string, string> = {
  ac: 'AC',
  bathroom: 'Bathroom',
  kitchen: 'Kitchen',
  tv: 'TV',
  radio: 'Radio',
  refrigerator: 'Refrigerator',
  microwave: 'Microwave',
  gas: 'Gas',
  water: 'Water',
};

export default async function CamperDetailsPage({ params }: Props) {
  let camper;
  let reviews: Awaited<ReturnType<typeof getCamperReviews>> = [];
  try {
    [camper, reviews] = await Promise.all([
      getCamperById(params.camperId),
      getCamperReviews(params.camperId).catch(() => []),
    ]);
  } catch {
    notFound();
  }

  const features: string[] = [];
  if (camper.transmission) features.push(camper.transmission);
  if (camper.engine) features.push(camper.engine);
  (camper.amenities ?? []).forEach((a) => {
    features.push(AMENITY_LABELS[a] ?? a);
  });
  if (camper.form) features.push(camper.form.replace(/_/g, ' '));

  return (
    <>
      <Header />
      <main className="container">
        <div className={styles.page}>
          <div className={styles.left}>
            <Gallery images={normalizeGallery(camper.gallery, camper.coverImage)} alt={camper.name} />

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Reviews</h2>
              <Reviews reviews={reviews} />
            </section>
          </div>

          <div className={styles.right}>
            <div className={styles.summary}>
              <h1 className={styles.name}>{camper.name}</h1>
              <div className={styles.meta}>
                <span className={styles.rating}>
                  <FaStar aria-hidden className={styles.star} /> {camper.rating.toFixed(1)}
                </span>
                <span>({camper.totalReviews ?? reviews.length} Reviews)</span>
                <span className={styles.location}>
                  <FiMapPin aria-hidden /> {camper.location}
                </span>
              </div>
              <p className={styles.price}>&euro;{camper.price}</p>
              <p className={styles.description}>{camper.description}</p>
            </div>

            <div className={styles.detailsCard}>
              <h2 className={styles.sectionTitle}>Vehicle details</h2>

              {features.length > 0 && (
                <ul className={styles.features}>
                  {features.map((f) => (
                    <li key={f} className={styles.featureTag}>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <dl className={styles.specs}>
                {DETAIL_ROWS.filter((row) => camper[row.key]).map((row) => (
                  <div key={row.key} className={styles.specRow}>
                    <dt>{row.label}</dt>
                    <dd>{String(camper[row.key])}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <BookingForm camperId={camper.id} />
          </div>
        </div>
      </main>
    </>
  );
}

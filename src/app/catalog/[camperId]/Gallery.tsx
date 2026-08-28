'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { GalleryImage } from '@/lib/types';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './Gallery.module.css';

export default function Gallery({ images, alt }: { images: GalleryImage[]; alt: string }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!images || images.length === 0) {
    return <div className={styles.placeholder} />;
  }

  return (
    <div className={styles.gallery}>
      <Swiper
        loop={images.length > 4}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mainSwiper}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className={styles.mainSlide}>
            <Image
              src={img.original}
              alt={`${alt} — photo ${i + 1}`}
              fill
              sizes="480px"
              className={styles.mainImage}
              priority={i === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.thumbsSwiper}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className={styles.thumbSlide}>
              <Image
                src={img.thumb}
                alt={`${alt} — thumbnail ${i + 1}`}
                fill
                sizes="110px"
                className={styles.thumbImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

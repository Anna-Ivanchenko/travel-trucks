'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { getCampers } from '@/lib/api';
import type { CamperFilters, CampersResponse } from '@/lib/types';
import Filters from './Filters';
import CamperCard from './CamperCard';
import styles from './Catalog.module.css';

const PER_PAGE = 4;

export default function CatalogView() {
  const [filters, setFilters] = useState<CamperFilters>({});

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery<CampersResponse>({
      queryKey: ['campers', filters],
      queryFn: ({ pageParam }) => getCampers(pageParam as number, PER_PAGE, filters),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const campers = data?.pages.flatMap((p) => p.campers) ?? [];

  return (
    <div className={`container ${styles.layout}`}>
      <Filters
        initialFilters={filters}
        onSearch={setFilters}
        onClear={() => setFilters({})}
      />

      <div className={styles.results}>
        {isLoading && (
          <div className={styles.loaderOverlay}>
            <div className={styles.loaderCard}>
              <span className={styles.spinner} />
              <h3>Loading tracks...</h3>
              <p>Please wait while we fetch the best travel trucks for you</p>
            </div>
          </div>
        )}

        {isError && (
          <div className={styles.status}>
            <p>Something went wrong while loading campers. Please try again.</p>
          </div>
        )}

        {!isLoading && !isError && campers.length === 0 && (
          <div className={styles.empty}>
            <Image
              src="/images/no-results.svg"
              alt=""
              width={180}
              height={170}
              className={styles.emptyImage}
            />
            <h2>No campers found</h2>
            <p>
              We couldn&rsquo;t find any campers that match your filters. Try adjusting your
              search or clearing some filters.
            </p>
            <div className={styles.emptyActions}>
              <button className="btn btnOutline" onClick={() => setFilters({})}>
                Clear filters
              </button>
              <button className="btn" onClick={() => setFilters({})}>
                View all campers
              </button>
            </div>
          </div>
        )}

        {campers.length > 0 && (
          <ul className={styles.list}>
            {campers.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </ul>
        )}

        {hasNextPage && (
          <div className={styles.loadMoreWrap}>
            <button
              className="btn btnOutline"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading…' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import type { Camper, CampersResponse, CamperFilters, BookingPayload, Review } from './types';

export const API_BASE_URL = 'https://campers-api.goit.study';

function buildQuery(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      search.set(key, String(value));
    }
  });
  return search.toString();
}

export async function getCampers(
  page: number,
  perPage: number,
  filters: CamperFilters
): Promise<CampersResponse> {
  const query = buildQuery({
    page,
    perPage,
    location: filters.location,
    form: filters.form,
    engine: filters.engine,
    transmission: filters.transmission,
  });

  const res = await fetch(`${API_BASE_URL}/campers?${query}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch campers: ${res.status}`);
  }

  return res.json();
}

export async function getCamperById(id: string): Promise<Camper> {
  const res = await fetch(`${API_BASE_URL}/campers/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch camper ${id}: ${res.status}`);
  }

  return res.json();
}

export async function getCamperReviews(camperId: string): Promise<Review[]> {
  const res = await fetch(`${API_BASE_URL}/campers/${camperId}/reviews`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 404) return [];
    throw new Error(`Failed to fetch reviews for camper ${camperId}: ${res.status}`);
  }

  return res.json();
}

export async function bookCamper(payload: BookingPayload): Promise<{ message: string }> {
  const { camperId, ...body } = payload;
  const res = await fetch(`${API_BASE_URL}/campers/${camperId}/booking-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Booking failed: ${res.status}`);
  }

  return res.json();
}
# 🚐 TravelTrucks

Каталог кемперів (campers) для оренди — вебзастосунок на **Next.js 14 (App Router)** з фільтрацією, пагінацією "load more", детальною сторінкою кожного кемпера, відгуками та формою бронювання.

Живиться з публічного API [`campers-api.goit.study`](https://campers-api.goit.study).

## ✨ Основний функціонал

- **Каталог кемперів** з картками (фото, ціна, рейтинг, кількість відгуків, локація, теги: двигун / трансмісія / тип кузова).
- **Фільтри** за локацією, типом кузова (Alcove / Panel Van / Integrated / Semi Integrated), типом двигуна (diesel / petrol / hybrid / electric) та трансмісією (automatic / manual).
- **Безкінечна підвантаження** результатів кнопкою "Load more" (`useInfiniteQuery` з TanStack Query), по 4 картки за раз.
- **Сторінка кемпера** (`/catalog/[camperId]`) з галереєю зображень, детальними характеристиками (габарити, витрата, зручності) та відгуками з рейтингом у зірках.
- **Форма бронювання** з клієнтською валідацією імені (підтримка кирилиці) та email, і сповіщеннями через `react-hot-toast`.
- Стани завантаження (`loading.tsx`), відсутності результатів (empty state) та обробки помилок запиту.
- SEO-базові речі "з коробки": `sitemap.ts`, `robots.ts`, `metadata` для сторінок.

## 🛠 Технологічний стек

| Категорія | Технологія |
|---|---|
| Фреймворк | [Next.js 14](https://nextjs.org/) (App Router) + TypeScript |
| UI-бібліотека | React 18 |
| Дані / кешування | [TanStack Query](https://tanstack.com/query) (`useInfiniteQuery`, devtools) |
| Стилі | CSS Modules |
| Іконки | `react-icons` |
| Слайдер/галерея | `swiper` |
| Сповіщення | `react-hot-toast` |
| Лінтинг | ESLint (`eslint-config-next`) |
| Деплой | Netlify (`@netlify/plugin-nextjs`) |

## 📁 Структура проєкту

```
src/
├── app/
│   ├── page.tsx                     # головна сторінка (hero + CTA)
│   ├── layout.tsx                   # кореневий layout, провайдери
│   ├── sitemap.ts, robots.ts        # SEO
│   └── catalog/
│       ├── page.tsx                 # сторінка каталогу
│       ├── CatalogView.tsx          # логіка фільтрів + infinite query
│       ├── Filters.tsx              # форма фільтрів
│       ├── CamperCard.tsx           # картка кемпера у списку
│       └── [camperId]/
│           ├── page.tsx             # деталі кемпера
│           ├── Gallery.tsx          # галерея фото
│           ├── Reviews.tsx          # відгуки + рейтинг
│           ├── BookingForm.tsx      # форма бронювання
│           └── loading.tsx          # skeleton/loader
├── components/
│   ├── Header.tsx
│   ├── Providers.tsx                # QueryClientProvider тощо
│   └── StarRating.tsx
└── lib/
    ├── api.ts                       # усі виклики до campers-api.goit.study
    └── types.ts                     # типи: Camper, CamperFilters, Review...
```

## 🚀 Встановлення та запуск

```bash
git clone https://github.com/Anna-Ivanchenko/travel-trucks.git
cd travel-trucks
npm install
npm run dev
```

Застосунок буде доступний на [http://localhost:3000](http://localhost:3000).

### Інші команди

| Команда | Опис |
|---|---|
| `npm run dev` | запуск у режимі розробки |
| `npm run build` | продакшн-збірка |
| `npm run start` | запуск зібраного застосунку |
| `npm run lint` | перевірка коду ESLint |

## 🔌 API

Увесь доступ до даних інкапсульовано у `src/lib/api.ts`:

- `GET /campers` — список кемперів із пагінацією та фільтрами (`page`, `perPage`, `location`, `form`, `engine`, `transmission`)
- `GET /campers/:id` — деталі конкретного кемпера
- `GET /campers/:id/reviews` — відгуки на кемпер
- `POST /campers/:id/booking` — надіслати заявку на бронювання

Базова адреса: `https://campers-api.goit.study` (без потреби у власному `.env` — публічне API).

## 🌐 Деплой

Проєкт налаштований під **Netlify** (`netlify.toml` + `@netlify/plugin-nextjs`): команда збірки `npm run build`, публікується директорія `.next`.

## 📌 Нотатки для розробників

- У `next.config.mjs` дозволені зображення з будь-якого зовнішнього хоста (`remotePatterns: hostname: '**'`) — це навмисно, оскільки фото кемперів приходять із зовнішнього API.
- Валідація імені у формі бронювання підтримує кириличні символи (укр./рос. літери), пробіли, дефіси й апострофи.
- Стан фільтрів зберігається локально в компоненті `CatalogView` і при кожній зміні перезапускає `useInfiniteQuery` з чистої першої сторінки.

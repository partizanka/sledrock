import type {Metadata} from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sledrock.by'),
  title: 'Рок-группа СЛЕD — Официальный Сайт',
  description: 'Новости, биография, состав, дискография, фото и видео белорусской хоррор-панк-рок группы СЛЕD (Минск). Пакінь свой след у вечнасці.',
  keywords: [
    'СЛЕD',
    'SLED',
    'хоррор-панк',
    'horror punk',
    'панк-рок',
    'punk rock',
    'рок',
    'rock',
    'Минск',
    'Minsk',
    'Беларусь',
    'Belarus',
    'рок-группа',
    'rock band',
    'хоррор-рок',
    'horror rock',
    'альтернативный рок',
    'alternative rock',
    'музыка',
    'music',
  ],
  openGraph: {
    title: 'Рок-группа СЛЕD — Официальный Сайт',
    description: 'Белорусская хоррор-панк-рок группа из Минска. Пакінь свой след у вечнасці.',
    url: 'https://sledrock.by',
    siteName: 'СЛЕD',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" className={`${inter.variable} ${oswald.variable}`}>
      <body suppressHydrationWarning className="bg-[#060606] text-stone-200">{children}</body>
    </html>
  );
}

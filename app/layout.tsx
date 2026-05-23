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
  title: 'Рок-группа СЛЕD — Официальный Сайт',
  description: 'Новости, биография, состав, дискография, фото и видео белорусской хоррор-панк-рок группы СЛЕD (Минск). Пакінь свой след у вечнасці.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" className={`${inter.variable} ${oswald.variable}`}>
      <body suppressHydrationWarning className="bg-[#060606] text-stone-200">{children}</body>
    </html>
  );
}


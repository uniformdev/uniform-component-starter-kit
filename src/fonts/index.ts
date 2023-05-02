import { NextFont } from 'next/dist/compiled/@next/font';
import {
  Inter,
  Roboto_Mono,
  Rubik,
  DM_Mono,
  Farro,
  Damion,
  Advent_Pro,
  Asap,
  Antonio,
  Maven_Pro,
} from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

const dm_mono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const farro = Farro({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const damion = Damion({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const advent_pro = Advent_Pro({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const asap = Asap({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const antonio = Antonio({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const maven_pro = Maven_Pro({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export const appFonts: Record<Types.SupportedFonts, NextFont> = {
  inter,
  roboto_mono,
  rubik,
  dm_mono,
  farro,
  damion,
  advent_pro,
  asap,
  antonio,
  maven_pro,
};

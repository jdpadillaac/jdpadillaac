import type { CollectionEntry } from 'astro:content';
import { localePath } from '../i18n/paths';
import { tx, type Lang } from '../i18n/ui';

const MONTHS: Record<string, number> = {
  ene: 0,
  jan: 0,
  feb: 1,
  mar: 2,
  abr: 3,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dic: 11,
  dec: 11,
};

const ONGOING = new Set(['actualidad', 'presente', 'present', 'now', 'actual']);

type EndText = { es: string; en: string };

export type HomeExperience = {
  data: {
    isCurrent?: boolean;
    order: number;
    end: EndText;
  };
};

function parseEnd(value: string): number | null {
  const normalized = value.trim().toLowerCase();
  if (ONGOING.has(normalized)) return Number.POSITIVE_INFINITY;
  const match = normalized.match(/^([a-z]+)\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTHS[match[1]];
  if (month === undefined) return null;
  return Number(match[2]) * 12 + month;
}

/** Higher means a more recent end date. Unparseable values sort as oldest. */
export function endSortKey(end: EndText): number {
  const keys = [end.es, end.en].map(parseEnd).filter((value): value is number => value !== null);
  if (keys.length === 0) return Number.NEGATIVE_INFINITY;
  return Math.max(...keys);
}

export function compareByEndDesc(a: HomeExperience, b: HomeExperience) {
  const delta = endSortKey(b.data.end) - endSortKey(a.data.end);
  if (delta !== 0) return delta;
  return a.data.order - b.data.order;
}

/**
 * Featured card: the first current role in editorial order.
 * If none is current, the one with the latest end date.
 * The timeline is everything else, newest end date first.
 */
export function splitHomeExperiences<T extends HomeExperience>(entries: readonly T[]) {
  if (entries.length === 0) return { featured: undefined, rest: [] as T[] };
  const byOrder = [...entries].sort((a, b) => a.data.order - b.data.order);
  const featured = byOrder.find((entry) => entry.data.isCurrent) ?? [...entries].sort(compareByEndDesc)[0];
  const rest = entries.filter((entry) => entry !== featured).sort(compareByEndDesc);
  return { featured, rest };
}

export function experienceInitials(company: string) {
  const initials = company
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .filter((char) => /[A-Za-zÁÉÍÓÚÑÜ]/.test(char))
    .slice(0, 3)
    .join('')
    .toUpperCase();
  return initials || company.charAt(0).toUpperCase();
}

export function experienceCardModel(lang: Lang, entry: CollectionEntry<'experiences'>) {
  const company = tx(lang, entry.data.company);
  const image = entry.data.image;
  const alt = image ? tx(lang, image.alt) : '';
  if (image && !alt.trim()) {
    throw new Error(`alt obligatorio cuando hay imagen (${entry.data.slug}, ${lang})`);
  }

  const contextRows = [entry.data.product, entry.data.client]
    .filter((row): row is NonNullable<typeof row> => Boolean(row))
    .map((row) => tx(lang, row));

  return {
    company,
    role: tx(lang, entry.data.role),
    dates: `${tx(lang, entry.data.start)} — ${tx(lang, entry.data.end)}`,
    summary: tx(lang, entry.data.summary),
    href: localePath(lang, `/experiencia/${entry.data.slug}/`),
    highlights: entry.data.featuredHighlights?.[lang] ?? [],
    stack: entry.data.stack?.[lang] ?? [],
    contextRows,
    initials: experienceInitials(company),
    image: image ? { src: image.src, alt } : undefined,
    isCurrent: Boolean(entry.data.isCurrent),
    headingId: `exp-${entry.data.slug}`,
  };
}

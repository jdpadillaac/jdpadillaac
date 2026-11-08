import { describe, expect, it } from 'vitest';
import {
  compareByEndDesc,
  endSortKey,
  experienceCardModel,
  experienceInitials,
  splitHomeExperiences,
  type HomeExperience,
} from '../../src/lib/experience-home';

const text = (value: string) => ({ es: value, en: value });

function item(
  slug: string,
  order: number,
  end: string,
  isCurrent = false,
): HomeExperience & { data: { slug: string } } {
  return {
    data: {
      slug,
      order,
      isCurrent,
      end: { es: end, en: end },
    },
  };
}

describe('home experience order', () => {
  it('parses month-year endings and treats ongoing roles as newest', () => {
    expect(endSortKey({ es: 'Mar 2025', en: 'Mar 2025' })).toBeGreaterThan(endSortKey({ es: 'Ago 2024', en: 'Aug 2024' }));
    expect(endSortKey({ es: 'Actualidad', en: 'Present' })).toBe(Number.POSITIVE_INFINITY);
    expect(endSortKey({ es: 'sin fecha', en: 'no date' })).toBe(Number.NEGATIVE_INFINITY);
    expect(endSortKey({ es: 'Foo 2020', en: 'Foo 2020' })).toBe(Number.NEGATIVE_INFINITY);
  });

  it('features the first current role and sorts the rest by end date', () => {
    const olderCurrent = item('old', 5, 'Sep 2021', true);
    const newer = item('new', 1, 'Mar 2025');
    const mid = item('mid', 2, 'Ago 2024');
    const { featured, rest } = splitHomeExperiences([newer, mid, olderCurrent]);
    expect(featured).toBe(olderCurrent);
    expect(rest.map((entry) => entry.data.slug)).toEqual(['new', 'mid']);
  });

  it('keeps the earliest editorial current role when several are current', () => {
    const first = item('a', 2, 'Mar 2025', true);
    const second = item('b', 1, 'Ene 2020', true);
    const { featured, rest } = splitHomeExperiences([first, second]);
    expect(featured).toBe(second);
    expect(rest).toEqual([first]);
  });

  it('features the latest end date when nothing is current', () => {
    const older = item('old', 1, 'Sep 2021');
    const newer = item('new', 4, 'Dic 2023');
    const { featured, rest } = splitHomeExperiences([older, newer]);
    expect(featured).toBe(newer);
    expect(rest).toEqual([older]);
    expect(compareByEndDesc(older, newer)).toBeGreaterThan(0);
  });

  it('breaks end-date ties with editorial order', () => {
    const first = item('a', 1, 'Mar 2025');
    const second = item('b', 2, 'Mar 2025');
    expect(compareByEndDesc(second, first)).toBeGreaterThan(0);
    expect(splitHomeExperiences([second, first]).featured).toBe(first);
  });

  it('returns nothing when the list is empty', () => {
    expect(splitHomeExperiences([])).toEqual({ featured: undefined, rest: [] });
  });

  it('builds initials the same way as the experience card', () => {
    expect(experienceInitials('WACO Digital Hub')).toBe('WDH');
    expect(experienceInitials('SEEK')).toBe('S');
    expect(experienceInitials('---')).toBe('-');
  });

  it('requires an alt when an experience image is set', () => {
    const base = {
      id: 'acme',
      data: {
        slug: 'acme',
        company: text('Acme'),
        role: text('Engineer'),
        start: text('2020'),
        end: text('2024'),
        summary: text('Summary'),
        order: 1,
      },
    };

    expect(experienceCardModel('es', base as never).image).toBeUndefined();
    expect(experienceCardModel('en', base as never).href).toBe('/en/experience/acme/');

    expect(() =>
      experienceCardModel('es', {
        ...base,
        data: { ...base.data, image: { src: {}, alt: text('  ') } },
      } as never),
    ).toThrow(/alt obligatorio/);

    const withImage = experienceCardModel('en', {
      ...base,
      data: {
        ...base.data,
        isCurrent: true,
        product: text('Product'),
        stack: { es: ['Go'], en: ['Go'] },
        featuredHighlights: { es: ['Hecho'], en: ['Fact'] },
        image: { src: { src: '/cover.png' }, alt: text('Cover of Acme') },
      },
    } as never);
    expect(withImage.image?.alt).toBe('Cover of Acme');
    expect(withImage.contextRows).toEqual(['Product']);
    expect(withImage.isCurrent).toBe(true);
    expect(withImage.highlights).toEqual(['Fact']);
  });
});
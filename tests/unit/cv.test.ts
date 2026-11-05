import { join } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:fs', async () => {
  const actual = await vi.importActual<typeof import('node:fs')>('node:fs');
  return { ...actual, existsSync: vi.fn(() => false) };
});

import { existsSync } from 'node:fs';
import { cvAvailable, cvHref } from '../../src/data/cv';

describe('cv files', () => {
  beforeEach(() => {
    vi.mocked(existsSync).mockReset();
  });

  it('points at the public pdf for each language', () => {
    expect(cvHref('es')).toBe('/cv/jonatan-padilla-es.pdf');
    expect(cvHref('en')).toBe('/cv/jonatan-padilla-en.pdf');
  });

  it('checks the public cv directory', () => {
    vi.mocked(existsSync).mockReturnValueOnce(true).mockReturnValueOnce(false);
    expect(cvAvailable('es')).toBe(true);
    expect(cvAvailable('en')).toBe(false);
    expect(existsSync).toHaveBeenNthCalledWith(1, join(process.cwd(), 'public', 'cv', 'jonatan-padilla-es.pdf'));
    expect(existsSync).toHaveBeenNthCalledWith(2, join(process.cwd(), 'public', 'cv', 'jonatan-padilla-en.pdf'));
  });
});

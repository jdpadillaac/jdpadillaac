/**
 * Sends `/` to `/es/` or `/en/` using the highest-q language in Accept-Language.
 * Spanish wins when it outranks English. Anything else falls back to English.
 */
export function preferredLocale(header) {
  if (!header) return 'en';

  const ranked = header
    .split(',')
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(';');
      const qParam = params.map((item) => item.trim()).find((item) => item.startsWith('q='));
      const q = qParam ? Number(qParam.slice(2)) : 1;
      return {
        tag: rawTag.trim().toLowerCase(),
        q: Number.isFinite(q) ? q : 0,
      };
    })
    .filter((item) => item.tag && item.tag !== '*' && item.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const primary = tag.split('-')[0];
    if (primary === 'es') return 'es';
    if (primary === 'en') return 'en';
  }

  return 'en';
}

export default async (req) => {
  const url = new URL(req.url);
  const lang = preferredLocale(req.headers.get('accept-language'));
  const destination = new URL(`/${lang}/`, url);
  destination.search = url.search;

  return new Response(null, {
    status: 302,
    headers: {
      Location: destination.toString(),
      Vary: 'Accept-Language',
      'Cache-Control': 'private, no-store',
    },
  });
};

export const config = {
  path: '/',
  method: ['GET', 'HEAD'],
  onError: 'bypass',
};

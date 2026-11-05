import type { APIRoute } from 'astro';
import { allOgImageKeys } from '../../lib/og-image';
import { renderOgPng } from '../../lib/og-render';

export const prerender = true;

export async function getStaticPaths() {
  const keys = await allOgImageKeys();
  return keys.map((key) => ({ params: { key } }));
}

export const GET: APIRoute = async ({ params }) => {
  const key = params.key;
  if (!key) return new Response('Not found', { status: 404 });
  const png = await renderOgPng(key);
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

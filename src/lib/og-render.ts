import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import type { Lang } from '../i18n/ui';
import { ogLabelForKey } from './og-image';

const interBold = fs.readFileSync(
  path.join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff'),
);
const fraunces = fs.readFileSync(
  path.join(process.cwd(), 'node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2'),
);

function langFromKey(key: string): Lang {
  return key.endsWith('-en') ? 'en' : 'es';
}

export async function renderOgPng(key: string): Promise<Uint8Array> {
  const lang = langFromKey(key);
  const { title, subtitle } = ogLabelForKey(key, lang);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F6F3EC',
          color: '#1B1A17',
          padding: '72px',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { fontSize: 28, color: '#0F5C4D', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' },
              children: 'jdpadillac.com',
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '16px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { fontSize: 72, fontFamily: 'Fraunces', fontWeight: 500, lineHeight: 1.05 },
                    children: title,
                  },
                },
                {
                  type: 'div',
                  props: { style: { fontSize: 36, color: '#3F3B33', maxWidth: '900px' }, children: subtitle },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 24, color: '#0F5C4D' },
              children: lang === 'es' ? 'Medellín · Remoto o híbrido' : 'Medellín · Remote or hybrid',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interBold, weight: 600, style: 'normal' },
        { name: 'Fraunces', data: fraunces, weight: 500, style: 'normal' },
      ],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return resvg.render().asPng();
}

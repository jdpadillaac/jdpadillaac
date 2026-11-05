# jdpadillac.com

Portafolio estático de Jonatan Padilla. Astro genera HTML en `dist/` y Netlify lo publica en `https://jdpadillac.com`.

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`. `/` redirige a `/es/` (local y producción).

```bash
npm run build
npm run preview
npm run test
```

`npm run build` ejecuta `scripts/check-seo.mjs` sobre `dist/` (JSON-LD, canonical, hreflang, un solo h1, OG PNG, sitemap).

## URLs

- Español: `/es/`, `/es/sobre-mi/`, `/es/perfiles/`, `/es/experiencia/`, `/es/contacto/`
- Inglés: `/en/`, `/en/about/`, `/en/profiles/`, `/en/experience/`, `/en/contact/`
- `hreflang` incluye `es`, `en` y `x-default` (español).
- Las rutas antiguas en `/en/experiencia/`, `/en/sobre-mi/`, etc. redirigen con 301.

`/proyectos/` y `/en/projects/` están con `noindex` (repos personales, fuera del sitemap).

## Contenido

Los textos pendientes llevan `TODO:` o `[Pendiente]`. No rellenes huecos con datos estimados.

- Interfaz: `src/i18n/ui.ts`
- Rutas traducidas: `src/i18n/routes.ts`
- SEO por página: `src/data/seo.ts`
- Perfiles: `src/data/profiles.ts`
- Experiencias: `src/content/experiences/*.mdx`
- Notas (plantilla): `src/content/notes/` (sin publicar aún)

## Variables de entorno

Copia `.env.example` a `.env` y define:

- `PUBLIC_GOOGLE_SITE_VERIFICATION`
- `PUBLIC_BING_SITE_VERIFICATION`
- `PUBLIC_SITE_LASTMOD` (opcional, usada en sitemap)

## Netlify

`netlify.toml` define build, redirección de `www`, `/` → `/es/`, rutas legadas y cabeceras de caché para `/_astro/` y `/og/`.

Desactiva el script HUD de Netlify en el panel del sitio (inyecta `/.netlify/scripts/hud`).

Tras el deploy, envía `https://jdpadillac.com/sitemap-index.xml` en Search Console y Bing.

## Lighthouse

GitHub Actions ejecuta Lighthouse CI con los presupuestos de `lighthouserc.json` tras cada build.

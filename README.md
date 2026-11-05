# jdpadillac.com

Portafolio estático de Jonatan Padilla. Astro genera HTML en `dist/` y Netlify lo publica en `https://jdpadillac.com`.

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`. `/` elige `/es/` o `/en/` con el idioma del navegador. En producción esa redirección la hace una edge function; en local la hace la página de inicio.

```bash
npm run build
npm run preview
```

## Contenido

Los textos y cifras que todavía no están definidos aparecen entre corchetes, por ejemplo `[Titular pendiente]`. No rellenes esos huecos con datos estimados.

- Interfaz: `src/i18n/ui.ts`
- Identidad, enlaces y stack: `src/data/site.ts`
- Textos de portada: `src/data/copy.ts`
- Perfiles: `src/data/profiles.ts`
- Experiencias: `src/content/experiences/*.mdx`
- Casos: `src/content/cases/*.mdx`
- Proyectos: `src/content/projects/*.md`

`published: false` deja una experiencia o un caso fuera del build, del listado y del sitemap. Los borradores de ejemplo son `borrador`.

Los PDF del CV van en `public/cv/jonatan-padilla-es.pdf` y `public/cv/jonatan-padilla-en.pdf`. Hasta que existan, los botones llevan a la página `/cv/`.

## Idiomas

Las rutas conservan el mismo camino después del prefijo: `/es/experiencia/empresa-a/` y `/en/experiencia/empresa-a/`. El conmutador ES/EN intercambia solo ese prefijo. `hreflang` incluye `es`, `en` y `x-default` (inglés).

## Netlify

`netlify.toml` define el build (`npm run build`, `dist`, Node 22), la redirección de `www`, las rutas viejas hacia `/es/…` y el formulario `contact`. Después del primer deploy, confirma el formulario en Forms y avisa a `contact@jdpadillac.com`.

`/` responde 302 según `Accept-Language`. Español tiene prioridad cuando su peso es mayor; el resto cae en inglés.

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/banner-dark.svg" />
  <img src="docs/assets/banner.svg" width="1200" alt="Banner del portafolio: Jonatan Padilla, Senior Software Engineer" />
</picture>

<h1>Jonatan Padilla · Senior Software Engineer</h1>

<p>Senior Software Engineer · Mobile con Flutter y nativo · Backend con Java y Go · Desarrollo asistido por IA</p>

<p>
  <a href="https://jdpadillac.com"><img src="https://img.shields.io/badge/Sitio_en_vivo-jdpadillac.com-0F5C4D?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Sitio en vivo: jdpadillac.com" /></a>
  <a href="https://www.linkedin.com/in/jdpadillac"><img src="https://img.shields.io/badge/LinkedIn-jdpadillac-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn de Jonatan Padilla" /></a>
  <img src="https://img.shields.io/badge/Idiomas-ES_%7C_EN-1B1A17?style=for-the-badge" alt="Sitio disponible en español e inglés" />
</p>

<p>
  <img src="https://img.shields.io/badge/Astro-7-1B1A17?style=flat-square&logo=astro&logoColor=white" alt="Astro 7" />
  <img src="https://img.shields.io/badge/MDX-contenido-1B1A17?style=flat-square&logo=mdx&logoColor=white" alt="Contenido con MDX" />
  <img src="https://img.shields.io/badge/TypeScript-c%C3%B3digo-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Netlify-deploy-0F5C4D?style=flat-square&logo=netlify&logoColor=white" alt="Despliegue en Netlify" />
</p>

</div>

---

## Sobre este proyecto

Portafolio estático y bilingüe (ES/EN) pensado para reclutadores, empresas y clientes freelance. Presenta tres perfiles con el mismo peso (Mobile / Flutter, Backend Java y Full Stack), con una página por experiencia y un SEO técnico cuidado. Fue construido con desarrollo asistido por IA (Cursor), con revisión humana en cada cambio.

## Vista previa

| Inicio | Experiencia |
| --- | --- |
| <!-- TODO: captura home --> | <!-- TODO: captura experiencia --> |

| Caso de experiencia | Móvil |
| --- | --- |
| <!-- TODO: captura caso --> | <!-- TODO: captura móvil --> |

## Características

- 🌐 Sitio bilingüe ES/EN con selector de idioma y rutas localizadas.
- 🗂️ Estructura con páginas y subpáginas por experiencia, perfil y proyecto.
- 🔍 SEO técnico: metadatos por página, canonical, hreflang, sitemap, robots y datos estructurados JSON-LD, con verificación automática en el build.
- 📱 Diseño responsive con CSS propio, sin framework de UI.
- ⚡ Sitio estático generado en el build y servido con caché de larga duración para assets.
- ♿ Accesibilidad base: enlace para saltar al contenido, foco visible y HTML semántico.

## Stack

| Categoría | Tecnología |
| --- | --- |
| Frontend | Astro 7, contenido con MDX (`@astrojs/mdx`) |
| Estilos y fuentes | CSS propio, Fraunces Variable e Inter (Fontsource) |
| Internacionalización | Sistema propio ES/EN en `src/i18n` (rutas, textos y SEO por idioma) |
| SEO | `@astrojs/sitemap`, JSON-LD, imágenes OG generadas (Satori + Sharp + Resvg), `robots.txt`, verificación en build (`scripts/check-seo.mjs`) |
| Build y calidad | `astro build`, Vitest con pruebas de rutas y contenido, Lighthouse CI con presupuestos |
| Despliegue | Netlify, salida estática en `dist/`, redirecciones y cabeceras en `netlify.toml` |
| Desarrollo | Node.js >= 22, npm, TypeScript |

> Astro es la tecnología de este proyecto. React no se usa en el repositorio.

## Dirección de diseño

Paleta: crema `#F6F3EC`, texto `#1B1A17`, acento verde profundo `#0F5C4D` (hover `#0A3F35`), bordes `#DDD7CA` y `#CFC8B8`. Tipografías: Fraunces Variable en titulares, Inter en texto.

## Estructura del proyecto

```text
src/
  pages/        # rutas ES/EN (una carpeta por idioma)
  views/        # plantillas de página (home, perfiles, experiencia, contacto)
  components/   # componentes Astro reutilizables
  layouts/      # layouts base del sitio
  content/      # experiencias, casos y proyectos en MDX/Markdown
  data/         # datos del sitio, SEO, perfiles y CV
  i18n/         # textos de interfaz y rutas traducidas
  lib/          # utilidades (SEO, sitemap, datos estructurados, OG)
  styles/       # CSS global y por vista
  assets/       # imágenes de origen
public/         # estáticos (favicons, robots, CV en PDF)
scripts/        # verificación SEO sobre dist/
tests/          # pruebas Vitest de rutas y contenido
docs/assets/    # recursos del README (banners)
netlify.toml    # build, redirecciones y cabeceras
```

## Cómo correrlo localmente

Requiere Node.js >= 22.

```bash
npm install
npm run dev      # servidor local en http://localhost:4321 (/ redirige a /es/)
npm run build    # genera dist/ y verifica el SEO automáticamente
npm run preview  # vista previa del build
npm test         # pruebas con Vitest
```

## Contacto

- Sitio web: https://jdpadillac.com
- LinkedIn: https://www.linkedin.com/in/jdpadillac

## Nota de uso

El código es de referencia; los textos, imágenes y contenido personal son de Jonatan Padilla y no se pueden reutilizar.

---

<details>
<summary>English version</summary>

## About this project

Static, bilingual (ES/EN) portfolio aimed at recruiters, companies, and freelance clients. It presents three equally weighted profiles (Mobile / Flutter, Java Backend, and Full Stack), with one page per role and careful technical SEO. It was built with AI-assisted development (Cursor), with human review on every change.

## Features

- 🌐 Bilingual ES/EN site with language switcher and localized routes.
- 🗂️ Pages and subpages per role, profile, and project.
- 🔍 Technical SEO: per-page metadata, canonical, hreflang, sitemap, robots, and JSON-LD structured data, verified automatically at build time.
- 📱 Responsive design with custom CSS and no UI framework.
- ⚡ Static site generated at build time and served with long-lived asset caching.
- ♿ Baseline accessibility: skip link, visible focus, and semantic HTML.

## Stack

| Category | Technology |
| --- | --- |
| Frontend | Astro 7, MDX content (`@astrojs/mdx`) |
| Styles and fonts | Custom CSS, Fraunces Variable and Inter (Fontsource) |
| Internationalization | Custom ES/EN system in `src/i18n` (routes, copy, and per-language SEO) |
| SEO | `@astrojs/sitemap`, JSON-LD, generated OG images (Satori + Sharp + Resvg), `robots.txt`, build-time check (`scripts/check-seo.mjs`) |
| Build and quality | `astro build`, Vitest route and content tests, Lighthouse CI with budgets |
| Deployment | Netlify, static output in `dist/`, redirects and headers in `netlify.toml` |
| Development | Node.js >= 22, npm, TypeScript |

## Run locally

Requires Node.js >= 22.

```bash
npm install
npm run dev      # local server at http://localhost:4321 (/ redirects to /es/)
npm run build    # builds dist/ and runs the SEO check
npm run preview  # preview of the production build
npm test         # Vitest test suite
```

</details>

# jdpadillac.com

Portafolio estático de **Jonatan Padilla**, construido con [Astro](https://astro.build) y pensado para desplegarse en [Netlify](https://www.netlify.com) en `https://jdpadillac.com`.

## Requisitos

- Node.js 22+
- npm 10+

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.

## Build de producción

```bash
npm run build
npm run preview
```

La salida queda en `dist/`.

## Estructura

- `src/pages/` — rutas del sitio (inicio, proyectos, sobre mí, contacto, 404)
- `src/content/projects/` — un Markdown por proyecto
- `src/data/profile.ts` — datos personales y SEO por defecto
- `public/` — favicon, `robots.txt`, imágenes Open Graph
- `netlify.toml` — build, caché, headers y redirección `www` → apex

## Desplegar en Netlify (GitHub)

1. **Sube el código** al repositorio [github.com/jdpadillaac/jdpadillaac](https://github.com/jdpadillaac/jdpadillaac):

   ```bash
   git add .
   git commit -m "Reemplaza portafolio Flutter por sitio Astro estático"
   git push origin master
   ```

2. En [Netlify](https://app.netlify.com), elige **Add new site → Import an existing project** y conecta GitHub.

3. Selecciona el repo `jdpadillaac/jdpadillaac`. Netlify detectará `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node:** 22 (definido en `netlify.toml`)

4. **Dominio custom**
   - En *Domain management*, añade `jdpadillac.com` como dominio principal.
   - Añade `www.jdpadillac.com` como alias; la redirección 301 a la raíz ya está en `netlify.toml`.
   - Configura los registros DNS que Netlify indique (normalmente `A`/`AAAA` al load balancer de Netlify y `CNAME` de `www`).

5. **HTTPS:** activa *Force HTTPS* en Netlify cuando el certificado esté listo.

6. **Formulario de contacto**
   - El formulario en `/contacto` usa [Netlify Forms](https://docs.netlify.com/forms/setup/) (`data-netlify="true"`).
   - Tras el primer deploy, en *Site configuration → Forms* verifica que aparezca el formulario `contact`.
   - En *Form notifications*, añade un email a `contact@jdpadillac.com`.

## SEO incluido

- HTML semántico pre-renderizado
- `title`, meta description y canonical por página
- Open Graph y Twitter Cards
- `sitemap-index.xml` y `robots.txt`
- JSON-LD (`Person` + `WebSite` en inicio)
- Imágenes optimizadas (WebP) con `alt`, dimensiones y lazy loading

## Editar contenido

- Perfil y enlaces: [`src/data/profile.ts`](src/data/profile.ts)
- Proyectos: archivos en [`src/content/projects/`](src/content/projects/) (frontmatter + cuerpo Markdown)
- Estilos globales: [`src/styles/global.css`](src/styles/global.css)

## Licencia

Contenido y código del sitio © Jonatan Padilla. Repos enlazados mantienen sus licencias propias.

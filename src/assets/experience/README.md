# Imágenes de experiencia

Carpeta por experiencia: `src/assets/experience/<slug>/`.

- `seek/`, `siigo/`, `waco/`, `tul/`, `personalsoft/`
- Relación recomendada 4:3 (o 16:9), mínimo 1200 px de ancho.
- Formatos: PNG o JPG de origen; Astro genera AVIF/WebP automáticamente.
- Para agregar una imagen: copia el archivo a su carpeta y completa `image`
  en `src/content/experiences/<slug>.mdx`:

```yaml
image:
  src: ../../assets/experience/tul/cover.png
  alt:
    es: Descripción de la imagen en español
    en: Image description in English
  kind: cover # o "logo"
```

- `alt` es obligatorio en ES y EN; si falta, el build avisa (schema).
- Sin `image`, la tarjeta muestra un monograma con las iniciales,
  del mismo tamaño que la imagen real, sin huecos ni saltos de layout.
- No usar logos de terceros que no estén ya en el repo.

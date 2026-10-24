# TUPLUS · Galería de plantillas

Galería de plantillas web de TUPLUS (CEL-TPL-01), hecha con React y Vite. Muestra cada plantilla con su vista previa y enlaza a la versión publicada.

## Ejecutar en local

Requiere Node 20 o superior.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/
npm run preview    # prueba el build
```

## Estructura

```
src/
  assets/            Imágenes (logo, miniaturas)
  components/        Un componente por carpeta: Nombre/Nombre.jsx + Nombre.css
    Header/  Hero/  Filtros/  TarjetaPlantilla/  VistaPrevia/  Footer/  Marca/
  data/plantillas.js ÚNICO archivo a editar para agregar o cambiar plantillas
  App.jsx, App.css   Arma la página
  index.css          Tokens de marca, reinicio y botones
  main.jsx           Punto de entrada
```

## Agregar o cambiar una plantilla

Edita solo `src/data/plantillas.js`:

- `url`: dirección del sitio publicado. Con `null` la tarjeta muestra "Próximamente".
- `preview`: miniatura. Guarda la imagen en `src/assets/` e impórtala en ese archivo.

## Despliegue

Cada cambio fusionado en `main` ejecuta `npm ci && npm run build` y publica `dist/` en GitHub Pages (ver pestaña *Actions*). Por eso `main` siempre debe estar estable.

## Cómo trabajar

1. Desde la rama develop subir sus cambios a mas tardar en viernes de cada semana.
2. Haz tus cambios y confirma (commit) con un mensaje claro.
3. Otra persona, distinta de quien lo escribió, lo revisa. Y el encargado a mas tardar el sabado lo subira a main.

Reglas: nadie sube directo a `main`; no se suben claves ni datos reales de clientes.

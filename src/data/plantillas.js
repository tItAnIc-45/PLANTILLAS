// ÚNICO archivo que hay que editar para agregar o cambiar plantillas.
//
// url:     dirección del sitio publicado de la plantilla. Si es null, la tarjeta
//          aparece como "Próximamente" y los botones quedan desactivados.
// repo:    repositorio de GitHub (opcional, se muestra como enlace secundario).
// preview: imagen de la miniatura en src/assets (opcional).
//
// nivel: 1, 2 o 3. traduccion: ID base para reutilizar los textos traducidos.
// Educación Nivel 2 queda pendiente: https://educacion-clases-nivel-2-two.vercel.app/
// responde 200, pero /js/layout.js devuelve 404 (navbar sin verificar).
// Publicar su URL solo después de corregir y validar la navegación.

import abogados from '../assets/abogados.jpg';

export const CATEGORIAS = ['Abogados', 'Odontología', 'Educación'];

export const PLANTILLAS = [
  {
    id: 'tpl-001',
    categoria: 'Abogados',
    nombre: 'Servicios profesionales',
    descripcion: 'Landing para estudios de abogados y consultoras: servicios, equipo, testimonios y contacto.',
    nivel: 1,
    url: 'https://profesionales-abogados-al5o.vercel.app/',
    repo: 'https://github.com/tItAnIc-45/tuplus-tpl-001',
    preview: `${import.meta.env.BASE_URL}previews/abogados-n1.png`,
  },
  {
    id: 'tpl-002',
    nivel: 1,
    categoria: 'Odontología',
    nombre: 'Clínica odontológica',
    descripcion: 'Landing para clínicas y consultorios dentales.',
    url: null,
    repo: null,
    preview: null,
  },
  {
    id: 'tpl-003',
    nivel: 1,
    categoria: 'Educación',
    nombre: 'Educación y formación',
    descripcion: 'Landing para academias, institutos y cursos.',
    url: 'https://educaci-n-clases.vercel.app/',
    repo: null,
    preview: `${import.meta.env.BASE_URL}previews/educacion-n1.png`,
  },
  ...[
    { categoria: 'Abogados', base: 'tpl-001', ids: ['tpl-004', 'tpl-005'], nombre: 'Servicios profesionales', descripcion: 'Plantilla web para estudios de abogados y consultoras.' },
    { categoria: 'Odontología', base: 'tpl-002', ids: ['tpl-006', 'tpl-007'], nombre: 'Clínica odontológica', descripcion: 'Plantilla web para clínicas y consultorios dentales.' },
    { categoria: 'Educación', base: 'tpl-003', ids: ['tpl-008', 'tpl-009'], nombre: 'Educación y formación', descripcion: 'Plantilla web para academias, institutos y cursos.' },
  ].flatMap(({ categoria, base, ids, nombre, descripcion }) => ids.map((id, i) => ({
    id, categoria, nivel: i + 2, nombre, descripcion,
    traduccion: base,
    url: null,
    repo: null,
    preview: null,
  }))),
].sort((a, b) => CATEGORIAS.indexOf(a.categoria) - CATEGORIAS.indexOf(b.categoria) || a.nivel - b.nivel);

export const WHATSAPP = 'https://wa.me/51916828870';

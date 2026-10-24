// ÚNICO archivo que hay que editar para agregar o cambiar plantillas.
//
// url:     dirección del sitio publicado de la plantilla. Si es null, la tarjeta
//          aparece como "Próximamente" y los botones quedan desactivados.
// repo:    repositorio de GitHub (opcional, se muestra como enlace secundario).
// preview: imagen de la miniatura en src/assets (opcional).
//
// Las plantillas de Odontología y Educación tienen su propio repositorio.
// Pega aquí su "url" cuando esté publicada. No se inventó ningún destino.

import abogados from '../assets/abogados.jpg';

export const CATEGORIAS = ['Abogados', 'Odontología', 'Educación'];

export const PLANTILLAS = [
  {
    id: 'tpl-001',
    categoria: 'Abogados',
    nombre: 'Servicios profesionales',
    descripcion: 'Landing para estudios de abogados y consultoras: servicios, equipo, testimonios y contacto.',
    url: 'https://titanic-45.github.io/tuplus-tpl-001/',
    repo: 'https://github.com/tItAnIc-45/tuplus-tpl-001',
    preview: abogados,
  },
  {
    id: 'tpl-002',
    categoria: 'Odontología',
    nombre: 'Clínica odontológica',
    descripcion: 'Landing para clínicas y consultorios dentales.',
    url: null,
    repo: null,
    preview: null,
  },
  {
    id: 'tpl-003',
    categoria: 'Educación',
    nombre: 'Educación y formación',
    descripcion: 'Landing para academias, institutos y cursos.',
    url: null,
    repo: null,
    preview: null,
  },
];

export const WHATSAPP = 'https://wa.me/51916828870';

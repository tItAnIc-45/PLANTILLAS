import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

// Comprobación local: no abre los destinos externos del catálogo.
const server = await createServer({
  server: { middlewareMode: true },
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const { PLANTILLAS, CATEGORIAS } = await server.ssrLoadModule('/src/data/plantillas.js');
  const { TEXTOS, IDIOMAS } = await server.ssrLoadModule('/src/i18n/textos.js');
  const { Preferencias } = await server.ssrLoadModule('/src/i18n/Preferencias.jsx');
  const { default: Tarjeta } = await server.ssrLoadModule('/src/components/TarjetaPlantilla/TarjetaPlantilla.jsx');
  const { default: Filtros } = await server.ssrLoadModule('/src/components/Filtros/Filtros.jsx');
  const { default: VistaPrevia } = await server.ssrLoadModule('/src/components/VistaPrevia/VistaPrevia.jsx');
  const render = (component, props) => renderToStaticMarkup(
    React.createElement(Preferencias, null, React.createElement(component, props)),
  );

  assert.equal(PLANTILLAS.length, 9);
  assert.equal(new Set(PLANTILLAS.map(p => p.id)).size, 9);
  assert.equal(PLANTILLAS.find(p => p.categoria === 'Educación' && p.nivel === 2).url, null);
  assert.equal(PLANTILLAS.filter(p => p.url).length, 2);
  assert.equal(PLANTILLAS.filter(p => p.url === null).length, 7);

  for (const { codigo } of IDIOMAS) {
    globalThis.localStorage = { getItem: key => key === 'tuplus-idioma' ? codigo : null };
    const textos = TEXTOS[codigo];
    for (const categoria of ['Todas', ...CATEGORIAS]) {
      const visibles = PLANTILLAS.filter(p => categoria === 'Todas' || p.categoria === categoria);
      assert.equal(visibles.length, categoria === 'Todas' ? 9 : 3);
      if (categoria !== 'Todas') assert.deepEqual(visibles.map(p => p.nivel), [1, 2, 3]);
      const filtros = render(Filtros, { categoria, total: visibles.length, onCategoria() {} });
      assert.equal((filtros.match(/aria-pressed="true"/g) || []).length, 1);
      assert.equal((filtros.match(/aria-pressed=/g) || []).length, 4);
      assert.ok(filtros.includes(textos['gal.total'].replace('{n}', visibles.length)));
      const etiqueta = categoria === 'Todas' ? textos['gal.todas'] : textos[`cat.${categoria}`];
      assert.ok(filtros.includes(`aria-pressed="true">${etiqueta}</button>`));
    }
    for (const p of PLANTILLAS) {
      const html = render(Tarjeta, { plantilla: p, onVistaPrevia() {} });
      assert.ok(html.includes(textos['tar.nivel'].replace('{n}', p.nivel)));
      assert.ok(html.includes(textos['tar.vista']));
      assert.ok(html.includes(textos['tar.abrir']));
      if (p.url) {
        assert.ok(html.includes(`href="${p.url}"`));
        assert.ok(html.includes('target="_blank" rel="noopener noreferrer"'));
        assert.ok(!html.includes('disabled=""'));
        const modal = render(VistaPrevia, { plantilla: p, onCerrar() {} });
        assert.ok(modal.includes(`src="${p.url}"`));
        assert.ok(modal.includes('role="dialog"'));
      } else {
        assert.equal((html.match(/disabled=""/g) || []).length, 2);
        assert.ok(html.includes(textos['tar.pronto']));
        assert.ok(!html.includes('href='));
      }
      if (p.preview) assert.ok(html.includes('<img'));
      else assert.ok(html.includes(textos['tar.pendiente']));
    }
  }
  console.log('OK: 9 tarjetas y 9 IDs únicos; niveles 1–3 por categoría.');
  console.log('OK: filtros Todas/Abogados/Odontología/Educación y contadores 9/3/3/3.');
  console.log('OK: 2 enlaces conservados, modales con su destino y apertura segura.');
  console.log('OK: 7 pendientes con ambos botones desactivados; Educación N2 sin enlace.');
  console.log('OK: etiquetas, botones y filtros renderizados en los 8 idiomas.');
} finally {
  delete globalThis.localStorage;
  await server.close();
}

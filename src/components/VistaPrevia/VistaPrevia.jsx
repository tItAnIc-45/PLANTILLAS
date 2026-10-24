import { useEffect, useRef, useState } from 'react';
import { usePreferencias } from '../../i18n/Preferencias.jsx';
import './VistaPrevia.css';

export default function VistaPrevia({ plantilla: p, onCerrar }) {
  const { t } = usePreferencias();
  const nombre = t(`p.${p.id}.nombre`, undefined, p.nombre);
  const [movil, setMovil] = useState(false);
  const [cargando, setCargando] = useState(true);
  const cerrar = useRef(null);

  useEffect(() => {
    const previo = document.activeElement;
    document.body.style.overflow = 'hidden';
    cerrar.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onCerrar();
      if (e.key === 'Tab') {
        const f = [...document.querySelectorAll('.modal button, .modal a')];
        if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previo?.focus?.();
    };
  }, [onCerrar]);

  return (
    <div className="modal__fondo" onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={t('tar.vistaDe', { nombre })}>
        <div className="modal__barra">
          <div>
            <p className="etiqueta">{t(`cat.${p.categoria}`, undefined, p.categoria)}</p>
            <h3>{nombre}</h3>
          </div>
          <div className="modal__controles">
            <div className="segmento" role="group" aria-label={t('mod.tamano')}>
              <button type="button" aria-pressed={!movil} onClick={() => setMovil(false)}>{t('mod.escritorio')}</button>
              <button type="button" aria-pressed={movil} onClick={() => setMovil(true)}>{t('mod.celular')}</button>
            </div>
            <a className="btn btn-dorado" href={p.url} target="_blank" rel="noopener noreferrer">{t('tar.abrir')}</a>
            <button ref={cerrar} type="button" className="btn btn-claro" onClick={onCerrar}>{t('mod.cerrar')}</button>
          </div>
        </div>
        <div className="modal__lienzo">
          {cargando && <p className="modal__carga">{t('mod.carga')}</p>}
          <iframe
            className={movil ? 'es-movil' : ''}
            src={p.url}
            title={t('tar.vistaDe', { nombre })}
            onLoad={() => setCargando(false)}
          />
        </div>
        <p className="modal__nota">{t('mod.nota')}</p>
      </div>
    </div>
  );
}

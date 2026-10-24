import { usePreferencias } from '../../i18n/Preferencias.jsx';
import './TarjetaPlantilla.css';

const ICONOS = {
  Abogados: 'M12 3v18M5 7h14M7 7l-3 7a3 3 0 0 0 6 0L7 7zm10 0l-3 7a3 3 0 0 0 6 0l-3-7zM8 21h8',
  Odontología: 'M7 4c-2 0-4 2-4 5 0 4 2 5 2.5 8 .3 2 1.5 3 2.5 3 1.5 0 1.5-4 4-4s2.500 4 4 4c1 0 2.200-1 2.500-3 .5-3 2.500-4 2.500-8 0-3-2-5-4-5-2 0-3 1-5 1S9 4 7 4z',
  Educación: 'M2 9l10-5 10 5-10 5L2 9zm4 3v5c0 1.500 3 3 6 3s6-1.500 6-3v-5',
};

export default function TarjetaPlantilla({ plantilla: p, onVistaPrevia }) {
  const { t } = usePreferencias();
  const lista = Boolean(p.url);
  const nombre = t(`p.${p.id}.nombre`, undefined, p.nombre);
  const descripcion = t(`p.${p.id}.desc`, undefined, p.descripcion);
  return (
    <article className={`tarjeta${lista ? '' : ' tarjeta--pendiente'}`}>
      <div className="tarjeta__vista">
        {p.preview ? (
          <>
            <div className="marco" aria-hidden="true"><i /><i /><i /></div>
            <img src={p.preview} alt={t('tar.alt', { nombre })} loading="lazy" />
          </>
        ) : (
          <div className="tarjeta__hueco">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={ICONOS[p.categoria]} />
            </svg>
            <span>{t('tar.pendiente')}</span>
          </div>
        )}
        {lista && (
          <button type="button" className="tarjeta__superpuesto" onClick={onVistaPrevia} aria-label={t('tar.vistaDe', { nombre })}>
            <span>{t('tar.vista')}</span>
          </button>
        )}
      </div>
      <div className="tarjeta__cuerpo">
        <p className="etiqueta">{t(`cat.${p.categoria}`, undefined, p.categoria)}</p>
        <h3>{nombre}</h3>
        <p className="tarjeta__desc">{descripcion}</p>
        <div className="tarjeta__acciones">
          {lista ? (
            <>
              <button type="button" className="btn btn-claro" onClick={onVistaPrevia}>{t('tar.vista')}</button>
              <a className="btn btn-oscuro" href={p.url} target="_blank" rel="noopener noreferrer">{t('tar.abrir')}</a>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-claro" disabled>{t('tar.vista')}</button>
              <span className="pendiente">{t('tar.pronto')}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

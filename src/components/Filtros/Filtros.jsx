import { CATEGORIAS } from '../../data/plantillas.js';
import { usePreferencias } from '../../i18n/Preferencias.jsx';
import './Filtros.css';

export default function Filtros({ categoria, onCategoria, total }) {
  const { t } = usePreferencias();
  const opciones = ['Todas', ...CATEGORIAS];
  return (
    <div className="filtros">
      <div className="filtros__chips" role="group" aria-label={t('gal.categoria')}>
        {opciones.map((c) => (
          <button key={c} type="button" className="chip" aria-pressed={categoria === c} onClick={() => onCategoria(c)}>
            {c === 'Todas' ? t('gal.todas') : t(`cat.${c}`, undefined, c)}
          </button>
        ))}
      </div>
      <p className="filtros__total" role="status" aria-live="polite">
        {t('gal.total', { n: total })}
      </p>
    </div>
  );
}

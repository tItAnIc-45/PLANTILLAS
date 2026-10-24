import { useEffect, useRef, useState } from 'react';
import { IDIOMAS } from '../../i18n/textos.js';
import { usePreferencias } from '../../i18n/Preferencias.jsx';
import Bandera from '../Banderas/Banderas.jsx';
import './SelectorIdioma.css';

// Lista desplegable propia: <select> no puede mostrar banderas.
export default function SelectorIdioma() {
  const { t, idioma, setIdioma } = usePreferencias();
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(0);
  const raiz = useRef(null);
  const boton = useRef(null);
  const actual = IDIOMAS.find((i) => i.codigo === idioma) ?? IDIOMAS[0];

  useEffect(() => {
    if (!abierto) return undefined;
    const fuera = (e) => !raiz.current?.contains(e.target) && setAbierto(false);
    document.addEventListener('pointerdown', fuera);
    return () => document.removeEventListener('pointerdown', fuera);
  }, [abierto]);

  const abrir = () => {
    setActivo(Math.max(0, IDIOMAS.findIndex((i) => i.codigo === idioma)));
    setAbierto(true);
  };
  const elegir = (codigo) => {
    setIdioma(codigo);
    setAbierto(false);
    boton.current?.focus();
  };

  const alTeclear = (e) => {
    if (!abierto) {
      if (['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); abrir(); }
      return;
    }
    if (e.key === 'Escape') { setAbierto(false); boton.current?.focus(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActivo((a) => (a + 1) % IDIOMAS.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActivo((a) => (a - 1 + IDIOMAS.length) % IDIOMAS.length); }
    else if (e.key === 'Home') { e.preventDefault(); setActivo(0); }
    else if (e.key === 'End') { e.preventDefault(); setActivo(IDIOMAS.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); elegir(IDIOMAS[activo].codigo); }
    else if (e.key === 'Tab') setAbierto(false);
  };

  return (
    <div className="idioma" ref={raiz} onKeyDown={alTeclear}>
      <button
        ref={boton}
        type="button"
        className="idioma__boton"
        aria-label={t('nav.idioma')}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        onClick={() => (abierto ? setAbierto(false) : abrir())}
      >
        <Bandera codigo={actual.codigo} />
        <span lang={actual.html}>{actual.nombre}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {abierto && (
        <ul className="idioma__lista" role="listbox" aria-label={t('nav.idioma')} aria-activedescendant={`idioma-${IDIOMAS[activo].codigo}`} tabIndex={-1} ref={(el) => el?.focus({ preventScroll: true })}>
          {IDIOMAS.map((i, n) => (
            <li
              key={i.codigo}
              id={`idioma-${i.codigo}`}
              role="option"
              lang={i.html}
              aria-selected={i.codigo === idioma}
              className={n === activo ? 'es-activo' : ''}
              onMouseEnter={() => setActivo(n)}
              onClick={() => elegir(i.codigo)}
            >
              <Bandera codigo={i.codigo} />
              {i.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

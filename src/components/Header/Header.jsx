import { useEffect, useState } from 'react';
import { usePreferencias } from '../../i18n/Preferencias.jsx';
import Marca from '../Marca/Marca.jsx';
import SelectorIdioma from '../SelectorIdioma/SelectorIdioma.jsx';
import './Header.css';

export default function Header() {
  const [fijo, setFijo] = useState(false);
  const { t, oscuro, setOscuro } = usePreferencias();

  useEffect(() => {
    const f = () => setFijo(window.scrollY > 24);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <header className={`cabecera${fijo ? ' cabecera--fija' : ''}`}>
      <div className="contenedor cabecera__fila">
        <Marca imagen={40} />
        <nav aria-label={t('nav.principal')} className="cabecera__nav">
          <a href="#galeria">{t('nav.plantillas')}</a>
          <SelectorIdioma />
          <button
            type="button"
            className="cabecera__tema"
            aria-pressed={oscuro}
            aria-label={t('nav.temaAria')}
            onClick={() => setOscuro((o) => !o)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {oscuro
                ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
                : <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />}
            </svg>
            <span className="solo-escritorio">{t('nav.tema')}</span>
          </button>
          <a className="btn btn-dorado" href="#contacto">{t('nav.contacto')}</a>
        </nav>
      </div>
    </header>
  );
}

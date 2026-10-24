import { WHATSAPP } from '../../data/plantillas.js';
import { usePreferencias } from '../../i18n/Preferencias.jsx';
import Marca from '../Marca/Marca.jsx';
import './Footer.css';

export default function Footer() {
  const { t } = usePreferencias();
  return (
    <footer className="pie">
      <div className="contenedor pie__rejilla">
        <div className="pie__marca">
          <Marca imagen={36} />
          <p>{t('pie.lema1')}<br />{t('pie.lema2')}</p>
          <p className="pie__suave">{t('con.nota')}</p>
        </div>
        <nav aria-label={t('pie.explora')} className="pie__col">
          <h2>{t('pie.explora')}</h2>
          <a href="#galeria">{t('pie.galeria')}</a>
          <a href="#contacto">{t('pie.contacto')}</a>
        </nav>
        <nav aria-label={t('pie.conversemos')} className="pie__col">
          <h2>{t('pie.conversemos')}</h2>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
          <a href="#contacto">{t('pie.privacidad')}</a>
        </nav>
      </div>
      <div className="contenedor pie__legal">
        <p>{t('pie.legal')}</p>
      </div>
    </footer>
  );
}

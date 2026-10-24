import colibri from '../../assets/colibri.png';
import { usePreferencias } from '../../i18n/Preferencias.jsx';
import './Hero.css';
export default function Hero() {
  const { t } = usePreferencias();
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-titulo">
      <div className="contenedor hero__fila">
        <div className="hero__texto">
          <h1 id="hero-titulo">
            <span className="linea"><span>{t('hero.l1')}</span></span>
            <span className="linea"><span>{t('hero.l2')}</span></span>
          </h1>
          <p className="hero__lead">{t('hero.lead')}</p>
          <div className="hero__acciones">
            <a className="btn btn-dorado" href="#galeria">{t('hero.ver')}</a>
          </div>
        </div>
        <div className="hero__escena" aria-hidden="true">
          <svg className="orbitas" viewBox="0 0 400 400">
            <ellipse className="orbita orbita--1" cx="200" cy="200" rx="170" ry="150" />
            <ellipse className="orbita orbita--2" cx="200" cy="200" rx="195" ry="180" />
          </svg>
          <img className="colibri" src={colibri} alt="" width="320" height="320" />
        </div>
      </div>
    </section>
  );
}

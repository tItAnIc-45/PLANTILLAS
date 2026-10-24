import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import colibri from '../../assets/colibri.png';
import { crearSonidoIntro } from '../../utils/sonidoIntro.js';
import { usePreferencias } from '../../i18n/Preferencias.jsx';
import './Intro.css';

const SEGUNDOS_HASTA_ABRIR = 2.3; // el telón se abre a los 2,3 s de empezar
const LETRAS = [...'TUPLUS'];

// En cada carga de la página, salvo que el usuario pida movimiento reducido.
function debeMostrarse() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// El navegador decide si deja sonar sin un gesto previo. Se espera un instante
// la respuesta porque `resume()` puede quedar pendiente cuando lo bloquea.
const sonidoPermitido = (s) =>
  Promise.race([s.activar(), new Promise((resolver) => setTimeout(() => resolver(s.activo), 250))]);

export default function Intro() {
  const { t } = usePreferencias();
  const [visible, setVisible] = useState(debeMostrarse);
  const [saliendo, setSaliendo] = useState(false);
  const salir = useCallback(() => setSaliendo(true), []);

  // La página queda quieta y su animación de entrada espera a que se abra el telón.
  useLayoutEffect(() => {
    if (!visible) return undefined;
    const raiz = document.documentElement;
    if (saliendo) raiz.classList.remove('intro-activa');
    else raiz.classList.add('intro-activa');
    return () => raiz.classList.remove('intro-activa');
  }, [visible, saliendo]);

  // Audio. La intro corre siempre; si el navegador bloquea el sonido, entra
  // en cuanto haya un primer gesto (clic, toque o tecla), sin avisos en pantalla.
  useEffect(() => {
    if (!visible) return undefined;
    let activo = true;
    const inicio = performance.now();
    const s = crearSonidoIntro();
    const desde = () => (performance.now() - inicio) / 1000;

    const alGesto = async () => {
      if (!activo || !s) return;
      if (await s.activar()) s.reproducir(desde());
    };

    if (s) {
      sonidoPermitido(s).then((ok) => {
        if (!activo) return;
        if (ok) {
          s.reproducir(0);
        } else {
          window.addEventListener('pointerdown', alGesto, { once: true });
          window.addEventListener('keydown', alGesto, { once: true });
        }
      });
    }

    return () => {
      activo = false;
      window.removeEventListener('pointerdown', alGesto);
      window.removeEventListener('keydown', alGesto);
      s?.cerrar();
    };
  }, [visible]);

  // Línea de tiempo: el telón se abre a los 2,3 s. Esc lo abre antes.
  useEffect(() => {
    if (!visible) return undefined;
    const id = setTimeout(salir, SEGUNDOS_HASTA_ABRIR * 1000);
    const alTeclear = (e) => e.key === 'Escape' && salir();
    document.addEventListener('keydown', alTeclear);
    return () => {
      clearTimeout(id);
      document.removeEventListener('keydown', alTeclear);
    };
  }, [visible, salir]);

  // Respaldo por si el navegador no emite el fin de la transición del telón.
  useEffect(() => {
    if (!saliendo) return undefined;
    const id = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(id);
  }, [saliendo]);

  if (!visible) return null;

  return (
    <div className={`intro intro--corre${saliendo ? ' intro--salir' : ''}`} role="presentation">
      <div className="intro__panel intro__panel--arriba" />
      <div
        className="intro__panel intro__panel--abajo"
        onTransitionEnd={(e) => e.target === e.currentTarget && setVisible(false)}
      />

      <div className="intro__centro" aria-hidden="true">
        <span className="intro__linea" />

        <div className="intro__escena">
          <svg className="intro__orbitas" viewBox="0 0 400 400">
            <ellipse className="intro__orbita intro__orbita--1" cx="200" cy="200" rx="170" ry="150" />
            <ellipse className="intro__orbita intro__orbita--2" cx="200" cy="200" rx="195" ry="180" />
          </svg>
          <span className="intro__vuelo">
            <span className="intro__flota">
              <img className="intro__colibri" src={colibri} width="132" height="132" alt="" />
            </span>
          </span>
        </div>

        <p className="intro__marca">
          {LETRAS.map((letra, i) => (
            <span className="intro__letra" key={i}>
              <span style={{ '--i': i }}>{letra}</span>
            </span>
          ))}
          <i className="intro__punto">.</i>
        </p>
        <p className="intro__sub">{t('intro.sub')}</p>
        <p className="intro__lema">{t('intro.lema')}</p>
      </div>
    </div>
  );
}

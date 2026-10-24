import { useState } from 'react';
import colibri from '../../assets/colibri.png';
import { PLANTILLAS, WHATSAPP } from '../../data/plantillas.js';
import { TEXTOS } from '../../i18n/textos.js';
import { usePreferencias } from '../../i18n/Preferencias.jsx';
import './Contacto.css';

const SERVICIOS = [0, 1, 2, 3];
const MATERIALES = [0, 1, 2];
const PLAZOS = [0, 1, 2, 3, 4];
const INICIAL = {
  nombre: '', empresa: '', contacto: '', pais: '',
  plantilla: PLANTILLAS[0].id, servicio: 0, material: 0, plazo: 0, mensaje: '', acepta: false,
};

// El mensaje lo recibe el equipo de TUPLUS, así que siempre se redacta en español.
const es = (clave) => TEXTOS.es[clave];

export default function Contacto() {
  const { t } = usePreferencias();
  const nombreDe = (p) => t(`p.${p.id}.nombre`, undefined, p.nombre);
  const [d, setD] = useState(INICIAL);
  const elegida = PLANTILLAS.find((p) => p.id === d.plantilla);
  const cambia = (e) => {
    const { name, type, value, checked } = e.target;
    const numerico = ['servicio', 'material', 'plazo'].includes(name);
    setD((p) => ({ ...p, [name]: type === 'checkbox' ? checked : numerico ? Number(value) : value }));
  };

  const enviar = (e) => {
    e.preventDefault();
    const texto = [
      'Hola TUPLUS, quiero información sobre sus plantillas web.',
      `Nombre: ${d.nombre}`,
      d.empresa && `Empresa o actividad: ${d.empresa}`,
      `Contacto: ${d.contacto}`,
      d.pais && `País: ${d.pais}`,
      `Plantilla de interés: ${elegida ? `${elegida.nombre} (${elegida.categoria})` : es('pl.otra')}`,
      `¿Qué necesita?: ${es(`srv.${d.servicio}`)}`,
      `¿Tiene su material?: ${es(`mat.${d.material}`)}`,
      `¿Para cuándo lo necesita?: ${es(`pla.${d.plazo}`)}`,
      d.mensaje && `Detalles: ${d.mensaje}`,
    ].filter(Boolean).join('\n');
    window.open(`${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contacto" className="contacto" aria-labelledby="contacto-titulo">
      <div className="contenedor">
       <div className="contacto__panel">
        <div className="contacto__fila">
        <div className="contacto__texto">
          <p className="contacto__etiqueta">{t('con.etiqueta')}</p>
          <h2 id="contacto-titulo">
            {t('con.h2a')}<em>{t('con.h2b')}</em>
          </h2>
          <p>{t('con.texto')}</p>
          <div className="chat" aria-hidden="true">
            <div className="chat__cabeza">
              <span className="chat__logo"><img src={colibri} alt="" width="22" height="22" /></span>
              <b>TUPLUS</b>
              <i className="chat__linea" />
            </div>
            <div className="chat__cuerpo">
              <div className="chat__burbuja chat__burbuja--yo">
                <p>{t('chat.yo', { nombre: elegida ? nombreDe(elegida) : t('pl.otra') })}</p>
                <span className="chat__hora">✓✓</span>
              </div>
              <div className="chat__escribe"><i /><i /><i /></div>
              <div className="chat__burbuja chat__burbuja--ellos">
                <p>{t('chat.resp')}</p>
              </div>
            </div>
            <div className="chat__pie"><span /><b>➤</b></div>
          </div>
          <a className="contacto__directo" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            {t('con.directo')}
          </a>
          <ul className="contacto__pills">
            <li>{t('con.pill1')}</li>
            <li>{t('con.pill2')}</li>
          </ul>
        </div>

        <form className="contacto__form" onSubmit={enviar}>
          <span className="contacto__raya" aria-hidden="true" />
          <h3>{t('con.titulo')}</h3>
          <p className="contacto__intro">{t('con.intro')}</p>

          <div className="campo">
            <label htmlFor="c-nombre">{t('con.nombre')}</label>
            <input id="c-nombre" name="nombre" required autoComplete="name" placeholder={t('con.nombreP')} value={d.nombre} onChange={cambia} />
          </div>
          <div className="campo">
            <label htmlFor="c-empresa">{t('con.empresa')}</label>
            <input id="c-empresa" name="empresa" autoComplete="organization" placeholder={t('con.empresaP')} value={d.empresa} onChange={cambia} />
          </div>
          <div className="campo">
            <label htmlFor="c-contacto">{t('con.contacto')}</label>
            <input id="c-contacto" name="contacto" required autoComplete="email" placeholder={t('con.contactoP')} value={d.contacto} onChange={cambia} />
            <small>{t('con.contactoAyuda')}</small>
          </div>
          <div className="campo">
            <label htmlFor="c-pais">{t('con.pais')}</label>
            <input id="c-pais" name="pais" autoComplete="country-name" placeholder={t('con.paisP')} value={d.pais} onChange={cambia} />
          </div>
          <div className="campo">
            <label htmlFor="c-plantilla">{t('con.plantilla')}</label>
            <select id="c-plantilla" name="plantilla" value={d.plantilla} onChange={cambia}>
              {PLANTILLAS.map((p) => <option key={p.id} value={p.id}>{nombreDe(p)}</option>)}
              <option value="">{t('pl.otra')}</option>
            </select>
          </div>
          <div className="campo">
            <label htmlFor="c-servicio">{t('con.servicio')}</label>
            <select id="c-servicio" name="servicio" value={d.servicio} onChange={cambia}>
              {SERVICIOS.map((i) => <option key={i} value={i}>{t(`srv.${i}`)}</option>)}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="c-material">{t('con.material')}</label>
            <select id="c-material" name="material" value={d.material} onChange={cambia}>
              {MATERIALES.map((i) => <option key={i} value={i}>{t(`mat.${i}`)}</option>)}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="c-plazo">{t('con.plazo')}</label>
            <select id="c-plazo" name="plazo" value={d.plazo} onChange={cambia}>
              {PLAZOS.map((i) => <option key={i} value={i}>{t(`pla.${i}`)}</option>)}
            </select>
          </div>
          <div className="campo campo--ancho">
            <label htmlFor="c-mensaje">{t('con.mensaje')}</label>
            <textarea id="c-mensaje" name="mensaje" rows="4" placeholder={t('con.mensajeP')} value={d.mensaje} onChange={cambia} />
          </div>

          <label className="contacto__acepta">
            <input type="checkbox" name="acepta" required checked={d.acepta} onChange={cambia} />
            <span>
              {t('con.acepta')}{' '}
              <a href="#contacto">{t('con.privacidad')}</a>.
            </span>
          </label>

          <button type="submit" className="btn btn-oscuro contacto__enviar">{t('con.enviar')}</button>
          <p className="contacto__aviso">{t('con.aviso')}</p>
        </form>
        </div>
       </div>
      </div>
    </section>
  );
}

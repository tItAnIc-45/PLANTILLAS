import { useMemo, useState } from 'react';
import { PLANTILLAS } from './data/plantillas.js';
import { usePreferencias } from './i18n/Preferencias.jsx';
import './App.css';
import Intro from './components/Intro/Intro.jsx';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Filtros from './components/Filtros/Filtros.jsx';
import TarjetaPlantilla from './components/TarjetaPlantilla/TarjetaPlantilla.jsx';
import VistaPrevia from './components/VistaPrevia/VistaPrevia.jsx';
import Contacto from './components/Contacto/Contacto.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  const { t } = usePreferencias();
  const [categoria, setCategoria] = useState('Todas');
  const [abierta, setAbierta] = useState(null);

  const visibles = useMemo(
    () => PLANTILLAS.filter((p) => categoria === 'Todas' || p.categoria === categoria),
    [categoria]
  );

  return (
    <>
      <Intro />
      <a className="saltar" href="#galeria">{t('saltar')}</a>
      <Header />
      <main>
        <Hero />
        <section id="galeria" className="galeria" aria-labelledby="galeria-titulo">
          <div className="contenedor">
            <h2 id="galeria-titulo">{t('gal.titulo')}</h2>
            <Filtros
              categoria={categoria}
              onCategoria={setCategoria}
              total={visibles.length}
            />
            {visibles.length ? (
              <ul className="rejilla">
                {visibles.map((p) => (
                  <li key={p.id}>
                    <TarjetaPlantilla plantilla={p} onVistaPrevia={() => setAbierta(p)} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
        <Contacto />
      </main>
      <Footer />
      {abierta && <VistaPrevia plantilla={abierta} onCerrar={() => setAbierta(null)} />}
    </>
  );
}

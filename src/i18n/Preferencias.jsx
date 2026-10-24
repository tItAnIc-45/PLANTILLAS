import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IDIOMAS, TEXTOS } from './textos.js';

const Contexto = createContext(null);

function leer(clave) {
  try { return localStorage.getItem(clave); } catch { return null; }
}
function guardar(clave, valor) {
  try { localStorage.setItem(clave, valor); } catch { /* sin almacenamiento */ }
}

function idiomaInicial() {
  const guardado = leer('tuplus-idioma');
  if (IDIOMAS.some((i) => i.codigo === guardado)) return guardado;
  const del_navegador = (navigator.language || 'es').slice(0, 2).toLowerCase();
  return IDIOMAS.some((i) => i.codigo === del_navegador) ? del_navegador : 'es';
}

// Idioma y tema de toda la página. Se guardan en el navegador.
export function Preferencias({ children }) {
  const [idioma, setIdioma] = useState(idiomaInicial);
  const [oscuro, setOscuro] = useState(() => leer('tuplus-tema') === 'oscuro');

  useEffect(() => {
    document.documentElement.lang = IDIOMAS.find((i) => i.codigo === idioma)?.html ?? 'es';
    guardar('tuplus-idioma', idioma);
  }, [idioma]);

  useEffect(() => {
    document.documentElement.dataset.tema = oscuro ? 'oscuro' : 'claro';
    guardar('tuplus-tema', oscuro ? 'oscuro' : 'claro');
  }, [oscuro]);

  const t = useCallback((clave, vars, porDefecto) => {
    let s = TEXTOS[idioma]?.[clave] ?? TEXTOS.es[clave] ?? porDefecto ?? clave;
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
    return s;
  }, [idioma]);

  const valor = useMemo(() => ({ idioma, setIdioma, oscuro, setOscuro, t }), [idioma, oscuro, t]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export const usePreferencias = () => useContext(Contexto);

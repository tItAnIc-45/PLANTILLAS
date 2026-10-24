// Sonido de la intro, sintetizado con WebAudio (sin archivos de audio).
// Línea de tiempo en segundos, alineada con Intro.css:
//   0.15–1.30  aleteo del colibrí
//   0.85–1.60  arpegio mientras aparece la palabra TUPLUS
//   2.30       "whoosh" cuando se abre el telón

const NOTAS = [
  { t: 0.85, f: 659.25 }, // Mi5
  { t: 1.02, f: 830.61 }, // Sol#5
  { t: 1.19, f: 987.77 }, // Si5
  { t: 1.4, f: 1318.51 }, // Mi6
];
const T_ALETEO = 0.15;
const T_WHOOSH = 2.3;

function ruido(ctx, segundos) {
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * segundos), ctx.sampleRate);
  const datos = buffer.getChannelData(0);
  for (let i = 0; i < datos.length; i += 1) datos[i] = Math.random() * 2 - 1;
  const fuente = ctx.createBufferSource();
  fuente.buffer = buffer;
  return fuente;
}

// Devuelve null si el navegador no soporta WebAudio.
export function crearSonidoIntro() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  const ctx = new AudioCtx();
  const salida = ctx.createGain();
  salida.gain.value = 0.2;
  salida.connect(ctx.destination);

  const nota = (frecuencia, inicio, duracion = 0.9, volumen = 0.5) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, inicio);
    g.gain.exponentialRampToValueAtTime(volumen, inicio + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion);
    g.connect(salida);
    // Fundamental + una octava más suave: timbre de campanilla.
    [[1, 1], [2, 0.25]].forEach(([mult, nivel]) => {
      const o = ctx.createOscillator();
      const gn = ctx.createGain();
      gn.gain.value = nivel;
      o.type = 'sine';
      o.frequency.value = frecuencia * mult;
      o.connect(gn).connect(g);
      o.start(inicio);
      o.stop(inicio + duracion + 0.05);
    });
  };

  const aleteo = (inicio, duracion) => {
    const r = ruido(ctx, duracion);
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.value = 1700;
    filtro.Q.value = 0.9;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, inicio);
    g.gain.exponentialRampToValueAtTime(0.35, inicio + 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion);
    // Temblor rápido: el batir de las alas.
    const lfo = ctx.createOscillator();
    const profundidad = ctx.createGain();
    lfo.frequency.value = 34;
    profundidad.gain.value = 0.3;
    lfo.connect(profundidad).connect(g.gain);
    r.connect(filtro).connect(g).connect(salida);
    lfo.start(inicio);
    lfo.stop(inicio + duracion);
    r.start(inicio);
  };

  const whoosh = (inicio) => {
    const r = ruido(ctx, 0.9);
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.setValueAtTime(300, inicio);
    filtro.frequency.exponentialRampToValueAtTime(3200, inicio + 0.45);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, inicio);
    g.gain.exponentialRampToValueAtTime(0.3, inicio + 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.85);
    r.connect(filtro).connect(g).connect(salida);
    r.start(inicio);
  };

  return {
    // Intenta activar el audio; resuelve true si quedó sonando.
    async activar() {
      try {
        if (ctx.state !== 'running') await ctx.resume();
      } catch {
        /* El navegador exige un gesto del usuario. */
      }
      return ctx.state === 'running';
    },
    // `desde`: segundos de intro ya transcurridos (para no repetir lo que ya pasó).
    reproducir(desde = 0) {
      const ahora = ctx.currentTime + 0.03;
      const programar = (t) => ahora + (t - desde);
      if (T_ALETEO + 1.15 > desde) aleteo(programar(Math.max(T_ALETEO, desde)), 1.15 - Math.max(0, desde - T_ALETEO));
      NOTAS.forEach(({ t, f }) => t >= desde && nota(f, programar(t), t > 1.3 ? 1.4 : 0.9));
      if (T_WHOOSH >= desde) whoosh(programar(T_WHOOSH));
    },
    cerrar() {
      ctx.close().catch(() => {});
    },
    get activo() {
      return ctx.state === 'running';
    },
  };
}

/*
 * data.js — Datos, marca y contacto de la plantilla.
 * Colores y tipografías: CSS/styles.css. Los datos sin confirmar se dejan vacíos.
 * No pongas datos reales de terceros (DNI, historias clínicas, etc.).
 */
const SITE = {
  nombre: "TUPLUS",
  empresa: "7CANALES MARKETING DIGITAL S.R.L.",
  lema: "Tu siguiente paso digital.",
  region: "Desde Latinoamérica, para tu negocio.",
  logo: "../core/assets/colibri.png",
  titulo: "Asesoría profesional clara, cuando la necesitas",
  subtitulo: "Explora los servicios, conoce la presentación del equipo y descubre cómo se organiza una web para servicios profesionales.",

  // Número en formato internacional, solo dígitos (ej. Perú: 51 + 9 dígitos).
  // Número confirmado en la configuración de la web TUPLUS.
  whatsapp: "51916828870",
  whatsappMensaje: "Hola, TUPLUS. Me interesa la plantilla para servicios profesionales y quisiera más información.",

  telefono: "+51 916 828 870",
  correo: "",
  direccion: "",
  horario: "",

  redes: {
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: ""
  },

  // Formulario de contacto (BL-05). Esta entrega prepara mensajes de WhatsApp.
  // El endpoint externo queda disponible para una integración posterior.
  // Con canal "whatsapp" se prepara una consulta para que el visitante la revise
  // y envíe. Usa canal "endpoint" si configuras un servicio de formularios.
  formulario: {
    canal: "endpoint",
    endpoint: "https://formspree.io/f/xgavgdwv"
  },

  // Mapa (BL-07). Dos opciones, ambas opcionales:
  //  - embedUrl: dirección del mapa incrustado. Solo se aceptan mapas de Google Maps
  //    o de OpenStreetMap. En Google Maps: buscar el lugar > Compartir > "Insertar un
  //    mapa" > copiar solo el valor de src="..." del código.
  //  - enlace: enlace para el botón "Cómo llegar". Si se deja vacío, se arma solo
  //    con la dirección de arriba.
  // Si embedUrl queda vacío, no se muestra el mapa; solo la dirección y el enlace.
  // Mapa original restaurado a petición del usuario. Es una ubicación de ejemplo editable.
  mapa: {
    embedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-77.0500%2C-12.0500%2C-77.0350%2C-12.0420&layer=mapnik&marker=-12.0464%2C-77.0428",
    enlace: ""
  }
};

/*
 * SERVICIOS (BL-02)
 * Una entrada por servicio. Para agregar, quitar o cambiar un servicio
 * solo se edita esta lista; no hace falta tocar el HTML ni el JS.
 *   - titulo:      nombre corto del servicio
 *   - descripcion: una o dos frases
 *   - icono:       opcional; un emoji o un símbolo corto (puede dejarse vacío)
 * Si la lista queda vacía, la sección Servicios se oculta sola.
 */
const SERVICIOS = [
  {
    icono: "💬",
    titulo: "Consulta inicial",
    descripcion: "Conversamos sobre tu caso y te explicamos las opciones disponibles, sin compromiso."
  },
  {
    icono: "📋",
    titulo: "Asesoría continua",
    descripcion: "Acompañamiento periódico para resolver dudas y tomar decisiones con respaldo profesional."
  },
  {
    icono: "🗂️",
    titulo: "Revisión de documentos",
    descripcion: "Revisamos contratos, informes y otros documentos para detectar riesgos y mejoras."
  },
  {
    icono: "✅",
    titulo: "Gestión de trámites",
    descripcion: "Nos encargamos de los trámites y seguimientos para que tú te enfoques en lo importante."
  }
];

/*
 * EQUIPO (BL-03)
 * Una entrada por profesional. Solo se edita esta lista.
 *   - nombre:       nombre completo (obligatorio)
 *   - especialidad: cargo o área (ej. "Abogada laboralista")
 *   - colegiatura:  opcional; número de colegiatura o credencial
 *   - descripcion:  opcional; una o dos frases sobre su experiencia
 *   - foto:         opcional; ruta a una imagen en la carpeta img/ (ej. "img/equipo-1.jpg")
 *                   Si se deja vacía o la imagen no carga, se muestran las iniciales.
 * Usa solo datos que el profesional haya autorizado publicar.
 * Si la lista queda vacía, la sección Equipo se oculta sola.
 */
const EQUIPO = [
  {
    nombre: "María Quispe",
    especialidad: "Especialidad de ejemplo",
    colegiatura: "Colegiatura N.º 00000",
    descripcion: "Texto de ejemplo sobre formación y experiencia profesional.",
    foto: ""
  },
  {
    nombre: "Carlos Rojas",
    especialidad: "Especialidad de ejemplo",
    colegiatura: "Colegiatura N.º 00000",
    descripcion: "Texto de ejemplo sobre formación y experiencia profesional.",
    foto: ""
  },
  {
    nombre: "Lucía Paredes",
    especialidad: "Especialidad de ejemplo",
    colegiatura: "Colegiatura N.º 00000",
    descripcion: "Texto de ejemplo sobre formación y experiencia profesional.",
    foto: ""
  }
];

/*
 * TESTIMONIOS (BL-04)
 * Una entrada por testimonio. Mínimo 2 de ejemplo en la plantilla.
 *   - texto:   lo que dijo el cliente (obligatorio)
 *   - nombre:  solo nombre y una inicial (ej. "Rosa M."). No pongas apellidos completos
 *   - detalle: opcional; ej. "Cliente de asesoría" o "Empresa de ejemplo"
 * IMPORTANTE: no publiques datos reales de terceros (DNI, teléfono, correo,
 * casos personales) sin autorización por escrito. Los de abajo son ficticios.
 * Si la lista queda vacía, la sección Testimonios se oculta sola.
 */
const TESTIMONIOS = [
  {
    texto: "Nos explicaron cada paso con claridad y resolvieron mis dudas sin apuros. Me sentí acompañada desde la primera consulta.",
    nombre: "Rosa M.",
    detalle: "Testimonio de ejemplo"
  },
  {
    texto: "Respondieron rápido y el trámite quedó listo en el tiempo que prometieron. Los volvería a contratar.",
    nombre: "Luis T.",
    detalle: "Testimonio de ejemplo"
  },
  {
    texto: "Revisaron todos mis documentos y encontraron detalles que yo había pasado por alto. Muy profesionales.",
    nombre: "Andrea C.",
    detalle: "Testimonio de ejemplo"
  }
];

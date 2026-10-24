// Banderas simplificadas en SVG (los emojis de bandera no se ven en Windows).
const FORMAS = {
  de: <><rect width="24" height="5.34" fill="#111" /><rect y="5.33" width="24" height="5.34" fill="#d00" /><rect y="10.66" width="24" height="5.34" fill="#fc0" /></>,
  en: (
    <>
      <rect width="24" height="16" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12, 14].map((y) => <rect key={y} y={y * 16 / 15} width="24" height="1.07" fill="#b22234" />)}
      <rect width="11" height="8.6" fill="#3c3b6e" />
      <g fill="#fff">{[2, 5, 8].flatMap((x) => [2, 4.6, 7.2].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="0.5" />))}</g>
    </>
  ),
  es: <><rect width="24" height="16" fill="#c60b1e" /><rect y="4" width="24" height="8" fill="#ffc400" /></>,
  fr: <><rect width="8" height="16" fill="#0055a4" /><rect x="8" width="8" height="16" fill="#fff" /><rect x="16" width="8" height="16" fill="#ef4135" /></>,
  pt: <><rect width="24" height="16" fill="#009c3b" /><path d="M12 2.2 21.5 8 12 13.8 2.5 8z" fill="#ffdf00" /><circle cx="12" cy="8" r="3.2" fill="#002776" /></>,
  ja: <><rect width="24" height="16" fill="#fff" /><circle cx="12" cy="8" r="4.5" fill="#bc002d" /></>,
  ru: <><rect width="24" height="5.34" fill="#fff" /><rect y="5.33" width="24" height="5.34" fill="#0039a6" /><rect y="10.66" width="24" height="5.34" fill="#d52b1e" /></>,
  zh: <><rect width="24" height="16" fill="#de2910" /><path d="m5 2.2.9 2.7h2.8L6.4 6.6l.9 2.7L5 7.6 2.7 9.3l.9-2.7L1.3 4.9h2.8z" fill="#ffde00" /></>,
};

export default function Bandera({ codigo }) {
  return (
    <svg className="bandera" viewBox="0 0 24 16" width="24" height="16" aria-hidden="true">
      <clipPath id={`b-${codigo}`}><rect width="24" height="16" rx="2.5" /></clipPath>
      <g clipPath={`url(#b-${codigo})`}>{FORMAS[codigo]}</g>
    </svg>
  );
}

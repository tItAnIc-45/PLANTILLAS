import colibri from '../../assets/colibri.png';
import './Marca.css';

export default function Marca({ imagen = 40 }) {
  return (
    <a className="marca" href="#inicio" aria-label="TUPLUS, inicio">
      <img src={colibri} width={imagen} height={imagen} alt="" />
      <span>TUPLUS<i aria-hidden="true">.</i></span>
    </a>
  );
}

import fenixLogo from "../../../assets/brand/fenix-logo.png";
import cuatroDevLogo from "../../../assets/brand/cuatro-dev-logo.png";

import FenixIcon from "./FenixIcon";

function FenixTopbar() {
  return (
    <header className="fenix-topbar">
      <div className="fenix-topbar__left">
        <button
          className="fenix-topbar__menu"
          type="button"
          aria-label="Abrir menú"
        >
          <FenixIcon name="menu" size={20} />
        </button>

        <div className="fenix-logo">
          <img
            src={fenixLogo}
            alt="Fénix"
            className="fenix-logo__image"
          />
        </div>
      </div>

      <div className="fenix-topbar__right">
        <div className="cuatro-dev-mini">
          <img
            src={cuatroDevLogo}
            alt="Cuatro Dev"
            className="cuatro-dev-mini__image"
          />
        </div>

        <strong className="fenix-topbar__user">
          Admin Devy
        </strong>

        <button
          className="fenix-topbar__icon"
          type="button"
          aria-label="Notificaciones"
        >
          <FenixIcon name="bell" size={18} />
          <span className="fenix-topbar__notification">
            3
          </span>
        </button>

        <button
          className="fenix-topbar__icon"
          type="button"
          aria-label="Ayuda"
        >
          <FenixIcon name="help" size={18} />
        </button>
      </div>
    </header>
  );
}

export default FenixTopbar;
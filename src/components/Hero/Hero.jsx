import "./Hero.css";

import FenixCarousel from "../FenixCarousel/FenixCarousel";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">

        <div className="hero__content">

          <span className="hero__badge">
            Tu negocio. Más claro. Más bajo control.
          </span>

          <h1 className="hero__title">
            RECUPERA EL CONTROL
            <br />
            DE TU NEGOCIO
            <br />

            <span>
              con Fénix.
            </span>
          </h1>

          <p className="hero__subtitle">
            Sistema de control empresarial.
            <br />
            Del caos a la tranquilidad.
          </p>

          <div className="hero__actions">

            <button className="hero__button hero__button--primary">
              Ver planes y Comenzar
            </button>

            <button className="hero__button hero__button--secondary">
              Prueba Fénix Gratis
            </button>

          </div>

        </div>

        <div className="hero__visual">
          <FenixCarousel />
        </div>

      </div>
    </section>
  );
}

export default Hero;
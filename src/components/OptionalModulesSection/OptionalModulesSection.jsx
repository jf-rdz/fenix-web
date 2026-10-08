import "./OptionalModulesSection.css";

import OptionalModulesAnimation
  from "./OptionalModulesAnimation";


function OptionalModulesSection() {
  return (
    <section
      className="optional-modules-section"
      aria-labelledby="optional-modules-title"
    >

      <div className="optional-modules-section__inner">


        {/* =================================
            PRODUCT DEMO
            ================================= */}

        <div className="optional-modules-section__visual">

          <OptionalModulesAnimation />

        </div>



        {/* =================================
            CONTENT — PO APPROVED
            ================================= */}

        <div className="optional-modules-section__content">

          <p className="optional-modules-section__eyebrow">
            Fénix se adapta a tu negocio, no tu negocio a Fénix.
          </p>


          <h2
            id="optional-modules-title"
            className="optional-modules-section__title"
          >
            Activa lo que necesitas.
            <br />
            Oculta lo que no usas.
          </h2>


          <p className="optional-modules-section__description">
            Cada negocio trabaja de manera diferente. Con Fénix puedes elegir los módulos que forman parte de tu operación y configurar la plataforma de acuerdo con la forma en que trabajas.
          </p>


          <p className="optional-modules-section__closing">
            Menos funciones que no necesitas. Más claridad, control y tranquilidad para administrar tu negocio. Fénix a tu medida.
          </p>

        </div>

      </div>
    </section>
  );
}


export default OptionalModulesSection;
import "./App.css";

import Hero
  from "./components/Hero/Hero";

import OptionalModulesSection
  from "./components/OptionalModulesSection/OptionalModulesSection";


function App() {
  return (
    <main className="fenix-landing">


      {/* =========================================
          BLOQUE 1
          HERO + CARRUSEL
          ========================================= */}

      <Hero />



      {/* =========================================
          BLOQUE 2
          RESERVADO PARA EL OTRO SEGMENTO
          ========================================= */}

      <section
        className="landing-block landing-block--2"
        aria-labelledby="block-2-title"
      >

        <div className="landing-block__inner">

          <h2 id="block-2-title">
            Bloque 2
          </h2>

        </div>

      </section>



      {/* =========================================
          BLOQUE 3
          FÉNIX MODULAR
          ========================================= */}

      <OptionalModulesSection />

    </main>
  );
}


export default App;
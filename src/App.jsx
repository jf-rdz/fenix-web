import "./App.css";

import Hero from "./components/Hero/Hero";


function App() {
  return (
    <main className="fenix-landing">

      {/* =========================================
          BLOQUE 1
          HERO ACTUAL
          ========================================= */}

      <Hero />


      {/* =========================================
          BLOQUE 2
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
          ========================================= */}

      <section
        className="landing-block landing-block--3"
        aria-labelledby="block-3-title"
      >
        <div className="landing-block__inner">

          <h2 id="block-3-title">
            Bloque 3
          </h2>

        </div>
      </section>

    </main>
  );
}


export default App;
import "./HomeScene.css";
import "./HomeSceneInteractions.css";

import FenixTopbar from "../ui/FenixTopbar";
import FenixSidebar from "../ui/FenixSidebar";
import DashboardCard from "../ui/DashboardCard";
import MiniChart from "../ui/MiniChart";

import useCountUp
  from "../../../hooks/useCountUp";

import useSceneTimeline
  from "../../../hooks/useSceneTimeline";


function HomeScene() {

  /*
   * Timeline de la escena.
   */

  const {
    salesTarget,
    newSaleAdded,
    salePulse,
  } = useSceneTimeline();


  /*
   * Animación numérica.
   *
   * 0
   * ↓
   * 274.03
   * ↓
   * 461.76
   */

  const sales =
    useCountUp({
      end: salesTarget,
      duration: 900,
      delay: 0,
      decimals: 2,
    });


  const formattedSales =
    sales.toLocaleString(
      "es-MX",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );


  return (
    <div className="home-scene">

      {/* =====================================
          CAMERA
          ===================================== */}

      <div className="fenix-camera">

        <div className="fenix-camera__stage">

          {/* =================================
              FÉNIX APP
              ================================= */}

          <div className="fenix-app">

            <FenixTopbar />


            <div className="fenix-app__body">

              <FenixSidebar />


              {/* =============================
                  DASHBOARD
                  ============================= */}

              <main className="fenix-dashboard">


                {/* ===========================
                    TOTAL VENTAS
                    =========================== */}

                <section
                  className={[
                    "sales-summary",

                    salePulse
                      ? "sales-summary--updated"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >

                  <strong>
                    Total Ventas
                  </strong>


                  <span className="sales-summary__value">
                    ${formattedSales}
                  </span>


                  <small>
                    2026-10-05 a 2026-10-11
                  </small>


                  {/* =========================
                      NUEVA VENTA
                      ========================= */}

                  <div
                    className={[
                      "sales-summary__event",

                      salePulse
                        ? "sales-summary__event--visible"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >

                    <p>
                      Venta registrada
                    </p>

                    <b>
                      +$187.73
                    </b>

                  </div>

                </section>


                {/* ===========================
                    OVERVIEW
                    =========================== */}

                <section className="dashboard-overview">


                  <div className="dashboard-overview__chart">

                    <MiniChart
                      newSale={
                        newSaleAdded
                      }
                    />

                  </div>


                  <DashboardCard
                    icon="users"
                    label="Clientes"
                    delay={1500}
                  />


                  <DashboardCard
                    icon="truck"
                    label="Proveedores"
                    delay={1650}
                  />


                  <DashboardCard
                    icon="userCog"
                    label="Colaboradores"
                    delay={1800}
                  />


                  <DashboardCard
                    icon="calendar"
                    label="Agenda"
                    delay={1950}
                  />

                </section>


                {/* ===========================
                    BOTTOM
                    =========================== */}

                <section className="dashboard-bottom">


                  <article className="fenix-table-card">

                    <h3>
                      Top 2 Clientes Más Valiosos
                    </h3>


                    <div className="fenix-table">

                      <div className="fenix-table__header">

                        <span>
                          Cliente
                        </span>

                        <span>
                          Total
                        </span>

                      </div>


                      <div className="fenix-table__row">

                        <span>
                          Industrias Devy
                        </span>

                        <span>
                          $2,776.62
                        </span>

                      </div>

                    </div>

                  </article>


                  <article className="fenix-table-card">

                    <h3>
                      Servicios programados próximos
                    </h3>


                    <div className="fenix-table">

                      <div className="fenix-table__header">

                        <span>
                          Servicio
                        </span>

                        <span>
                          Fecha
                        </span>

                      </div>


                      <div className="fenix-table__empty">

                        No hay servicios
                        programados próximos.

                      </div>

                    </div>

                  </article>

                </section>

              </main>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          MENSAJE FINAL
          ===================================== */}

      <div className="home-scene__message">

        <span>
          Fénix
        </span>


        <strong>

          Tu negocio.

          <br />

          Tu información.

          <br />

          Tu control.

        </strong>

      </div>

    </div>
  );
}


export default HomeScene;
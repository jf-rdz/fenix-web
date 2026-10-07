import "./SalesScene.css";
import "./SalesSceneInteractions.css";

import FenixTopbar
  from "../ui/FenixTopbar";

import FenixIcon
  from "../ui/FenixIcon";

import useCountUp
  from "../../../hooks/useCountUp";

import useSalesSceneTimeline
  from "../../../hooks/useSalesSceneTimeline";


/* =========================================
   DATOS DE DEMOSTRACIÓN
   ========================================= */

const baseSales = [

  {
    folio: "VM-0013",
    date: "6/10/2026",
    client:
      "Industrias Devy",
    payment: "Efectivo",
    total: "$153.92",
  },

  {
    folio: "VM-0012",
    date: "5/10/2026",
    client:
      "Industrias Devy",
    payment: "Efectivo",
    total: "$153.92",
  },

  {
    folio: "VM-0011",
    date: "5/10/2026",
    client:
      "Comercial Nova",
    payment: "Efectivo",
    total: "$153.92",
  },

  {
    folio: "VM-0010",
    date: "5/10/2026",
    client:
      "Industrias Devy",
    payment: "Efectivo",
    total: "$153.92",
  },

  {
    folio: "VM-0009",
    date: "30/9/2026",
    client:
      "Taller Central",
    payment: "Efectivo",
    total: "$153.92",
  },

  {
    folio: "VM-0008",
    date: "30/9/2026",
    client:
      "Industrias Devy",
    payment: "Efectivo",
    total: "$153.92",
  },

  {
    folio: "VM-0007",
    date: "18/9/2026",
    client:
      "Comercial Nova",
    payment:
      "Tarjeta de crédito",
    total: "$153.92",
  },

];


const newSale = {

  folio: "VM-0014",

  date: "6/10/2026",

  client:
    "Industrias Devy",

  payment:
    "Efectivo",

  total:
    "$153.92",

};


/* =========================================
   ICONO DESCARGAR
   ========================================= */

function DownloadIcon() {

  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >

      <path d="M12 3v12" />

      <path d="m8 11 4 4 4-4" />

      <path d="M5 17v3h14v-3" />

    </svg>
  );

}


/* =========================================
   SIDEBAR
   ========================================= */

const salesNavigation = [

  {
    label: "Servicios",
    icon: "service",
  },

  {
    label: "Venta Mostrador",
    icon: "card",
    active: true,
  },

  {
    label: "Proveedores",
    icon: "truck",
  },

  {
    label:
      "Inventario de Materia Prima",
    icon: "clipboard",
  },

  {
    label:
      "Inventario de Productos",
    icon: "file",
  },

  {
    label: "Producción",
    icon: "settings",
  },

  {
    label: "Contabilidad",
    icon: "card",
  },

  {
    label: "Reportes",
    icon: "file",
  },

];


const salesAccount = [

  {
    label: "Suscripciones",
    icon: "card",
  },

  {
    label: "Configuración",
    icon: "settings",
  },

  {
    label: "Cerrar sesión",
    icon: "logout",
  },

];


function SalesSidebarItem({
  item,
}) {

  return (
    <div
      className={[
        "sales-sidebar__item",

        item.active
          ? "sales-sidebar__item--active"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <FenixIcon
        name={item.icon}
        size={17}
        strokeWidth={1.7}
      />

      <span>
        {item.label}
      </span>

    </div>
  );

}


function SalesSidebar() {

  return (
    <aside className="sales-sidebar">

      <nav className="sales-sidebar__nav">

        {salesNavigation.map(
          (item) => (

            <SalesSidebarItem
              key={item.label}
              item={item}
            />

          )
        )}

      </nav>


      <div className="sales-sidebar__account">

        <strong className="sales-sidebar__account-title">
          CUENTA
        </strong>


        {salesAccount.map(
          (item) => (

            <SalesSidebarItem
              key={item.label}
              item={item}
            />

          )
        )}

      </div>

    </aside>
  );

}


/* =========================================
   MÉTRICA
   ========================================= */

function SalesMetric({
  variant,
  label,
  value,
  symbol,
  highlight,
}) {

  return (
    <article
      className={[
        "sales-metric",
        `sales-metric--${variant}`,

        highlight
          ? "sales-metric--pulse"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <span className="sales-metric__label">
        {label}
      </span>

      <strong className="sales-metric__value">
        {value}
      </strong>

      <div
        className="sales-metric__icon"
        aria-hidden="true"
      >
        {symbol}
      </div>

    </article>
  );

}


/* =========================================
   SALES SCENE
   ========================================= */

function SalesScene() {

  const {
    salesTodayTarget,
    incomeTodayTarget,
    monthlySalesTarget,

    saleRegistered,
    showToast,
    highlightMetrics,
  } =
    useSalesSceneTimeline();


  /*
   * =========================================
   * CONTADORES
   * =========================================
   */

  const salesToday =
    useCountUp({

      end:
        salesTodayTarget,

      duration:
        650,

      decimals:
        0,

    });


  const incomeToday =
    useCountUp({

      end:
        incomeTodayTarget,

      duration:
        850,

      decimals:
        2,

    });


  const monthlySales =
    useCountUp({

      end:
        monthlySalesTarget,

      duration:
        650,

      decimals:
        0,

    });


  const formattedIncome =
    incomeToday.toLocaleString(
      "es-MX",
      {
        minimumFractionDigits:
          2,

        maximumFractionDigits:
          2,
      }
    );


  /*
   * Insertamos la venta nueva
   * arriba de la tabla.
   */

  const visibleSales =
    saleRegistered
      ? [
          newSale,
          ...baseSales,
        ]
      : baseSales;


  return (
    <div
      className={[
        "sales-scene",

        saleRegistered
          ? "sales-scene--sale-registered"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      {/* =====================================
          CAMERA
          ===================================== */}

      <div className="sales-camera">

        <div className="sales-camera__stage">

          <div className="sales-app">

            {/* ===============================
                TOPBAR
                =============================== */}

            <FenixTopbar />


            <div className="sales-app__body">

              {/* =============================
                  SIDEBAR
                  ============================= */}

              <SalesSidebar />


              {/* =============================
                  WORKSPACE
                  ============================= */}

              <main className="sales-workspace">


                {/* ===========================
                    PAGE HEADER
                    =========================== */}

                <header className="sales-page-header">

                  <div className="sales-page-title">

                    <span
                      className="sales-page-title__back"
                      aria-hidden="true"
                    >
                      ←
                    </span>


                    <strong>
                      Venta Mostrador
                    </strong>


                    <span
                      className="sales-page-title__help"
                      aria-hidden="true"
                    >
                      ?
                    </span>

                  </div>


                  <button
                    type="button"
                    className="sales-new-button"
                  >
                    Nueva Venta
                  </button>

                </header>


                {/* ===========================
                    SEARCH
                    =========================== */}

                <div className="sales-search-row">

                  <div className="sales-search">

                    Buscar por folio,
                    cliente,
                    método de pago o fecha

                  </div>

                </div>


                {/* ===========================
                    MAIN GRID
                    =========================== */}

                <div className="sales-content">


                  {/* =========================
                      TABLE
                      ========================= */}

                  <section className="sales-table-card">

                    <div className="sales-table">


                      {/* HEADER */}

                      <div className="sales-table__header">

                        <span>
                          Folio
                        </span>

                        <span>
                          Fecha
                        </span>

                        <span>
                          Cliente
                        </span>

                        <span>
                          Método de pago
                        </span>

                        <span>
                          Total
                        </span>

                        <span>
                          Acciones
                        </span>

                      </div>


                      {/* BODY */}

                      <div className="sales-table__body">

                        {visibleSales.map(
                          (
                            sale,
                            index
                          ) => {

                            const isNew =
                              saleRegistered &&
                              index === 0;


                            return (
                              <div
                                key={
                                  sale.folio
                                }
                                className={[
                                  "sales-table__row",

                                  isNew
                                    ? "sales-table__row--new"
                                    : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                              >

                                <span>
                                  {sale.folio}
                                </span>


                                <span>
                                  {sale.date}
                                </span>


                                <span>
                                  {sale.client}
                                </span>


                                <span>
                                  {sale.payment}
                                </span>


                                <span>
                                  {sale.total}
                                </span>


                                <span className="sales-table__download">

                                  <DownloadIcon />

                                </span>

                              </div>
                            );

                          }
                        )}

                      </div>

                    </div>


                    {/* =======================
                        PAGINATION
                        ======================= */}

                    <div className="sales-pagination">

                      <button type="button">
                        Anterior
                      </button>


                      <strong>
                        Mostrando 1–8 de 13
                        {" "}
                        | Página 1 de 2
                      </strong>


                      <button
                        type="button"
                        className="sales-pagination__next"
                      >
                        Siguiente
                      </button>

                    </div>

                  </section>


                  {/* =========================
                      KPI CARDS
                      ========================= */}

                  <aside className="sales-metrics">

                    <SalesMetric
                      variant="navy"
                      label="Ventas hoy"
                      value={
                        Math.round(
                          salesToday
                        )
                      }
                      symbol="◷"
                      highlight={
                        highlightMetrics
                      }
                    />


                    <SalesMetric
                      variant="cyan"
                      label="Ingresos hoy"
                      value={
                        `$${formattedIncome}`
                      }
                      symbol="✓"
                      highlight={
                        highlightMetrics
                      }
                    />


                    <SalesMetric
                      variant="slate"
                      label="Ventas del mes"
                      value={
                        Math.round(
                          monthlySales
                        )
                      }
                      symbol="▦"
                      highlight={
                        highlightMetrics
                      }
                    />

                  </aside>

                </div>

              </main>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          SUCCESS TOAST
          ===================================== */}

      <div
        className={[
          "sales-toast",

          showToast
            ? "sales-toast--visible"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >

        <span className="sales-toast__check">
          ✓
        </span>


        <p>
          Venta de mostrador y pago
          registrados correctamente.
        </p>

      </div>


      {/* =====================================
          FINAL MESSAGE
          ===================================== */}

      <div className="sales-scene__message">

        <span>
          Venta Mostrador
        </span>


        <strong>
          Cada venta.
          <br />
          Bajo control.
        </strong>

      </div>

    </div>
  );

}


export default SalesScene;
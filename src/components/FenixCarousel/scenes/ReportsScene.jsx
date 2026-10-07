import "./ReportsScene.css";
import "./ReportsSceneInteractions.css";

import FenixTopbar
  from "../ui/FenixTopbar";

import FenixIcon
  from "../ui/FenixIcon";

import useCountUp
  from "../../../hooks/useCountUp";

import useReportsSceneTimeline
  from "../../../hooks/useReportsSceneTimeline";


/* =========================================
   SIDEBAR DATA
   ========================================= */

const navigation = [
  {
    label: "Cotizaciones",
    icon: "file",
  },

  {
    label: "Órdenes de Servicio",
    icon: "card",
  },

  {
    label: "Servicios",
    icon: "service",
  },

  {
    label: "Venta Mostrador",
    icon: "card",
  },

  {
    label: "Proveedores",
    icon: "truck",
  },

  {
    label: "Inventario de Materia Prima",
    icon: "clipboard",
  },

  {
    label: "Inventario de Productos",
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
    active: true,
  },
];


const accountNavigation = [
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


/* =========================================
   REPORTS DATA
   ========================================= */

const commercialReports = [
  {
    title:
      "Reporte de ventas por Período",

    description:
      "Ventas totales agrupadas por día, semana, mes o año para detectar patrones de demanda.",

    featured:
      true,
  },

  {
    title:
      "Reporte de ventas por Producto/Servicios",

    description:
      "Ranking de productos y servicios más vendidos con cantidades, montos y utilidad.",
  },

  {
    title:
      "Reporte de Servicios",

    description:
      "Historial de servicios: técnicos, tiempos y montos generados.",
  },

  {
    title:
      "Reporte de Clientes",

    description:
      "Clientes nuevos, recurrentes y de mayor valor.",
  },
];


const collapsedSections = [
  "Reportes de Operación",
  "Reportes Financieros",
  "Reportes Avanzados",
];


/* =========================================
   SIDEBAR
   ========================================= */

function ReportsSidebarItem({
  item,
}) {
  return (
    <div
      className={[
        "reports-sidebar__item",

        item.active
          ? "reports-sidebar__item--active"
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


function ReportsSidebar() {
  return (
    <aside className="reports-sidebar">

      <nav className="reports-sidebar__nav">

        {navigation.map(
          (item) => (
            <ReportsSidebarItem
              key={item.label}
              item={item}
            />
          )
        )}

      </nav>


      <div className="reports-sidebar__account">

        <strong className="reports-sidebar__account-title">
          CUENTA
        </strong>


        {accountNavigation.map(
          (item) => (
            <ReportsSidebarItem
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
   PAGE TITLE
   ========================================= */

function ReportsPageTitle({
  children,
}) {
  return (
    <header className="reports-page-title">

      <span
        className="reports-page-title__back"
        aria-hidden="true"
      >
        ←
      </span>

      <strong>
        {children}
      </strong>

    </header>
  );
}


/* =========================================
   OVERVIEW
   ========================================= */

function ReportsOverview({
  expanded,
  highlightSalesReport,
}) {
  return (
    <section className="reports-overview">

      <ReportsPageTitle>
        Reportes
      </ReportsPageTitle>


      <div className="reports-overview__body">


        {/* =============================
            REPORTES COMERCIALES
            ============================= */}

        <section
          className={[
            "reports-category",

            expanded
              ? "reports-category--expanded"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >

          <div className="reports-category__header reports-category__header--commercial">

            <strong>
              Reportes Comerciales
            </strong>

            <span>
              {expanded
                ? "⌃"
                : "⌄"}
            </span>

          </div>


          <div className="reports-category__content">

            {commercialReports.map(
              (report) => (

                <article
                  key={
                    report.title
                  }
                  className={[
                    "reports-report-option",

                    report.featured
                      ? "reports-report-option--featured"
                      : "",

                    report.featured &&
                    highlightSalesReport
                      ? "reports-report-option--focus"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >

                  <strong>
                    {report.title}
                  </strong>

                  <p>
                    {report.description}
                  </p>

                </article>

              )
            )}

          </div>

        </section>


        {/* =============================
            RESTO DE SECCIONES
            ============================= */}

        {collapsedSections.map(
          (title) => (

            <section
              key={title}
              className="reports-category reports-category--simple"
            >

              <div className="reports-category__header">

                <strong>
                  {title}
                </strong>

                <span>
                  ⌄
                </span>

              </div>

            </section>

          )
        )}

      </div>

    </section>
  );
}


/* =========================================
   METRIC CARD
   ========================================= */

function ReportMetricCard({
  title,
  value,
  icon,
  focus,
}) {
  return (
    <article
      className={[
        "report-metric",

        focus
          ? "report-metric--focus"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <span className="report-metric__title">
        {title}
      </span>

      <strong className="report-metric__value">
        {value}
      </strong>

      <span
        className="report-metric__icon"
        aria-hidden="true"
      >
        {icon}
      </span>

    </article>
  );
}


/* =========================================
   REPORT DETAIL
   ========================================= */

function SalesPeriodReport({
  totalSales,
  metricFocus,
  highlightTrend,
}) {
  return (
    <section className="reports-period">

      <ReportsPageTitle>
        Reporte de ventas por periodo
      </ReportsPageTitle>


      {/* =============================
          FILTROS
          ============================= */}

      <section className="reports-period__filters">

        <div className="reports-period__dates">

          <div className="reports-date">

            <strong>
              INICIO
            </strong>

            <div className="reports-date__input">
              <span>
                ▣
              </span>

              <em>
                07/10/2026
              </em>

              <small>
                ▦
              </small>
            </div>

          </div>


          <div className="reports-date">

            <strong>
              FIN
            </strong>

            <div className="reports-date__input">

              <span>
                ▣
              </span>

              <em>
                07/10/2026
              </em>

              <small>
                ▦
              </small>

            </div>

          </div>

        </div>


        <div className="reports-group">

          <strong>
            AGRUPAR POR
          </strong>

          <p>
            Para rangos de hasta 7 días,
            se habilita “Día”. La opción
            “Año” se habilita cuando el rango
            cruza años en el calendario.
          </p>

          <button type="button">
            Día
          </button>

        </div>

      </section>


      {/* =============================
          KPI CARDS
          ============================= */}

      <section className="reports-period__metrics">

        <ReportMetricCard
          title="VENTAS TOTALES"
          value={`$${totalSales}`}
          icon="$"
          focus={
            metricFocus ===
            "sales"
          }
        />


        <ReportMetricCard
          title="MEJOR DÍA"
          value="2026 · Semana 41"
          icon="↗"
          focus={
            metricFocus ===
            "best"
          }
        />


        <ReportMetricCard
          title="PEOR DÍA"
          value="2026 · Semana 41"
          icon="↘"
          focus={false}
        />

      </section>


      {/* =============================
          CHART + DETAIL
          ============================= */}

      <section className="reports-period__analysis">

        <article
          className={[
            "reports-trend",

            highlightTrend
              ? "reports-trend--focus"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >

          <header className="reports-trend__title">
            <strong>
              ↗ Tendencia (Día)
            </strong>
          </header>


          <div className="reports-chart">

            <div className="reports-chart__labels">

              <span>
                $150,000
              </span>

              <span>
                $100,000
              </span>

              <span>
                $50,000
              </span>

              <span>
                $0.00
              </span>

            </div>


            <div className="reports-chart__plot">

              <div className="reports-chart__horizontal reports-chart__horizontal--1" />

              <div className="reports-chart__horizontal reports-chart__horizontal--2" />

              <div className="reports-chart__horizontal reports-chart__horizontal--3" />


              <div className="reports-chart__vertical" />


              <span className="reports-chart__period">
                2026 · Semana 41
              </span>


              <span className="reports-chart__dot" />


              <div className="reports-chart__tooltip">

                <strong>
                  2026 · Semana 41
                </strong>

                <span>
                  Ventas : ${totalSales}
                </span>

              </div>

            </div>

          </div>

        </article>


        <aside className="reports-detail">

          <header className="reports-detail__header">

            <strong>
              Detalle
            </strong>

            <small>
              1 filas
            </small>

          </header>


          <div className="reports-detail__table">

            <div className="reports-detail__row reports-detail__row--header">

              <span>
                Periodo
              </span>

              <span>
                Ventas
              </span>

              <span>
                %
              </span>

            </div>


            <div className="reports-detail__row">

              <span>
                2026 ·
                <br />
                Semana 41
              </span>

              <strong>
                ${totalSales}
              </strong>

              <span>
                -
              </span>

            </div>

          </div>

        </aside>

      </section>

    </section>
  );
}


/* =========================================
   MAIN SCENE
   ========================================= */

function ReportsScene() {
  const {
    commercialExpanded,
    highlightSalesReport,
    activeView,
    metricFocus,
    highlightTrend,
  } =
    useReportsSceneTimeline();


  /*
   * El valor es demostrativo para la landing.
   */

  const salesTarget =
    activeView === "report"
      ? 128889.41
      : 0;


  const animatedSales =
    useCountUp({
      end: salesTarget,
      duration: 1200,
      decimals: 2,
    });


  const formattedSales =
    animatedSales.toLocaleString(
      "es-MX",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );


  return (
    <div
      className={[
        "reports-scene",

        activeView === "report"
          ? "reports-scene--report"
          : "reports-scene--overview",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      {/* ===================================
          CAMERA
          =================================== */}

      <div className="reports-camera">

        <div className="reports-camera__stage">

          <div className="reports-app">

            <FenixTopbar />


            <div className="reports-app__body">

              <ReportsSidebar />


              <main className="reports-workspace">


                {/* =========================
                    REPORTS OVERVIEW
                    ========================= */}

                <div
                  className={[
                    "reports-view",

                    "reports-view--overview",

                    activeView ===
                    "overview"
                      ? "reports-view--active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >

                  <ReportsOverview
                    expanded={
                      commercialExpanded
                    }
                    highlightSalesReport={
                      highlightSalesReport
                    }
                  />

                </div>


                {/* =========================
                    REPORT DETAIL
                    ========================= */}

                <div
                  className={[
                    "reports-view",

                    "reports-view--period",

                    activeView ===
                    "report"
                      ? "reports-view--active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >

                  <SalesPeriodReport
                    totalSales={
                      formattedSales
                    }
                    metricFocus={
                      metricFocus
                    }
                    highlightTrend={
                      highlightTrend
                    }
                  />

                </div>

              </main>

            </div>

          </div>

        </div>

      </div>


      {/* ===================================
          FINAL MESSAGE
          =================================== */}

      <div className="reports-scene__message">

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

        <small>
          Del caos a la tranquilidad.
        </small>

      </div>

    </div>
  );
}


export default ReportsScene;
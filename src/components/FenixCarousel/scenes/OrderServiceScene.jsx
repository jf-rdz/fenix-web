import "./OrderServiceScene.css";
import "./OrderServiceSceneInteractions.css";

import FenixTopbar from "../ui/FenixTopbar";
import FenixIcon from "../ui/FenixIcon";

import useCountUp from "../../../hooks/useCountUp";
import useOrderServiceTimeline from "../../../hooks/useOrderServiceTimeline";


/* =========================================
   DATA
   ========================================= */

const baseOrders = [
  {
    folio: "OS-0001",
    client: "-",
    address: "Calle Faisán #94, Col. Centro",
    date: "8/10/2026",
    timeStart: "11:45",
    timeEnd: "15:44",
    status: "Programada",
    movement: "Pago en una exhibición",
    amount: "$380.60",
  },
];

const newOrder = {
  folio: "OS-0002",
  client: "Comercial Devy",
  address: "Av. Tecnológico #210, Celaya",
  date: "8/10/2026",
  timeStart: "10:30",
  timeEnd: "12:00",
  status: "Programada",
  movement: "Pago en una exhibición",
  amount: "$380.60",
};


/* =========================================
   SIDEBAR
   ========================================= */

const orderNavigation = [
  {
    label: "Cotizaciones",
    icon: "file",
  },
  {
    label: "Órdenes de Servicio",
    icon: "card",
    active: true,
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
    label: "Reportes",
    icon: "file",
  },
];

const orderAccount = [
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

function OrderSidebarItem({
  item,
}) {
  return (
    <div
      className={[
        "order-sidebar__item",
        item.active
          ? "order-sidebar__item--active"
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

function OrderSidebar() {
  return (
    <aside className="order-sidebar">
      <nav className="order-sidebar__nav">
        {orderNavigation.map(
          (item) => (
            <OrderSidebarItem
              key={item.label}
              item={item}
            />
          )
        )}
      </nav>

      <div className="order-sidebar__account">
        <strong className="order-sidebar__account-title">
          CUENTA
        </strong>

        {orderAccount.map(
          (item) => (
            <OrderSidebarItem
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
   SMALL UI PIECES
   ========================================= */

function MetricCard({
  variant,
  title,
  amount,
  count,
  icon,
  highlight,
}) {
  return (
    <article
      className={[
        "order-metric",
        `order-metric--${variant}`,
        highlight
          ? "order-metric--pulse"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="order-metric__title">
        {title}
      </span>

      <strong className="order-metric__amount">
        {amount}
      </strong>

      <small className="order-metric__count">
        ({count})
      </small>

      <div
        className="order-metric__icon"
        aria-hidden="true"
      >
        {icon}
      </div>
    </article>
  );
}

function Field({
  label,
  value,
  wide = false,
  tall = false,
}) {
  return (
    <div
      className={[
        "order-field",
        wide
          ? "order-field--wide"
          : "",
        tall
          ? "order-field--tall"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="order-field__label">
        {label}
      </span>

      <div className="order-field__input">
        {value}
      </div>
    </div>
  );
}


/* =========================================
   SCENE
   ========================================= */

function OrderServiceScene() {
  const {
    activeView,
    highlightNewOrder,
    highlightProgramming,
    showToast,
    orderRegistered,
    highlightProgrammedSummary,
  } =
    useOrderServiceTimeline();

  const programmedAmountTarget =
    orderRegistered
      ? 761.2
      : 380.6;

  const programmedCountTarget =
    orderRegistered
      ? 2
      : 1;

  const programmedAmount =
    useCountUp({
      end: programmedAmountTarget,
      duration: 850,
      decimals: 2,
    });

  const programmedCount =
    useCountUp({
      end: programmedCountTarget,
      duration: 650,
      decimals: 0,
    });

  const formattedProgrammedAmount =
    programmedAmount.toLocaleString(
      "es-MX",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  const visibleOrders =
    orderRegistered
      ? [
          newOrder,
          ...baseOrders,
        ]
      : baseOrders;

  return (
    <div
      className={[
        "order-service-scene",
        `order-service-scene--${activeView}`,
        orderRegistered
          ? "order-service-scene--registered"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="order-service-camera">
        <div className="order-service-camera__stage">
          <div className="order-service-app">
            <FenixTopbar />

            <div className="order-service-app__body">
              <OrderSidebar />

              <main className="order-service-workspace">
                {/* ===================================
                    LIST VIEW
                    =================================== */}

                <section
                  className={[
                    "order-service-panel",
                    "order-service-panel--list",
                    activeView === "list" ||
                    activeView === "updated-list"
                      ? "order-service-panel--active"
                      : "",
                    activeView ===
                    "updated-list"
                      ? "order-service-panel--updated"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <header className="order-page-header">
                    <div className="order-page-title">
                      <span className="order-page-title__back">
                        ←
                      </span>

                      <strong>
                        Órdenes de Servicio
                      </strong>

                      <span className="order-page-title__help">
                        ?
                      </span>
                    </div>

                    <button
                      type="button"
                      className={[
                        "order-page-button",
                        highlightNewOrder
                          ? "order-page-button--focus"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      Nueva Orden
                    </button>
                  </header>

                  <div className="order-search-row">
                    <div className="order-search">
                      Buscar por folio, cliente, domicilio, estatus, fecha, fecha
                    </div>
                  </div>

                  <div className="order-list-layout">
                    <section className="order-table-card">
                      <div className="order-table">
                        <div className="order-table__header">
                          <span>Folio</span>
                          <span>Cliente</span>
                          <span>Domicilio (resumen)</span>
                          <span>Fecha (programada)</span>
                          <span>Hora</span>
                          <span>Estatus de la orden</span>
                          <span>Tipo movimiento</span>
                          <span>Costo (MXN)</span>
                          <span>Acciones</span>
                        </div>

                        <div className="order-table__body">
                          {visibleOrders.map(
                            (
                              item,
                              index
                            ) => {
                              const isNew =
                                orderRegistered &&
                                index === 0;

                              return (
                                <div
                                  key={item.folio}
                                  className={[
                                    "order-table__row",
                                    isNew
                                      ? "order-table__row--new"
                                      : "",
                                  ]
                                    .filter(Boolean)
                                    .join(" ")}
                                >
                                  <span>
                                    {item.folio}
                                  </span>

                                  <span>
                                    {item.client}
                                  </span>

                                  <span>
                                    {item.address}
                                  </span>

                                  <span>
                                    {item.date}
                                  </span>

                                  <span>
                                    {item.timeStart}
                                    <br />
                                    -
                                    <br />
                                    {item.timeEnd}
                                  </span>

                                  <span>
                                    <b className="order-status-badge">
                                      {item.status}
                                    </b>
                                  </span>

                                  <span>
                                    <b className="order-movement-badge">
                                      {item.movement}
                                    </b>
                                  </span>

                                  <span>
                                    {item.amount}
                                  </span>

                                  <span className="order-actions">
                                    <span>
                                      ◉
                                    </span>

                                    <span>
                                      ✎
                                    </span>
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>

                      <div className="order-pagination">
                        <button type="button">
                          Anterior
                        </button>

                        <strong>
                          Mostrando 1–1 de 1 | Página 1 de 1
                        </strong>

                        <button type="button">
                          Siguiente
                        </button>
                      </div>
                    </section>

                    <aside className="order-metrics">
                      <MetricCard
                        variant="navy"
                        title="Programadas"
                        amount={`$${formattedProgrammedAmount}`}
                        count={Math.round(programmedCount)}
                        icon="◷"
                        highlight={highlightProgrammedSummary}
                      />

                      <MetricCard
                        variant="cyan"
                        title="En curso"
                        amount="$0.00"
                        count={0}
                        icon="🛠"
                        highlight={false}
                      />

                      <MetricCard
                        variant="slate"
                        title="Finalizada"
                        amount="$0.00"
                        count={0}
                        icon="✓"
                        highlight={false}
                      />
                    </aside>
                  </div>
                </section>

                {/* ===================================
                    FORM VIEW
                    =================================== */}

                <section
                  className={[
                    "order-service-panel",
                    "order-service-panel--form",
                    activeView === "form"
                      ? "order-service-panel--active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <header className="order-form-header">
                    <div className="order-page-title">
                      <span className="order-page-title__back">
                        ←
                      </span>

                      <strong>
                        Nueva Orden de Servicio
                      </strong>
                    </div>

                    <div className="order-form-actions">
                      <button
                        type="button"
                        className="order-form-actions__ghost"
                      >
                        Reg + imprimir
                      </button>

                      <button
                        type="button"
                        className="order-form-actions__ghost"
                      >
                        Limpiar
                      </button>

                      <button
                        type="button"
                        className={[
                          "order-form-actions__primary",
                          highlightProgramming
                            ? "order-form-actions__primary--focus"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        Registrar
                      </button>
                    </div>
                  </header>

                  <div className="order-form-scroll">
                    <div className="order-form-top">
                      <section className="order-form-block">
                        <h3>
                          Cliente
                        </h3>

                        <div className="order-form-grid order-form-grid--client">
                          <Field
                            label="Nombre"
                            value="Selecciona un cliente..."
                            wide
                          />

                          <Field
                            label="Teléfono"
                            value="422 123 3143"
                          />

                          <Field
                            label="Correo"
                            value="correo@cliente.com"
                          />

                          <Field
                            label="Dirección"
                            value="Calle, número, CP, ciudad"
                            wide
                          />
                        </div>
                      </section>

                      <section
                        className={[
                          "order-form-block",
                          "order-form-block--programming",
                          highlightProgramming
                            ? "order-form-block--focus"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <div className="order-form-block__top">
                          <h3>
                            Programación
                          </h3>

                          <strong className="order-form-block__warning">
                            SELECCIONA UNA HORA DE INICIO.
                          </strong>
                        </div>

                        <div className="order-form-grid order-form-grid--programming">
                          <Field
                            label="Fecha Inicio"
                            value="08/10/2026"
                          />

                          <Field
                            label="Hora Inicio"
                            value="10:30 a.m."
                          />

                          <Field
                            label="Fecha Fin"
                            value="08/10/2026"
                          />

                          <Field
                            label="Hora Fin"
                            value="12:00 p.m."
                          />

                          <Field
                            label="Colaborador"
                            value="Devy Técnico"
                            wide
                          />
                        </div>

                        <div className="order-radio-row">
                          <span>
                            REPETICIÓN
                          </span>

                          <label>
                            <input
                              type="radio"
                              checked
                              readOnly
                            />
                            No
                          </label>

                          <label>
                            <input
                              type="radio"
                              readOnly
                            />
                            Sí
                          </label>
                        </div>

                        <div className="order-form-divider" />

                        <div className="order-facturacion">
                          <strong>
                            Facturación
                          </strong>

                          <p>
                            En “Precio de Venta + IVA”, el IVA se sumará automáticamente cuando marques ¿Requiere factura?
                          </p>

                          <label className="order-checkbox-line">
                            <input
                              type="checkbox"
                              readOnly
                            />
                            ¿Requiere factura?
                          </label>
                        </div>
                      </section>
                    </div>

                    <div className="order-form-bottom">
                      <section className="order-form-block">
                        <h3>
                          Inmueble
                        </h3>

                        <div className="order-form-grid order-form-grid--property">
                          <Field
                            label="Tipo inmueble"
                            value="Casa, Local, Oficina..."
                            wide
                          />

                          <Field
                            label="Pisos"
                            value="0"
                          />

                          <Field
                            label="Habitaciones"
                            value="0"
                          />
                        </div>
                      </section>

                      <section className="order-form-block">
                        <h3>
                          Entorno y Observaciones
                        </h3>

                        <div className="order-tag-row">
                          <span className="order-tag order-tag--active">
                            Adecuado
                          </span>

                          <span className="order-tag">
                            Inadecuado
                          </span>
                        </div>

                        <Field
                          label="Observaciones"
                          value="Anotaciones sobre el entorno o el inmueble..."
                          wide
                          tall
                        />
                      </section>

                      <section className="order-form-block">
                        <h3>
                          Dimensiones
                        </h3>

                        <div className="order-form-grid order-form-grid--dimensions">
                          <Field
                            label="Ancho (mts)"
                            value="Ancho"
                          />

                          <Field
                            label="Alto (mts)"
                            value="Alto"
                          />

                          <Field
                            label="Largo (mts)"
                            value="Largo"
                          />

                          <Field
                            label="Área total"
                            value="0.00"
                          />
                        </div>
                      </section>
                    </div>

                    <section className="order-form-concepts">
                      <div className="order-form-concepts__header">
                        <strong>
                          CONCEPTOS DE LA ORDEN
                        </strong>
                      </div>

                      <div className="order-form-concepts__body">
                        <div>
                          <h4>
                            Servicios
                          </h4>

                          <p>
                            Agrega los servicios de la orden antes de pasar al cierre.
                          </p>
                        </div>

                        <button type="button">
                          Agregar servicio
                        </button>
                      </div>
                    </section>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================
          TOAST
          =================================== */}

      <div
        className={[
          "order-scene-toast",
          showToast
            ? "order-scene-toast--visible"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="order-scene-toast__check">
          ✓
        </span>

        <p>
          Orden de servicio registrada correctamente.
        </p>
      </div>

      {/* ===================================
          FINAL MESSAGE
          =================================== */}

      <div className="order-service-scene__message">
        <span>
          Órdenes de Servicio
        </span>

        <strong>
          Organiza cada servicio
          <br />
          y da seguimiento de principio a fin.
        </strong>
      </div>
    </div>
  );
}

export default OrderServiceScene;
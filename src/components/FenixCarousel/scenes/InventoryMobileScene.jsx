import "./InventoryMobileScene.css";
import "./InventoryMobileSceneInteractions.css";

import fenixLogo from "../../../assets/brand/fenix-logo.png";
import FenixIcon from "../ui/FenixIcon";

import useInventoryMobileTimeline from "../../../hooks/useInventoryMobileTimeline";

/* =========================================
   DATA
   ========================================= */

const inventoryRows = [
  {
    folio: "MP-0008",
    name: "MatPrim CGHHH grado 900",
    brand: "JKKL SA DE CV",
    stock: "1,000 lt",
    unit: "lt",
  },
  {
    folio: "MP-0007",
    name: "CDF MatMAT",
    brand: "Producción Biológica DFF",
    stock: "1,000 kg",
    unit: "kg",
  },
  {
    folio: "MP-0006",
    name: "CDF Mat",
    brand: "Producción Biológica DFF",
    stock: "15,000 gr",
    unit: "gr",
  },
  {
    folio: "MP-0005",
    name: "CDF BioAgroInds",
    brand: "SAAAAAS sa de cv",
    stock: "34,900 piezas",
    unit: "piezas",
    critical: true,
  },
  {
    folio: "MP-0004",
    name: "Material Insecticida CDF",
    brand: "CDF",
    stock: "100 kg",
    unit: "kg",
  },
  {
    folio: "MP-0003",
    name: "Extracto puro de Neem concentrado (80%)",
    brand: "BioExtracts",
    stock: "50 lt",
    unit: "lt",
  },
];

/* =========================================
   NOTIFICATIONS
   ========================================= */

const notificationItems = [
  {
    id: "appointment-1",
    title: "Cita creada",
    body: "Evento 1 — 2026-10-08 09:00-09:30",
    time: "07-oct, 10:27 a.m.",
  },
  {
    id: "stock-critical",
    title: "Stock por agotarse: CDF BioAgroInds",
    body: "Quedan 34900 piezas de CDF BioAgroInds.",
    time: "07-oct, 09:41 a.m.",
    critical: true,
  },
  {
    id: "stock-2",
    title: "Stock por agotarse: CDF BioAgroInds",
    body: "Quedan 34900 piezas de CDF BioAgroInds.",
    time: "06-oct, 01:03 p.m.",
  },
  {
    id: "stock-3",
    title: "Stock por agotarse: CDF BioAgroInds",
    body: "Quedan 34900 piezas de CDF BioAgroInds.",
    time: "05-oct, 10:28 a.m.",
  },
  {
    id: "stock-4",
    title: "Stock por agotarse: CDF BioAgroInds",
    body: "Quedan 34900 piezas de CDF BioAgroInds.",
    time: "05-oct, 01:14 p.m.",
  },
];

/* =========================================
   SMALL ICONS
   ========================================= */

function EyeIcon() {
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
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

function InfoCircleIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7.2h.01" />
    </svg>
  );
}

function MiniCalendarIcon() {
  return (
    <span
      className="inventory-notification__mini"
      aria-hidden="true"
    >
      ▣
    </span>
  );
}

/* =========================================
   COMPONENT
   ========================================= */

function InventoryMobileScene() {
  const {
    bellPulse,
    drawerOpen,
    highlightAlert,
  } =
    useInventoryMobileTimeline();

  return (
    <div
      className={[
        "inventory-mobile-scene",
        drawerOpen
          ? "inventory-mobile-scene--drawer-open"
          : "",
        highlightAlert
          ? "inventory-mobile-scene--highlight-alert"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ===================================
          CAMERA
          =================================== */}

      <div className="inventory-mobile-scene__camera">
        <div className="inventory-mobile-scene__stage">
          <div className="inventory-phone-showcase">
            <div className="inventory-phone-shell">
              <div className="inventory-phone-shell__speaker" />

              <div className="inventory-phone">
                {/* =========================
                    MOBILE HEADER
                    ========================= */}

                <header className="inventory-mobile-header">
                  <button
                    type="button"
                    className="inventory-mobile-header__icon"
                    aria-label="Menú"
                  >
                    <FenixIcon
                      name="menu"
                      size={17}
                    />
                  </button>

                  <div className="inventory-mobile-header__brand">
                    <img
                      src={fenixLogo}
                      alt="Fénix"
                    />
                  </div>

                  <div className="inventory-mobile-header__right">
                    <strong>
                      User Devy
                    </strong>

                    <button
                      type="button"
                      className={[
                        "inventory-mobile-header__icon",
                        "inventory-mobile-header__icon--bell",
                        bellPulse
                          ? "inventory-mobile-header__icon--pulse"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-label="Notificaciones"
                    >
                      <FenixIcon
                        name="bell"
                        size={16}
                      />

                      <span className="inventory-mobile-header__badge">
                        8
                      </span>
                    </button>

                    <button
                      type="button"
                      className="inventory-mobile-header__icon"
                      aria-label="Ayuda"
                    >
                      <FenixIcon
                        name="help"
                        size={15}
                      />
                    </button>
                  </div>
                </header>

                {/* =========================
                    APP BODY
                    ========================= */}

                <div className="inventory-mobile-app">
                  <div className="inventory-mobile-app__title-row">
                    <div className="inventory-mobile-app__title-wrap">
                      <span className="inventory-mobile-app__back">
                        ←
                      </span>

                      <strong>
                        Inventario de Materia Prima
                      </strong>
                    </div>

                    <span className="inventory-mobile-app__help">
                      ?
                    </span>
                  </div>

                  <div className="inventory-mobile-app__mini-info">
                    <InfoCircleIcon />
                  </div>

                  <div className="inventory-mobile-app__actions">
                    <button
                      type="button"
                      className="inventory-mobile-app__action inventory-mobile-app__action--secondary"
                    >
                      <EyeIcon />
                      <span>Proveedores</span>
                    </button>

                    <button
                      type="button"
                      className="inventory-mobile-app__action"
                    >
                      Agregar nueva MP
                    </button>
                  </div>

                  <div className="inventory-mobile-filters">
                    <button
                      type="button"
                      className="inventory-mobile-filters__pill inventory-mobile-filters__pill--active"
                    >
                      Activas
                    </button>

                    <button
                      type="button"
                      className="inventory-mobile-filters__pill"
                    >
                      Inactivas
                    </button>

                    <button
                      type="button"
                      className="inventory-mobile-filters__pill"
                    >
                      Todas
                    </button>
                  </div>

                  <div className="inventory-mobile-search">
                    Buscar por nombre, marca o proveedor
                  </div>

                  <p className="inventory-mobile-helper">
                    Usa el icono de alerta en cada fila para configurar rápido el stock mínimo de cada materia prima.
                  </p>

                  <div className="inventory-mobile-table-card">
                    <div className="inventory-mobile-table">
                      <div className="inventory-mobile-table__header">
                        <span>Folio</span>
                        <span>Nombre</span>
                        <span>Marca</span>
                        <span>Existencia</span>
                        <span>U/M</span>
                      </div>

                      <div className="inventory-mobile-table__body">
                        {inventoryRows.map((row) => (
                          <div
                            key={row.folio}
                            className={[
                              "inventory-mobile-table__row",
                              row.critical
                                ? "inventory-mobile-table__row--critical"
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            <span>{row.folio}</span>

                            <span>{row.name}</span>

                            <span>{row.brand}</span>

                            <span>
                              {row.critical ? (
                                <b className="inventory-mobile-table__stock-badge">
                                  {row.stock}
                                </b>
                              ) : (
                                row.stock
                              )}
                            </span>

                            <span>{row.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="inventory-mobile-pagination">
                    <button type="button">
                      Anterior
                    </button>

                    <strong>
                      Mostrando 1–8 de 8 | Página 1 de 1
                    </strong>

                    <button type="button">
                      Siguiente
                    </button>
                  </div>
                </div>

                {/* =========================
                    OVERLAY / NOTIFICATIONS
                    ========================= */}

                <div
                  className={[
                    "inventory-mobile-overlay",
                    drawerOpen
                      ? "inventory-mobile-overlay--visible"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />

                <aside
                  className={[
                    "inventory-notifications",
                    drawerOpen
                      ? "inventory-notifications--visible"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="inventory-notifications__header">
                    <strong>
                      Notificaciones
                    </strong>

                    <button
                      type="button"
                      className="inventory-notifications__mark"
                    >
                      ✓ Marcar leídas
                    </button>
                  </div>

                  <div className="inventory-notifications__list">
                    {notificationItems.map((item) => (
                      <article
                        key={item.id}
                        className={[
                          "inventory-notification__item",
                          item.critical
                            ? "inventory-notification__item--critical"
                            : "",
                          highlightAlert &&
                          item.id === "stock-critical"
                            ? "inventory-notification__item--focus"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <div className="inventory-notification__left">
                          <span className="inventory-notification__info">
                            <InfoCircleIcon />
                          </span>
                        </div>

                        <div className="inventory-notification__content">
                          <div className="inventory-notification__title-row">
                            <MiniCalendarIcon />

                            <strong>
                              {item.title}
                            </strong>
                          </div>

                          <p>
                            {item.body}
                          </p>

                          <small>
                            {item.time}
                          </small>
                        </div>

                        <span className="inventory-notification__dot" />
                      </article>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================
          FINAL MESSAGE
          =================================== */}

      <div className="inventory-mobile-scene__message">
        <span>
          Inventario móvil
        </span>

        <strong>
          Anticípate a los faltantes.
          <br />
          Tu inventario, siempre bajo control.
        </strong>
      </div>
    </div>
  );
}

export default InventoryMobileScene;
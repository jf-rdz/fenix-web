function MiniChart({
  newSale = false,
}) {

  const initialPoints = [
    {
      x: 48,
      y: 152,
    },
    {
      x: 120,
      y: 132,
    },
    {
      x: 195,
      y: 118,
    },
    {
      x: 270,
      y: 126,
    },
    {
      x: 345,
      y: 88,
    },
  ];


  const newSalePoints = [
    {
      x: 420,
      y: 64,
    },
    {
      x: 500,
      y: 76,
    },
  ];


  return (
    <div
      className={[
        "mini-chart",

        newSale
          ? "mini-chart--sale-added"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <h3>
        Ventas vs Gastos – Semana actual
      </h3>


      <div className="mini-chart__canvas">

        <svg
          viewBox="0 0 520 210"
          preserveAspectRatio="none"
          role="img"
          aria-label="Gráfica ilustrativa de ventas y gastos de la semana actual"
        >

          {/* ===============================
              GRID
              =============================== */}

          <g className="mini-chart__grid">

            <line
              x1="48"
              y1="20"
              x2="48"
              y2="180"
            />

            <line
              x1="48"
              y1="180"
              x2="500"
              y2="180"
            />

            <line
              x1="48"
              y1="140"
              x2="500"
              y2="140"
            />

            <line
              x1="48"
              y1="100"
              x2="500"
              y2="100"
            />

            <line
              x1="48"
              y1="60"
              x2="500"
              y2="60"
            />

            <line
              x1="48"
              y1="20"
              x2="500"
              y2="20"
            />


            {[
              120,
              195,
              270,
              345,
              420,
              500,
            ].map((x) => (

              <line
                key={x}
                x1={x}
                y1="20"
                x2={x}
                y2="180"
              />

            ))}

          </g>


          {/* ===============================
              Y LABELS
              =============================== */}

          <g className="mini-chart__labels">

            <text
              x="39"
              y="24"
              textAnchor="end"
            >
              600
            </text>

            <text
              x="39"
              y="64"
              textAnchor="end"
            >
              450
            </text>

            <text
              x="39"
              y="104"
              textAnchor="end"
            >
              300
            </text>

            <text
              x="39"
              y="144"
              textAnchor="end"
            >
              150
            </text>

            <text
              x="39"
              y="184"
              textAnchor="end"
            >
              0
            </text>

          </g>


          {/* ===============================
              VENTAS INICIALES
              =============================== */}

          <path
            className="mini-chart__sales"
            pathLength="1"
            d="
              M48 152

              C72 146,
               96 138,
               120 132

              C145 124,
               170 119,
               195 118

              C220 118,
               245 130,
               270 126

              C295 121,
               320 103,
               345 88
            "
          />


          {/* ===============================
              NUEVA VENTA
              =============================== */}

          <path
            className="mini-chart__increment"
            pathLength="1"
            d="
              M345 88

              C372 84,
               395 68,
               420 64

              C446 62,
               474 72,
               500 76
            "
          />


          {/* ===============================
              GASTOS
              =============================== */}

          <path
            className="mini-chart__expenses"
            pathLength="1"
            d="
              M48 166

              C95 163,
               145 160,
               195 164

              C245 168,
               295 154,
               345 158

              C395 160,
               450 150,
               500 154
            "
          />


          {/* ===============================
              PUNTOS INICIALES
              =============================== */}

          {initialPoints.map(
            (point) => (

              <circle
                key={
                  `${point.x}-${point.y}`
                }
                cx={point.x}
                cy={point.y}
                r="3"
                className="mini-chart__point"
              />

            )
          )}


          {/* ===============================
              PUNTOS DE NUEVA VENTA
              =============================== */}

          {newSalePoints.map(
            (point, index) => (

              <circle
                key={
                  `${point.x}-${point.y}`
                }
                cx={point.x}
                cy={point.y}
                r="4"
                className="mini-chart__increment-point"
                style={{
                  "--point-delay":
                    `${index * 150}ms`,
                }}
              />

            )
          )}


          {/* ===============================
              X LABELS
              =============================== */}

          <g className="mini-chart__labels">

            <text
              x="48"
              y="202"
              textAnchor="middle"
            >
              Lun
            </text>

            <text
              x="120"
              y="202"
              textAnchor="middle"
            >
              Mar
            </text>

            <text
              x="195"
              y="202"
              textAnchor="middle"
            >
              Mié
            </text>

            <text
              x="270"
              y="202"
              textAnchor="middle"
            >
              Jue
            </text>

            <text
              x="345"
              y="202"
              textAnchor="middle"
            >
              Vie
            </text>

            <text
              x="420"
              y="202"
              textAnchor="middle"
            >
              Sáb
            </text>

            <text
              x="500"
              y="202"
              textAnchor="middle"
            >
              Dom
            </text>

          </g>

        </svg>


        {/* ===============================
            TOOLTIP
            =============================== */}

        <div className="mini-chart__tooltip">

          <strong>
            {newSale
              ? "Sáb"
              : "Vie"}
          </strong>


          <span>

            ventas :{" "}

            {newSale
              ? "$461.76"
              : "$274.03"}

          </span>


          <span>
            gastos : $86.40
          </span>

        </div>

      </div>

    </div>
  );
}


export default MiniChart;
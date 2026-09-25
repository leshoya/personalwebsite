/**
 * Two original koi circling each other, drawn procedurally along an arc.
 * Each fish's body is built from a curved spine with a tapered width profile.
 */

type Pt = [number, number];

const CX = 200;
const CY = 200;
const R = 112;

const NAVY = "#232a4a";

/** Spine position and unit tangent at t (0 = snout, 1 = tail) for a fish curving around the center. */
function spine(t: number, a0: number, a1: number): { p: Pt; tan: Pt } {
  const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180;
  const r = R + 14 * Math.sin(t * Math.PI);
  const p: Pt = [CX + r * Math.cos(a), CY + r * Math.sin(a)];
  // Numerical tangent in the direction of increasing t (toward the tail)
  const e = 0.001;
  const a2 = ((a0 + (a1 - a0) * (t + e)) * Math.PI) / 180;
  const r2 = R + 14 * Math.sin((t + e) * Math.PI);
  const q: Pt = [CX + r2 * Math.cos(a2), CY + r2 * Math.sin(a2)];
  const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
  return { p, tan: [(q[0] - p[0]) / len, (q[1] - p[1]) / len] };
}

/** Half-width of the body: rounded head, widest behind it, tapering to the tail. */
function halfWidth(t: number) {
  const max = 27;
  if (t < 0.16) return max * Math.sqrt(t / 0.16) * 0.9 + 3;
  return max * (0.12 + 0.88 * Math.pow(1 - (t - 0.16) / 0.84, 1.1));
}

function bodyPath(a0: number, a1: number) {
  const n = 48;
  const left: string[] = [];
  const right: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const { p, tan } = spine(t, a0, a1);
    const w = halfWidth(t);
    const nx = -tan[1];
    const ny = tan[0];
    left.push(`${(p[0] + nx * w).toFixed(1)} ${(p[1] + ny * w).toFixed(1)}`);
    right.push(`${(p[0] - nx * w).toFixed(1)} ${(p[1] - ny * w).toFixed(1)}`);
  }
  return `M${left.join(" L")} L${right.reverse().join(" L")} Z`;
}

/** A leaf-shaped fin with ink stripes, pointing along +x from the origin. */
function Fin({
  at,
  angle,
  length,
  width,
}: {
  at: Pt;
  angle: number;
  length: number;
  width: number;
}) {
  const L = length;
  const W = width;
  const stripes = [-0.55, -0.3, -0.05, 0.2];
  return (
    <g transform={`translate(${at[0]} ${at[1]}) rotate(${angle})`}>
      <path
        d={`M0 0C${L * 0.25} ${-W} ${L * 0.75} ${-W * 0.9} ${L} ${-W * 0.1}C${L * 0.7} ${W * 0.35} ${L * 0.3} ${W * 0.45} 0 0Z`}
        fill="url(#g-fin)"
      />
      {stripes.map((k) => (
        <path
          key={k}
          d={`M${L * 0.12} ${W * k * 0.3}Q${L * 0.5} ${W * k} ${L * 0.9} ${W * (k * 0.25 - 0.08)}`}
          fill="none"
          stroke={NAVY}
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

const deg = (v: Pt) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;

function Fish({
  id,
  a0,
  a1,
  patches,
}: {
  id: string;
  a0: number;
  a1: number;
  patches: { t: number; side: number; r: number; fill: string }[];
}) {
  const body = bodyPath(a0, a1);
  const head = spine(0, a0, a1);
  const pecs = spine(0.24, a0, a1);
  const pelvic = spine(0.55, a0, a1);
  const tail = spine(1, a0, a1);
  const eye = spine(0.07, a0, a1);
  const back = deg(pecs.tan); // direction toward the tail
  const tailDir = deg(tail.tan);
  const n = (s: { tan: Pt }): Pt => [-s.tan[1], s.tan[0]];
  const offset = (s: { p: Pt; tan: Pt }, d: number): Pt => [
    s.p[0] + n(s)[0] * d,
    s.p[1] + n(s)[1] * d,
  ];
  const snout: Pt = [head.p[0] - head.tan[0] * 3, head.p[1] - head.tan[1] * 3];

  return (
    <g>
      <clipPath id={`koi-${id}`}>
        <path d={body} />
      </clipPath>

      {/* Fins sit under the body */}
      <Fin at={offset(pecs, 16)} angle={back + 58} length={60} width={24} />
      <Fin at={offset(pecs, -16)} angle={back - 58} length={60} width={24} />
      <Fin at={offset(pelvic, 8)} angle={back + 40} length={34} width={14} />
      <Fin at={offset(pelvic, -8)} angle={back - 40} length={34} width={14} />
      <Fin at={tail.p} angle={tailDir + 28} length={100} width={34} />
      <Fin at={tail.p} angle={tailDir - 22} length={92} width={30} />

      <path d={body} fill="url(#g-koi)" />
      <g clipPath={`url(#koi-${id})`}>
        {patches.map((pt, i) => {
          const s = spine(pt.t, a0, a1);
          const c = offset(s, pt.side * halfWidth(pt.t) * 0.55);
          return (
            <ellipse
              key={i}
              cx={c[0]}
              cy={c[1]}
              rx={pt.r}
              ry={pt.r * 0.75}
              fill={pt.fill}
              transform={`rotate(${deg(s.tan)} ${c[0]} ${c[1]})`}
            />
          );
        })}
      </g>

      {/* Eyes and whiskers */}
      <circle
        cx={offset(eye, 12)[0]}
        cy={offset(eye, 12)[1]}
        r="2.6"
        fill={NAVY}
      />
      <circle
        cx={offset(eye, -12)[0]}
        cy={offset(eye, -12)[1]}
        r="2.6"
        fill={NAVY}
      />
      {[1, -1].map((side) => {
        const base = offset(head, side * 6);
        const tip: Pt = [
          snout[0] - head.tan[0] * 12 + n(head)[0] * side * 16,
          snout[1] - head.tan[1] * 12 + n(head)[1] * side * 16,
        ];
        return (
          <path
            key={side}
            d={`M${base[0]} ${base[1]}Q${snout[0] - head.tan[0] * 14} ${snout[1] - head.tan[1] * 14} ${tip[0]} ${tip[1]}`}
            fill="none"
            stroke="#fffbf7"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function Ripples({ at }: { at: Pt }) {
  return (
    <g fill="none" stroke="#b6c3f0" strokeOpacity="0.35">
      {[26, 36, 46].map((r) => (
        <circle key={r} cx={at[0]} cy={at[1]} r={r} />
      ))}
    </g>
  );
}

export function KoiPair({ className = "" }: { className?: string }) {
  const A0 = -75;
  const A1 = -205;
  return (
    <svg className={className} viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <linearGradient id="g-koi" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff6ef" />
          <stop offset="100%" stopColor="#d6ddf8" />
        </linearGradient>
        <linearGradient id="g-fin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fde6dc" />
          <stop offset="100%" stopColor="#d6ddf8" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <g className="koi-orbit">
        <Ripples at={spine(0, A0, A1).p} />
        <Ripples at={spine(0, A0 + 180, A1 + 180).p} />
        <Fish
          id="a"
          a0={A0}
          a1={A1}
          patches={[
            { t: 0.18, side: 1, r: 17, fill: "#e8927c" },
            { t: 0.38, side: -0.6, r: 20, fill: NAVY },
            { t: 0.62, side: 0.4, r: 14, fill: "#f4a896" },
          ]}
        />
        <Fish
          id="b"
          a0={A0 + 180}
          a1={A1 + 180}
          patches={[
            { t: 0.12, side: -0.8, r: 12, fill: NAVY },
            { t: 0.32, side: 0.3, r: 22, fill: "#f4a896" },
            { t: 0.5, side: -0.5, r: 13, fill: NAVY },
            { t: 0.7, side: 0.2, r: 12, fill: "#e8927c" },
          ]}
        />
      </g>
    </svg>
  );
}

/**
 * Geometric shapes (rings, records, donuts, dots) composed inside a parent <svg>.
 * Gradients referenced here are defined once in <SvgDefs />.
 */

interface Circle {
  x: number;
  y: number;
  r: number;
}

/** Page-wide gradient definitions shared by every inline SVG. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="g-water" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8f9fdc" />
          <stop offset="100%" stopColor="#d6ddf8" />
        </linearGradient>
        <linearGradient id="g-coral" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8927c" />
          <stop offset="100%" stopColor="#fbcab8" />
        </linearGradient>
        <linearGradient id="g-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7887c8" />
          <stop offset="100%" stopColor="#47548c" />
        </linearGradient>
        <linearGradient id="g-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f2542" />
          <stop offset="100%" stopColor="#151a33" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Nested rings on dark discs, like stacked records seen from above. */
export function RingStack({ x, y, r, stroke = "#b6c3f0" }: Circle & { stroke?: string }) {
  const steps = [1, 0.74, 0.5];
  return (
    <g>
      {steps.map((s, i) => (
        <circle
          key={s}
          cx={x}
          cy={y}
          r={r * s}
          fill={i % 2 === 0 ? "#1c223e" : "#2b3259"}
          stroke={stroke}
          strokeWidth={Math.max(2, r * 0.045)}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.24} fill="url(#g-water)" />
      <circle cx={x} cy={y} r={r * 0.1} fill="#1c223e" />
    </g>
  );
}

/** Point on a circle, angle in degrees. */
function polar(x: number, y: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return `${x + r * Math.cos(a)} ${y + r * Math.sin(a)}`;
}

/** Vinyl record: thick outer ring, fine grooves, gradient label. Spins slowly. */
export function Record({ x, y, r, label = "url(#g-coral)" }: Circle & { label?: string }) {
  const grooves = [0.56, 0.62, 0.68, 0.74, 0.8, 0.86];
  const inner = [0.14, 0.22, 0.3, 0.38];
  const sheen = `M${polar(x, y, r * 0.71, -160)} A${r * 0.71} ${r * 0.71} 0 0 1 ${polar(x, y, r * 0.71, -105)}`;
  return (
    <g className="spin">
      <circle cx={x} cy={y} r={r} fill="#191e38" stroke="url(#g-water)" strokeWidth={r * 0.07} />
      {grooves.map((s) => (
        <circle key={s} cx={x} cy={y} r={r * s} fill="none" stroke="#b6c3f0" strokeOpacity="0.22" />
      ))}
      {/* Light reflection so the rotation reads */}
      <path d={sheen} fill="none" stroke="#fffbf7" strokeOpacity="0.28" strokeWidth={r * 0.2} strokeLinecap="round" />
      <circle cx={x} cy={y} r={r * 0.46} fill={label} />
      {inner.map((s) => (
        <circle key={s} cx={x} cy={y} r={r * s} fill="none" stroke="#fffbf7" strokeOpacity="0.45" />
      ))}
      <circle cx={x + r * 0.3} cy={y - r * 0.1} r={r * 0.035} fill="#fffbf7" fillOpacity="0.8" />
    </g>
  );
}

/** Thick ring. */
export function Donut({ x, y, r, paint = "url(#g-water)" }: Circle & { paint?: string }) {
  return <circle cx={x} cy={y} r={r * 0.72} fill="none" stroke={paint} strokeWidth={r * 0.56} />;
}

/** Thin outline ring with a solid gradient center. */
export function Target({ x, y, r, paint = "url(#g-coral)" }: Circle & { paint?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="none" stroke="#b6c3f0" strokeWidth="2.5" />
      <circle cx={x} cy={y} r={r * 0.36} fill={paint} />
    </g>
  );
}

/* Star pieces from stars.svg (64×64 viewBox), each with its center in that space.
   Sparkles skip the dark outline, which only reads on a light background. */
const STAR_OUTLINE = "#232a4a";
const STAR_PIECES = {
  big: {
    center: [24, 40],
    body: (
      <>
        <polygon
          fill="#a89bdb"
          points="19.64 24.33 19.33 24.26 20.2 20.36 29.03 30.9 42.71 29.6 35.42 41.25 40.88 53.86 38.12 53.17 38.2 52.83 32.95 40.83 38.58 32.11 27.42 33.14 19.64 24.33"
        />
        <polygon
          fill="#e2c7e4"
          points="38.58 32.11 32.95 40.83 38.2 52.83 38.12 53.17 27.55 50.53 17.24 59.62 16.29 45.91 4.46 38.92 17.21 33.78 19.33 24.26 19.64 24.33 27.42 33.14 38.58 32.11"
        />
      </>
    ),
    outline:
      "M42.619 28.6l-13.161 1.25L20.968 19.72a1 1 0 0 0-1.742.425l-2.879 12.9L4.085 37.991a1 1 0 0 0-.135 1.788L15.332 46.5l.912 13.189a1 1 0 0 0 .618.856 1 1 0 0 0 1.041-.175l9.914-8.747 12.826 3.208a1 1 0 0 0 1.16-1.368L36.548 41.336l7.014-11.2a1 1 0 0 0-.943-1.527zM34.573 40.721a1 1 0 0 0-.07.928L39.162 52.4 27.792 49.56a1 1 0 0 0-.9.22L18.1 57.534l-.809-11.692a1 1 0 0 0-.489-.792L6.712 39.088l10.87-4.382a1 1 0 0 0 .6-.71l2.552-11.438 7.527 8.983a.992.992 0 0 0 .861.354l11.667-1.108z",
  },
  small: {
    center: [43.5, 13.5],
    body: (
      <polygon
        fill="url(#g-coral)"
        points="52.67 11.79 47.7 16 48.35 22.49 42.81 19.06 36.84 21.69 38.39 15.36 34.04 10.5 40.54 10.01 43.82 4.38 46.3 10.41 52.67 11.79"
      />
    ),
    outline:
      "M53.314 12.549a1 1 0 0 0-.434-1.74L47.023 9.54 44.749 4a1 1 0 0 0-1.789-.124L39.943 9.05l-5.974.45a1 1 0 0 0-.671 1.663l3.992 4.469-1.418 5.822a1 1 0 0 0 1.375 1.151l5.482-2.415 5.1 3.148a1 1 0 0 0 1.521-.952l-.6-5.961zM47.052 15.24a1 1 0 0 0-.349.863l.452 4.469-3.822-2.36a1 1 0 0 0-.929-.064L38.3 19.958 39.357 15.6a1 1 0 0 0-.225-.9l-2.992-3.35L40.618 11a1 1 0 0 0 .789-.493L43.668 6.63l1.7 4.155a1 1 0 0 0 .713.6l4.39.951z",
  },
  sparkle: {
    center: [7.43, 14.69],
    body: (
      <path
        fill="#fffbf7"
        d="M11.78,14.69a4.607,4.607,0,0,0-4.34,4.85,4.616,4.616,0,0,0-4.36-4.85A4.618,4.618,0,0,0,7.43,9.83,4.624,4.624,0,0,0,11.78,14.69Z"
      />
    ),
  },
} as const;

type StarKind = keyof typeof STAR_PIECES;

function StarPiece({ kind }: { kind: StarKind }) {
  const piece = STAR_PIECES[kind];
  return (
    <g>
      {piece.body}
      {"outline" in piece && <path fill={STAR_OUTLINE} d={piece.outline} />}
    </g>
  );
}

/** A single star centered on (x, y); `size` is its scale relative to the 64-unit source art. */
export function Star({ x, y, kind, size = 1, rotate = 0 }: { x: number; y: number; kind: StarKind; size?: number; rotate?: number }) {
  const [cx, cy] = STAR_PIECES[kind].center;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size}) translate(${-cx} ${-cy})`}>
      <StarPiece kind={kind} />
    </g>
  );
}

/** The full stars.svg group: big star, small star, and two sparkles, centered on (x, y). */
export function StarCluster({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  const [sx, sy] = STAR_PIECES.sparkle.center;
  return (
    <g transform={`translate(${x} ${y}) scale(${size}) translate(-32 -32)`}>
      <StarPiece kind="big" />
      <StarPiece kind="small" />
      <StarPiece kind="sparkle" />
      <g transform={`translate(55.76 37.15) scale(1.1) translate(${-sx} ${-sy})`}>
        <StarPiece kind="sparkle" />
      </g>
    </g>
  );
}

/** Grid of small dots. */
export function Dots({
  x,
  y,
  cols = 3,
  rows = 1,
  gap = 18,
  size = 4.5,
  fill = "#b6c3f0",
}: {
  x: number;
  y: number;
  cols?: number;
  rows?: number;
  gap?: number;
  size?: number;
  fill?: string;
}) {
  const dots = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      dots.push(<circle key={`${i}-${j}`} cx={x + i * gap} cy={y + j * gap} r={size} fill={fill} />);
    }
  }
  return <g>{dots}</g>;
}

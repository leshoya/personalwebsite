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
          <stop offset="0%" stopColor="#7eb8c9" />
          <stop offset="100%" stopColor="#c5dfea" />
        </linearGradient>
        <linearGradient id="g-coral" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8927c" />
          <stop offset="100%" stopColor="#fbcab8" />
        </linearGradient>
        <linearGradient id="g-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6a98ad" />
          <stop offset="100%" stopColor="#3e6477" />
        </linearGradient>
        <linearGradient id="g-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2c38" />
          <stop offset="100%" stopColor="#122029" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Nested rings on dark discs, like stacked records seen from above. */
export function RingStack({ x, y, r, stroke = "#a8cfe0" }: Circle & { stroke?: string }) {
  const steps = [1, 0.74, 0.5];
  return (
    <g>
      {steps.map((s, i) => (
        <circle
          key={s}
          cx={x}
          cy={y}
          r={r * s}
          fill={i % 2 === 0 ? "#172732" : "#243a48"}
          stroke={stroke}
          strokeWidth={Math.max(2, r * 0.045)}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.24} fill="url(#g-water)" />
      <circle cx={x} cy={y} r={r * 0.1} fill="#172732" />
    </g>
  );
}

/** Vinyl record: thick outer ring, fine grooves, gradient label. */
export function Record({ x, y, r, label = "url(#g-coral)" }: Circle & { label?: string }) {
  const grooves = [0.56, 0.62, 0.68, 0.74, 0.8, 0.86];
  const inner = [0.14, 0.22, 0.3, 0.38];
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#16242e" stroke="url(#g-water)" strokeWidth={r * 0.07} />
      {grooves.map((s) => (
        <circle key={s} cx={x} cy={y} r={r * s} fill="none" stroke="#a8cfe0" strokeOpacity="0.22" />
      ))}
      <circle cx={x} cy={y} r={r * 0.46} fill={label} />
      {inner.map((s) => (
        <circle key={s} cx={x} cy={y} r={r * s} fill="none" stroke="#fffbf7" strokeOpacity="0.45" />
      ))}
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
      <circle cx={x} cy={y} r={r} fill="none" stroke="#a8cfe0" strokeWidth="2.5" />
      <circle cx={x} cy={y} r={r * 0.36} fill={paint} />
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
  fill = "#a8cfe0",
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

/** Ring-and-dot logo mark. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={`mark ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="12" cy="12" r="4.5" fill="#f4a896" />
    </svg>
  );
}

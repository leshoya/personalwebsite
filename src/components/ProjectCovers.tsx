/**
 * Card covers for the featured projects: each is a miniature of the real product UI,
 * drawn in a 340×200 viewBox and framed as an app window.
 */
import type { ReactNode } from "react";

type Pt = readonly [number, number];

const line = (pts: readonly Pt[]) => pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L");

/** App window: rounded frame with a title bar, three dots, and an optional address pill. */
function Window({ fill, bar, url, children }: { fill: string; bar: string; url?: string; children: ReactNode }) {
  return (
    <g>
      <rect x="12" y="10" width="316" height="180" rx="8" fill={fill} />
      <path d="M12 18a8 8 0 0 1 8-8h300a8 8 0 0 1 8 8v4H12z" fill={bar} />
      <circle cx="21" cy="16" r="2" fill="#f4a896" />
      <circle cx="28" cy="16" r="2" fill="#b6c3f0" />
      <circle cx="35" cy="16" r="2" fill="#b6c3f0" />
      {url && (
        <>
          <rect x="140" y="12.5" width="60" height="7" rx="3.5" fill="#fffbf7" fillOpacity="0.14" />
          <text x="170" y="17.6" textAnchor="middle" fontSize="4.2" fill="#fffbf7" fillOpacity="0.8">
            {url}
          </text>
        </>
      )}
      {children}
    </g>
  );
}

/* ─── Mutual Fund Decision Platform ─── */

/** Deterministic pseudo-random numbers so the chart is identical on every render. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

const FAN = (() => {
  const rand = seeded(11);
  const steps = 20;
  const [x0, x1, yBase, scale] = [44, 210, 164, 46];
  // Compounding growth with random annual returns, so the paths fan out over time
  const runs = Array.from({ length: 40 }, () => {
    let v = 1;
    return Array.from({ length: steps + 1 }, (_, i): Pt => {
      if (i > 0) v *= 1 + 0.04 + (rand() - 0.5) * 0.16;
      return [x0 + ((x1 - x0) * i) / steps, yBase - (v - 1) * scale];
    });
  });
  const series = (q: number) =>
    Array.from({ length: steps + 1 }, (_, i): Pt => {
      const ys = runs.map((r) => r[i][1]).sort((a, b) => a - b);
      return [runs[0][i][0], ys[Math.round(q * (ys.length - 1))]];
    });
  // Smaller y is a higher value, so the 90th percentile sits at the low quantile of y
  const p90 = series(0.1);
  const p10 = series(0.9);
  const median = series(0.5);
  return {
    runs: runs.map((r) => `M${line(r)}`),
    band: `M${line(p90)}L${line([...p10].reverse())}Z`,
    median: `M${line(median)}`,
    medianEnd: median[steps],
    best: `M${line(series(0))}`,
    worst: `M${line(series(1))}`,
  };
})();

function Stat({ x, y, label, value, size = 6 }: { x: number; y: number; label: string; value: string; size?: number }) {
  return (
    <g textAnchor="middle">
      <text x={x} y={y} fontSize="3.6" fontWeight="700" letterSpacing="0.3" fill="#b6c3f0">
        {label}
      </text>
      <text x={x} y={y + 8} fontSize={size} fontWeight="600" fill="#fffbf7">
        {value}
      </text>
    </g>
  );
}

function MutualFundCover() {
  const tabs = [
    { label: "SINGLE FUND", w: 34 },
    { label: "COMPARE", w: 26 },
    { label: "AI OPTIMIZER", w: 36 },
    { label: "HISTORY", w: 25 },
  ];
  let tx = 22;
  const panel = { fill: "#1c223e", stroke: "#b6c3f0", strokeOpacity: 0.18 };
  return (
    <Window fill="#151a33" bar="#232a4a" url="fund-simulator">
      {/* Active-tab highlights swap in step with the two views below */}
      <rect className="mf-swap" x="22" y="28" width="34" height="10" rx="2" fill="#47548c" />
      <rect className="mf-swap mf-swap--late" x="90" y="28" width="36" height="10" rx="2" fill="#47548c" />
      {tabs.map((t) => {
        const x = tx;
        tx += t.w + 4;
        return (
          <g key={t.label}>
            <rect
              x={x}
              y="28"
              width={t.w}
              height="10"
              rx="2"
              fill="none"
              stroke="#b6c3f0"
              strokeOpacity="0.35"
              strokeWidth="0.6"
            />
            <text x={x + t.w / 2} y="34.6" textAnchor="middle" fontSize="3.8" fontWeight="700" fill="#fffbf7">
              {t.label}
            </text>
          </g>
        );
      })}

      {/* View 1: single-fund Monte Carlo simulation */}
      <g className="mf-swap">
      {/* Simulated paths chart */}
      <rect x="22" y="44" width="196" height="138" rx="4" {...panel} strokeWidth="0.6" />
      <text x="28" y="53" fontSize="4.4" fontWeight="700" letterSpacing="0.3" fill="#fffbf7">
        SIMULATED PATHS
      </text>
      <g fontSize="3.4" fill="#fffbf7" fillOpacity="0.75">
        <path d="M150 50.5h7" stroke="#f4a896" strokeWidth="1.2" />
        <text x="159" y="51.8">Median</text>
        <rect x="178" y="48.7" width="6" height="3.6" fill="#e6ebfb" fillOpacity="0.3" />
        <text x="186" y="51.8">P10–P90</text>
      </g>
      <g stroke="#e6ebfb" strokeOpacity="0.12" strokeWidth="0.6">
        {[80, 108, 136, 164].map((y) => (
          <line key={y} x1="44" x2="210" y1={y} y2={y} />
        ))}
      </g>
      <g fontSize="3.6" fill="#b6c3f0" textAnchor="end">
        {["$150k", "$100k", "$50k", "$0"].map((l, i) => (
          <text key={l} x="40" y={81 + i * 28}>
            {l}
          </text>
        ))}
      </g>
      <g fontSize="3.6" fill="#b6c3f0" textAnchor="middle">
        {[0, 2, 4, 6, 8, 10].map((yr) => (
          <text key={yr} x={44 + yr * 16.6} y="172">
            {yr}
          </text>
        ))}
      </g>
      <g fill="none" stroke="#e6ebfb" strokeOpacity="0.13" strokeWidth="0.5">
        {FAN.runs.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path className="mf-fade" d={FAN.band} fill="#e6ebfb" fillOpacity="0.16" />
      <g fill="none" stroke="#fbcab8" strokeOpacity="0.75" strokeWidth="0.7" strokeDasharray="2 2">
        <path d={FAN.best} />
        <path d={FAN.worst} />
      </g>
      <path
        className="mf-draw"
        d={FAN.median}
        pathLength={100}
        fill="none"
        stroke="#f4a896"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle className="ping" cx={FAN.medianEnd[0]} cy={FAN.medianEnd[1]} r="5" fill="#f4a896" />
      <circle cx={FAN.medianEnd[0]} cy={FAN.medianEnd[1]} r="2" fill="#fffbf7" stroke="#f4a896" strokeWidth="1" />

      {/* Results panel */}
      <rect x="224" y="44" width="94" height="138" rx="4" {...panel} strokeWidth="0.6" />
      <text x="271" y="54" textAnchor="middle" fontSize="3.6" fontWeight="700" letterSpacing="0.3" fill="#b6c3f0">
        PROJECTED FUTURE VALUE
      </text>
      <text x="271" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fffbf7">
        $110,531
      </text>
      <g stroke="#b6c3f0" strokeOpacity="0.2" strokeWidth="0.6">
        <line x1="230" x2="312" y1="75" y2="75" />
        <line x1="230" x2="312" y1="96" y2="96" />
        <line x1="230" x2="312" y1="117" y2="117" />
      </g>
      <Stat x={240} y={83} label="RETURNS" value="58%" />
      <Stat x={271} y={83} label="BETA" value="1.00" />
      <Stat x={302} y={83} label="RATE" value="8.3%" />
      <Stat x={248} y={104} label="TOP 10%" value="$160,336" size={5.4} />
      <Stat x={294} y={104} label="BOTTOM 10%" value="$76,081" size={5.4} />

      {/* Fund inputs */}
      <text x="230" y="126" fontSize="3.6" fontWeight="700" letterSpacing="0.3" fill="#b6c3f0">
        FUND A
      </text>
      <rect x="230" y="128.5" width="82" height="9" rx="1.5" fill="#151a33" stroke="#b6c3f0" strokeOpacity="0.35" strokeWidth="0.5" />
      <text x="233" y="134.4" fontSize="3.8" fill="#fffbf7">
        Vanguard 500 (VFIAX) · β 1.00
      </text>
      {(
        [
          ["INITIAL", "$10,000", 230],
          ["ANNUAL", "$6,000", 258],
          ["YEARS", "10", 286],
        ] as const
      ).map(([label, value, x]) => (
        <g key={label}>
          <text x={x} y="145" fontSize="3.4" fontWeight="700" letterSpacing="0.3" fill="#b6c3f0">
            {label}
          </text>
          <rect x={x} y="147.5" width="26" height="9" rx="1.5" fill="#151a33" stroke="#b6c3f0" strokeOpacity="0.35" strokeWidth="0.5" />
          <text x={x + 3} y="153.4" fontSize="3.8" fill="#fffbf7">
            {value}
          </text>
        </g>
      ))}
      <rect x="232" y="167" width="78" height="9" rx="2" fill="#8f9fdc" />
      <text x="271" y="173" textAnchor="middle" fontSize="3.8" fontWeight="700" letterSpacing="0.3" fill="#151a33">
        DOWNLOAD SIMULATION CSV
      </text>
      </g>

      {/* View 2: AI optimizer */}
      <g className="mf-swap mf-swap--late">
        <rect x="22" y="44" width="296" height="26" rx="4" {...panel} strokeWidth="0.6" />
        <rect x="28" y="50" width="14" height="14" rx="3" fill="none" stroke="#8f9fdc" strokeWidth="0.9" />
        <path d="M32 60l6-6m-4 0h4v4" fill="none" stroke="#8f9fdc" strokeWidth="0.9" strokeLinecap="round" />
        <text x="48" y="53.5" fontSize="3.4" fontWeight="700" letterSpacing="0.3" fill="#b6c3f0">
          PORTFOLIO PERSONALITY
        </text>
        <text x="48" y="60.5" fontSize="6" fontWeight="700" fill="#fffbf7">
          Focused Growth Seeker
        </text>
        <rect x="48" y="63.5" width="200" height="2.4" rx="1.2" fill="#b6c3f0" fillOpacity="0.3" />

        {/* AI optimized vs. baselines */}
        <rect x="22" y="74" width="190" height="108" rx="4" {...panel} strokeWidth="0.6" />
        <text x="28" y="83" fontSize="3.8" fontWeight="700" letterSpacing="0.3" fill="#fffbf7">
          AI OPTIMIZED VS. BASELINES
        </text>
        <g stroke="#e6ebfb" strokeOpacity="0.12" strokeWidth="0.6">
          {[96, 118, 140, 162].map((y) => (
            <line key={y} x1="44" x2="204" y1={y} y2={y} />
          ))}
        </g>
        <g fontSize="3.4" fill="#b6c3f0" textAnchor="end">
          {["$16k", "$14k", "$12k", "$10k"].map((l, i) => (
            <text key={l} x="40" y={97 + i * 22}>
              {l}
            </text>
          ))}
        </g>
        <g fontSize="3.4" fill="#b6c3f0" textAnchor="middle">
          {[0, 1, 2, 3, 4, 5].map((yr) => (
            <text key={yr} x={44 + yr * 32} y="170">
              {yr}
            </text>
          ))}
        </g>
        <path d="M44 162L204 124L204 144Z" fill="#8f9fdc" fillOpacity="0.3" />
        <g fill="none" strokeWidth="1.1">
          <path className="mf-draw mf-draw--late" pathLength={100} d="M44 162L204 98" stroke="#fffbf7" strokeOpacity="0.8" />
          <path className="mf-draw mf-draw--late" pathLength={100} d="M44 162L204 140" stroke="#b6c3f0" />
          <path className="mf-draw mf-draw--late" pathLength={100} d="M44 162L204 134" stroke="#f4a896" strokeWidth="1.6" />
        </g>
        <g fontSize="3.4" fill="#fffbf7" fillOpacity="0.85">
          <path d="M50 90h6" stroke="#f4a896" strokeWidth="1.2" />
          <text x="58" y="91.2">AI Optimized</text>
          <path d="M84 90h6" stroke="#b6c3f0" />
          <text x="92" y="91.2">Equal Weight</text>
          <path d="M118 90h6" stroke="#fffbf7" />
          <text x="126" y="91.2">S&amp;P 500</text>
        </g>
        <text x="28" y="178" fontSize="3.4" fill="#b6c3f0">
          AI edge vs. equal weight:{" "}
          <tspan fill="#f4a896" fontWeight="700">
            +$52
          </tspan>
        </text>

        {/* Allocation */}
        <rect x="218" y="74" width="100" height="50" rx="4" {...panel} strokeWidth="0.6" />
        <text x="268" y="83" textAnchor="middle" fontSize="3.6" fontWeight="700" letterSpacing="0.3" fill="#b6c3f0">
          ALLOCATION
        </text>
        <circle cx="244" cy="103" r="11" fill="none" stroke="#47548c" strokeWidth="6" />
        <circle
          className="mf-ring"
          cx="244"
          cy="103"
          r="11"
          fill="none"
          stroke="#8f9fdc"
          strokeWidth="6"
          pathLength={100}
          strokeDasharray="50 100"
          transform="rotate(-90 244 103)"
        />
        <g fontSize="3.8" fill="#fffbf7">
          <circle cx="263" cy="98" r="1.6" fill="#8f9fdc" />
          <text x="267" y="99.3">PRMTX 50%</text>
          <circle cx="263" cy="106" r="1.6" fill="#47548c" />
          <text x="267" y="107.3">FCNTX 50%</text>
        </g>

        {/* Expected returns */}
        <rect x="218" y="128" width="100" height="54" rx="4" {...panel} strokeWidth="0.6" />
        <text x="224" y="137" fontSize="3.6" fontWeight="700" letterSpacing="0.3" fill="#b6c3f0">
          EXPECTED RETURNS
        </text>
        <text x="312" y="137" textAnchor="end" fontSize="3.6" fontWeight="700" fill="#fffbf7">
          3.29% – 7.51%
        </text>
        <rect x="224" y="141" width="88" height="3" rx="1.5" fill="#47548c" />
        <rect className="mf-grow" x="224" y="141" width="62" height="3" rx="1.5" fill="#8f9fdc" />
        <Stat x={244} y={153} label="CONSERVATIVE" value="$11,756" size={5.4} />
        <Stat x={292} y={153} label="OPTIMISTIC" value="$14,364" size={5.4} />
        <rect x="224" y="168" width="88" height="9" rx="1.5" fill="#f4a896" fillOpacity="0.15" stroke="#f4a896" strokeOpacity="0.6" strokeWidth="0.5" />
        <text x="227" y="173.8" fontSize="3.4" fill="#fbcab8">
          ⚠ Concentrated: consider diversifying
        </text>
      </g>
    </Window>
  );
}

/* ─── eMerge AI ─── */

const voice = [3, 6, 10, 5, 12, 8, 4, 9, 14, 7, 5, 10, 6, 3];
const rubric = [
  { label: "Structure (STAR)", score: 92 },
  { label: "Clarity", score: 88 },
  { label: "Impact", score: 95 },
  { label: "Delivery", score: 84 },
];

function EmergeCover() {
  return (
    <Window fill="#fffbf7" bar="#232a4a" url="emergeai.us">
      <defs>
        <linearGradient id="em-video" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#47548c" />
          <stop offset="100%" stopColor="#1c223e" />
        </linearGradient>
      </defs>

      {/* Interview question */}
      <rect x="22" y="28" width="128" height="13" rx="3" fill="#fbe9e2" />
      <text x="26" y="36.4" fontSize="4.4" fontWeight="600" fill="#232a4a">
        <tspan fontWeight="800" fill="#e8927c">
          Q3
        </tspan>{" "}
        Tell me about a time you led a team.
      </text>

      {/* Live video tile */}
      <rect x="22" y="45" width="128" height="74" rx="5" fill="url(#em-video)" />
      <circle cx="86" cy="74" r="11" fill="#8f9fdc" />
      <path d="M62 119a24 22 0 0 1 48 0z" fill="#8f9fdc" />
      <rect x="27" y="50" width="22" height="8" rx="4" fill="#e8927c" />
      <circle className="blink" cx="31.5" cy="54" r="1.6" fill="#fffbf7" />
      <text x="35" y="55.6" fontSize="4.2" fontWeight="800" fill="#fffbf7">
        LIVE
      </text>
      <text x="145" y="55.6" textAnchor="end" fontSize="4.2" fontWeight="600" fill="#fffbf7" fillOpacity="0.85">
        02:14
      </text>
      <g fill="#fbcab8">
        {voice.map((h, i) => (
          <rect
            key={i}
            className="wave-bar"
            style={{ animationDelay: `${-i * 0.11}s` }}
            x={102 + i * 3.2}
            y={108 - h / 2}
            width="1.8"
            height={h}
            rx="0.9"
          />
        ))}
      </g>

      {/* Live transcript */}
      <text x="22" y="129" fontSize="3.8" fontWeight="800" letterSpacing="0.3" fill="#e8927c">
        LIVE TRANSCRIPT
      </text>
      {/* Lines "type" in one after another */}
      <g fill="#dde2f0">
        {[
          [22, 133, 122],
          [22, 140, 40],
          [100, 140, 44],
          [22, 147, 110],
          [22, 154, 68],
        ].map(([x, y, w], i) => (
          <rect key={i} className="em-type" style={{ animationDelay: `${i * 0.45}s` }} x={x} y={y} width={w} height="3.4" rx="1.7" />
        ))}
      </g>
      <g className="em-pop">
        <rect x="64" y="139" width="34" height="5.4" rx="1.5" fill="#f4a896" fillOpacity="0.55" />
        <text x="66" y="142.9" fontSize="3.4" fontWeight="700" fill="#232a4a">
          led a team of five
        </text>
      </g>
      <rect x="22" y="164" width="52" height="12" rx="6" fill="#232a4a" />
      <text x="48" y="171.3" textAnchor="middle" fontSize="4" fontWeight="700" fill="#fffbf7">
        Next question →
      </text>

      {/* AI feedback panel */}
      <rect x="157" y="28" width="161" height="154" rx="5" fill="#f7f4f1" stroke="#dde2f0" strokeWidth="0.7" />
      <text x="165" y="39" fontSize="4.4" fontWeight="800" letterSpacing="0.3" fill="#232a4a">
        AI FEEDBACK
      </text>
      <text x="310" y="39" textAnchor="end" fontSize="3.8" fill="#525a78">
        Behavioral · STAR
      </text>

      <circle cx="181" cy="61" r="13" fill="none" stroke="#e6ebfb" strokeWidth="4.5" />
      <circle
        cx="181"
        cy="61"
        r="13"
        fill="none"
        stroke="#e8927c"
        strokeWidth="4.5"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="92 100"
        className="em-ring"
        transform="rotate(-90 181 61)"
      />
      <text x="181" y="64" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#232a4a">
        92
      </text>
      <text x="201" y="58" fontSize="5.6" fontWeight="800" fill="#232a4a">
        Strong answer
      </text>
      <text x="201" y="65.5" fontSize="3.8" fill="#525a78">
        Structure, clarity, and delivery
      </text>

      {rubric.map((r, i) => {
        const y = 86 + i * 13;
        return (
          <g key={r.label}>
            <text x="165" y={y} fontSize="4.2" fontWeight="600" fill="#232a4a">
              {r.label}
            </text>
            <text x="310" y={y} textAnchor="end" fontSize="4.2" fontWeight="800" fill="#232a4a">
              {r.score}
            </text>
            <rect x="165" y={y + 2.5} width="145" height="3.4" rx="1.7" fill="#e6ebfb" />
            <rect
              className="em-grow"
              style={{ animationDelay: `${0.3 + i * 0.2}s` }}
              x="165"
              y={y + 2.5}
              width={(145 * r.score) / 100}
              height="3.4"
              rx="1.7"
              fill={i % 2 === 0 ? "#e8927c" : "#8f9fdc"}
            />
          </g>
        );
      })}

      <rect x="165" y="140" width="145" height="34" rx="4" fill="#fbe9e2" />
      <circle cx="173" cy="149" r="4" fill="#e8927c" />
      <text x="173" y="150.6" textAnchor="middle" fontSize="5" fontWeight="800" fill="#fffbf7">
        ✦
      </text>
      <text x="180" y="150.5" fontSize="4" fontWeight="800" letterSpacing="0.3" fill="#e8927c">
        COACHING TIP
      </text>
      <g fill="#f4a896" fillOpacity="0.55">
        <rect x="170" y="157" width="132" height="3.2" rx="1.6" />
        <rect x="170" y="163" width="104" height="3.2" rx="1.6" />
      </g>
    </Window>
  );
}

/* ─── JamFusion ─── */

const palette = [
  { glyph: "∿", label: "Bass" },
  { glyph: "◉", label: "Drum" },
  { glyph: "♪", label: "Melody" },
  { glyph: "◆", label: "Genre" },
  { glyph: "♫", label: "Chord" },
  { glyph: "●", label: "Vocal" },
  { glyph: "✦", label: "FX" },
  { glyph: "▦", label: "Synth" },
];

const nodes = [
  { label: "Bassline", glyph: "∿", x: 206, y: 50 },
  { label: "Drum", glyph: "◉", x: 130, y: 98 },
  { label: "Genre", glyph: "◆", x: 206, y: 98 },
  { label: "Melody", glyph: "♪", x: 282, y: 98 },
  { label: "Chord", glyph: "♫", x: 206, y: 148 },
  { label: "Vocal", glyph: "●", x: 282, y: 148 },
];

const edges = [
  "M206 61V74H130V87",
  "M206 61V87",
  "M206 61V74H282V87",
  "M130 109V122H206V137",
  "M206 109V137",
  "M282 109V137",
];

function JamFusionCover() {
  return (
    <Window fill="#151a33" bar="#232a4a" url="jamfusion">
      <defs>
        <pattern id="jam-grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.6" fill="#b6c3f0" fillOpacity="0.25" />
        </pattern>
      </defs>

      {/* Element palette sidebar */}
      <rect x="12" y="22" width="76" height="168" fill="#1c223e" />
      <text x="19" y="33" fontSize="4.2" fontWeight="800" letterSpacing="0.3" fill="#8f9fdc">
        DRAG &amp; DROP
      </text>
      {palette.map((p, i) => {
        const x = 18 + (i % 2) * 34;
        const y = 38 + Math.floor(i / 2) * 22;
        return (
          <g key={p.label}>
            <rect x={x} y={y} width="30" height="18" rx="3" fill="#232a4a" stroke="#b6c3f0" strokeOpacity="0.2" strokeWidth="0.6" />
            <text x={x + 15} y={y + 8} textAnchor="middle" fontSize="5" fill="#f4a896">
              {p.glyph}
            </text>
            <text x={x + 15} y={y + 14.5} textAnchor="middle" fontSize="3.8" fontWeight="700" fill="#fffbf7">
              {p.label}
            </text>
          </g>
        );
      })}
      <rect x="18" y="130" width="64" height="52" rx="4" fill="#2b3259" stroke="#8f9fdc" strokeOpacity="0.5" strokeWidth="0.6" />
      <circle cx="27" cy="140" r="5" fill="#8f9fdc" />
      <text x="27" y="141.8" textAnchor="middle" fontSize="5" fill="#fffbf7">
        ✦
      </text>
      <text x="35" y="139" fontSize="4.2" fontWeight="800" fill="#fffbf7">
        AI Producer
      </text>
      <text x="35" y="144.5" fontSize="3.4" fill="#b6c3f0">
        listening…
      </text>
      <g fill="#8f9fdc">
        {[4, 7, 11, 6, 9, 5, 12, 8, 4, 7, 10, 5, 3].map((h, i) => (
          <rect
            key={i}
            className="wave-bar"
            style={{ animationDelay: `${-i * 0.09}s` }}
            x={23 + i * 4.2}
            y={160 - h / 2}
            width="2"
            height={h}
            rx="1"
          />
        ))}
      </g>
      <text x="23" y="176" fontSize="3.4" fill="#fbcab8">
        “add an Afrobeat djembe”
      </text>

      {/* Composition canvas */}
      <rect x="88" y="22" width="240" height="168" fill="url(#jam-grid)" />
      <rect className="jam-glow" x="276" y="28" width="44" height="11" rx="5.5" fill="#e8927c" />
      <text x="298" y="35.2" textAnchor="middle" fontSize="4.2" fontWeight="800" fill="#151a33">
        ▶ Generate
      </text>
      <g fill="none" stroke="#8f9fdc" strokeWidth="1.1">
        {edges.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="flow-pulse" fill="none" stroke="#fbcab8" strokeWidth="1.2" strokeLinecap="round">
        {edges.map((d) => (
          <path key={d} d={d} pathLength={100} />
        ))}
      </g>
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 27} y={n.y - 11} width="54" height="22" rx="5" fill="#2b3259" stroke="#8f9fdc" strokeWidth="0.9" />
          <circle cx={n.x - 16} cy={n.y} r="6" fill="#1c223e" />
          <text x={n.x - 16} y={n.y + 2} textAnchor="middle" fontSize="6" fill="#f4a896">
            {n.glyph}
          </text>
          <text x={n.x - 7} y={n.y + 2.2} fontSize="6" fontWeight="700" fill="#fffbf7">
            {n.label}
          </text>
          <circle cx={n.x} cy={n.y - 11} r="1.6" fill="#b6c3f0" />
          <circle cx={n.x} cy={n.y + 11} r="1.6" fill="#b6c3f0" />
        </g>
      ))}
      {/* A Synth chip is dragged from the palette and lands as a new node under Drum */}
      <g className="jam-drop">
        <path d="M130 109V137" fill="none" stroke="#8f9fdc" strokeWidth="1.1" />
        <rect x="103" y="137" width="54" height="22" rx="5" fill="#2b3259" stroke="#f4a896" strokeWidth="1.1" />
        <circle cx="114" cy="148" r="6" fill="#1c223e" />
        <text x="114" y="150" textAnchor="middle" fontSize="6" fill="#f4a896">
          ▦
        </text>
        <text x="123" y="150.2" fontSize="6" fontWeight="700" fill="#fffbf7">
          Synth
        </text>
      </g>
      <g className="jam-drag">
        <rect x="52" y="104" width="30" height="18" rx="3" fill="#47548c" stroke="#f4a896" strokeWidth="0.8" />
        <text x="67" y="112" textAnchor="middle" fontSize="5" fill="#f4a896">
          ▦
        </text>
        <text x="67" y="118.5" textAnchor="middle" fontSize="3.8" fontWeight="700" fill="#fffbf7">
          Synth
        </text>
        <path d="M76 116l0 9 2.4-2.2 1.8 3.8 1.6-.8-1.8-3.6 3.2-.4z" fill="#fffbf7" stroke="#151a33" strokeWidth="0.5" />
      </g>
      <rect x="96" y="166" width="70" height="16" rx="4" fill="#2b3259" stroke="#e8927c" strokeOpacity="0.7" strokeWidth="0.7" />
      <text x="101" y="172.5" fontSize="3.6" fontWeight="800" fill="#f4a896">
        TIP
      </text>
      <text x="101" y="178.2" fontSize="3.6" fill="#fffbf7">
        Hip-Hop + Afrobeat djembe
      </text>
    </Window>
  );
}

/** Covers keyed by project id; projects without one fall back to the generic shape compositions. */
export const projectCovers: Record<string, () => ReactNode> = {
  "mutual-fund": MutualFundCover,
  "emerge-ai": EmergeCover,
  jamfusion: JamFusionCover,
};

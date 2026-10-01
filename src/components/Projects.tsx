import type { CSSProperties } from "react";
import { projects } from "../data/content";
import type { Project } from "../data/content";
import { publicPath } from "../lib/publicPath";
import { Section } from "./Section";
import { Donut, Dots, Record, RingStack, Star, StarCluster, Target } from "./Shapes";

/** A different shape composition for each featured project's cover. */
const covers = [
  () => (
    <>
      <Record x={250} y={110} r={120} />
      <Donut x={70} y={50} r={34} paint="url(#g-coral)" />
      <Dots x={40} y={160} cols={3} />
    </>
  ),
  () => (
    <>
      <RingStack x={100} y={210} r={115} />
      <RingStack x={235} y={210} r={115} stroke="#fbcab8" />
      <Target x={300} y={50} r={30} />
      <Dots x={36} y={36} cols={2} rows={2} />
    </>
  ),
  () => (
    <>
      <Donut x={110} y={105} r={80} />
      <Target x={265} y={120} r={58} />
      <Dots x={270} y={26} cols={3} fill="#f4a896" />
    </>
  ),
];

/** Background decor kept to the margins and the space beside the heading, clear of the cards. */
function ProjectsArt() {
  return (
    <svg
      className="panel__art"
      viewBox="0 0 1200 1600"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <circle cx="1210" cy="1540" r="120" fill="none" stroke="#b6c3f0" strokeWidth="2.5" />
      <Donut x={-10} y={1590} r={70} paint="url(#g-coral)" />
      <RingStack x={-30} y={60} r={70} stroke="#fbcab8" />
      <Dots x={30} y={420} cols={1} rows={3} gap={16} />
      <Dots x={1120} y={1180} cols={2} rows={2} />

      <g className="float float--alt">
        <StarCluster x={960} y={140} size={1.6} />
      </g>
      <g className="float">
        <Star x={1150} y={880} kind="big" size={1.1} rotate={14} />
      </g>
      <g className="float float--slow">
        <Star x={55} y={1120} kind="small" size={1.6} rotate={-10} />
      </g>
      <g className="twinkle">
        <Star x={740} y={95} kind="sparkle" size={2.4} />
      </g>
      <g className="twinkle twinkle--late">
        <Star x={50} y={700} kind="sparkle" size={2.2} />
      </g>
      <g className="twinkle">
        <Star x={1160} y={1400} kind="sparkle" size={2} />
      </g>
    </svg>
  );
}

/** JamFusion's composition graph: instrument nodes wired together, as in the app's canvas. */
const flowNodes = [
  { id: "bass", label: "Bassline", glyph: "∿", x: 170, y: 40 },
  { id: "drum", label: "Drum", glyph: "◉", x: 86, y: 112 },
  { id: "genre", label: "Genre", glyph: "♪", x: 258, y: 112 },
  { id: "chord", label: "Chord", glyph: "♫", x: 222, y: 172 },
];

const flowEdges = [
  "M170 58V76H86V94",
  "M170 58V76H258V94",
  "M258 130V142H222V154",
];

function JamFusionCover() {
  return (
    <>
      <defs>
        <pattern id="flow-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="0.9" fill="#b6c3f0" fillOpacity="0.22" />
        </pattern>
      </defs>
      <rect x="-40" y="-40" width="420" height="280" fill="url(#flow-grid)" />
      <g fill="none" stroke="#8f9fdc" strokeWidth="1.6">
        {flowEdges.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="flow-pulse" fill="none" stroke="#fbcab8" strokeWidth="1.6" strokeLinecap="round">
        {flowEdges.map((d) => (
          <path key={d} d={d} pathLength={100} />
        ))}
      </g>
      {flowNodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x - 36}
            y={n.y - 18}
            width="72"
            height="36"
            rx="7"
            fill="#2b3259"
            stroke="#8f9fdc"
            strokeWidth="1.2"
          />
          <circle cx={n.x - 20} cy={n.y} r="9" fill="#1c223e" />
          <text x={n.x - 20} y={n.y + 3.5} textAnchor="middle" fontSize="10" fill="#f4a896">
            {n.glyph}
          </text>
          <text x={n.x - 6} y={n.y + 3.5} fontSize="9" fontWeight="700" fill="#fffbf7">
            {n.label}
          </text>
          <circle cx={n.x} cy={n.y - 18} r="2.2" fill="#b6c3f0" />
          <circle cx={n.x} cy={n.y + 18} r="2.2" fill="#b6c3f0" />
        </g>
      ))}
    </>
  );
}

/* Mutual Fund cover: Monte Carlo fan chart. Paths come from a seeded generator so they never change between renders. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

const FAN = (() => {
  const rand = seeded(11);
  const steps = 20;
  const [x0, x1, yBase, scale] = [40, 292, 160, 52];
  // Compounding growth with random annual returns, so the paths fan out over time
  const runs = Array.from({ length: 40 }, () => {
    let v = 1;
    return Array.from({ length: steps + 1 }, (_, i) => {
      if (i > 0) v *= 1 + 0.04 + (rand() - 0.5) * 0.16;
      return [x0 + ((x1 - x0) * i) / steps, yBase - (v - 1) * scale] as const;
    });
  });
  const column = (i: number) => runs.map((r) => r[i][1]).sort((a, b) => a - b);
  const series = (pick: (ys: number[]) => number) =>
    Array.from({ length: steps + 1 }, (_, i) => [runs[0][i][0], pick(column(i))] as const);
  const at = (q: number) => (ys: number[]) => ys[Math.round(q * (ys.length - 1))];
  const line = (pts: readonly (readonly [number, number])[]) =>
    pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L");

  // Smaller y is a higher value, so P90 sits at the low quantile of y
  const p90 = series(at(0.1));
  const p10 = series(at(0.9));
  const p50 = series(at(0.5));
  const end = (pts: readonly (readonly [number, number])[]) => pts[steps][1];
  return {
    runs: runs.map((r) => `M${line(r)}`),
    band: `M${line(p90)}L${line([...p10].reverse())}Z`,
    median: `M${line(p50)}`,
    best: `M${line(series((ys) => ys[0]))}`,
    worst: `M${line(series((ys) => ys[ys.length - 1]))}`,
    // Keep the end labels at least 12 units apart
    ends: {
      p90: Math.min(end(p90), end(p50) - 12),
      p50: end(p50),
      p10: Math.max(end(p10), end(p50) + 12),
    },
  };
})();

function MutualFundCover() {
  return (
    <>
      <g stroke="#e6ebfb" strokeOpacity="0.2">
        {[70, 100, 130, 160].map((y) => (
          <line key={y} x1="40" x2="292" y1={y} y2={y} />
        ))}
      </g>
      <g fill="none" stroke="#e6ebfb" strokeOpacity="0.16" strokeWidth="0.7">
        {FAN.runs.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path d={FAN.band} fill="#e6ebfb" fillOpacity="0.2" />
      <g fill="none" stroke="#fbcab8" strokeOpacity="0.7" strokeWidth="1" strokeDasharray="3 3">
        <path d={FAN.best} />
        <path d={FAN.worst} />
      </g>
      <path d={FAN.median} fill="none" stroke="#f4a896" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <g fontSize="8" fontWeight="700" fill="#fffbf7">
        <text x="298" y={FAN.ends.p90 + 3}>P90</text>
        <text x="298" y={FAN.ends.p50 + 3} fill="#fbcab8">P50</text>
        <text x="298" y={FAN.ends.p10 + 3}>P10</text>
      </g>
      <text x="40" y="30" fontSize="6.5" fontWeight="700" fill="#e6ebfb" fillOpacity="0.8" letterSpacing="0.6">
        PROJECTED FUTURE VALUE
      </text>
      <text x="40" y="50" fontSize="17" fontWeight="600" fill="#fffbf7">
        $110,531
      </text>
      <text x="40" y="180" fontSize="6.5" fontWeight="600" fill="#e6ebfb" fillOpacity="0.8" letterSpacing="0.6">
        5,000 SIMULATED PATHS
      </text>
    </>
  );
}

/* eMerge cover: a mini landing page beside a live voice waveform and an AI score ring. */
const waveBars = [10, 18, 28, 16, 34, 22, 12, 26, 18, 8];

function EmergeCover() {
  return (
    <>
      <rect x="34" y="26" width="272" height="152" rx="10" fill="#fffbf7" />
      <g fill="#f4a896">
        <circle cx="46" cy="36" r="2.5" />
        <circle cx="54" cy="36" r="2.5" fill="#b6c3f0" />
        <circle cx="62" cy="36" r="2.5" fill="#b6c3f0" />
      </g>
      <line x1="34" x2="306" y1="46" y2="46" stroke="#dde2f0" />

      <g fill="#232a4a">
        <rect x="52" y="60" width="104" height="9" rx="2" />
        <rect x="52" y="74" width="82" height="9" rx="2" />
      </g>
      <rect x="52" y="88" width="58" height="9" rx="2" fill="#e8927c" />
      {[108, 119, 130].map((y, i) => (
        <g key={y}>
          <path d={`M53 ${y}l2.5 2.5 4.5-5`} fill="none" stroke="#e8927c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="64" y={y - 3} width={[70, 82, 64][i]} height="5" rx="2.5" fill="#b6c3f0" />
        </g>
      ))}
      <rect x="52" y="146" width="66" height="16" rx="8" fill="#232a4a" />
      <rect x="62" y="152" width="40" height="4" rx="2" fill="#fffbf7" />

      <g fill="#8f9fdc">
        {waveBars.map((h, i) => (
          <rect
            key={i}
            className="wave-bar"
            style={{ animationDelay: `${-i * 0.13}s` }}
            x={196 + i * 9}
            y={80 - h / 2}
            width="5"
            height={h}
            rx="2.5"
          />
        ))}
      </g>
      <circle cx="240" cy="134" r="20" fill="none" stroke="#e6ebfb" strokeWidth="6" />
      <circle
        cx="240"
        cy="134"
        r="20"
        fill="none"
        stroke="#e8927c"
        strokeWidth="6"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="92 100"
        transform="rotate(-90 240 134)"
      />
      <text x="240" y="138" textAnchor="middle" fontSize="11" fontWeight="800" fill="#232a4a">
        92
      </text>
    </>
  );
}

/** Covers drawn from what each project does; others fall back to the generic shape compositions. */
const projectCovers: Record<string, typeof JamFusionCover> = {
  "mutual-fund": MutualFundCover,
  "emerge-ai": EmergeCover,
  jamfusion: JamFusionCover,
};

function ExternalLink({ project }: { project: Project }) {
  if (!project.link) return null;
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card__link"
    >
      View project
      <svg viewBox="0 0 12 12" aria-hidden="true">
        <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
      </svg>
    </a>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" eyebrow="projects" title="things i've built!" dark art={<ProjectsArt />}>
      <div className="cards">
        {featured.map((project, i) => {
          const Cover = projectCovers[project.id] ?? covers[i % covers.length];
          return (
            <div
              key={project.id}
              className="card-wrap"
              data-reveal
              style={{ "--i": i } as CSSProperties}
            >
              {project.id === "jamfusion" && (
                <img
                  src={publicPath("images/peek.png")}
                  alt=""
                  className="peek"
                  width={484}
                  height={748}
                />
              )}
              <article className="card">
                <svg
                  className="card__cover"
                  viewBox="0 0 340 200"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <g className="card__art">
                    <Cover />
                  </g>
                </svg>
                <div className="card__body">
                  <p className="card__org">{project.org}</p>
                  <h3 className="card__title">{project.title}</h3>
                  <p className="card__desc">{project.description}</p>
                  <p className="card__tags">{project.tags.join(" · ")}</p>
                  <ExternalLink project={project} />
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <h3 className="more__title">More projects</h3>
      <ul className="more">
        {other.map((project) => (
          <li key={project.id} className="more__item" data-reveal>
            <p className="more__org">{project.org}</p>
            <h4 className="more__name">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h4>
            <p className="more__desc">{project.description}</p>
            {project.metrics && (
              <p className="more__metrics">{project.metrics.join(" · ")}</p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

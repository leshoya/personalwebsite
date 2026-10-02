import { useEffect, useRef } from "react";
import { experiences, profile, projects } from "../data/content";

/**
 * Interactive 3D graph of skills: clusters of related tools orbit a center node.
 * Rendered on a canvas with a hand-rolled perspective projection (no 3D library);
 * auto-rotates while on screen, and can be dragged to spin.
 */

interface Cluster {
  name: string;
  color: string;
  items: string[];
}

const clusters: Cluster[] = [
  { name: "Languages", color: "#e8927c", items: ["Python", "Java", "C", "TypeScript", "JavaScript", "SQL"] },
  { name: "Frameworks", color: "#5a68ad", items: ["React", "Angular", "Spring Boot", "Node.js", "Flask", "FastAPI", "Next.js"] },
  { name: "ML & AI", color: "#9d9be0", items: ["PyTorch", "TensorFlow", "NumPy", "Pandas", "LLM APIs", "Gemini"] },
  { name: "Tools", color: "#8f9fdc", items: ["Git", "Docker", "Linux", "CI/CD"] },
  { name: "Domains", color: "#f4a896", items: ["Healthcare ML", "FinTech", "AI Agents", "Music Tech"] },
];

/** Links between clusters, so the graph reads as one connected stack. */
const crossLinks: [string, string][] = [
  ["Python", "PyTorch"],
  ["Python", "TensorFlow"],
  ["Python", "Flask"],
  ["Python", "FastAPI"],
  ["TypeScript", "React"],
  ["TypeScript", "Angular"],
  ["Java", "Spring Boot"],
  ["JavaScript", "Node.js"],
  ["PyTorch", "Healthcare ML"],
  ["FastAPI", "FinTech"],
  ["SQL", "FinTech"],
  ["LLM APIs", "AI Agents"],
  ["Gemini", "Music Tech"],
  ["Next.js", "Music Tech"],
  ["Docker", "CI/CD"],
];

type Kind = "center" | "hub" | "leaf";

interface GraphNode {
  label: string;
  kind: Kind;
  color: string;
  x: number;
  y: number;
  z: number;
}

/** Deterministic pseudo-random numbers so the layout is the same on every load. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

function buildGraph() {
  const rand = seeded(42);
  const nodes: GraphNode[] = [{ label: "me", kind: "center", color: "#232a4a", x: 0, y: 0, z: 0 }];
  const edges: [number, number][] = [];
  const index = new Map<string, number>();

  clusters.forEach((cluster, ci) => {
    // Hubs sit evenly around a tilted ring (alternating up/down), leaves scatter around their hub
    const theta = (ci / clusters.length) * Math.PI * 2;
    const R = 150;
    const hub = {
      x: R * Math.cos(theta),
      y: (ci % 2 === 0 ? -1 : 1) * 40,
      z: R * Math.sin(theta),
    };
    const hubIndex = nodes.push({ label: cluster.name, kind: "hub", color: cluster.color, ...hub }) - 1;
    edges.push([0, hubIndex]);

    cluster.items.forEach((item) => {
      const u = rand() * 2 - 1;
      const a = rand() * Math.PI * 2;
      const r = 50 + rand() * 35;
      const s = Math.sqrt(1 - u * u);
      const leafIndex =
        nodes.push({
          label: item,
          kind: "leaf",
          color: cluster.color,
          // Push leaves outward from the center so clusters stay distinct
          x: hub.x * 1.3 + r * s * Math.cos(a),
          // Flattened vertically so the graph suits a wide panel
          y: hub.y * 1.3 + r * u * 0.6,
          z: hub.z * 1.3 + r * s * Math.sin(a),
        }) - 1;
      index.set(item, leafIndex);
      edges.push([hubIndex, leafIndex]);
    });
  });

  for (const [a, b] of crossLinks) {
    const ia = index.get(a);
    const ib = index.get(b);
    if (ia !== undefined && ib !== undefined) edges.push([ia, ib]);
  }
  return { nodes, edges };
}

const GRAPH = buildGraph();

const stats = [
  { value: experiences.filter((e) => !e.earlier).length, label: "internships" },
  { value: projects.length, label: "projects built" },
  {
    value: clusters.filter((c) => c.name !== "Domains").reduce((n, c) => n + c.items.length, 0),
    label: "tools & languages",
  },
  { value: profile.education.honors.length, label: "honors & awards" },
];

/** Distance from the center to the farthest node, used to fit the graph in the canvas. */
const EXTENT = Math.max(...GRAPH.nodes.map((n) => Math.hypot(n.x, n.y, n.z)));
/** Horizontal (spin-plane) and vertical extents, for fitting width and height separately. */
const EXTENT_XZ = Math.max(...GRAPH.nodes.map((n) => Math.hypot(n.x, n.z)));
const EXTENT_Y = Math.max(...GRAPH.nodes.map((n) => Math.abs(n.y)));

const NODE_RADIUS: Record<Kind, number> = { center: 9, hub: 7, leaf: 4 };

export function SkillGraph() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const neighbors = GRAPH.nodes.map(() => new Set<number>());
    for (const [a, b] of GRAPH.edges) {
      neighbors[a].add(b);
      neighbors[b].add(a);
    }

    let width = 0;
    let height = 0;
    let yaw = 0.6;
    let pitch = -0.38;
    let spin = reduceMotion ? 0 : 0.0035;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocity = 0;
    let hovered = -1;
    let pointer: { x: number; y: number } | null = null;
    let visible = false;
    let frame = 0;
    let projected: { x: number; y: number; z: number; s: number }[] = [];
    let view = { scale: 1, cy: 1, sy: 0, cp: 1, sp: 0, camera: 1 };

    /** Project an arbitrary 3D point with the current view. */
    const toScreen = (x: number, y: number, z: number) => {
      const { scale, cy, sy, cp, sp, camera } = view;
      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      const y2 = y * cp - z1 * sp;
      const z2 = y * sp + z1 * cp;
      const s = camera / (camera + z2);
      return [width / 2 + x1 * s * scale, height / 2 + y2 * s * scale] as const;
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const project = () => {
      // Fit width to the spin plane and height to the tilted vertical extent;
      // 1.25 leaves room for near nodes that perspective enlarges
      const tallest = EXTENT_Y * Math.cos(pitch) + EXTENT_XZ * Math.abs(Math.sin(pitch));
      const scale = Math.min(((width / 2) * 0.9) / EXTENT_XZ, ((height / 2) * 0.86) / tallest) / 0.96;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const camera = EXTENT * 4;
      view = { scale, cy, sy, cp, sp, camera };
      projected = GRAPH.nodes.map((n) => {
        const x1 = n.x * cy - n.z * sy;
        const z1 = n.x * sy + n.z * cy;
        const y2 = n.y * cp - z1 * sp;
        const z2 = n.y * sp + z1 * cp;
        const s = camera / (camera + z2);
        return { x: width / 2 + x1 * s * scale, y: height / 2 + y2 * s * scale, z: z2, s: s * scale };
      });
    };

    const pick = () => {
      if (!pointer) return -1;
      let best = -1;
      let bestDist = 18;
      projected.forEach((p, i) => {
        const d = Math.hypot(p.x - pointer!.x, p.y - pointer!.y);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      return best;
    };

    function draw() {
      if (!width || !height) return;
      project();
      hovered = dragging ? hovered : pick();
      const focus = hovered >= 0 ? neighbors[hovered] : null;
      const depth = (z: number) => Math.min(1, Math.max(0.2, 0.7 - z / (EXTENT * 2.2)));

      ctx!.clearRect(0, 0, width, height);

      // Faint orbit rings around the center give the rotation a sense of depth
      ctx!.lineWidth = 1;
      for (const [radius, alpha] of [
        [EXTENT_XZ * 0.62, 0.16],
        [EXTENT_XZ * 1.0, 0.09],
      ]) {
        ctx!.strokeStyle = `rgba(90,104,173,${alpha})`;
        ctx!.setLineDash([3, 6]);
        ctx!.beginPath();
        for (let k = 0; k <= 96; k++) {
          const a = (k / 96) * Math.PI * 2;
          const [x, y] = toScreen(radius * Math.cos(a), 0, radius * Math.sin(a));
          if (k === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }
      ctx!.setLineDash([]);

      // Edges, back to front
      const edges = [...GRAPH.edges].sort((a, b) => projected[b[0]].z + projected[b[1]].z - projected[a[0]].z - projected[a[1]].z);
      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        const lit = hovered >= 0 && (a === hovered || b === hovered);
        const alpha = depth((pa.z + pb.z) / 2) * (focus && !lit ? 0.25 : 1);
        ctx!.strokeStyle = lit ? "rgba(232,146,124,0.95)" : `rgba(82,90,120,${0.28 * alpha})`;
        ctx!.lineWidth = lit ? 1.6 : 1;
        ctx!.beginPath();
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pb.x, pb.y);
        ctx!.stroke();
      }

      // Nodes and labels, back to front
      const order = GRAPH.nodes.map((_, i) => i).sort((a, b) => projected[b].z - projected[a].z);
      for (const i of order) {
        const n = GRAPH.nodes[i];
        const p = projected[i];
        const isFocus = i === hovered || (focus?.has(i) ?? false);
        const alpha = depth(p.z) * (focus && !isFocus ? 0.3 : 1);
        const r = NODE_RADIUS[n.kind] * p.s * (i === hovered ? 1.5 : 1);

        ctx!.globalAlpha = alpha;
        if (n.kind !== "leaf") {
          ctx!.fillStyle = n.color;
          ctx!.globalAlpha = alpha * 0.18;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r * 2.4, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = alpha;
        }
        ctx!.fillStyle = n.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fill();

        // Every node is labelled; labels toward the back fade with depth
        {
          const size = (n.kind === "leaf" ? 11 : n.kind === "hub" ? 12.5 : 14) * Math.max(0.8, Math.min(1.25, p.s));
          ctx!.font = `${n.kind === "leaf" ? 500 : 700} ${size}px Montserrat, system-ui, sans-serif`;
          ctx!.fillStyle = n.kind === "leaf" ? "#525a78" : "#232a4a";
          if (n.kind === "leaf" && !isFocus) ctx!.globalAlpha = alpha * 0.85;
          ctx!.textAlign = "center";
          ctx!.fillText(n.label, p.x, p.y - r - 6);
        }
      }
      ctx!.globalAlpha = 1;
      canvas!.style.cursor = dragging ? "grabbing" : hovered >= 0 ? "pointer" : "grab";
    }

    const tick = () => {
      frame = 0;
      if (!dragging) {
        velocity *= 0.95;
        yaw += spin + velocity;
      }
      draw();
      if (visible && (spin || Math.abs(velocity) > 0.0001 || dragging)) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velocity = 0;
      canvas.setPointerCapture(e.pointerId);
      start();
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        yaw += dx * 0.008;
        pitch = Math.max(-1.2, Math.min(1.2, pitch + dy * 0.006));
        velocity = dx * 0.0008;
      }
      if (!frame) draw();
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      start();
    };
    const onLeave = () => {
      pointer = null;
      if (!frame) draw();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Only animate while the graph is on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(wrap);

    // Redraw once web fonts load so labels use Montserrat
    document.fonts?.ready.then(draw);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="graph">
      <div className="graph__intro" data-reveal>
        <p className="eyebrow">how it all connects</p>
        <p className="graph__lead">
          The languages, frameworks, and ML tools I've used across four internships and ten
          projects, linked to the problem areas I've applied them to.
        </p>
        <dl className="graph__stats">
          {stats.map((st) => (
            <div key={st.label}>
              <dt>{st.label}</dt>
              <dd>{st.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="graph__legend">
          {clusters.map((c) => (
            <li key={c.name}>
              <span style={{ background: c.color }} />
              {c.name}
            </li>
          ))}
        </ul>
        <p className="graph__hint">drag the graph to spin it · hover a node to trace its links</p>
      </div>
      <figure className="graph__figure" data-reveal>
        <div className="graph__stage" ref={wrapRef}>
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Graph of Sophia's skills: ${clusters.map((c) => `${c.name}: ${c.items.join(", ")}`).join("; ")}.`}
          />
        </div>
      </figure>
    </div>
  );
}

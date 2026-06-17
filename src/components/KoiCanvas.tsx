import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  rotation: number;
  spin: number;
  color: string;
  opacity: number;
}

const PETAL_COLORS = [
  "rgba(250, 212, 200, 0.85)",
  "rgba(244, 168, 150, 0.8)",
  "rgba(255, 228, 225, 0.9)",
  "rgba(251, 202, 184, 0.75)",
  "rgba(255, 245, 240, 0.88)",
];

function createPetal(w: number, h: number, startAbove = false): Petal {
  return {
    x: Math.random() * w,
    y: startAbove ? -20 - Math.random() * h * 0.5 : Math.random() * h,
    size: 6 + Math.random() * 10,
    speedY: 0.08 + Math.random() * 0.14,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.004,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    opacity: 0.35 + Math.random() * 0.4,
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);
  ctx.globalAlpha = petal.opacity;

  const s = petal.size;

  ctx.fillStyle = petal.color;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.9);
  ctx.bezierCurveTo(s * 0.55, -s * 0.55, s * 0.55, s * 0.35, 0, s * 0.95);
  ctx.bezierCurveTo(-s * 0.55, s * 0.35, -s * 0.55, -s * 0.55, 0, -s * 0.9);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 229, 102, 0.45)";
  ctx.beginPath();
  ctx.arc(0, s * 0.15, s * 0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawBlossom(ctx: CanvasRenderingContext2D, petal: Petal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);
  ctx.globalAlpha = petal.opacity * 0.85;

  const s = petal.size * 0.9;

  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((Math.PI * 2 * i) / 5);
    ctx.fillStyle = petal.color;
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.38, s * 0.24, s * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.fillStyle = "rgba(255, 229, 102, 0.55)";
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function KoiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const petalsRef = useRef<Petal[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initPetals = (w: number, h: number) => {
      petalsRef.current = Array.from({ length: 28 }, (_, i) =>
        createPetal(w, h, i % 3 === 0)
      );
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPetals(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const addRipple = (x: number, y: number) => {
      ripplesRef.current.push({ x, y, radius: 0, opacity: 0.5 });
      if (ripplesRef.current.length > 20) ripplesRef.current.shift();
    };

    const onMove = (e: MouseEvent) => {
      if (Math.random() < 0.1) addRipple(e.clientX, e.clientY);
    };
    const onClick = (e: MouseEvent) => addRipple(e.clientX, e.clientY);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    const animate = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      petalsRef.current.forEach((petal, i) => {
        petal.y += petal.speedY;
        petal.rotation += petal.spin;

        if (petal.y > h + 30) {
          petalsRef.current[i] = createPetal(w, h, true);
          return;
        }

        if (i % 7 === 0) {
          drawBlossom(ctx, petal);
        } else {
          drawPetal(ctx, petal);
        }
      });

      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.radius += 1.2;
        r.opacity -= 0.008;
        if (r.opacity <= 0) return false;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(126, 184, 201, ${r.opacity * 0.65})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(244, 168, 150, ${r.opacity * 0.35})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        return true;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="koi-canvas" aria-hidden="true" />;
}

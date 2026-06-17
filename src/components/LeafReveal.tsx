import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HOLD = 0.45;
const SPLIT = 0.75;

function LeafSvg({ flip = false, id }: { flip?: boolean; id: string }) {
  return (
    <svg viewBox="0 0 200 280" className="leaf-reveal__svg" aria-hidden="true">
      <defs>
        <linearGradient id={`leaf-fill-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dff0d0" />
          <stop offset="45%" stopColor="#c5e0a8" />
          <stop offset="100%" stopColor="#a8cf92" />
        </linearGradient>
        <linearGradient id={`leaf-blush-${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fad4c8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#c5e0a8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 100 268
           C 98 240 96 220 100 200
           C 28 170 18 95 55 42
           C 72 18 100 8 100 8
           C 100 8 128 18 145 42
           C 182 95 172 170 100 200
           C 104 220 102 240 100 268 Z"
        fill={`url(#leaf-fill-${id})`}
        transform={flip ? "scale(-1, 1) translate(-200, 0)" : undefined}
      />
      <path
        d="M 100 268
           C 98 240 96 220 100 200
           C 28 170 18 95 55 42
           C 72 18 100 8 100 8
           C 100 8 128 18 145 42
           C 182 95 172 170 100 200
           C 104 220 102 240 100 268 Z"
        fill={`url(#leaf-blush-${id})`}
        transform={flip ? "scale(-1, 1) translate(-200, 0)" : undefined}
      />
      <path
        d="M 100 268 L 100 200"
        stroke="rgba(80,120,70,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 100 200 Q 62 165 55 100"
        stroke="rgba(80,120,70,0.22)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 100 200 Q 138 165 145 100"
        stroke="rgba(80,120,70,0.22)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function LeafReveal() {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [visible, setVisible] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setVisible(false), (HOLD + SPLIT) * 1000);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  if (!visible) return null;

  const splitEase = [0.65, 0, 0.35, 1] as const;

  return (
    <div className="leaf-reveal" aria-hidden="true">
      <motion.div
        className="leaf-reveal__leaf leaf-reveal__leaf--left"
        initial={{ rotate: -14, x: 18, y: 6, opacity: 1, scale: 1 }}
        animate={{ rotate: -48, x: -140, y: -60, opacity: 0, scale: 0.92 }}
        transition={{ duration: SPLIT, delay: HOLD, ease: splitEase }}
      >
        <LeafSvg id="left" />
      </motion.div>

      <motion.div
        className="leaf-reveal__leaf leaf-reveal__leaf--right"
        initial={{ rotate: 14, x: -18, y: 6, opacity: 1, scale: 1 }}
        animate={{ rotate: 48, x: 140, y: -60, opacity: 0, scale: 0.92 }}
        transition={{ duration: SPLIT, delay: HOLD, ease: splitEase }}
      >
        <LeafSvg id="right" flip />
      </motion.div>
    </div>
  );
}

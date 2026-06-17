import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const phrases = [
  "Software & AI Engineer",
  "Healthcare ML Builder",
  "Full-Stack Developer",
  "Enterprise & Research",
];

export function RotatingTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="hero__tagline hero__tagline--rotate" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}

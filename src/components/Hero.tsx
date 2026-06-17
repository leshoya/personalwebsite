import { motion } from "framer-motion";
import { profile } from "../data/content";
import { LeafReveal } from "./LeafReveal";
import { NameReveal } from "./NameReveal";
import { RotatingTagline } from "./RotatingTagline";
import { useParallaxTilt } from "../hooks/useParallaxTilt";
import { publicPath } from "../lib/publicPath";

export function Hero() {
  const portrait = useParallaxTilt(10);

  return (
    <section className="hero" id="top">
      <LeafReveal />
      <div className="hero__pond" aria-hidden="true" />

      <div className="hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero__eyebrow">Duke University · Computer Science</p>
          <h1 className="hero__title">
            <NameReveal className="hero__name" english="Sophia Lee" chinese={profile.chineseName} />
          </h1>
          <RotatingTagline />
          <p className="hero__subtitle">{profile.subtitle}</p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View Projects
            </a>
            <a href={publicPath(profile.resume)} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              Download Resume
            </a>
            <a href="#contact" className="btn btn--ghost">
              Get in Touch
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero__headshot hero__headshot--tilt"
          ref={portrait.ref}
          onMouseMove={portrait.onMove}
          onMouseLeave={portrait.onLeave}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__portrait-frame">
            <img src={publicPath("images/headshot.png")} alt="Sophia Lee" className="hero__portrait" />
            <div className="hero__portrait-ring" aria-hidden="true" />
            <div className="hero__portrait-shimmer" aria-hidden="true" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span>Scroll to explore</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </section>
  );
}

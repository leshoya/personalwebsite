import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/content";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="contact__inner">
        <motion.div
          className="contact__content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section__number">05</span>
          <h2 className="contact__title">Let's Connect</h2>
          <p className="contact__text">
            I'm always open to discussing new opportunities, collaborations, or just
            talking about AI, healthcare tech, and creative engineering.
          </p>
          <div className="contact__links">
            <button type="button" className="contact__link contact__link--copy" onClick={copyEmail}>
              <span className="contact__link-label">Email · click to copy</span>
              <span>{profile.email}</span>
            </button>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact__link">
              <span className="contact__link-label">LinkedIn</span>
              <span>linkedin.com/in/sophial25</span>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact__link">
              <span className="contact__link-label">GitHub</span>
              <span>github.com/leshoya</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="contact__pond-art"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          aria-hidden="true"
        >
          <span className="contact__ring contact__ring--outer" />
          <span className="contact__ring contact__ring--mid" />
          <span className="contact__ring contact__ring--inner" />
          <span className="contact__dot contact__dot--coral" />
          <span className="contact__dot contact__dot--cream" />
        </motion.div>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Sophia Lee. Crafted with intention.</p>
      </footer>

      <AnimatePresence>
        {copied && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            role="status"
          >
            Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

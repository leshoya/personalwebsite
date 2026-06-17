import { motion } from "framer-motion";
import { experiences } from "../data/content";
import { KoiIllustration } from "./KoiIllustration";

export function Experience() {
  return (
    <section className="section experience" id="experience">
      <KoiIllustration className="section-deco section-deco--experience" variant="cream" flip />
      <div className="section__header">
        <span className="section__number">02</span>
        <h2 className="section__title">Experience</h2>
        <p className="section__subtitle">Building impact at scale</p>
      </div>

      <div className="timeline">
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.id}
            className="timeline__item"
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="timeline__marker" aria-hidden="true">
              <span className="timeline__dot" />
            </div>
            <div className="timeline__card">
              <div className="timeline__meta">
                <span className="timeline__period">{exp.period}</span>
              </div>
              <h3 className="timeline__role">{exp.role}</h3>
              <p className="timeline__company">
                {exp.company}
                {exp.location && <span className="timeline__location"> · {exp.location}</span>}
              </p>
              <ul className="timeline__highlights list-stars">
                {exp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

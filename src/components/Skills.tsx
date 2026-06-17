import { motion } from "framer-motion";
import { profile } from "../data/content";
import { KoiIllustration } from "./KoiIllustration";

export function Skills() {
  const allSkills = [
    ...profile.skills.languages.map((s) => ({ name: s, category: "lang" as const })),
    ...profile.skills.frameworks.map((s) => ({ name: s, category: "fw" as const })),
    ...profile.skills.tools.map((s) => ({ name: s, category: "tool" as const })),
  ];

  return (
    <section className="section skills" id="skills">
      <KoiIllustration className="section-deco section-deco--skills" variant="coral" />
      <div className="section__header">
        <span className="section__number">04</span>
        <h2 className="section__title">Skills</h2>
        <p className="section__subtitle">Tools I work with daily</p>
      </div>

      <div className="skills__cloud">
        {allSkills.map((skill, i) => (
          <motion.span
            key={skill.name}
            className={`skills__pill skills__pill--${skill.category}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
            whileHover={{ scale: 1.08, y: -3 }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>

      <div className="skills__courses">
        <h3>Relevant Coursework</h3>
        <div className="skills__course-list">
          {profile.education.courses.map((c) => (
            <span key={c} className="skills__course">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

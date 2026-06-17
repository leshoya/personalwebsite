import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/content";
import type { Project } from "../data/content";
import { useTilt } from "../hooks/useTilt";
import { KoiIllustration } from "./KoiIllustration";

type Filter = "all" | "featured" | "healthcare" | "fullstack";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "featured", label: "Featured" },
  { key: "healthcare", label: "Healthcare ML" },
  { key: "fullstack", label: "Full Stack" },
];

function matchesFilter(p: Project, filter: Filter): boolean {
  if (p.placeholder) return filter === "all";
  if (filter === "all") return true;
  if (filter === "featured") return !!p.featured;
  if (filter === "healthcare")
    return p.tags.some((t) =>
      ["CNN", "TensorFlow", "Medical Imaging", "Biosignals", "Scikit-learn"].includes(t)
    ) || p.org.includes("Medlytics");
  if (filter === "fullstack")
    return p.tags.some((t) =>
      ["React", "Flask", "Next.js", "FastAPI", "Node.js", "Angular"].includes(t)
    );
  return true;
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const tilt = useTilt(7);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    tilt.onMove(e);
    setHovered(true);
  };

  return (
    <motion.article
      ref={tilt.ref as React.RefObject<HTMLElement>}
      className={`project-card project-card--tilt ${project.featured ? "project-card--featured" : ""}`}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        tilt.onLeave();
        setHovered(false);
      }}
    >
      <div className="project-card__inner">
        {project.featured && (
          <span className="project-card__badge">Featured</span>
        )}
        <div className="project-card__header">
          {project.link ? (
            <h3 className="project-card__title">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__title-link">
                {project.title}
              </a>
            </h3>
          ) : (
            <h3 className="project-card__title">{project.title}</h3>
          )}
          <span className="project-card__org">{project.org}</span>
        </div>
        <p className="project-card__desc">{project.description}</p>
        {project.metrics && (
          <div className="project-card__metrics">
            {project.metrics.map((m) => (
              <span key={m} className="project-card__metric">{m}</span>
            ))}
          </div>
        )}
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__link">
            View Project
          </a>
        )}
      </div>
      <div
        className={`project-card__ripple ${hovered ? "project-card__ripple--active" : ""}`}
        aria-hidden="true"
      />
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = projects.filter((p) => matchesFilter(p, filter));

  return (
    <section className="section projects" id="projects">
      <KoiIllustration className="section-deco section-deco--projects" variant="cream" flip />
      <div className="section__header">
        <span className="section__number">03</span>
        <h2 className="section__title">Projects</h2>
        <p className="section__subtitle">Selected work across AI, finance, and healthcare</p>
      </div>

      <div className="projects__filters">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`projects__filter ${filter === f.key ? "projects__filter--active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div className="projects__grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

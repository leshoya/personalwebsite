import { projects } from "../data/content";
import type { Project } from "../data/content";
import { Section } from "./Section";

function ProjectTitle({ project }: { project: Project }) {
  if (!project.link) return <>{project.title}</>;
  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-out">
      {project.title}
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
    <Section id="projects" title="Projects">
      <ol className="entries">
        {featured.map((project) => (
          <li key={project.id} className="entry">
            <div className="entry__head">
              <h3 className="entry__title">
                <ProjectTitle project={project} />
                <span className="entry__org">{project.org}</span>
              </h3>
            </div>
            <p className="entry__desc">{project.description}</p>
            <p className="entry__tags">{project.tags.join(" · ")}</p>
          </li>
        ))}
      </ol>

      <h3 className="subhead">More projects</h3>
      <ul className="compact">
        {other.map((project) => (
          <li key={project.id} className="compact__item">
            <div className="compact__head">
              <span className="compact__title">
                <ProjectTitle project={project} />
              </span>
              <span className="compact__org">{project.org}</span>
            </div>
            <p className="compact__desc">
              {project.description}
              {project.metrics && (
                <span className="compact__metrics"> {project.metrics.join(", ")}.</span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

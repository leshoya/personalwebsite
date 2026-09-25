import type { CSSProperties } from "react";
import { projects } from "../data/content";
import type { Project } from "../data/content";
import { publicPath } from "../lib/publicPath";
import { Section } from "./Section";
import { Donut, Dots, Record, RingStack, Target } from "./Shapes";

/** A different shape composition for each featured project's cover. */
const covers = [
  () => (
    <>
      <Record x={250} y={110} r={120} />
      <Donut x={70} y={50} r={34} paint="url(#g-coral)" />
      <Dots x={40} y={160} cols={3} />
    </>
  ),
  () => (
    <>
      <RingStack x={100} y={210} r={115} />
      <RingStack x={235} y={210} r={115} stroke="#fbcab8" />
      <Target x={300} y={50} r={30} />
      <Dots x={36} y={36} cols={2} rows={2} />
    </>
  ),
  () => (
    <>
      <Donut x={110} y={105} r={80} />
      <Target x={265} y={120} r={58} />
      <Dots x={270} y={26} cols={3} fill="#f4a896" />
    </>
  ),
];

function ExternalLink({ project }: { project: Project }) {
  if (!project.link) return null;
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card__link"
    >
      View project
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
    <Section id="projects" eyebrow="projects" title="things i've built." dark>
      <div className="cards">
        {featured.map((project, i) => {
          const Cover = covers[i % covers.length];
          return (
            <div
              key={project.id}
              className="card-wrap"
              data-reveal
              style={{ "--i": i } as CSSProperties}
            >
              {project.id === "jamfusion" && (
                <img
                  src={publicPath("images/peek.png")}
                  alt=""
                  className="peek"
                  width={484}
                  height={748}
                />
              )}
              <article className="card">
                <svg
                  className="card__cover"
                  viewBox="0 0 340 200"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <g className="card__art">
                    <Cover />
                  </g>
                </svg>
                <div className="card__body">
                  <p className="card__org">{project.org}</p>
                  <h3 className="card__title">{project.title}</h3>
                  <p className="card__desc">{project.description}</p>
                  <p className="card__tags">{project.tags.join(" · ")}</p>
                  <ExternalLink project={project} />
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <h3 className="more__title">More projects</h3>
      <ul className="more">
        {other.map((project) => (
          <li key={project.id} className="more__item" data-reveal>
            <p className="more__org">{project.org}</p>
            <h4 className="more__name">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h4>
            <p className="more__desc">{project.description}</p>
            {project.metrics && (
              <p className="more__metrics">{project.metrics.join(" · ")}</p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

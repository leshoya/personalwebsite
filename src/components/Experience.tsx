import { experiences } from "../data/content";
import type { Experience as Job } from "../data/content";
import { publicPath } from "../lib/publicPath";
import { Section } from "./Section";

const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Looping, muted screen recording in a browser-window frame, with a link out. */
function Demo({ demo }: { demo: NonNullable<Job["demo"]> }) {
  const href = demo.link ?? publicPath(demo.video);
  return (
    <figure className="demo">
      <div className="demo__frame">
        <div className="demo__bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <video
          src={publicPath(demo.video)}
          width={1280}
          height={720}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={!prefersReducedMotion}
          controls={prefersReducedMotion}
          aria-label={demo.caption}
        />
      </div>
      <figcaption className="demo__caption">
        <span>{demo.caption}</span>
        <a href={href} target="_blank" rel="noopener noreferrer" className="demo__link">
          {demo.link ? "Visit site" : "Watch full video"}
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
          </svg>
        </a>
      </figcaption>
    </figure>
  );
}

export function Experience() {
  const main = experiences.filter((e) => !e.earlier);
  const earlier = experiences.filter((e) => e.earlier);

  return (
    <Section
      id="experience"
      eyebrow="experience"
      title="where i've worked:"
      titleArt={
        <img
          src={publicPath("images/doodle2.png")}
          alt=""
          className="section__title-art section__title-art--lg"
          width={696}
          height={689}
        />
      }
    >
      <ol className="timeline">
        {main.map((exp) => (
          <li key={exp.id} className="timeline__item" data-reveal>
            <span className="timeline__node" aria-hidden="true" />
            <p className="timeline__period">{exp.period}</p>
            <h3 className="timeline__role">{exp.role}</h3>
            <p className="timeline__company">{exp.company}</p>
            <ul className="timeline__list">
              {exp.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            {exp.demo && <Demo demo={exp.demo} />}
          </li>
        ))}
      </ol>

      <div className="earlier" data-reveal>
        <h3 className="earlier__title">Earlier programs</h3>
        <ul className="earlier__list">
          {earlier.map((exp) => (
            <li key={exp.id}>
              <span className="earlier__year">{exp.period.match(/\d{4}/)?.[0]}</span>
              <span>
                <strong>{exp.role}</strong>, {exp.company}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

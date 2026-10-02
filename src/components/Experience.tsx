import { experiences } from "../data/content";
import type { Experience as Job } from "../data/content";
import { publicPath } from "../lib/publicPath";
import { Polaroid } from "./Polaroid";
import { Section } from "./Section";
import { Dots, Star } from "./Shapes";

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
      <div className="experience">
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

      <aside className="experience__photos">
        <Polaroid
          src="images/presenting.png"
          alt="Sophia Lee presenting to a group"
          caption="presenting project work"
          tilt={3}
        />
        <Polaroid
          src="images/nc-workshop.png"
          alt="Sophia Lee at an NC Department of Administration workshop"
          caption="NC Lady Cardinal Mentorship Program"
          tilt={-4}
        />
      </aside>
      </div>

      <div className="earlier-row">
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
      <div className="earlier__aside">
        <svg className="earlier__decor" viewBox="0 0 320 420" aria-hidden="true">
          {/* Dashed trail that leads down toward the next section */}
          <path
            d="M250 40C320 120 300 230 200 300S40 360 20 420"
            fill="none"
            stroke="#8f9fdc"
            strokeWidth="2"
            strokeDasharray="2 9"
            strokeLinecap="round"
          />
          <circle cx="40" cy="70" r="26" fill="none" stroke="#f4a896" strokeWidth="9" />
          <circle cx="290" cy="330" r="14" fill="none" stroke="#b6c3f0" strokeWidth="2.5" />
          <Dots x={250} y={14} cols={3} rows={2} gap={14} size={3.5} />
          <Dots x={18} y={300} cols={2} rows={3} gap={14} size={3.5} fill="#e8927c" />
          <g className="float float--slow">
            <Star x={286} y={70} kind="big" size={0.9} rotate={12} />
          </g>
          <g className="float">
            <Star x={60} y={385} kind="small" size={1.6} rotate={-14} />
          </g>
        </svg>
        <Polaroid
          src="images/award.png"
          alt="Sophia Lee receiving the NCWIT Award for Aspirations in Computing"
          caption="NCWIT Aspirations in Computing Award"
          position="top"
          tilt={4}
        />
      </div>
      </div>

      {/* Small accents that bridge the gap into the next section */}
      <svg className="section-bridge" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path
          d="M0 120C200 40 380 150 600 90S960 20 1200 80"
          fill="none"
          stroke="#b6c3f0"
          strokeWidth="1.5"
          strokeDasharray="1 10"
          strokeLinecap="round"
        />
        <g className="float">
          <Star x={210} y={70} kind="small" size={1.3} rotate={10} />
        </g>
        <g className="float float--alt">
          <Star x={980} y={50} kind="big" size={0.7} rotate={-10} />
        </g>
        <Dots x={560} y={112} cols={3} gap={14} size={3.5} fill="#e8927c" />
        <circle cx="760" cy="60" r="9" fill="none" stroke="#f4a896" strokeWidth="4" />
        <circle cx="420" cy="125" r="5" fill="#8f9fdc" />
      </svg>
    </Section>
  );
}

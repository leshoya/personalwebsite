import { experiences } from "../data/content";
import { Section } from "./Section";

export function Experience() {
  const main = experiences.filter((e) => !e.earlier);
  const earlier = experiences.filter((e) => e.earlier);

  return (
    <Section id="experience" title="Experience">
      <ol className="entries">
        {main.map((exp) => (
          <li key={exp.id} className="entry">
            <div className="entry__head">
              <h3 className="entry__title">
                {exp.role}
                <span className="entry__org">{exp.company}</span>
              </h3>
              <span className="entry__date">{exp.period}</span>
            </div>
            <ul className="entry__list">
              {exp.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h3 className="subhead">Earlier</h3>
      <ul className="rows">
        {earlier.map((exp) => (
          <li key={exp.id} className="row">
            <span className="row__main">
              {exp.role}, <span className="row__muted">{exp.company}</span>
            </span>
            <span className="row__date">{exp.period.match(/\d{4}/)?.[0]}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

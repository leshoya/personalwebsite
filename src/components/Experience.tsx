import { experiences } from "../data/content";
import { Section } from "./Section";

export function Experience() {
  const main = experiences.filter((e) => !e.earlier);
  const earlier = experiences.filter((e) => e.earlier);

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked.">
      <ol className="timeline">
        {main.map((exp) => (
          <li key={exp.id} className="timeline__item">
            <span className="timeline__node" aria-hidden="true" />
            <p className="timeline__period">{exp.period}</p>
            <h3 className="timeline__role">{exp.role}</h3>
            <p className="timeline__company">{exp.company}</p>
            <ul className="timeline__list">
              {exp.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="earlier">
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

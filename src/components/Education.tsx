import { profile } from "../data/content";
import { Section } from "./Section";

const skillGroups = [
  { label: "Languages", items: profile.skills.languages },
  { label: "Frameworks", items: profile.skills.frameworks },
  { label: "Tools", items: profile.skills.tools },
];

export function Education() {
  const { education } = profile;

  return (
    <>
      <Section id="education" title="Education">
        <div className="entry__head">
          <h3 className="entry__title">
            {education.school}
            <span className="entry__org">{education.degree}</span>
          </h3>
          <span className="entry__date">{education.location}</span>
        </div>
        <p className="entry__desc">
          <span className="label">Coursework</span>
          {education.courses.join(", ")}
        </p>
      </Section>

      <Section id="honors" title="Honors">
        <ul className="rows">
          {education.honors.map((honor) => (
            <li key={honor.id} className="row">
              <span className="row__main">
                {honor.title}, <span className="row__muted">{honor.issuer}</span>
              </span>
              <span className="row__date">{honor.date}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="skills" title="Skills">
        <dl className="defs">
          {skillGroups.map((group) => (
            <div key={group.label} className="defs__row">
              <dt>{group.label}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}

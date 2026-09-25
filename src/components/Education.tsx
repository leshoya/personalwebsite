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
    <Section id="education" eyebrow="education & recognition" title="background.">
      <div className="background">
        <div data-reveal>
          <div className="edu">
            <h3 className="edu__school">{education.school}</h3>
            <p className="edu__degree">
              {education.degree} · GPA {education.gpa}
            </p>
            <p className="edu__courses">
              <span>Coursework</span>
              {education.courses.join(", ")}
            </p>
          </div>

          <h3 className="col__title">Skills</h3>
          <dl className="skills">
            {skillGroups.map((group) => (
              <div key={group.label} className="skills__row">
                <dt>{group.label}</dt>
                <dd>{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal>
          <h3 className="col__title">Honors</h3>
          <ul className="honors">
            {education.honors.map((honor) => (
              <li key={honor.id} className="honors__item">
                <span className="honors__date">{honor.date}</span>
                <span>
                  <strong>{honor.title}</strong>
                  <span className="honors__issuer">{honor.issuer}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

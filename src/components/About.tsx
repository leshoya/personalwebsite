import { profile } from "../data/content";
import { publicPath } from "../lib/publicPath";
import { Section } from "./Section";
import { Dots } from "./Shapes";

function Portrait() {
  return (
    <svg className="about__portrait" viewBox="0 0 400 400" role="img" aria-label="Portrait of Sophia Lee">
      <defs>
        <clipPath id="portrait-clip">
          <circle cx="200" cy="200" r="128" />
        </clipPath>
      </defs>
      <circle cx="200" cy="200" r="186" fill="#1f3442" />
      {[146, 156, 166, 176].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#a8cfe0" strokeOpacity="0.28" />
      ))}
      <circle cx="200" cy="200" r="186" fill="none" stroke="url(#g-water)" strokeWidth="12" />
      <image
        href={publicPath("images/headshot.png")}
        x="72"
        y="72"
        width="256"
        height="256"
        clipPath="url(#portrait-clip)"
        preserveAspectRatio="xMidYMid slice"
      />
      <circle cx="200" cy="200" r="132" fill="none" stroke="url(#g-coral)" strokeWidth="8" />
      <circle cx="352" cy="62" r="30" fill="none" stroke="url(#g-coral)" strokeWidth="22" />
      <Dots x={24} y={340} cols={3} rows={2} fill="#e8927c" />
    </svg>
  );
}

const facts = [
  { label: "Studying", value: `${profile.education.degree}, ${profile.education.school}` },
  { label: "Based in", value: profile.education.location },
  { label: "Focus", value: "Full-stack engineering, applied ML, healthcare" },
];

export function About() {
  return (
    <Section id="about" eyebrow="About me" title="Engineering with people in mind.">
      <div className="about">
        <Portrait />
        <div className="about__text">
          <p className="lead">
            I'm a Computer Science student at Duke who likes problems where careful engineering
            has a direct effect on people, from a medical imaging model that flags disease earlier
            to a platform thousands of employees rely on every day.
          </p>
          <p>
            I've shipped full-stack enterprise features at MetLife and the State of North
            Carolina, built AI agent interfaces and data platforms at MIT Mantis AI, and trained
            biomedical models through MIT's Medlytics program.
          </p>
          <dl className="facts">
            {facts.map((f) => (
              <div key={f.label} className="facts__row">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

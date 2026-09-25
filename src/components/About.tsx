import type { CSSProperties } from "react";
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
      <circle cx="200" cy="200" r="186" fill="#232a4a" />
      {[146, 156, 166, 176].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#b6c3f0" strokeOpacity="0.28" />
      ))}
      <circle cx="200" cy="200" r="186" fill="none" stroke="url(#g-water)" strokeWidth="12" />
      {/* Arcs that orbit the photo */}
      <circle
        className="spin"
        cx="200"
        cy="200"
        r="158"
        fill="none"
        stroke="url(#g-coral)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="140 853"
      />
      <circle
        className="spin spin--reverse"
        cx="200"
        cy="200"
        r="146"
        fill="none"
        stroke="#b6c3f0"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="60 857"
      />
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
  { label: "Interests", value: "Full-stack engineering, applied ML, healthcare tech" },
];

const photos = [
  {
    src: publicPath("images/presenting.png"),
    alt: "Sophia Lee presenting to a group",
    caption: "Presenting project work",
  },
  {
    src: publicPath("images/nc-workshop.png"),
    alt: "Sophia Lee at an NC Department of Administration workshop",
    caption: "NC Lady Cardinal Mentorship Program",
  },
  {
    src: publicPath("images/award.png"),
    alt: "Sophia Lee receiving the NCWIT Award for Aspirations in Computing",
    caption: "NCWIT Aspirations in Computing Award",
  },
];

export function About() {
  return (
    <Section id="about" eyebrow="about me" title="i like solving cool problems!">
      <div className="about" data-reveal>
        <Portrait />
        <div className="about__text">
          <p className="lead">
            I'm a computer science student at Duke. Lately that's meant training models to spot
            disease in medical scans and building software that thousands of people use at work.
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

      <div className="photos">
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
            className="photos__item"
            data-reveal
            style={{ "--i": i } as CSSProperties}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

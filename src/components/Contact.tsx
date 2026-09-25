import { profile } from "../data/content";
import { publicPath } from "../lib/publicPath";
import { Donut, Dots, Record, RingStack } from "./Shapes";

function ContactArt() {
  return (
    <svg
      className="panel__art"
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path d="M1200 0H720C760 90 820 150 940 160C1060 170 1110 230 1200 320Z" fill="url(#g-blob)" />
      <Record x={960} y={300} r={130} />
      <RingStack x={1200} y={70} r={80} stroke="#fbcab8" />
      <Donut x={760} y={420} r={60} paint="url(#g-coral)" />
      <circle cx="0" cy="480" r="120" fill="none" stroke="#a8cfe0" strokeWidth="2.5" />
      <Dots x={1100} y={420} cols={3} />
      <Dots x={690} y={60} cols={2} />
    </svg>
  );
}

export function Contact() {
  return (
    <section className="panel contact" id="contact" aria-labelledby="contact-title">
      <ContactArt />
      <div className="contact__content">
        <p className="eyebrow">Contact</p>
        <h2 className="contact__title" id="contact-title">
          Let's talk.
        </h2>
        <p className="contact__text">
          I'm looking for software engineering and ML roles. Email is the fastest way to reach me.
        </p>
        <div className="hero__actions">
          <a href={`mailto:${profile.email}`} className="btn btn--coral">
            Email me
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            GitHub
          </a>
        </div>
        <p className="contact__email">{profile.email}</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <a href={publicPath(profile.resume)} target="_blank" rel="noopener noreferrer">
        Resume (PDF)
      </a>
    </footer>
  );
}

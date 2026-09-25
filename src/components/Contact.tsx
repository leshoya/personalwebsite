import { profile } from "../data/content";
import { publicPath } from "../lib/publicPath";
import { KoiPair } from "./Koi";
import { Donut, Dots, RingStack, Star } from "./Shapes";

function ContactArt() {
  return (
    <svg
      className="panel__art"
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M1200 0H720C760 90 820 150 940 160C1060 170 1110 230 1200 320Z"
        fill="url(#g-blob)"
      />
      <RingStack x={1200} y={70} r={80} stroke="#fbcab8" />
      <g className="float">
        <Donut x={760} y={420} r={60} paint="url(#g-coral)" />
      </g>
      <circle
        cx="0"
        cy="480"
        r="120"
        fill="none"
        stroke="#b6c3f0"
        strokeWidth="2.5"
      />
      <Dots x={1100} y={420} cols={3} />
      <Dots x={690} y={60} cols={2} />
      <g className="twinkle">
        <Star x={620} y={120} kind="sparkle" size={2.2} />
      </g>
      <g className="twinkle twinkle--late">
        <Star x={160} y={420} kind="sparkle" size={1.8} />
      </g>
    </svg>
  );
}

export function Contact() {
  return (
    <section
      className="panel contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <ContactArt />
      <div className="contact__grid">
        <div className="contact__content" data-reveal>
          <p className="eyebrow">contact</p>
          <h2 className="contact__title" id="contact-title">
            let's talk!
          </h2>
          <p className="contact__text">
            I'm looking for software engineering, full-stack, and AI/ML roles.
            Email is the fastest way to reach me!
          </p>
          <div className="hero__actions">
            <a href={`mailto:${profile.email}`} className="btn btn--coral">
              email me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              GitHub
            </a>
          </div>
          <p className="contact__email">{profile.email}</p>
        </div>
        <KoiPair className="contact__koi" />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <a
        href={publicPath(profile.resume)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Resume (PDF)
      </a>
    </footer>
  );
}

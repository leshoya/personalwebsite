import { profile } from "../data/content";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="contact__text">
        I'm open to software engineering and ML roles. The best way to reach me is by email at{" "}
        <a href={`mailto:${profile.email}`}>{profile.email}</a>.
      </p>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span className="footer__links">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </span>
    </footer>
  );
}

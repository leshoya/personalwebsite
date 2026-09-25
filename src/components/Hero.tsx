import { profile } from "../data/content";
import { publicPath } from "../lib/publicPath";

export function Hero() {
  return (
    <section className="hero" id="top">
      <Rings />
      <div className="hero__text">
        <img
          src={publicPath("images/headshot.png")}
          alt="Portrait of Sophia Lee"
          className="hero__portrait"
          width={96}
          height={96}
        />
        <h1 className="hero__name">
          {profile.name}
          <span className="hero__name-alt" lang="zh">
            {profile.chineseName}
          </span>
        </h1>
        <p className="hero__role">
          {profile.tagline} · {profile.education.degree.replace("B.S. in ", "")} at{" "}
          {profile.education.school}
        </p>
        <p className="hero__summary">{profile.subtitle}</p>
        <ul className="hero__links">
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={publicPath(profile.resume)} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Rings() {
  const radii = [18, 30, 42, 54, 66, 78, 90];
  return (
    <svg className="hero__rings" viewBox="0 0 200 200" aria-hidden="true">
      {radii.map((r) => (
        <circle key={r} cx="100" cy="100" r={r} opacity={0.25 + (90 - r) / 150} />
      ))}
      <circle className="hero__rings-strong" cx="100" cy="100" r="96" />
      <circle className="hero__rings-dot" cx="100" cy="100" r="5" />
    </svg>
  );
}

import { profile } from "../data/content";
import { publicPath } from "../lib/publicPath";
import { Navigation } from "./Navigation";
import { Donut, Dots, Record, RingStack, Target } from "./Shapes";

function HeroArt() {
  return (
    <svg
      className="panel__art"
      viewBox="0 0 1200 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Lighter blob behind the headline, dark field top right */}
      <path
        d="M0 0H650C610 130 600 250 480 285C390 312 300 285 250 370C200 455 240 575 0 610Z"
        fill="url(#g-blob)"
      />
      <circle cx="1010" cy="70" r="370" fill="url(#g-shade)" />
      <circle cx="450" cy="-10" r="115" fill="url(#g-shade)" />
      <circle cx="450" cy="-10" r="58" fill="#5e8ca1" />

      <RingStack x={-10} y={215} r={66} />
      <RingStack x={20} y={305} r={52} stroke="#fbcab8" />
      <RingStack x={880} y={-38} r={80} />
      <RingStack x={995} y={-38} r={80} stroke="#fbcab8" />

      <Target x={720} y={330} r={78} />
      <Donut x={850} y={235} r={46} paint="url(#g-coral)" />
      <Record x={1015} y={455} r={150} />
      <Donut x={640} y={600} r={92} />

      <circle cx="470" cy="700" r="72" fill="none" stroke="#a8cfe0" strokeWidth="2.5" />
      <circle cx="470" cy="700" r="36" fill="none" stroke="url(#g-water)" strokeWidth="10" />
      <circle cx="790" cy="800" r="112" fill="none" stroke="#e8927c" strokeWidth="11" />
      <circle cx="790" cy="800" r="70" fill="none" stroke="#e8927c" strokeWidth="9" />
      <circle cx="935" cy="800" r="112" fill="none" stroke="#f4a896" strokeWidth="11" />
      <circle cx="935" cy="800" r="70" fill="none" stroke="#f4a896" strokeWidth="9" />
      <circle cx="1205" cy="600" r="118" fill="none" stroke="#a8cfe0" strokeWidth="2.5" />
      <circle cx="1205" cy="600" r="72" fill="none" stroke="url(#g-coral)" strokeWidth="26" />

      <Dots x={560} y={175} cols={2} />
      <Dots x={680} y={175} cols={1} />
      <Dots x={1125} y={210} cols={1} rows={2} gap={16} />
      <Dots x={1112} y={660} cols={3} rows={2} />
      <Dots x={120} y={660} cols={1} />
      <Dots x={170} y={660} cols={3} />
      <Dots x={255} y={30} cols={2} fill="#172732" />
    </svg>
  );
}

export function Hero() {
  return (
    <header className="panel hero" id="top">
      <HeroArt />
      <Navigation />
      <div className="hero__content">
        <p className="hero__eyebrow">Duke University · Computer Science</p>
        <h1 className="hero__name">
          Sophia
          <br />
          Lee
          <span className="hero__name-zh" lang="zh">
            {profile.chineseName}
          </span>
        </h1>
        <p className="hero__summary">
          {profile.tagline}. {profile.subtitle}
        </p>
        <div className="hero__actions">
          <a href="#projects" className="btn btn--coral">
            See my work
          </a>
          <a
            href={publicPath(profile.resume)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}

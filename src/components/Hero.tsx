import { useRef } from "react";
import { profile } from "../data/content";
import { publicPath } from "../lib/publicPath";
import { Navigation } from "./Navigation";
import { Cloud, Donut, Dots, Record, RingStack, Target } from "./Shapes";

function HeroArt() {
  return (
    <svg
      className="panel__art"
      viewBox="0 0 1200 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g>
        {/* Lighter blob behind the headline, dark field top right */}
        <path
          d="M0 0H650C610 130 600 250 480 285C390 312 300 285 250 370C200 455 240 575 0 610Z"
          fill="url(#g-blob)"
        />
        <circle cx="1010" cy="70" r="370" fill="url(#g-shade)" />
        <circle cx="450" cy="-10" r="115" fill="url(#g-shade)" />
        <circle cx="450" cy="-10" r="58" fill="#6876b6" />
      </g>

      <g>
        <RingStack x={-10} y={215} r={66} />
        <RingStack x={20} y={305} r={52} stroke="#fbcab8" />
        <RingStack x={880} y={-38} r={80} />
        <RingStack x={995} y={-38} r={80} stroke="#fbcab8" />

        <circle cx="470" cy="700" r="72" fill="none" stroke="#b6c3f0" strokeWidth="2.5" />
        <circle cx="470" cy="700" r="36" fill="none" stroke="url(#g-water)" strokeWidth="10" />
        <circle cx="790" cy="800" r="112" fill="none" stroke="#e8927c" strokeWidth="11" />
        <circle cx="790" cy="800" r="70" fill="none" stroke="#e8927c" strokeWidth="9" />
        <circle cx="935" cy="800" r="112" fill="none" stroke="#f4a896" strokeWidth="11" />
        <circle cx="935" cy="800" r="70" fill="none" stroke="#f4a896" strokeWidth="9" />
        <circle cx="1205" cy="600" r="118" fill="none" stroke="#b6c3f0" strokeWidth="2.5" />
        <circle cx="1205" cy="600" r="72" fill="none" stroke="url(#g-coral)" strokeWidth="26" />

        <Dots x={560} y={175} cols={2} />
        <Dots x={1125} y={210} cols={1} rows={2} gap={16} />
        <Dots x={170} y={660} cols={3} />
        <Dots x={680} y={175} cols={1} />
        <Dots x={1112} y={660} cols={3} rows={2} />
        <Dots x={120} y={660} cols={1} />
        <Dots x={255} y={30} cols={2} fill="#1c223e" />
      </g>

      <g>
        <g className="float float--slow">
          <Cloud x={700} y={110} scale={0.8} />
        </g>
        <g className="float float--alt">
          <Cloud x={1110} y={235} scale={0.55} flip fill="#f4a896" />
        </g>
        <g className="float">
          <Cloud x={330} y={600} scale={0.6} flip />
        </g>
        <g className="float">
          <Target x={720} y={330} r={78} />
        </g>
        <g className="float float--alt">
          <Donut x={850} y={235} r={46} paint="url(#g-coral)" />
        </g>
        <SpotifyRecord />
        <g className="float float--slow">
          <Donut x={640} y={600} r={92} />
        </g>
      </g>
    </svg>
  );
}

/** The big record links to Spotify; hovering spins it up and shows a caption (and plays a clip if configured). */
function SpotifyRecord() {
  const audio = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (!profile.songPreview) return;
    audio.current ??= new Audio(publicPath(profile.songPreview));
    audio.current.volume = 0.5;
    // Browsers block audio until the visitor has interacted with the page; ignore that case.
    audio.current.play().catch(() => {});
  };

  const stop = () => audio.current?.pause();

  return (
    <a
      href={profile.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="record-link"
      aria-label="Sophia's Spotify"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      <g className="spin-hover">
        <Record x={1015} y={455} r={150} />
      </g>
      <g className="record-caption">
        <rect x="905" y="262" width="220" height="44" rx="22" fill="#fffbf7" />
        <text x="1015" y="290" textAnchor="middle">
          hear me out! ♪
        </text>
      </g>
    </a>
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
            see my work
          </a>
          <a
            href={publicPath(profile.resume)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
          >
            resume
          </a>
        </div>
      </div>
    </header>
  );
}

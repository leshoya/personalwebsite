import { useEffect, useRef, useState } from "react";
import { profile } from "../data/content";
import { publicPath } from "../lib/publicPath";

const links = [
  { href: "#about", label: "about" },
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
];

/** What Snoopy says, one per click, in order. */
const greetings = [
  "hi there!",
  "welcome to my site :)",
  "hola!",
  "thanks for stopping by!",
  "bonjour!",
  "안녕하세요!",
  "hope your day's going well!",
  "konnichiwa! こんにちは",
  "ok, back to the website →",
  "nǐ hǎo! 你好",

];

/** Snoopy badge: click for a speech bubble with the next greeting. */
function GreetingBadge() {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  // Bumped on each message so the bubble's pop animation replays
  const [key, setKey] = useState(0);
  const hideTimer = useRef<number | undefined>(undefined);

  const say = (text: string, ms: number) => {
    setMessage(text);
    setKey((k) => k + 1);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setMessage(null), ms);
  };

  // A first hello shortly after load, so visitors know Snoopy talks
  useEffect(() => {
    const t = window.setTimeout(() => say(greetings[0], 3000), 1200);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  const onClick = () => {
    const next = (index + 1) % greetings.length;
    setIndex(next);
    say(greetings[next], 2400);
  };

  return (
    <span className="greet">
      <button type="button" className="greet__button" onClick={onClick} aria-label="Say hi to Snoopy">
        <img
          src={publicPath("images/snoopy-filled.png")}
          alt=""
          className="nav__badge"
          width={696}
          height={689}
        />
      </button>
      <span className="greet__live" aria-live="polite">
        {message && (
          <span key={key} className="greet__bubble">
            {message}
          </span>
        )}
      </span>
    </span>
  );
}

export function Navigation() {
  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav__brand">
        <GreetingBadge />
        <a href="#top">{profile.name}</a>
      </div>
      <ul className="nav__links">
        {links.map((link) => (
          <li key={link.href} className="nav__item">
            <a href={link.href} className="nav__link">
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="btn btn--outline btn--sm">
            contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

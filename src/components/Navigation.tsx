import { profile } from "../data/content";
import { publicPath } from "../lib/publicPath";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
];

export function Navigation() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__brand">
          <svg className="nav__mark" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" />
            <circle cx="8" cy="8" r="2.75" />
          </svg>
          {profile.name}
        </a>
        <nav aria-label="Primary">
          <ul className="nav__links">
            {links.map((link) => (
              <li key={link.href} className="nav__item">
                <a href={link.href} className="nav__link">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={publicPath(profile.resume)}
                target="_blank"
                rel="noopener noreferrer"
                className="nav__link nav__link--resume"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

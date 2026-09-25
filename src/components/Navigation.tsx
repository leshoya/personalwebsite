import { profile } from "../data/content";
import { Mark } from "./Shapes";

const links = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
];

export function Navigation() {
  return (
    <nav className="nav" aria-label="Primary">
      <a href="#top" className="nav__brand">
        <Mark />
        {profile.name}
      </a>
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

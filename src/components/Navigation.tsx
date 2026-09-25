import { profile } from "../data/content";
import { Mark } from "./Shapes";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
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
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

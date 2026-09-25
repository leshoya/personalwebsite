import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  dark?: boolean;
  art?: ReactNode;
  /** Small illustration shown beside the heading. */
  titleArt?: ReactNode;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, dark = false, art, titleArt, children }: SectionProps) {
  return (
    <section
      className={`section ${dark ? "panel section--dark" : ""}`.trim()}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      {art}
      <div className="section__inner">
        <div className="section__header" data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <div className="section__title-row">
            <h2 className="section__title" id={`${id}-title`}>
              {title}
            </h2>
            {titleArt}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

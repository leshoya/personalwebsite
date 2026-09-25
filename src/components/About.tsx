import { Section } from "./Section";
import { publicPath } from "../lib/publicPath";

const photos = [
  {
    src: publicPath("images/presenting.png"),
    alt: "Sophia Lee presenting to a group",
    caption: "Presenting project work",
  },
  {
    src: publicPath("images/nc-workshop.png"),
    alt: "Sophia Lee at an NC Department of Administration workshop",
    caption: "NC Lady Cardinal Mentorship Program",
  },
  {
    src: publicPath("images/award.png"),
    alt: "Sophia Lee receiving the NCWIT Award for Aspirations in Computing",
    caption: "NCWIT Aspirations in Computing",
  },
];

export function About() {
  return (
    <Section id="about" title="About">
      <div className="prose">
        <p>
          I'm a Computer Science student at Duke University. I like problems where careful
          engineering has a direct effect on people, whether that's a medical imaging model that
          flags disease earlier or an internal platform that thousands of employees rely on.
        </p>
        <p>
          I've built full-stack enterprise features at MetLife and the State of North Carolina,
          AI agent interfaces and data platforms at MIT Mantis AI, and biomedical ML pipelines
          through MIT's Medlytics program.
        </p>
      </div>
      <div className="photos">
        {photos.map((photo) => (
          <figure key={photo.src} className="photos__item">
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

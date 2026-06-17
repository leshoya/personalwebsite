import { motion } from "framer-motion";
import { profile } from "../data/content";
import { KoiIllustration } from "./KoiIllustration";
import { publicPath } from "../lib/publicPath";

const gallery = [
  {
    src: publicPath("images/presenting.png"),
    alt: "Sophia Lee presenting to a group",
    caption: "Leading & presenting",
  },
  {
    src: publicPath("images/nc-workshop.png"),
    alt: "Sophia Lee at NC Department of Administration workshop",
    caption: "NC Lady Cardinal Mentorship",
  },
  {
    src: publicPath("images/team-skyline.png"),
    alt: "Sophia Lee with peers at a skyline office",
    caption: "Collaborating with teams",
  },
];

export function About() {
  return (
    <section className="section about" id="about">
      <KoiIllustration className="section-deco section-deco--about" variant="coral" />

      <div className="section__header">
        <span className="section__number">01</span>
        <h2 className="section__title">About</h2>
        <p className="section__subtitle">Where precision meets creativity</p>
      </div>

      <div className="about__grid">
        <motion.div
          className="about__content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="about__lead">
            I'm a Computer Science student at <strong>Duke University</strong> passionate about
            building AI systems that improve lives — from medical imaging models that detect disease
            early, to enterprise platforms serving thousands of users.
          </p>
          <p>
            My work spans full-stack engineering at MetLife and the State of North Carolina,
            AI platform development at MIT Mantis AI, and biomedical ML research through MIT's
            Medlytics program. I thrive at the intersection of rigorous engineering and creative
            problem-solving.
          </p>
          <div className="about__honors">
            <h3>Honors & Awards</h3>
            <ul className="honors-list">
              {profile.education.honors.map((honor) => (
                <li key={honor.id} className="honors-list__item">
                  <span className="honors-list__star" aria-hidden="true" />
                  <div>
                    <p className="honors-list__title">{honor.title}</p>
                    <p className="honors-list__meta">
                      {honor.issuer} · {honor.date}
                    </p>
                    {honor.note && <p className="honors-list__note">{honor.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="about__visual"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="about__image-stack">
            <img
              src={publicPath("images/duke-chapel.png")}
              alt="Duke University Chapel at dusk"
              className="about__chapel"
            />
            <img
              src={publicPath("images/award.png")}
              alt="Sophia Lee receiving NCWIT Award"
              className="about__award"
            />
          </div>
          <div className="about__education-card">
            <h3>{profile.education.school}</h3>
            <p>{profile.education.degree}</p>
            <p className="about__location">{profile.education.location}</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="about__gallery"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {gallery.map((photo) => (
          <figure key={photo.src} className="about__gallery-item">
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </motion.div>
    </section>
  );
}

import { SvgDefs } from "./components/Shapes";
import { useReveal } from "./hooks/useReveal";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Contact, Footer } from "./components/Contact";

export default function App() {
  useReveal();

  return (
    <>
      <SvgDefs />
      <div className="page">
        <Hero />
        <main>
          <About />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

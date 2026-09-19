import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About, Contact, Education } from './components/Sections'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'

export default function App() {
  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Nav />
      <Hero />
      <main>
        <About />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  )
}



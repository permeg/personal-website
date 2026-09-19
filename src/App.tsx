import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About, Contact, Education } from './components/Sections'
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
        <Contact />
      </main>
    </>
  )
}

//         <Projects /> After Experience, before Contact


//       <Footer />



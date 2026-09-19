import { Fragment } from 'react'
import { education, profile, skills } from '../data/content'
import { projects } from '../data/projects'
import { DetailCard } from './DetailCard'

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-h">
      <div className="wrap">
        <div className="section__head">
          <span>About</span>
          <span className="meta">{profile.location}</span>
        </div>
        <div className="about">
          <h2 className="h2" id="about-h">
            Hi, I&rsquo;m <em>Megan.</em>
          </h2>
          <div className="about__body">
            <p>
              I&rsquo;m a computer science and economics student at the University of Washington, graduating in June 2028.
              This summer I interned at AWS as a software development engineer, building DynamoDB stream ingestion for an
              analytics platform.
            </p>
            <p>
              I&rsquo;m also the VP of Synaptech, a software developer at Kairos, and a teaching assistant for CSE 121, the
              intro Java course at the Allen School.
            </p>
          </div>
        </div>

        <dl className="skills" aria-label="Technical skills">
          {skills.map((s) => (
            <div className="skills__row" key={s.label}>
              <dt>{s.label}</dt>
              <dd>
                {s.items.map((i) => (
                  <Fragment key={i}>
                    {' '}
                    <span>{i}</span>
                  </Fragment>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-h">
      <div className="wrap">
        <div className="section__head">
          <span>Education</span>
          <span className="meta">47.6553° N, 122.3035° W</span>
        </div>
        <div className="edu">
          <h2 className="h2" id="education-h">
            Studying at the <em>University of Washington.</em>
          </h2>
          <DetailCard
            org={education.org}
            title={education.title}
            description={education.description}
            tags={education.tags}
            heading="h3"
          />
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-h">
      <div className="wrap">
        <div className="section__head">
          <span>Projects</span>
          <span className="meta">{projects.length} entries</span>
        </div>
        <h2 className="h2" id="projects-h" style={{ marginBottom: 'clamp(32px, 5vw, 56px)', maxWidth: '20ch' }}>
          Things I&rsquo;ve built, in <em>more detail.</em>
        </h2>
        <div className="projects">
          {projects.map((p) => (
            <DetailCard
              key={p.id}
              index={p.index}
              org={p.org}
              title={p.title}
              description={p.description}
              highlights={p.highlights}
              tags={p.tags}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-h">
      <div className="wrap">
        <div className="section__head">
          <span>Contact</span>
          <span className="meta">{profile.location}</span>
        </div>
        <h2 className="h2" id="contact-h">
          Let&rsquo;s <em>talk.</em>
        </h2>
        <p className="contact__sub">
          Internships, research, teaching: I&rsquo;m happy to hear about any of them.
        </p>
        <a className="contact__mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact__links">
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            {profile.linkedinLabel} <span aria-hidden="true">↗</span>
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            {profile.githubLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© 2026 Megan Pereira · Seattle, WA</span>
        <span>
          Map data ©{' '}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
            OpenStreetMap contributors
          </a>{' '}
          via{' '}
          <a href="https://openfreemap.org" target="_blank" rel="noreferrer">
            OpenFreeMap
          </a>
          . Neighborhood boundaries: Zillow, CC BY-SA 3.0.
        </span>
      </div>
    </footer>
  )
}

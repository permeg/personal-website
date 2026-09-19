import { Fragment } from 'react'
import { education, profile, skills } from '../data/content'
import { DetailCard } from './DetailCard'

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-h">
      <div className="wrap">
        <div className="section__head">
          <span>About</span>
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

export function Contact() {
  const rows = [
    { label: 'Email', text: profile.email, href: `mailto:${profile.email}`, external: false },
    { label: 'LinkedIn', text: profile.linkedinLabel, href: profile.linkedin, external: true },
    { label: 'GitHub', text: profile.githubLabel, href: profile.github, external: true },
  ]
  return (
    <section className="section" id="contact" aria-labelledby="contact-h">
      <div className="wrap">
        <div className="section__head">
          <span>Contact</span>
        </div>
        <div className="contact">
          <h2 className="h2" id="contact-h">
            Let&rsquo;s <em>talk.</em>
          </h2>
          <div>
            <p className="contact__sub">Internships, research, teaching: I&rsquo;m happy to hear about any of them.</p>
            <ul className="contact__list">
              {rows.map((r) => (
                <li key={r.label}>
                  <span>{r.label}</span>
                  <a href={r.href} {...(r.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    {r.text}
                    {r.external && <i aria-hidden="true"> ↗</i>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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

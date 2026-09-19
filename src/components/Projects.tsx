import { projects } from '../data/projects'
import '../styles/projects.css'

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-h">
      <div className="wrap">
        <div className="section__head">
          <span>Projects</span>
        </div>
        <h2 className="h2" id="projects-h">
          Things I&rsquo;ve <em>built.</em>
        </h2>

        <ul className="plist">
          {projects.map((p) => {
            const { live, github } = p.links
            const primary = live ?? github
            const soon = p.comingSoon
            return (
              <li key={p.id} className={primary ? 'prow prow--linked' : 'prow'}>
                <div className="prow__main">
                  <p className={soon ? 'prow__status prow__status--soon' : 'prow__status'}>
                    <i />
                    {soon ? 'Coming soon' : 'Live'}
                  </p>
                  <h3 className="prow__name">
                    {primary ? (
                      <a href={primary} target="_blank" rel="noreferrer">
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  <p className="prow__desc">{p.description}</p>
                  <ul className="tags" aria-label="Skills">
                    {p.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>

                {soon ? (
                  <div className="prow__links prow__links--soon" title="Coming soon">
                    <span aria-disabled="true" aria-label={`${p.name}: live demo, coming soon`}>
                      Live <span aria-hidden="true">↗</span>
                    </span>
                    <span aria-disabled="true" aria-label={`${p.name}: GitHub, coming soon`}>
                      GitHub <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                ) : (
                  (live || github) && (
                    <div className="prow__links">
                      {live && (
                        <a href={live} target="_blank" rel="noreferrer" aria-label={`${p.name}: live site`}>
                          Live <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {github && (
                        <a href={github} target="_blank" rel="noreferrer" aria-label={`${p.name}: source on GitHub`}>
                          GitHub <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  )
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

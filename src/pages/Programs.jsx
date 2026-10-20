import { programsPage, programs } from '../content/programs'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { Link } from '../lib/router'
import PageIntro from '../components/PageIntro'
import Picture from '../components/Picture'
import './Programs.css'

export default function Programs() {
  useDocumentTitle('Programs')
  return (
    <>
      <PageIntro title={programsPage.title}>
        <p>{programsPage.intro}</p>
      </PageIntro>
      <section className="section programs" aria-labelledby="programs-heading">
        <div className="container">
          <h2 id="programs-heading" className="programs__heading">{programsPage.listHeading}</h2>
          <ul className="programs__grid">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link to={`/programs/${p.slug}`} className="program-card">
                  <Picture name={p.image} ratio="4 / 3" sizes="(min-width: 1000px) 25vw, (min-width: 600px) 50vw, 100vw" />
                  <h3 className="program-card__title">{p.title}</h3>
                  <dl className="program-card__meta">
                    {p.duration && <div><dt className="visually-hidden">Duration</dt><dd>{p.duration}</dd></div>}
                  </dl>
                  <span className="program-card__cta">{programsPage.more}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

import { getWork, work } from '../content/work'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { Link } from '../lib/router'
import PageIntro from '../components/PageIntro'
import MediaRow from '../components/MediaRow'
import NotFound from './NotFound'
import './Work.css'

function Para({ p }) {
  if (typeof p === 'string') return <p>{p}</p>
  return (
    <p>
      <a className="text-link" href={p.href} target="_blank" rel="noopener noreferrer">{p.text}</a>
    </p>
  )
}

export default function Work({ slug }) {
  const page = getWork(slug)
  useDocumentTitle(page?.title)
  if (!page) return <NotFound />
  const others = work.filter((w) => w.slug !== slug)

  return (
    <>
      <PageIntro title={page.title} lines={page.titleLines}>
        <p>{page.intro}</p>
      </PageIntro>

      <section className="section work" aria-label={page.title}>
        <div className="container">
          {page.projects.map((proj, i) => (
            <MediaRow
              key={proj.title}
              image={proj.image}
              imageHref={proj.imageHref}
              imageLabel={proj.imageHref ? `Watch: ${proj.title}` : undefined}
              flip={i % 2 === 1}
            >
              <h2>{proj.title}</h2>
              <div className="prose">
                {proj.paragraphs.map((p, j) => <Para key={j} p={p} />)}
              </div>
              {proj.list && (
                <div className="work__list">
                  <p className="work__list-heading">{proj.listHeading}</p>
                  <ul>
                    {proj.list.map((item) => (
                      <li key={item.text}>
                        {item.href ? (
                          <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">{item.text}</a>
                        ) : (
                          item.text
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </MediaRow>
          ))}
        </div>
      </section>

      <nav className="section section--mist work-more" aria-label="More selected work">
        <div className="container work-more__grid">
          <p className="work-more__label">Selected Work</p>
          {others.map((o) => (
            <Link key={o.slug} to={`/work/${o.slug}`} className="work-more__link">{o.title}</Link>
          ))}
        </div>
      </nav>
    </>
  )
}

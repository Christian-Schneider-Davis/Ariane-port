import { getProgram, programs, programsPage } from '../content/programs'
import { site } from '../content/site'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { Link } from '../lib/router'
import Picture from '../components/Picture'
import Button from '../components/Button'
import NotFound from './NotFound'
import './ProgramDetail.css'

export default function ProgramDetail({ slug }) {
  const p = getProgram(slug)
  useDocumentTitle(p?.title)
  if (!p) return <NotFound />
  const others = programs.filter((o) => o.slug !== slug)

  return (
    <article className="program container">
      <div className="program__media">
        <Picture name={p.image} priority sizes="(min-width: 1000px) 40vw, 100vw" />
      </div>

      <div className="program__main">
        <Link to="/programs" className="program__back">{programsPage.title}</Link>
        <h1 className="program__title">{p.title}</h1>

        <div className="program__buy">
          <dl>
            {p.duration && <div><dt className="visually-hidden">Duration</dt><dd>{p.duration}</dd></div>}
            <div><dt>{programsPage.priceLabel}</dt><dd className="program__price">{p.price}</dd></div>
          </dl>
          <Button to={`mailto:${site.email}?subject=${encodeURIComponent(p.title)}`}>{programsPage.join}</Button>
        </div>

        <h2 className="program__about">{programsPage.aboutHeading}</h2>
        <div className="program__blocks">
          {p.blocks.map((b, i) => (
            <div key={i} className={`program__block ${b.label ? 'program__block--labelled' : ''}`}>
              {b.label && <h3>{b.label}</h3>}
              {b.text?.map((t) => <p key={t}>{t}</p>)}
              {b.items && <ul>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>}
            </div>
          ))}
        </div>

        <nav className="program__others" aria-label="Other programs">
          {others.map((o) => (
            <Link key={o.slug} to={`/programs/${o.slug}`}>
              <span>{o.title}</span>
              <span className="program__others-price">{o.price}</span>
            </Link>
          ))}
        </nav>
      </div>
    </article>
  )
}

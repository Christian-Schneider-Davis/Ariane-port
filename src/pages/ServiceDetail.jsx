import { getService, services, pricingCta } from '../content/services'
import { site } from '../content/site'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { Link } from '../lib/router'
import Picture from '../components/Picture'
import ItemList from '../components/ItemList'
import Button from '../components/Button'
import NotFound from './NotFound'
import './ServiceDetail.css'

function Details({ items }) {
  return (
    <dl className="svc__details">
      {items.map((d) => (
        <div key={d.label}>
          <dt>{d.label}</dt>
          {d.text.map((t) => <dd key={t}>{t}</dd>)}
        </div>
      ))}
    </dl>
  )
}

export default function ServiceDetail({ slug }) {
  const s = getService(slug)
  useDocumentTitle(s?.title)
  if (!s) return <NotFound />
  const others = services.filter((o) => o.slug !== s.slug)

  return (
    <article className="svc">
      <header className="svc__head container">
        <Link to="/services" className="svc__back">Services</Link>
        <h1 className="svc__title">{s.title}</h1>
        <p className="svc__tagline">{s.tagline}</p>
      </header>

      <div className="container">
        <Picture name={s.image} ratio="16 / 9" sizes="(min-width: 1240px) 1180px, 100vw" priority className="svc__image" />
      </div>

      <div className="container svc__body">
        <div className="svc__intro prose">
          {s.body.map((p) => <p key={p}>{p}</p>)}
          {s.intro && <Details items={s.intro} />}
        </div>

        {s.sections.map((sec) => <ItemList key={sec.heading} heading={sec.heading} items={sec.items} />)}

        <footer className="svc__foot">
          <Details items={s.details} />
          <div className="svc__closing">
            {s.closing?.map((p) => <p key={p}>{p}</p>)}
            {s.pricing && <Button to={`mailto:${site.email}?subject=${encodeURIComponent(s.title)}`}>{pricingCta}</Button>}
          </div>
        </footer>
      </div>

      <nav className="svc__others section section--mist" aria-label="Other services">
        <ul className="container">
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={`/services/${o.slug}`}>
                <Picture name={o.image} ratio="1 / 1" sizes="96px" />
                <span>{o.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  )
}

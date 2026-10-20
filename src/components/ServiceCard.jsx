import { Link } from '../lib/router'
import Picture from './Picture'
import './ServiceCard.css'

/** Home page service tile: whole tile is one link. */
export default function ServiceCard({ to, image, title, summary, cta }) {
  return (
    <Link to={to} className="service-card">
      <Picture name={image} ratio="4 / 3" sizes="(min-width: 900px) 45vw, 100vw" />
      <div className="service-card__body">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__summary">{summary}</p>
        <span className="service-card__cta">{cta}</span>
      </div>
    </Link>
  )
}

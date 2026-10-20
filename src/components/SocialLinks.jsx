import { site } from '../content/site'
import Icon from './Icon'
import './SocialLinks.css'

export default function SocialLinks({ email = false, tone = 'dark' }) {
  return (
    <ul className={`social social--${tone}`}>
      {site.social.map((s) => (
        <li key={s.label}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
            <Icon name={s.icon} />
          </a>
        </li>
      ))}
      {email && (
        <li>
          <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`}>
            <Icon name="mail" />
          </a>
        </li>
      )}
    </ul>
  )
}

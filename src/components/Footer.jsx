import { Link } from '../lib/router'
import { nav, site } from '../content/site'
import { home } from '../content/home'
import SocialLinks from './SocialLinks'
import Button from './Button'
import './Footer.css'

const flatNav = nav.flatMap((i) => (i.children ? i.children : [i]))

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__cta">
          <p className="site-footer__headline">{home.headline.join(' ')}</p>
          <Button to="/programs" variant="light">{home.cta}</Button>
        </div>

        <nav aria-label="Footer" className="site-footer__nav">
          <ul>
            {flatNav.map((i) => (
              <li key={i.to}><Link to={i.to}>{i.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contact">
          <a className="site-footer__email" href={`mailto:${site.email}`}>{site.email}</a>
          <SocialLinks tone="light" />
        </div>

        <div className="site-footer__base">
          <span className="site-footer__wordmark">{site.wordmark}</span>
          <span>{site.copyright}</span>
        </div>
      </div>
    </footer>
  )
}

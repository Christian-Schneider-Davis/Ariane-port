import { Link } from '../lib/router'
import { nav, site } from '../content/site'
import { home } from '../content/home'
import SocialLinks from './SocialLinks'
import { useSignedInHint } from '../lib/useAuth'
import Button from './Button'
import { openConsentSettings } from '../lib/consent'
import './Footer.css'

const pages = nav.filter((i) => !i.children)
const workGroup = nav.find((i) => i.children)

function FooterColumn({ title, children }) {
  return (
    <div className="site-footer__col">
      <h2 className="site-footer__col-title">{title}</h2>
      {children}
    </div>
  )
}

export default function Footer() {
  const signedIn = useSignedInHint()
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__cta">
          <p className="site-footer__headline">{home.headline.join(' ')}</p>
          <Button to="/programs" variant="light">{home.cta}</Button>
        </div>

        <nav aria-label="Footer" className="site-footer__cols">
          <FooterColumn title="Pages">
            <ul className="site-footer__list">
              {pages.map((i) => <li key={i.to}><Link to={i.to}>{i.label}</Link></li>)}
            </ul>
          </FooterColumn>
          <FooterColumn title={workGroup.label}>
            <ul className="site-footer__list">
              {workGroup.children.map((i) => <li key={i.to}><Link to={i.to}>{i.label}</Link></li>)}
            </ul>
          </FooterColumn>
          <FooterColumn title="Follow">
            <SocialLinks tone="light" />
          </FooterColumn>
        </nav>

        <div className="site-footer__base">
          <span className="site-footer__wordmark">{site.wordmark}</span>
          <span className="site-footer__meta">
            <span>{site.copyright}</span>
            <Link to="/privacy" className="site-footer__login">Privacy</Link>
            <button type="button" className="site-footer__login site-footer__cookies" onClick={openConsentSettings}>Cookie settings</button>
            <Link to="/admin" className="site-footer__login">{signedIn ? 'Dashboard' : 'Log in'}</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}

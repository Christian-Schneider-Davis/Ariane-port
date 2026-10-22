import { useEffect, useRef, useState } from 'react'
import { Link } from '../lib/router'
import { CATEGORIES, acceptAll, rejectAll, setConsent, getConsent, useConsent, onOpenRequest } from '../lib/consent'
import './CookieBanner.css'

export default function CookieBanner() {
  const consent = useConsent()
  const [open, setOpen] = useState(() => !getConsent())
  const [customize, setCustomize] = useState(false)
  const [choices, setChoices] = useState(() => ({
    analytics: Boolean(consent?.analytics),
    marketing: Boolean(consent?.marketing),
  }))
  const panel = useRef(null)
  const reopened = useRef(false)

  // "Cookie settings" in the footer reopens the panel with the current choices.
  useEffect(() => onOpenRequest(() => {
    const c = getConsent()
    setChoices({ analytics: Boolean(c?.analytics), marketing: Boolean(c?.marketing) })
    setCustomize(true)
    reopened.current = true
    setOpen(true)
  }), [])

  // Move focus only when the visitor asked for the panel, never on first load.
  useEffect(() => {
    if (open && reopened.current) panel.current?.focus()
  }, [open, customize])

  if (!open) return null
  const close = (fn) => () => { fn(); setOpen(false); setCustomize(false); reopened.current = false }

  return (
    <section
      ref={panel}
      className={`cookie ${customize ? 'cookie--wide' : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
      tabIndex={-1}
      onKeyDown={(e) => { if (e.key === 'Escape' && consent) { setOpen(false); setCustomize(false) } }}
    >
      <h2 id="cookie-title" className="cookie__title">Cookies, only with your OK</h2>
      <p id="cookie-text" className="cookie__text">
        This site uses essential storage to work. With your permission, it may also use analytics and marketing cookies. Nothing optional loads until you choose. <Link to="/privacy" className="cookie__link">Privacy policy</Link>
      </p>

      {customize && (
        <ul className="cookie__list">
          {CATEGORIES.map((c) => {
            const checked = c.locked || choices[c.id]
            return (
              <li key={c.id} className="cookie__item">
                <label className="cookie__switch">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={c.locked}
                    onChange={(e) => setChoices((s) => ({ ...s, [c.id]: e.target.checked }))}
                  />
                  <span className="cookie__track" aria-hidden="true" />
                  <span className="cookie__label">{c.label}{c.locked && <em> · always on</em>}</span>
                </label>
                <p className="cookie__desc">{c.desc}</p>
              </li>
            )
          })}
        </ul>
      )}

      <div className="cookie__actions">
        <button type="button" className="cookie__btn" onClick={close(rejectAll)}>Reject all</button>
        {customize ? (
          <button type="button" className="cookie__btn" onClick={close(() => setConsent(choices))}>Save choices</button>
        ) : (
          <button type="button" className="cookie__btn" onClick={() => setCustomize(true)}>Customize</button>
        )}
        <button type="button" className="cookie__btn cookie__btn--solid" onClick={close(acceptAll)}>Accept all</button>
      </div>
    </section>
  )
}

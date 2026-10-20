import { useEffect, useRef, useState } from 'react'
import { Link, usePath } from '../lib/router'
import { nav, site } from '../content/site'
import SocialLinks from './SocialLinks'
import Icon from './Icon'
import './Header.css'

const isActive = (path, to) => (to === '/' ? path === '/' : path === to || path.startsWith(to + '/'))

function Dropdown({ item, path }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = item.children.some((c) => isActive(path, c.to))

  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <li
      ref={ref}
      className={`nav__item nav__item--drop ${open ? 'is-open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`nav__link ${active ? 'is-active' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {item.label} <Icon name="chevron" size={16} />
      </button>
      <ul className="nav__menu">
        {item.children.map((c) => (
          <li key={c.to}>
            <Link to={c.to} className={isActive(path, c.to) ? 'is-active' : ''} aria-current={isActive(path, c.to) ? 'page' : undefined}>
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default function Header() {
  const path = usePath()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setMenuOpen(false), [path])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="site-header__bar container">
        <Link to="/" className="wordmark" aria-label={`${site.name}, home`}>
          {site.wordmark}
        </Link>

        <nav className="nav" aria-label="Main">
          <ul className="nav__list">
            {nav.map((item) =>
              item.children ? (
                <Dropdown key={item.label} item={item} path={path} />
              ) : (
                <li key={item.to} className="nav__item">
                  <Link
                    to={item.to}
                    className={`nav__link ${isActive(path, item.to) ? 'is-active' : ''}`}
                    aria-current={isActive(path, item.to) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="menu-toggle__bars" aria-hidden="true"><span /><span /></span>
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <nav aria-label="Mobile" className="container">
          <ul className="mobile-menu__list">
            {nav.map((item) =>
              item.children ? (
                <li key={item.label} className="mobile-menu__group">
                  <span className="mobile-menu__group-label">{item.label}</span>
                  <ul>
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <Link to={c.to} className="mobile-menu__sublink" aria-current={isActive(path, c.to) ? 'page' : undefined}>
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to}>
                  <Link to={item.to} className="mobile-menu__link" aria-current={isActive(path, item.to) ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <SocialLinks email />
        </nav>
      </div>
    </header>
  )
}

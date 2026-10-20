// A tiny client-side router (no dependency). It understands the site's base
// path, so links work both at github.io/<repo>/ and on a custom domain.
import { useSyncExternalStore, useCallback } from 'react'

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const EVENT = 'app:navigate'

const stripBase = (pathname) => {
  const p = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  const clean = p.replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

const subscribe = (cb) => {
  window.addEventListener('popstate', cb)
  window.addEventListener(EVENT, cb)
  return () => {
    window.removeEventListener('popstate', cb)
    window.removeEventListener(EVENT, cb)
  }
}

export const usePath = () =>
  useSyncExternalStore(subscribe, () => stripBase(window.location.pathname), () => '/')

export const href = (to) => (/^(https?:|mailto:|tel:|#)/.test(to) ? to : BASE + to)

export function navigate(to, { replace = false } = {}) {
  const url = href(to)
  if (replace) window.history.replaceState({}, '', url)
  else window.history.pushState({}, '', url)
  window.dispatchEvent(new Event(EVENT))
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

export function Link({ to, children, onClick, ...rest }) {
  const external = /^(https?:|mailto:|tel:)/.test(to)
  const handle = useCallback(
    (e) => {
      onClick?.(e)
      if (external || e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      navigate(to)
    },
    [to, external, onClick],
  )
  if (external) {
    const ext = /^https?:/.test(to) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={to} {...ext} {...rest} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <a href={href(to)} onClick={handle} {...rest}>
      {children}
    </a>
  )
}

// Match a path against patterns like "/insights/:slug".
export function matchRoute(routes, path) {
  for (const route of routes) {
    const keys = []
    const re = new RegExp(
      '^' + route.path.replace(/:[^/]+/g, (m) => (keys.push(m.slice(1)), '([^/]+)')) + '$',
    )
    const m = path.match(re)
    if (m) {
      const params = Object.fromEntries(keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]))
      return { route, params }
    }
  }
  return null
}

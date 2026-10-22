// Cookie consent. Optional categories stay off until the visitor says yes,
// and any third-party script in thirdParty.js only loads for an allowed category.
import { useSyncExternalStore } from 'react'
import { thirdParty } from './thirdParty'

const KEY = 'al-consent'
const VERSION = 1 // bump to ask everyone again (e.g. after adding a new tracker)
const OPEN_EVENT = 'al-consent-open'

export const CATEGORIES = [
  {
    id: 'necessary',
    label: 'Essential',
    desc: 'Keeps the site working, like remembering this choice.',
    locked: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    desc: 'Anonymous visit statistics that show which pages are useful.',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    desc: 'Pixels and embedded content from social networks and ad platforms.',
  },
]

function read() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return saved && saved.v === VERSION ? saved : null
  } catch {
    return null
  }
}

let state = read()
const listeners = new Set()
const loaded = new Set() // categories whose scripts are already on the page

export const getConsent = () => state
export const hasConsent = (category) => category === 'necessary' || Boolean(state && state[category])

export function setConsent(choices) {
  const next = {
    v: VERSION,
    date: new Date().toISOString(),
    necessary: true,
    analytics: Boolean(choices.analytics),
    marketing: Boolean(choices.marketing),
  }
  // A script can't be unloaded once it has run, so withdrawing consent reloads the page.
  const withdrawn = [...loaded].some((c) => !next[c])
  state = next
  try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* private mode: applies to this visit only */ }
  listeners.forEach((fn) => fn())
  if (withdrawn) window.location.reload()
  else applyConsent()
}

export const acceptAll = () => setConsent({ analytics: true, marketing: true })
export const rejectAll = () => setConsent({ analytics: false, marketing: false })

function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
export const useConsent = () => useSyncExternalStore(subscribe, getConsent, () => null)

/** Reopen the banner (used by "Cookie settings" in the footer). */
export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN_EVENT))
export function onOpenRequest(fn) {
  window.addEventListener(OPEN_EVENT, fn)
  return () => window.removeEventListener(OPEN_EVENT, fn)
}

/** Load every registered script whose category the visitor has allowed. Safe to call repeatedly. */
export function applyConsent() {
  for (const item of thirdParty) {
    if (!hasConsent(item.category) || item._done) continue
    item._done = true
    loaded.add(item.category)
    item.init?.()
    if (item.src) {
      const s = document.createElement('script')
      s.src = item.src
      s.async = true
      Object.entries(item.attrs || {}).forEach(([k, v]) => s.setAttribute(k, v))
      document.head.appendChild(s)
    }
  }
}

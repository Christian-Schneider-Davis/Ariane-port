import { site } from '../content/site'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

// Sends form data to VITE_FORM_ENDPOINT (e.g. Formspree) when configured.
// Without an endpoint, opens the visitor's email app with the message filled in.
export async function sendForm(subject, fields) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, ...fields }),
    })
    if (!res.ok) throw new Error('The message could not be sent. Check your connection and try again.')
    return 'sent'
  }
  const body = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return 'mailto'
}

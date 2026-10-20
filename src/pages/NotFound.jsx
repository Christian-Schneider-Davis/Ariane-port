import { useDocumentTitle } from '../lib/useDocumentTitle'
import Button from '../components/Button'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <section className="container" style={{ paddingTop: 'calc(var(--header-h) + 6rem)', paddingBottom: 'var(--section)' }}>
      <h1 style={{ fontSize: 'var(--step-4)', fontWeight: 300, marginBottom: '1.5rem' }}>This page doesn’t exist.</h1>
      <p style={{ color: 'var(--slate)', marginBottom: '2rem' }}>The link may be out of date. Start again from the home page.</p>
      <Button to="/">Go to home page</Button>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { useAuth, signIn, signOutUser, resetPassword, authErrorMessage } from '../lib/useAuth'
import { isFirebaseConfigured, isAdminEmail } from '../lib/firebase'
import { listAllPosts } from '../lib/postsApi'
import { formatDate } from '../lib/formatDate'
import { posts as builtInPosts } from '../content/posts'
import { Link } from '../lib/router'
import Button from '../components/Button'
import PostEditor from '../components/PostEditor'
import './Admin.css'

function useNoIndex() {
  useEffect(() => {
    const m = document.createElement('meta')
    m.name = 'robots'
    m.content = 'noindex'
    document.head.appendChild(m)
    return () => m.remove()
  }, [])
}

function SignIn() {
  const [status, setStatus] = useState({ kind: 'idle', msg: '' })
  const [email, setEmail] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const password = new FormData(e.currentTarget).get('password')
    setStatus({ kind: 'busy', msg: '' })
    try {
      await signIn(email, password)
    } catch (err) {
      setStatus({ kind: 'error', msg: authErrorMessage(err) })
    }
  }
  async function onReset() {
    if (!email) {
      setStatus({ kind: 'error', msg: 'Enter your email above, then select “Forgot password?” again.' })
      return
    }
    try {
      await resetPassword(email)
      setStatus({ kind: 'ok', msg: `If ${email} has an account, a password reset link is on its way.` })
    } catch (err) {
      setStatus({ kind: 'error', msg: authErrorMessage(err) })
    }
  }

  return (
    <div className="admin-signin">
      <h1 className="admin__title">Log in</h1>
      <p className="admin__lead">Sign in to write and publish articles on Insights.</p>
      <form onSubmit={onSubmit} className="admin-signin__form">
        <div className="field">
          <label htmlFor="admin-email">Email</label>
          <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" name="password" type="password" autoComplete="current-password" required />
        </div>
        <div className="admin-signin__actions">
          <Button type="submit" disabled={status.kind === 'busy'}>{status.kind === 'busy' ? 'Signing in…' : 'Log in'}</Button>
          <button type="button" className="admin__textbtn" onClick={onReset}>Forgot password?</button>
        </div>
        <p className={`admin__msg admin__msg--${status.kind}`} role="status" aria-live="polite">{status.msg}</p>
      </form>
    </div>
  )
}

function Dashboard({ user }) {
  const [remote, setRemote] = useState(null)
  const [error, setError] = useState('')
  const load = () =>
    listAllPosts()
      .then((p) => setRemote(p.sort((a, b) => (a.date < b.date ? 1 : -1))))
      .catch((e) => setError(authErrorMessage(e)))
  useEffect(() => { load() }, [])

  return (
    <div className="admin-dash">
      <div className="admin-dash__head">
        <div>
          <h1 className="admin__title">Your articles</h1>
          <p className="admin__lead">Signed in as {user.email}</p>
        </div>
        <div className="admin-dash__actions">
          <Button to="/admin/new">New article</Button>
          <Button variant="line" onClick={() => signOutUser()}>Log out</Button>
        </div>
      </div>

      {error && <p className="admin__msg admin__msg--error">{error}</p>}
      {!remote && !error && <p className="admin__lead">Loading articles…</p>}

      <ul className="admin-list">
        {remote?.map((p) => (
          <li key={p.id} className="admin-list__item">
            <div>
              <Link to={`/admin/edit/${p.id}`} className="admin-list__title">{p.title}</Link>
              <p className="admin-list__meta">
                <span>{formatDate(p.date)}</span>
                <span className={`admin-badge ${p.published ? 'admin-badge--live' : ''}`}>{p.published ? 'Published' : 'Draft'}</span>
              </p>
            </div>
            <div className="admin-list__links">
              <Link to={`/admin/edit/${p.id}`}>Edit</Link>
              {p.published && <Link to={`/insights/${p.slug}`}>View</Link>}
            </div>
          </li>
        ))}
        {builtInPosts.map((p) => (
          <li key={p.slug} className="admin-list__item admin-list__item--fixed">
            <div>
              <Link to={`/insights/${p.slug}`} className="admin-list__title">{p.title}</Link>
              <p className="admin-list__meta">
                <span>{formatDate(p.date)}</span>
                <span className="admin-badge">Built into the site</span>
              </p>
            </div>
            <div className="admin-list__links"><Link to={`/insights/${p.slug}`}>View</Link></div>
          </li>
        ))}
      </ul>
      {remote?.length === 0 && <p className="admin__hint">Select “New article” to write your first post. It appears on Insights as soon as you publish it.</p>}
    </div>
  )
}

export default function Admin({ mode, slug }) {
  useDocumentTitle('Log in')
  useNoIndex()
  const { user, loading } = useAuth()

  let body
  if (!isFirebaseConfigured) {
    body = (
      <div className="admin-signin">
        <h1 className="admin__title">Log in</h1>
        <p className="admin__lead">Sign-in isn’t set up yet. Add the Firebase project details to <code>src/firebase.config.js</code>.</p>
      </div>
    )
  } else if (loading) {
    body = <p className="admin__lead">Loading…</p>
  } else if (!user) {
    body = <SignIn />
  } else if (!isAdminEmail(user.email)) {
    body = (
      <div className="admin-signin">
        <h1 className="admin__title">No access</h1>
        <p className="admin__lead">{user.email} isn’t allowed to edit articles.</p>
        <Button variant="line" onClick={() => signOutUser()}>Log out</Button>
      </div>
    )
  } else if (mode === 'new' || mode === 'edit') {
    body = <PostEditor slug={mode === 'edit' ? slug : null} />
  } else {
    body = <Dashboard user={user} />
  }

  return <section className="admin container">{body}</section>
}

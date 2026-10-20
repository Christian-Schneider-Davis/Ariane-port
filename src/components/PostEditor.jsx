import { useEffect, useState } from 'react'
import { fetchPost, savePost, deletePost, bodyToParagraphs, readTimeFor } from '../lib/postsApi'
import { authErrorMessage } from '../lib/useAuth'
import { navigate, Link } from '../lib/router'
import { posts as builtInPosts } from '../content/posts'
import { formatDate } from '../lib/formatDate'
import Button from './Button'
import './PostEditor.css'

const today = () => new Date().toISOString().slice(0, 10)

export default function PostEditor({ slug }) {
  const [form, setForm] = useState(slug ? null : { title: '', date: today(), body: '', published: false })
  const [status, setStatus] = useState({ kind: 'idle', msg: '' })
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetchPost(slug)
      .then((p) => (p ? setForm({ title: p.title, date: p.date, body: p.body, published: p.published }) : setStatus({ kind: 'error', msg: 'This article no longer exists.' })))
      .catch((e) => setStatus({ kind: 'error', msg: authErrorMessage(e) }))
  }, [slug])

  useEffect(() => {
    if (!dirty) return
    const warn = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  if (!form) return <p className="admin__lead">{status.msg || 'Loading article…'}</p>

  const set = (k) => (e) => {
    setDirty(true)
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  }

  async function save(published) {
    if (!form.title.trim() || !form.body.trim()) {
      setStatus({ kind: 'error', msg: 'Add a title and some text before saving.' })
      return
    }
    setStatus({ kind: 'busy', msg: published ? 'Publishing…' : 'Saving…' })
    try {
      const id = await savePost({ id: slug, ...form, published }, builtInPosts.map((p) => p.slug))
      setDirty(false)
      setForm((f) => ({ ...f, published }))
      setStatus({ kind: 'ok', msg: published ? 'Published. It’s now live on Insights.' : 'Draft saved. Only you can see it.' })
      if (!slug) navigate(`/admin/edit/${id}`, { replace: true })
    } catch (e) {
      setStatus({ kind: 'error', msg: authErrorMessage(e) })
    }
  }

  async function remove() {
    setStatus({ kind: 'busy', msg: 'Deleting…' })
    try {
      await deletePost(slug)
      setDirty(false)
      navigate('/admin')
    } catch (e) {
      setStatus({ kind: 'error', msg: authErrorMessage(e) })
    }
  }

  const paragraphs = bodyToParagraphs(form.body)
  const busy = status.kind === 'busy'

  return (
    <div className="editor">
      <div className="editor__bar">
        <Link to="/admin" className="editor__back">Your articles</Link>
        <span className={`admin-badge ${form.published ? 'admin-badge--live' : ''}`}>{form.published ? 'Published' : 'Draft'}</span>
      </div>

      <div className="editor__grid">
        <form className="editor__form" onSubmit={(e) => { e.preventDefault(); save(true) }}>
          <div className="field">
            <label htmlFor="post-title">Title</label>
            <input id="post-title" value={form.title} onChange={set('title')} required maxLength={200} />
          </div>
          <div className="field editor__date">
            <label htmlFor="post-date">Date</label>
            <input id="post-date" type="date" value={form.date} onChange={set('date')} required />
          </div>
          <div className="field">
            <label htmlFor="post-body">Text</label>
            <textarea id="post-body" value={form.body} onChange={set('body')} rows={18} />
            <p className="editor__help">Leave an empty line between paragraphs.</p>
          </div>

          <div className="editor__actions">
            <Button type="submit" disabled={busy}>{form.published ? 'Update' : 'Publish'}</Button>
            <Button variant="line" disabled={busy} onClick={() => save(false)}>{form.published ? 'Unpublish' : 'Save draft'}</Button>
            {slug && !confirmDelete && (
              <button type="button" className="admin__textbtn editor__delete" onClick={() => setConfirmDelete(true)}>Delete article</button>
            )}
            {slug && confirmDelete && (
              <span className="editor__confirm">
                Delete for good?
                <button type="button" className="admin__textbtn editor__delete" onClick={remove}>Yes, delete</button>
                <button type="button" className="admin__textbtn" onClick={() => setConfirmDelete(false)}>Keep it</button>
              </span>
            )}
          </div>
          <p className={`admin__msg admin__msg--${status.kind}`} role="status" aria-live="polite">{status.kind === 'busy' ? '' : status.msg}</p>
        </form>

        <aside className="editor__preview" aria-label="Preview">
          <p className="editor__preview-label">Preview</p>
          <h2 className="editor__preview-title">{form.title || 'Untitled article'}</h2>
          <p className="editor__preview-meta">
            {form.date && <span>{formatDate(form.date)}</span>}
            <span>{readTimeFor(form.body || ' ')}</span>
          </p>
          <div className="editor__preview-body">
            {paragraphs.length ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p className="editor__empty">Your text will appear here.</p>}
          </div>
        </aside>
      </div>
    </div>
  )
}

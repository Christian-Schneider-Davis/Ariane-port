import { useEffect, useState } from 'react'
import { getPost } from '../content/posts'
import { fetchPost } from '../lib/postsApi'
import { isFirebaseConfigured } from '../lib/firebase'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { Link } from '../lib/router'
import { formatDate } from '../lib/formatDate'
import NotFound from './NotFound'
import './Post.css'

export default function Post({ slug }) {
  const builtIn = getPost(slug)
  const [remote, setRemote] = useState(undefined) // undefined = loading, null = not found
  useEffect(() => {
    if (builtIn) return
    if (!isFirebaseConfigured) return setRemote(null)
    setRemote(undefined)
    fetchPost(slug)
      .then((p) => setRemote(p && p.published ? p : null))
      .catch(() => setRemote(null))
  }, [slug, builtIn])
  const post = builtIn || remote
  useDocumentTitle(post?.title)
  if (!builtIn && remote === undefined) {
    return <article className="post container"><p className="post__loading">Loading article…</p></article>
  }
  if (!post) return <NotFound />
  return (
    <article className="post container">
      <header className="post__head">
        <Link to="/insights" className="post__back">Insights</Link>
        <h1 className="post__title">{post.title}</h1>
        <p className="post__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readTime}</span>
        </p>
      </header>
      <div className="post__body">
        {post.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        {post.signature && <p className="post__signature">{post.signature}</p>}
      </div>
    </article>
  )
}

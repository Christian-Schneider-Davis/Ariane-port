import { getPost } from '../content/posts'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { Link } from '../lib/router'
import { formatDate } from '../lib/formatDate'
import NotFound from './NotFound'
import './Post.css'

export default function Post({ slug }) {
  const post = getPost(slug)
  useDocumentTitle(post?.title)
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

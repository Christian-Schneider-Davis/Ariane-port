import { insightsPage, posts } from '../content/posts'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { Link } from '../lib/router'
import { formatDate } from '../lib/formatDate'
import PageIntro from '../components/PageIntro'
import './Insights.css'

export default function Insights() {
  useDocumentTitle('Insights')
  return (
    <>
      <PageIntro title={insightsPage.title} />
      <section className="container insights" aria-label="Articles">
        <ul className="insights__list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link to={`/insights/${p.slug}`} className="post-card">
                <div className="post-card__meta">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span>{p.readTime}</span>
                </div>
                <div>
                  <h2 className="post-card__title">{p.title}</h2>
                  <p className="post-card__excerpt">{p.paragraphs[0]}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

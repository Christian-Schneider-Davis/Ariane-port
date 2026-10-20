import { about } from '../content/about'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import Picture from '../components/Picture'
import SocialLinks from '../components/SocialLinks'
import './About.css'

export default function About() {
  useDocumentTitle('About')
  return (
    <>
      <section className="about container" aria-labelledby="about-title">
        <div className="about__side">
          <h1 id="about-title" className="about__title">{about.title}</h1>
          <p className="about__name">{about.name}</p>
          <SocialLinks />
        </div>
        <div className="about__text">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 1 ? 'about__pull' : undefined}>{p}</p>
          ))}
        </div>
      </section>

      <div className="container about__photo">
        <Picture name="aboutPortrait" ratio="4 / 3" position="50% 22%" sizes="(min-width: 1240px) 1180px, 100vw" />
      </div>

      <section className="section about-beyond" aria-labelledby="beyond-title">
        <div className="container about-beyond__grid">
          <h2 id="beyond-title" className="about-beyond__title">{about.beyond.heading}</h2>
          <div className="prose">
            {about.beyond.paragraphs.map((p, i) => (
              <p key={i} className={i === 2 ? 'about__belief' : undefined}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

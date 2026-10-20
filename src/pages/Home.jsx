import { home } from '../content/home'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import Picture from '../components/Picture'
import Button from '../components/Button'
import ServiceCard from '../components/ServiceCard'
import './Home.css'

export default function Home() {
  useDocumentTitle('')
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero__title">
          {home.headline.map((line, i) => (
            <span key={i} className={`hero__line hero__line--${i + 1}`} style={{ '--i': i }}>
              {line}
            </span>
          ))}
        </h1>
        <div className="hero__intro">
          <p>{home.intro}</p>
          <Button to="/programs">{home.cta}</Button>
        </div>
        <Picture name="hero" priority className="hero__image" ratio="3 / 2" position="50% 60%" sizes="(min-width: 1240px) 1180px, 100vw" />
      </section>

      <section className="home-about section" aria-labelledby="about-title">
        <div className="container home-about__grid">
          <div className="home-about__text">
            <h2 id="about-title" className="home-about__heading">{home.about.heading}</h2>
            <p className="home-about__lead">{home.about.lead}</p>
            <div className="prose">
              {home.about.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            <Button to="/about" variant="line">{home.about.cta}</Button>
          </div>
          <Picture name="portraitBw" className="home-about__portrait" ratio="704 / 832" sizes="(min-width: 900px) 34vw, 90vw" />
        </div>
      </section>

      <section className="home-services section section--mist" aria-labelledby="services-title">
        <div className="container">
          <h2 id="services-title" className="home-services__heading">{home.servicesHeading}</h2>
          <div className="home-services__grid">
            {home.services.map((s) => (
              <ServiceCard
                key={s.slug}
                to={`/services/${s.slug}`}
                image={s.image}
                title={s.title}
                summary={s.summary}
                cta={home.serviceCta}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

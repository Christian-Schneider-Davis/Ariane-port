import { servicesPage, services } from '../content/services'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import PageIntro from '../components/PageIntro'
import MediaRow from '../components/MediaRow'
import Button from '../components/Button'
import Form from '../components/Form'
import './Services.css'

export default function Services() {
  useDocumentTitle('Services')
  return (
    <>
      <PageIntro title={servicesPage.title} lead={servicesPage.lead}>
        <p>{servicesPage.intro}</p>
      </PageIntro>

      <section className="section services-list" aria-labelledby="services-heading">
        <div className="container">
          <h2 id="services-heading" className="services-list__heading">{servicesPage.listHeading}</h2>
          {services.map((s, i) => (
            <MediaRow key={s.slug} image={s.image} ratio="1 / 1" flip={i % 2 === 1}>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
              <div className="services-list__cta">
                <Button to={`/services/${s.slug}`} variant="line">{servicesPage.more}</Button>
              </div>
            </MediaRow>
          ))}
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="quote-heading">
        <div className="container">
          <div className="quote">
          <h2 id="quote-heading" className="quote__heading">{servicesPage.quote.heading}</h2>
          <Form
            compact
            subject="Quote request"
            submitLabel={servicesPage.quote.submit}
            fields={[
              { name: 'first', label: 'First Name', required: true, autoComplete: 'given-name' },
              { name: 'last', label: 'Last Name', required: true, autoComplete: 'family-name' },
              { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
            ]}
          />
          </div>
        </div>
      </section>
    </>
  )
}

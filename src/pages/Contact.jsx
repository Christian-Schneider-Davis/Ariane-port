import { contact } from '../content/about'
import { site } from '../content/site'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import Form from '../components/Form'
import SocialLinks from '../components/SocialLinks'
import './Contact.css'

export default function Contact() {
  useDocumentTitle('Contact')
  return (
    <section className="contact container" aria-labelledby="contact-title">
      <div className="contact__intro">
        <h1 id="contact-title" className="contact__title">{contact.title}</h1>
        <p>{contact.intro}</p>
        <a className="text-link contact__email" href={`mailto:${site.email}`}>{site.email}</a>
        <SocialLinks />
      </div>
      <div className="contact__form">
        <h2 className="contact__form-title">{contact.formHeading}</h2>
        <Form
          subject="Website enquiry"
          submitLabel={contact.submit}
          fields={[
            { name: 'first', label: 'First Name*', required: true, autoComplete: 'given-name' },
            { name: 'last', label: 'Last Name*', required: true, autoComplete: 'family-name' },
            { name: 'email', label: 'Email*', type: 'email', required: true, autoComplete: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
            { name: 'message', label: 'Message', multiline: true },
          ]}
        />
      </div>
    </section>
  )
}

import { site } from '../content/site'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { openConsentSettings } from '../lib/consent'
import PageIntro from '../components/PageIntro'
import './Privacy.css'

const UPDATED = '22 October 2026'
// The Formspree paragraph only appears once a form endpoint is configured.
const usesFormService = Boolean(import.meta.env.VITE_FORM_ENDPOINT)

const Ext = ({ href, children }) => (
  <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
)

export default function Privacy() {
  useDocumentTitle('Privacy Policy')
  const mail = <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a>
  return (
    <>
      <PageIntro title="Privacy Policy">
        <p>How this website handles your information, in plain language. Last updated {UPDATED}.</p>
      </PageIntro>

      <div className="container privacy prose">
        <section>
          <h2>Who is responsible</h2>
          <p>This website belongs to {site.name}, an independent consultant, who is responsible (the “data controller”) for any personal information collected through it. For any question about your data, write to {mail}.</p>
        </section>

        <section>
          <h2>The short version</h2>
          <ul>
            <li>You can browse the whole site without giving any personal information.</li>
            <li>The site does not use analytics, advertising or tracking cookies.</li>
            <li>Your information is never sold or shared for marketing.</li>
            <li>If you send a message, it is used only to reply to you.</li>
          </ul>
        </section>

        <section>
          <h2>When you get in touch</h2>
          <p>If you use the contact or quote forms, or email directly, Ariane receives what you choose to share: usually your name, email address, phone number and message. This is used only to answer your enquiry and follow up on it, because you asked to be contacted (GDPR Article 6(1)(b)), and is kept only as long as needed for that conversation.</p>
          {usesFormService ? (
            <p>Form messages are delivered through <Ext href="https://formspree.io/legal/privacy-policy">Formspree</Ext>, a form-handling service, and then arrive in Ariane’s Gmail inbox, provided by <Ext href="https://policies.google.com/privacy">Google</Ext>.</p>
          ) : (
            <p>The forms do not send anything by themselves: they open your own email app with your message filled in, so nothing leaves your device until you press send. Messages arrive in Ariane’s Gmail inbox, provided by <Ext href="https://policies.google.com/privacy">Google</Ext>.</p>
          )}
        </section>

        <section>
          <h2>Hosting</h2>
          <p>The site is hosted on <Ext href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub Pages</Ext>. Like any web host, GitHub receives technical information when you visit, such as your IP address and browser type, and may keep it briefly in server logs for security. Ariane does not have access to these logs.</p>
        </section>

        <section>
          <h2>Insights articles</h2>
          <p>Some articles on the Insights page are loaded from Google <Ext href="https://firebase.google.com/support/privacy">Firebase</Ext>, the service Ariane uses to publish them. When those pages load, your browser connects to Google’s servers, which receive your IP address. No cookies are set and no profile is built for readers.</p>
        </section>

        <section>
          <h2>Cookies and local storage</h2>
          <p>The site only stores what it needs to work:</p>
          <ul>
            <li><strong>Your cookie choice</strong>, saved in your browser so you are not asked on every page.</li>
            <li><strong>Sign-in data</strong> for the article editor, only if you log in (which only Ariane does).</li>
          </ul>
          <p>Analytics and marketing cookies are off by default. None are in use today; if any are added, they will run only if you allow them. You can review or change your choice at any time.</p>
          <p><button type="button" className="privacy__settings" onClick={openConsentSettings}>Open cookie settings</button></p>
        </section>

        <section>
          <h2>Fonts and images</h2>
          <p>Fonts and photographs are served from this website itself, so loading a page does not contact font or image services.</p>
        </section>

        <section>
          <h2>Links to other websites</h2>
          <p>The site links to other websites, such as LinkedIn, Instagram, YouTube and project sites. Those sites have their own privacy policies, which apply once you visit them.</p>
        </section>

        <section>
          <h2>Data outside the EU</h2>
          <p>GitHub, Google{usesFormService ? ' and Formspree' : ''} are based in the United States, so some data may be processed there. These providers use legal safeguards for such transfers, such as the EU–US Data Privacy Framework or the European Commission’s standard contractual clauses.</p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>Under data protection law (including the GDPR) you can ask to see the personal data held about you, correct it, delete it, limit or object to its use, or receive a copy. Where something relies on your consent, you can withdraw it at any time. To do any of this, write to {mail}. You also have the right to complain to the data protection authority in the country where you live or work.</p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>If this policy changes, the new version will be posted here with a new date at the top.</p>
        </section>
      </div>
    </>
  )
}

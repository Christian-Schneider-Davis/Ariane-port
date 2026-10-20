import './PageIntro.css'

/** Top of an inner page: title (optionally split into lines), a lead line and an intro paragraph. */
export default function PageIntro({ title, lines, lead, children, aside }) {
  return (
    <header className="page-intro container">
      <div className="page-intro__main">
        <h1 className="page-intro__title">
          {lines ? lines.map((l, i) => <span key={i}>{l}</span>) : title}
        </h1>
        {(lead || children) && (
          <div className="page-intro__text">
            {lead && <p className="page-intro__lead">{lead}</p>}
            {children}
          </div>
        )}
      </div>
      {aside && <div className="page-intro__aside">{aside}</div>}
    </header>
  )
}

import Picture from './Picture'
import Icon from './Icon'
import './MediaRow.css'

/** Image + text side by side; alternates sides with `flip`. Stacks on mobile. */
export default function MediaRow({ image, imageHref, imageLabel, flip = false, children, ratio }) {
  const pic = <Picture name={image} ratio={ratio} sizes="(min-width: 900px) 46vw, 100vw" />
  return (
    <article className={`media-row ${flip ? 'media-row--flip' : ''}`}>
      <div className="media-row__media">
        {imageHref ? (
          <a href={imageHref} target="_blank" rel="noopener noreferrer" className="media-row__link" aria-label={imageLabel}>
            {pic}
            <span className="media-row__badge" aria-hidden="true"><Icon name="play" size={18} /></span>
          </a>
        ) : (
          pic
        )}
      </div>
      <div className="media-row__text">{children}</div>
    </article>
  )
}

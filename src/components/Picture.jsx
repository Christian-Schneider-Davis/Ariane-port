import { images, IMAGE_SOURCE } from '../content/images'
import './Picture.css'

const CDN = 'https://static.wixstatic.com/media/'
const WIDTHS = [480, 800, 1200, 1600, 2200]

const wixUrl = (id, w) => `${CDN}${id}/v1/fit/w_${w},h_${w * 2},q_90,usm_0.66_1.00_0.01,enc_auto/${id}`
const localUrl = (key) => `${import.meta.env.BASE_URL}images/${key}.jpg`

/**
 * Responsive image. `name` is a key from content/images.js.
 * `ratio` (e.g. "4 / 3") crops with object-fit; omit it to keep the photo's own shape.
 * `position` sets the crop focus (CSS object-position).
 */
export default function Picture({ name, sizes = '100vw', ratio, position, priority = false, className = '' }) {
  const img = images[name]
  if (!img) return null
  const widths = WIDTHS.filter((w) => w < img.w).concat(Math.min(img.w, 2600))
  const src = IMAGE_SOURCE === 'local' ? localUrl(name) : wixUrl(img.id, Math.min(1200, img.w))
  const srcSet = IMAGE_SOURCE === 'local' ? undefined : widths.map((w) => `${wixUrl(img.id, w)} ${w}w`).join(', ')
  return (
    <div className={`picture ${className}`} style={{ aspectRatio: ratio || `${img.w} / ${img.h}` }}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={img.alt}
        width={img.w}
        height={img.h}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  )
}

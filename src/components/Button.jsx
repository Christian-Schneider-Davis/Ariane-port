import { Link } from '../lib/router'
import './Button.css'

export default function Button({ to, children, variant = 'solid', type, ...rest }) {
  const cls = `btn btn--${variant}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  return <button type={type || 'button'} className={cls} {...rest}>{children}</button>
}

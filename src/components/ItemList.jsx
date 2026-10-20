import './ItemList.css'

/** A titled list, e.g. "What this can include". Long lists flow into two columns. */
export default function ItemList({ heading, items }) {
  return (
    <section className="item-list">
      <h2 className="item-list__heading">{heading}</h2>
      <ul className={`item-list__items ${items.length > 6 ? 'item-list__items--cols' : ''}`}>
        {items.map((it) => <li key={it}>{it}</li>)}
      </ul>
    </section>
  )
}

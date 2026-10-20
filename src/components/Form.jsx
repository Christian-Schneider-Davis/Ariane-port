import { useId, useState } from 'react'
import { sendForm } from '../lib/sendForm'
import Button from './Button'
import './Form.css'

/**
 * Generic form. `fields` = [{ name, label, type?, required?, wide?, multiline? }]
 * Labels are shown exactly as given (e.g. "First Name*").
 */
export default function Form({ subject, fields, submitLabel, compact = false }) {
  const uid = useId()
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    const data = Object.fromEntries(new FormData(form))
    if (data._gotcha) return // spam trap
    delete data._gotcha
    setStatus('sending')
    try {
      const result = await sendForm(subject, data)
      setStatus(result)
      if (result === 'sent') form.reset()
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <form className={`form ${compact ? 'form--compact' : ''}`} onSubmit={onSubmit} noValidate>
      <div className="form__grid">
        {fields.map((f) => {
          const id = `${uid}-${f.name}`
          const Tag = f.multiline ? 'textarea' : 'input'
          return (
            <div key={f.name} className={`field ${f.wide || f.multiline ? 'field--wide' : ''}`}>
              <label htmlFor={id}>{f.label}</label>
              <Tag
                id={id}
                name={f.label.replace('*', '').trim()}
                type={f.multiline ? undefined : f.type || 'text'}
                required={f.required}
                rows={f.multiline ? 6 : undefined}
                autoComplete={f.autoComplete}
              />
            </div>
          )
        })}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
      </div>
      <div className="form__footer">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : submitLabel}
        </Button>
        <p className="form__status" role="status" aria-live="polite">
          {status === 'sent' && 'Thank you, your message has been sent.'}
          {status === 'mailto' && 'Your email app should now open with your message ready to send.'}
          {status === 'error' && error}
        </p>
      </div>
    </form>
  )
}

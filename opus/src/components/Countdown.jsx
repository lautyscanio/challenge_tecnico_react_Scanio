import { memo } from 'react'

export const Countdown = memo(function Countdown({ message }) {
  if (!message) return <div className="countdown-slot" />

  return (
    <div className="countdown-slot">
      <span className="countdown-text" key={message} role="status" aria-live="assertive">
        {message}
      </span>
    </div>
  )
})

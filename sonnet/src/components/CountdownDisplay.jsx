export function CountdownDisplay({ message }) {
  if (!message) return null

  return (
    <div className="countdown-display" key={message} aria-live="assertive">
      {message}
    </div>
  )
}

import { Phase } from '../constants'

export function ResultBanner({ phase, score, maxScore }) {
  if (phase !== Phase.FINISHED) return null

  const isNewRecord = score >= maxScore && score > 0

  return (
    <div className={`result-banner ${isNewRecord ? 'result-banner--record' : ''}`} role="alert">
      <span className="result-score">{score} clics</span>
      {isNewRecord && <span className="result-badge">¡Nuevo récord!</span>}
    </div>
  )
}

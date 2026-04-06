export function ScoreDisplay({ maxScore, currentScore, timeLeft, gameActive }) {
  return (
    <div className="score-display">
      <div className="score-item max-score">
        <span className="score-label">Puntaje Máximo</span>
        <span className="score-value">{maxScore}</span>
      </div>

      {gameActive && (
        <>
          <div className="score-item current-score">
            <span className="score-label">Puntaje Actual</span>
            <span className="score-value highlight-blue">{currentScore}</span>
          </div>
          <div className="score-item time-left">
            <span className="score-label">Tiempo Restante</span>
            <span className={`score-value ${timeLeft <= 2 ? 'highlight-red' : 'highlight-yellow'}`}>
              {timeLeft}s
            </span>
          </div>
        </>
      )}
    </div>
  )
}

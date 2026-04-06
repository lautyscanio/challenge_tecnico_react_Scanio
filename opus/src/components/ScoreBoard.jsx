import { GAME_DURATION } from '../constants'

export function ScoreBoard({ maxScore, score, timeLeft, isPlaying }) {
  const progress = isPlaying ? (timeLeft / GAME_DURATION) * 100 : 0

  return (
    <section className="scoreboard" aria-label="Marcador">
      <div className="scoreboard-row">
        <span className="scoreboard-label">Mejor puntaje</span>
        <span className="scoreboard-value" aria-live="polite">{maxScore}</span>
      </div>

      {isPlaying && (
        <>
          <div className="scoreboard-row">
            <span className="scoreboard-label">Puntaje actual</span>
            <span className="scoreboard-value score-active" aria-live="polite">{score}</span>
          </div>

          <div className="timer-section">
            <div className="timer-bar-track" role="progressbar" aria-valuenow={timeLeft} aria-valuemin={0} aria-valuemax={GAME_DURATION}>
              <div
                className={`timer-bar-fill ${timeLeft <= 2 ? 'timer-bar-fill--danger' : ''}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="timer-text">{timeLeft}s</span>
          </div>
        </>
      )}
    </section>
  )
}

import { Phase } from '../constants'

export function GameControls({ phase, onStart, onClick, onReset }) {
  const isIdle = phase === Phase.IDLE
  const isPlaying = phase === Phase.PLAYING
  const isFinished = phase === Phase.FINISHED

  return (
    <div className="controls">
      {isFinished ? (
        <button className="btn btn-restart" onClick={onReset} aria-label="Jugar de nuevo">
          Jugar de nuevo
        </button>
      ) : (
        <button
          className="btn btn-start"
          onClick={onStart}
          disabled={!isIdle}
          aria-label="Iniciar el juego"
        >
          {isIdle ? 'Iniciar Juego' : 'Esperá...'}
        </button>
      )}

      <button
        className={`btn btn-click ${isPlaying ? 'btn-click--ready' : ''}`}
        onClick={onClick}
        disabled={!isPlaying}
        aria-label="Hacer click para sumar puntos"
      >
        ¡Click!
      </button>
    </div>
  )
}

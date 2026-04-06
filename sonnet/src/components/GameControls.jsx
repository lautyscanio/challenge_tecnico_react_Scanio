export function GameControls({ gameStarted, gameActive, onStart, onClick }) {
  return (
    <div className="game-controls">
      <button
        className="btn btn-start"
        onClick={onStart}
        disabled={gameStarted}
        aria-label="Iniciar el juego"
      >
        Iniciar Juego
      </button>

      <button
        className={`btn btn-click ${gameActive ? 'btn-click--active' : ''}`}
        onClick={onClick}
        disabled={!gameActive}
        aria-label="Clickear durante el juego"
      >
        ¡Clickear!
      </button>
    </div>
  )
}

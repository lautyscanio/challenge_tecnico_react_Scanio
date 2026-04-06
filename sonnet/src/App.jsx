import './App.css'
import { useGame } from './hooks/useGame'
import { ScoreDisplay } from './components/ScoreDisplay'
import { CountdownDisplay } from './components/CountdownDisplay'
import { GameControls } from './components/GameControls'

function App() {
  const {
    maxScore,
    currentScore,
    gameStarted,
    gameActive,
    countdown,
    timeLeft,
    startGame,
    handleClick,
  } = useGame()

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">JuegoContador</h1>
        <p className="app-subtitle">¿Cuántos clics podés hacer en 5 segundos?</p>
      </header>

      <main className="app-main">
        <ScoreDisplay
          maxScore={maxScore}
          currentScore={currentScore}
          timeLeft={timeLeft}
          gameActive={gameActive}
        />

        <div className="countdown-area">
          <CountdownDisplay message={countdown} />
        </div>

        <GameControls
          gameStarted={gameStarted}
          gameActive={gameActive}
          onStart={startGame}
          onClick={handleClick}
        />
      </main>
    </div>
  )
}

export default App

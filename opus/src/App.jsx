import './App.css'
import { useGame } from './hooks/useGame'
import { Phase } from './constants'
import { ScoreBoard } from './components/ScoreBoard'
import { Countdown } from './components/Countdown'
import { GameControls } from './components/GameControls'
import { ResultBanner } from './components/ResultBanner'

function App() {
  const {
    phase,
    score,
    maxScore,
    timeLeft,
    countdownMessage,
    startGame,
    handleClick,
    resetGame,
  } = useGame()

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">JuegoContador</h1>
        <p className="subtitle">Hacé la mayor cantidad de clics en 5 segundos</p>
      </header>

      <ScoreBoard
        maxScore={maxScore}
        score={score}
        timeLeft={timeLeft}
        isPlaying={phase === Phase.PLAYING}
      />

      <Countdown message={countdownMessage} />

      <ResultBanner phase={phase} score={score} maxScore={maxScore} />

      <GameControls
        phase={phase}
        onStart={startGame}
        onClick={handleClick}
        onReset={resetGame}
      />
    </div>
  )
}

export default App

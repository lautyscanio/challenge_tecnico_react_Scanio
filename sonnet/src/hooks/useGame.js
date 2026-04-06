import { useState, useEffect, useCallback } from 'react'

const COUNTDOWN_SEQUENCE = ['Preparados', 'Listos', 'Ya']
const GAME_DURATION_SECONDS = 5

export function useGame() {
  const [maxScore, setMaxScore] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const [countdown, setCountdown] = useState('')
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS)

  // Timer del juego activo: decrementa cada segundo y termina al llegar a 0
  useEffect(() => {
    if (!gameActive) return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setGameActive(false)
          setGameStarted(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [gameActive])

  // Muestra la secuencia de cuenta regresiva y luego activa el juego
  const runCountdown = useCallback(() => {
    let step = 0

    const showNextMessage = () => {
      if (step < COUNTDOWN_SEQUENCE.length) {
        setCountdown(COUNTDOWN_SEQUENCE[step])
        step++
        setTimeout(showNextMessage, 1000)
      } else {
        setCountdown('')
        setGameActive(true)
        setTimeLeft(GAME_DURATION_SECONDS)
      }
    }

    showNextMessage()
  }, [])

  const startGame = useCallback(() => {
    setCurrentScore(0)
    setGameStarted(true)
    runCountdown()
  }, [runCountdown])

  const handleClick = useCallback(() => {
    if (!gameActive) return

    setCurrentScore(prev => {
      const next = prev + 1
      setMaxScore(current => (next > current ? next : current))
      return next
    })
  }, [gameActive])

  return {
    maxScore,
    currentScore,
    gameStarted,
    gameActive,
    countdown,
    timeLeft,
    startGame,
    handleClick,
  }
}

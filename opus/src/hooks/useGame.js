import { useReducer, useEffect, useCallback } from 'react'
import { GAME_DURATION, COUNTDOWN_MESSAGES, TICK_INTERVAL_MS, Phase } from '../constants'

/**
 * Estado inicial — siempre reconstruible, lo que facilita el reset.
 */
const initialState = {
  phase: Phase.IDLE,
  countdownIndex: -1,
  score: 0,
  maxScore: 0,
  timeLeft: GAME_DURATION,
}

function reducer(state, action) {
  switch (action.type) {
    case 'START_COUNTDOWN':
      return {
        ...state,
        phase: Phase.COUNTDOWN,
        countdownIndex: 0,
        score: 0,
        timeLeft: GAME_DURATION,
      }

    case 'ADVANCE_COUNTDOWN':
      return {
        ...state,
        countdownIndex: state.countdownIndex + 1,
      }

    case 'BEGIN_PLAY':
      return {
        ...state,
        phase: Phase.PLAYING,
        countdownIndex: -1,
      }

    case 'TICK':
      if (state.timeLeft <= 1) {
        return {
          ...state,
          phase: Phase.FINISHED,
          timeLeft: 0,
          maxScore: Math.max(state.maxScore, state.score),
        }
      }
      return { ...state, timeLeft: state.timeLeft - 1 }

    case 'INCREMENT':
      if (state.phase !== Phase.PLAYING) return state
      return { ...state, score: state.score + 1 }

    case 'RESET':
      return {
        ...initialState,
        maxScore: Math.max(state.maxScore, state.score),
      }

    default:
      return state
  }
}

/**
 * Hook que encapsula toda la lógica del juego.
 *
 * Decisión de usar useReducer en lugar de múltiples useState:
 *   - Un solo dispatch centraliza las transiciones de estado
 *   - Las transiciones son puras (testables sin React)
 *   - Elimina la posibilidad de estados parcialmente actualizados
 *     entre renders
 *
 * Los efectos se encargan exclusivamente de orquestar timers.
 * Ningún componente sabe nada de setInterval ni setTimeout.
 */
export function useGame() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // --- Efecto de cuenta regresiva ---
  useEffect(() => {
    if (state.phase !== Phase.COUNTDOWN) return

    if (state.countdownIndex >= COUNTDOWN_MESSAGES.length) {
      dispatch({ type: 'BEGIN_PLAY' })
      return
    }

    const id = setTimeout(() => {
      dispatch({ type: 'ADVANCE_COUNTDOWN' })
    }, TICK_INTERVAL_MS)

    return () => clearTimeout(id)
  }, [state.phase, state.countdownIndex])

  // --- Efecto de timer del juego activo ---
  useEffect(() => {
    if (state.phase !== Phase.PLAYING) return

    const id = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, TICK_INTERVAL_MS)

    return () => clearInterval(id)
  }, [state.phase])

  const startGame = useCallback(() => {
    dispatch({ type: 'START_COUNTDOWN' })
  }, [])

  const handleClick = useCallback(() => {
    dispatch({ type: 'INCREMENT' })
  }, [])

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const countdownMessage =
    state.phase === Phase.COUNTDOWN && state.countdownIndex >= 0 && state.countdownIndex < COUNTDOWN_MESSAGES.length
      ? COUNTDOWN_MESSAGES[state.countdownIndex]
      : null

  return {
    phase: state.phase,
    score: state.score,
    maxScore: state.maxScore,
    timeLeft: state.timeLeft,
    countdownMessage,
    startGame,
    handleClick,
    resetGame,
  }
}

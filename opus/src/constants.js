/**
 * Constantes del juego.
 *
 * Centralizar estos valores permite cambiar la duración del juego,
 * la secuencia de cuenta regresiva o el intervalo de tick sin tocar
 * ningún componente ni hook.
 */

export const GAME_DURATION = 5

export const COUNTDOWN_MESSAGES = ['Preparados', 'Listos', 'Ya']

export const TICK_INTERVAL_MS = 1000

/**
 * Fases discretas del juego.
 *
 * Usar un enum explícito en lugar de booleanos combinados (gameStarted,
 * gameActive) elimina estados imposibles: con booleanos, la combinación
 * { started: false, active: true } es representable pero inválida.
 * Con una fase única eso no puede existir.
 */
export const Phase = Object.freeze({
  IDLE: 'IDLE',
  COUNTDOWN: 'COUNTDOWN',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED',
})

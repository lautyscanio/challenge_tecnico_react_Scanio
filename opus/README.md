# JuegoContador – Implementación Claude Opus (Con IA)

Esta implementación fue generada con asistencia de **Claude Opus 4.6** (Anthropic), buscando la máxima calidad arquitectural y demostrar las capacidades del modelo más avanzado.

## Descripción

El juego permite al usuario competir contra sí mismo haciendo la mayor cantidad de clics posible en un botón durante **5 segundos**. Esta versión representa el enfoque más sofisticado de las tres implementaciones del challenge.

## Cómo correr el proyecto localmente

### Requisitos previos

- Node.js v18 o superior
- npm v8 o superior

### Instalación

```bash
cd opus
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del proyecto

```
opus/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                  ← Componente raíz (orquesta)
    ├── App.css                  ← Estilos con design tokens
    ├── constants.js             ← Configuración y enum de fases
    ├── hooks/
    │   └── useGame.js           ← useReducer: máquina de estados
    └── components/
        ├── ScoreBoard.jsx       ← Puntajes + barra de progreso
        ├── Countdown.jsx        ← Cuenta regresiva con memo
        ├── GameControls.jsx     ← Botones según fase
        └── ResultBanner.jsx     ← Banner de resultado / récord
```

## Diferencias clave vs. la implementación Sonnet

| Aspecto | Sonnet | Opus |
|---|---|---|
| Manejo de estado | Múltiples `useState` | `useReducer` con reducer puro |
| Fases del juego | Booleanos `gameStarted` + `gameActive` | Enum `Phase` (IDLE, COUNTDOWN, PLAYING, FINISHED) |
| Estados imposibles | Posibles (ej: started=false, active=true) | Imposibles por diseño |
| Configuración | Hardcodeada | `constants.js` centralizado |
| Pantalla de fin | No tiene | `ResultBanner` con detección de récord |
| Barra de progreso | No tiene | Timer visual con progress bar |
| Botón "Jugar de nuevo" | No tiene (solo "Iniciar") | Aparece en fase FINISHED |
| Memoización | No | `Countdown` con `React.memo` |
| Accesibilidad | aria-label en botones | aria-live, aria-label, roles, progressbar |
| Animaciones | Fade básico | Pop, slideUp, pulse en botón restart |
| CSS | Variables básicas | Design tokens completos con glow effects |

## Decisiones arquitecturales

### ¿Por qué `useReducer`?
Con 6 estados independientes (`useState`), cada transición de fase requiere llamar a múltiples setters. Esto genera renders parciales donde el estado es internamente inconsistente. Con `useReducer`, una acción como `START_COUNTDOWN` actualiza todo el estado atómicamente en un solo render.

### ¿Por qué un enum de fases?
Dos booleanos (`gameStarted`, `gameActive`) producen 4 combinaciones, de las cuales solo 3 son válidas. Al agregar `timeLeft === 0` como señal de "terminado", la lógica se complica. Un enum `Phase` con 4 valores hace que cada fase sea explícita y que las transiciones sean un grafo simple: IDLE → COUNTDOWN → PLAYING → FINISHED → IDLE.

### ¿Por qué separar `constants.js`?
Si mañana el juego dura 10 segundos, o la cuenta regresiva tiene 5 pasos, se cambia un solo archivo. Ningún componente ni hook conoce estos valores directamente.

## Supuestos y consideraciones

- El puntaje máximo se reinicia al recargar la página (sin persistencia en localStorage)
- El `useReducer` garantiza que `INCREMENT` sea un no-op si la fase no es `PLAYING`
- Todos los timers (setTimeout, setInterval) tienen cleanup en el return del useEffect
- La barra de progreso usa `transition: width 1s linear` para coincidir con el tick de 1 segundo

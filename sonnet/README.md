# JuegoContador – Implementación Claude Sonnet 4 (Con IA)

Esta implementación fue generada con asistencia de **Claude Sonnet 4** (Anthropic), documentando el proceso de uso de IA para resolver el mismo challenge técnico.

## Descripción

El juego permite al usuario competir contra sí mismo haciendo la mayor cantidad de clics posible en un botón durante **5 segundos**. Esta versión tiene una arquitectura más modular: la lógica está encapsulada en un custom hook y la UI está dividida en componentes.

## Cómo correr el proyecto localmente

### Requisitos previos

- Node.js v18 o superior
- npm v8 o superior

### Instalación

```bash
# Entrar a esta carpeta
cd sonnet

# Instalar dependencias
npm install

# Correr en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
sonnet/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                     ← Componente raíz (orquesta los demás)
    ├── App.css                     ← Estilos globales con dark theme
    ├── hooks/
    │   └── useGame.js              ← Custom hook: toda la lógica del juego
    └── components/
        ├── ScoreDisplay.jsx        ← Muestra puntaje máximo y actual
        ├── CountdownDisplay.jsx    ← Muestra "Preparados", "Listos", "Ya"
        └── GameControls.jsx        ← Botones de Iniciar y Clickear
```

## Diseño arquitectural

### `useGame` – Custom Hook
Encapsula toda la lógica de estado del juego. Los componentes de UI nunca manejan timers ni lógica de negocio directamente; solo reciben datos y callbacks del hook.

**Retorna:**
```js
{
  maxScore,        // número: puntaje máximo de la sesión
  currentScore,    // número: clics del juego actual
  gameStarted,     // booleano: secuencia de inicio activa
  gameActive,      // booleano: 5 segundos activos
  countdown,       // string: 'Preparados' | 'Listos' | 'Ya' | ''
  timeLeft,        // número: segundos restantes
  startGame,       // función: inicia la secuencia
  handleClick,     // función: registra un clic
}
```

### Componentes
- `ScoreDisplay`: Muestra el puntaje máximo siempre y el actual + tiempo restante durante el juego
- `CountdownDisplay`: Renderiza el mensaje de cuenta regresiva con animación
- `GameControls`: Dos botones con estados de habilitado/deshabilitado

## Supuestos y consideraciones

- El puntaje máximo persiste durante la sesión pero se reinicia al recargar la página (sin localStorage)
- El timer de 1 segundo de la cuenta regresiva se maneja con `setTimeout` encadenado para precisión secuencial
- El timer del juego activo usa `setInterval` con retorno de cleanup en `useEffect`
- Los handlers de click usan la forma funcional de `setState` para evitar stale closures bajo clicks rápidos
- El documento de comparación completo está en `../documentacion/`

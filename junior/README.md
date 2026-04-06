# JuegoContador – Implementación Junior (Sin IA)

Esta implementación representa el enfoque de un desarrollador FrontEnd React Junior resolviendo el challenge **sin** asistencia de inteligencia artificial.

## Descripción

El juego permite al usuario competir contra sí mismo haciendo la mayor cantidad de clics posible en un botón durante **5 segundos**.

## Cómo correr el proyecto localmente

### Requisitos previos

- Node.js v18 o superior
- npm v8 o superior

### Instalación

```bash
# Clonar el repositorio y entrar a esta carpeta
cd junior

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
junior/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx       ← Componente principal con toda la lógica
    └── App.css       ← Estilos del juego
```

## Decisiones técnicas

### Por qué un solo componente
Para este nivel del challenge, se optó por mantener toda la lógica en el componente `App.jsx`. Esto refleja el enfoque natural de un desarrollador junior que prioriza que "funcione" antes que la separación de responsabilidades.

### Estados utilizados
- `maxScore` – Puntaje máximo histórico de la sesión
- `currentScore` – Contador de clics del juego actual
- `gameStarted` – Indica si el proceso de inicio fue activado
- `gameActive` – Indica si los 5 segundos de juego están activos
- `countdown` – Mensaje de cuenta regresiva actual
- `timeLeft` – Segundos restantes del juego activo

### Supuestos y consideraciones
- El puntaje máximo se reinicia al recargar la página (no hay persistencia)
- El tiempo de cuenta regresiva es exactamente 1 segundo por mensaje
- No se puede hacer clic mientras se muestra la cuenta regresiva
- Si el usuario cierra/recarga la pestaña durante el juego, el timer se limpia automáticamente gracias al cleanup del `useEffect`

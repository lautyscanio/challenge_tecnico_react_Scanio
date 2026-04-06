# 01 – Descripción del Challenge Técnico

## Origen

El challenge fue proporcionado por una empresa real como parte de su proceso de selección para el puesto de **Desarrollador FrontEnd React Junior**.

## Consigna completa transcrita

> **Desarrollar en React un juego muy simple en el que los usuarios puedan competir contra sí mismos intentando clickear la mayor cantidad de veces posible un botón durante 5 segundos.**

### Descripción del ejercicio

Crear una App web en React llamada **"JuegoContador"** que muestre en todo momento:

- **Dos botones**: uno para iniciar el juego y otro para clickear durante el mismo
- **Un indicador de puntaje máximo** iniciado en 0

Al presionar el botón de inicio:
- El botón debe deshabilitarse
- El componente debe mostrar una cuenta regresiva visual con los mensajes **"Preparados"**, **"Listos"** y **"Ya"** en intervalos de 1 segundo

Al mostrarse el **"Ya"**:
- El botón para clickear debe habilitarse durante **5 segundos**
- El usuario puede ver el **tiempo restante** y el **contador actual**

Al concluir el tiempo:
- El botón para clickear debe deshabilitarse
- El botón para iniciar debe habilitarse nuevamente
- Si se superó el puntaje máximo, el valor mostrado debe actualizarse

---

## Requisitos formales del challenge

| # | Requisito |
|---|---|
| 1 | App en React llamada "JuegoContador" |
| 2 | Estados internos necesarios para la funcionalidad |
| 3 | Distribución simple y funcional de elementos |
| 4 | Componentes funcionales |
| 5 | Elementos HTML apropiados para cada pieza de información |
| 6 | Puede usarse una librería de componentes (ej. MUI) si simplifica |
| 7 | Estilos/visuales adicionales opcionales |
| 8 | Código en repositorio público con README de instrucciones |
| 9 | Se evalúa prolijidad, mantenibilidad y buenas prácticas |
| 10 | El enunciado es suficiente, no se responden preguntas |

---

## Análisis de la complejidad técnica

### Conceptos de React implicados

- `useState` – para manejar múltiples estados del juego
- `useEffect` – para timers y limpieza de efectos secundarios
- `useRef` – para manejar referencias a intervalos sin re-renders innecesarios
- Componentes funcionales
- Manejo de estado deshabilitado/habilitado de botones

### Puntos de complejidad

1. **Secuencia de cuenta regresiva**: Manejo de timeouts encadenados con comportamiento asíncrono
2. **Timer de 5 segundos activos**: Uso correcto de `setInterval` con limpieza en `useEffect`
3. **Actualización de puntaje máximo**: Comparación al finalizar el juego
4. **Estado global de la partida**: Múltiples estados que interactúan entre sí (gameStarted, gameActive, countdown, timeLeft, currentScore, maxScore)

### Clasificación de dificultad

Para un desarrollador junior real: **Media** (2-4 horas sin IA)  
Con asistencia de IA (Sonnet): **Baja** (15-30 minutos)

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
git clone https://github.com/lautyscanio/challenge_tecnico_react_Scanio.git
cd challenge_tecnico_react_Scanio

# Instalar dependencias
npm install

# Correr en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`


### Requisitos cumplidos
- El puntaje máximo se reinicia al recargar la página (no hay persistencia)
- El tiempo de cuenta regresiva es exactamente 1 segundo por mensaje
- No se puede hacer clic mientras se muestra la cuenta regresiva
- Si el usuario cierra/recarga la pestaña durante el juego, el timer se limpia automáticamente gracias al cleanup del `useEffect`

### Aclaraciones
Aunque la mayoria del codigo la saque de internet hay cosas como algunas partes html que las hice con ia porque no me salian, despues me di cuenta que la ia lo separaba por componentes, pero yo no lo sabia y lo hice todo en app.

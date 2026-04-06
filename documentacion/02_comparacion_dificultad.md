# 02 – Comparación de Dificultad: Con IA vs Sin IA

## Resumen

| Dimensión | Sin IA (Junior) | Con IA (Sonnet) |
|---|---|---|
| **Tiempo estimado** | 2–4 horas | 15–30 minutos |
| **Intentos para funcionar** | 3–5 iteraciones de debugging | 1–2 iteraciones |
| **Calidad del código inicial** | Variable, con inconsistencias | Alta desde el primer draft |
| **Estructura de componentes** | 1 componente monolítico | Componentes separados + custom hook |
| **Manejo de edge cases** | Incompleto (ej: cleanup de timers) | Completo |
| **CSS/Estilos** | Básico, funcional | Organizado, responsive |
| **README** | Básico | Completo y estructurado |

---

## Enfoque Sin IA – Desarrollador Junior

### Flujo de trabajo típico

```
1. Leer el enunciado (5–10 min)
2. Pensar la estructura de estados (10–15 min)
3. Escribir el componente App.jsx desde cero (30–60 min)
4. Descubrir bug en los timers / useState (20–40 min de debug)
5. Corregir la lógica de countdown (15–20 min)
6. Agregar estilos básicos (20–30 min)
7. Escribir README (10–15 min)
Total estimado: ~2 a 4 horas
```

### Dificultades comunes identificadas

#### 1. Manejo de `useEffect` y timers
Un desarrollador junior frecuentemente olvida limpiar los timers al desmontar el componente:

```js
// ❌ Error común: no hay cleanup
useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft(t => t - 1)
  }, 1000)
}, [])

// ✅ Correcto
useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft(t => t - 1)
  }, 1000)
  return () => clearInterval(interval) // cleanup
}, [])
```

#### 2. Stale closures en callbacks
Usar `setCurrentScore(currentScore + 1)` en lugar de `setCurrentScore(prev => prev + 1)` genera bugs cuando hay múltiples clicks rápidos: el estado queda "congelado" en el closure.

#### 3. Timeouts encadenados (countdown)
Los `setTimeout` anidados son difíciles de mantener y propensos a errores de timing si no se manejan correctamente.

#### 4. Sincronización de estados
Con múltiples `useState`, es fácil caer en condiciones donde los estados están momentáneamente desfasados entre renders.

### Ventajas del enfoque sin IA

- Aprendizaje profundo de causa-efecto
- Control total sobre cada decisión de código
- Mayor comprensión de los bugs cuando aparecen
- No depende de disponibilidad o costo de servicios externos

---

## Enfoque Con IA – Claude Sonnet 4

### Flujo de trabajo típico

```
1. Formular el prompt inicial con el enunciado completo (5 min)
2. Revisar el código generado (5 min)
3. Prompt de ajustes y mejoras (5 min)
4. Revisar el resultado final (5 min)
5. Probar en local (5–10 min)
Total estimado: ~20 a 30 minutos
```

### Ventajas clave observadas

#### 1. Código limpio desde el primer draft
La IA genera código que sigue buenas prácticas desde el principio: funciones puras, nombres descriptivos, separación de responsabilidades.

#### 2. Custom hook para lógica del juego
Sonnet separó automáticamente la lógica del juego en un hook `useGame`, dejando los componentes visuales simples y centrados en el render.

#### 3. Cleanup de efectos incluido por defecto
En todos los `useEffect` con timers, Sonnet incluye el cleanup sin necesidad de pedirlo explícitamente.

#### 4. Estructura de componentes coherente
En lugar de un componente monolítico, el modelo sugiere componentes pequeños y reutilizables (ScoreDisplay, GameControls, Countdown).

#### 5. README detallado con un solo prompt
El README generado incluye instrucciones de instalación, estructura del proyecto y descripción funcional, todo de una sola pasada.

### Limitaciones del enfoque con IA

- El desarrollador puede no entender el código generado si no hace preguntas de seguimiento
- Riesgo de copiar sin entender la lógica de los timers
- Dependencia de la calidad del prompt: un prompt vago produce resultados mediocres
- No reemplaza el debugging real cuando el código se integra con otros sistemas

---

## Conclusión

La IA reduce drásticamente el tiempo de implementación y eleva la calidad del código inicial. Sin embargo, **no reemplaza la comprensión del desarrollador**: alguien que solo copia el código sin entenderlo no podrá mantenerlo, extenderlo ni explicarlo en una entrevista técnica. El uso más efectivo de la IA es **como copiloto**: el desarrollador sigue siendo responsable de entender cada decisión.

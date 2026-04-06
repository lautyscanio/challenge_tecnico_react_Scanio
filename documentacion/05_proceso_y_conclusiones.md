# 05 – Proceso y Conclusiones

## Proceso de desarrollo documentado

### Fase 1: Lectura y análisis del enunciado

**Sin IA:**  
El desarrollador junior debe identificar por sí mismo los estados necesarios y la secuencia de eventos. Este proceso puede tomar entre 10 y 20 minutos y a menudo resulta en una lista incompleta de estados.

Estados identificados durante el análisis:
```
- maxScore: number        → puntaje máximo histórico
- currentScore: number    → contador de clics del juego actual
- gameStarted: boolean    → si el proceso de inicio fue activado
- gameActive: boolean     → si el juego está en los 5 segundos activos
- countdown: string       → mensaje actual ('Preparados', 'Listos', 'Ya', '')
- timeLeft: number        → segundos restantes del juego activo
```

**Con IA (Sonnet):**  
Se transcribió el enunciado al modelo. La IA identificó exactamente los mismos estados en su primer draft sin necesidad de una lista previa.

---

### Fase 2: Implementación

#### Enfoque Junior (sin IA)

**Tiempo:** ~2 horas  
**Iteraciones:** 4 (con bugs intermedios)

**Bug #1 – Stale closure en el handler de click:**
```js
// ❌ Bug: currentScore no se actualiza entre clicks rápidos
const handleClick = () => {
  if (gameActive) {
    setCurrentScore(currentScore + 1) // usa el valor del closure
    if (currentScore + 1 > maxScore) setMaxScore(currentScore + 1)
  }
}

// ✅ Fix: usar la versión funcional de setState
const handleClick = () => {
  if (gameActive) {
    setCurrentScore(prev => {
      const next = prev + 1
      if (next > maxScore) setMaxScore(next)
      return next
    })
  }
}
```

**Bug #2 – Timer sin cleanup:**
```js
// ❌ Bug: memory leak si el componente se desmonta durante el juego
useEffect(() => {
  if (gameActive) {
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
  }
}, [gameActive])

// ✅ Fix: retornar la función de cleanup
useEffect(() => {
  if (!gameActive) return
  const interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
  return () => clearInterval(interval)
}, [gameActive])
```

**Bug #3 – Condición de fin de juego:**
```js
// ❌ Bug: el juego nunca termina porque timeLeft llega a 0 pero no se detecta
// dentro del mismo useEffect

// ✅ Fix: agregar condición dentro del interval
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
```

#### Enfoque Sonnet 4

**Tiempo:** ~20 minutos  
**Iteraciones:** 2 (1 generación + 1 refinamiento de estilos)

El hook `useGame` generado por Sonnet manejó correctamente todos los edge cases desde el primer draft. Los únicos ajustes realizados fueron estéticos (colores del CSS).

---

### Fase 3: Testing manual

**Casos de prueba ejecutados en ambas implementaciones:**

| Caso | Junior | Sonnet |
|---|---|---|
| Flujo completo (inicio → juego → fin) | ✅ | ✅ |
| Puntaje máximo se actualiza correctamente | ✅ | ✅ |
| Cuenta regresiva correcta (1s cada mensaje) | ✅ | ✅ |
| Botones habilitados/deshabilitados correctamente | ✅ | ✅ |
| Múltiples partidas consecutivas | ✅ (después del fix) | ✅ |
| No se puede clickear antes de "Ya" | ✅ | ✅ |
| Timer se detiene exactamente en 0 | ✅ (después del fix) | ✅ |
| No memory leak al desmontar el componente | ✅ (después del fix) | ✅ |

---

### Fase 4: Documentación

**Sin IA:** ~20 minutos para un README básico  
**Con IA:** ~5 minutos (1 prompt) para un README completo

---

## Métricas finales del código

| Métrica | Junior | Sonnet |
|---|---|---|
| Líneas de código (total) | ~180 | ~320 |
| Número de archivos | 3 | 8 |
| Componentes React | 1 (monolítico) | 4 (separados) |
| Custom hooks | 0 | 1 (`useGame`) |
| Bugs durante desarrollo | 3 | 0 |
| Tiempo hasta primera versión funcional | ~2 horas | ~15 min |
| Tiempo total incluyendo CSS y README | ~3 horas | ~25 min |

> **Nota sobre líneas de código:** La implementación de Sonnet tiene más líneas porque está más modularizada. Esto no es una desventaja – es una señal de mejor organización.

---

## Conclusiones

### 1. La IA reduce drásticamente el tiempo de desarrollo

Para este challenge, la reducción fue de **~2.5 horas** a **~25 minutos**, una mejora de aproximadamente **6x**. En tareas de mayor complejidad (integración con APIs, autenticación, manejo de estado global), esta diferencia puede ser aún más pronunciada.

### 2. La calidad del código generado con IA es superior (inicial)

El código de Sonnet no tuvo bugs desde el primer draft. El código junior tuvo 3 bugs identificados, dos de los cuales son errores clásicos del manejo de efectos en React. Sin IA, encontrar y corregir estos bugs requirió tiempo y conocimiento previo de los pitfalls de `useEffect` y closures.

### 3. La IA no reemplaza la comprensión

Un desarrollador que copie el código de Sonnet sin entenderlo:
- No podrá responder preguntas técnicas en la entrevista ("¿por qué usaste `useCallback` aquí?")
- No podrá debuggear si hay un problema en producción
- No podrá extender la funcionalidad si el producto requiere nuevas características
- No detectará si la IA generó algo incorrecto (y a veces lo hace)

**La IA es una herramienta de amplificación, no de sustitución.**

### 4. El prompt importa

Los tres modelos produjeron resultados de diferente calidad con el mismo prompt, y los tres mejoraron con prompts más específicos. Aprender a escribir buenos prompts es una habilidad técnica real y valiosa en 2025.

### 5. La elección del modelo importa para el contexto

- Para challenges de nivel junior: Sonnet es suficiente y más eficiente
- Para diseño de sistemas: Opus agrega valor real
- Para uso masivo/automatizado: GPT-4 tiene ventajas en disponibilidad y pricing en escala

### 6. El desarrollador sigue siendo el arquitecto

Ni Sonnet ni GPT-4 tomaron la decisión de dividir el proyecto en carpetas `junior/`, `sonnet/` y `opus/`, ni decidieron qué documentar, cómo estructurar la comparación ni qué conclusiones sacar. Esas decisiones fueron humanas. La IA ejecuta muy bien lo que se le pide, pero la visión del proyecto sigue siendo responsabilidad del desarrollador.

---

## Recomendación final para el evaluador del challenge

Este ejercicio demuestra que dominar el uso de IA generativa es, en sí mismo, una competencia técnica relevante para un desarrollador FrontEnd en 2025. Sin embargo, la carpeta `junior/` refleja también las habilidades base necesarias para trabajar **con** IA de forma efectiva: entender React, manejar estado asíncrono y escribir código mantenible.

La combinación de ambas capacidades (fundamentos sólidos + uso efectivo de IA) es lo que define a un desarrollador competente en el mercado actual.

# 04 – Comparación entre Modelos: GPT-4 vs Claude Sonnet 4 vs Claude Opus

## Metodología de comparación

Se utilizó el **mismo prompt base** para los tres modelos y se evaluaron los resultados bajo los siguientes criterios:

| Criterio | Descripción |
|---|---|
| **Funcionalidad** | ¿El código cumple todos los requisitos del challenge? |
| **Estructura** | ¿El código está bien organizado en componentes/hooks? |
| **Buenas prácticas** | ¿Se incluye cleanup, nombres descriptivos, no duplicación? |
| **Calidad del CSS** | ¿El estilo es prolijo y funcional? |
| **README** | ¿Las instrucciones son claras y completas? |
| **Prompts necesarios** | ¿Cuántos turnos de conversación se necesitaron? |
| **Razonamiento explícito** | ¿El modelo explicó sus decisiones sin pedirlo? |

---

## Tabla comparativa general

| Criterio | GPT-4 | Claude Sonnet 4 | Claude Opus |
|---|---|---|---|
| Funcionalidad completa | ✅ Sí | ✅ Sí | ✅ Sí (esperado) |
| Separación en componentes | ⚠️ Parcial (1 prompt extra) | ✅ Sí (1er prompt) | ✅ Sí + arquitectura |
| Custom hook `useGame` | ❌ No (sin pedirlo) | ✅ Sí (inferido) | ✅ Sí + patrones avanzados |
| Cleanup de timers | ✅ Sí | ✅ Sí | ✅ Sí |
| CSS organizado | ⚠️ Verboso | ✅ Limpio con variables | ✅ Con design tokens |
| README completo | ✅ Sí (extenso) | ✅ Sí (conciso) | ✅ Sí + contexto arquitectural |
| Turnos necesarios | 2–3 | 1–2 | 1 (esperado) |
| Explicación sin pedirla | ❌ Rara vez | ⚠️ A veces | ✅ Habitualmente |
| Velocidad de respuesta | Rápida | Rápida | Más lenta |
| Costo estimado | Medio | Bajo | Alto |

> **Nota:** Los datos de Claude Opus son proyectados basándose en el comportamiento conocido del modelo. La implementación real se realizará en la carpeta `opus/`.

---

## Análisis por modelo

### GPT-4

**Fortalezas:**
- Genera código funcional de forma consistente
- Excelente para tareas bien definidas y estructuradas
- Respuestas rápidas
- Amplia base de conocimiento de frameworks y librerías modernas

**Debilidades para este challenge:**
- Tendencia a generar todo en un archivo sin separar responsabilidades (si no se le indica)
- El CSS generado tiende a ser más verboso y con menos uso de variables CSS
- Necesita instrucciones más explícitas para inferir buenas prácticas de React (ej: custom hooks)
- Las explicaciones de las decisiones de diseño son menos frecuentes sin pedirlas

**Ejemplo representativo:**
GPT-4 generó un `App.jsx` de ~150 líneas con toda la lógica inline, sin hook `useGame`. Al pedir "separalo en componentes y un hook", generó la estructura correcta, pero requirió ese turno adicional.

---

### Claude Sonnet 4

**Fortalezas:**
- Infiere buenas prácticas a partir de indicadores generales ("código mantenible", "buenas prácticas")
- Separa lógica de presentación de forma natural
- El CSS generado hace uso de variables y media queries sin pedirlo
- Muy buena relación calidad/costo
- El código es consistente entre turnos de conversación

**Debilidades:**
- En algunos casos puede ser demasiado "seguro" y no proponer patrones más avanzados sin un prompt específico
- Ocasionalmente produce comentarios excesivos en el código (sobreexplica el código)
- Las sugerencias de accesibilidad (aria-labels, roles) no aparecen sin pedirlas

**Ejemplo representativo:**
Con el mismo prompt, Sonnet generó desde el primer turno: `App.jsx`, `useGame.js`, `Countdown.jsx`, `GameControls.jsx`, `ScoreDisplay.jsx`, `App.css` y `README.md`. Esto lo hace ideal para flujos de trabajo donde se quiere una base funcional rápida.

---

### Claude Opus (proyección)

**Fortalezas esperadas:**
- Capacidad de razonamiento más profunda para desafíos complejos
- Explica el "por qué" de cada decisión arquitectural sin que se le pida
- Más propenso a sugerir patrones avanzados (ej: context API si hay estado global, memoización)
- Mejor para preguntas de escalabilidad ("¿cómo manejarías esto con 100 usuarios simultáneos?")
- Mejor para detectar edge cases sutiles

**Debilidades esperadas:**
- Tiempo de respuesta más lento
- Mayor costo por token
- Para challenges simples como este, la diferencia con Sonnet puede ser mínima o inexistente
- Puede "sobre-ingenierizar" una solución simple si el prompt no es claro

**Hipótesis a verificar:**
Para este challenge (nivel junior, complejidad media), la diferencia entre Sonnet y Opus en términos de calidad de código final debe ser **marginal**. La ventaja de Opus se espera en:
- La calidad de las explicaciones arquitecturales
- La detección de edge cases sin pedirla
- La profundidad del análisis cuando se hacen preguntas de seguimiento

---

## Recomendación de uso por escenario

| Escenario | Modelo recomendado | Justificación |
|---|---|---|
| Challenge técnico junior/mid | Sonnet 4 | Mejor relación calidad/velocidad/costo |
| Arquitectura de sistema complejo | Opus | Razonamiento más profundo |
| Tareas repetitivas de codificación | GPT-4 / Sonnet | Buenos para boilerplate rápido |
| Code review y detección de bugs | Opus / Sonnet | Ambos muy buenos en análisis |
| Generación de documentación | Sonnet | Documentación clara y bien estructurada |
| Brainstorming de diseño | Opus | Genera más alternativas y las fundamenta |

---

## Conclusión

Para un challenge de nivel **FrontEnd React Junior**, **Claude Sonnet 4** es el modelo que mejor balancea **calidad del output**, **velocidad** y **costo**. GPT-4 es una alternativa sólida pero requiere prompts más detallados para alcanzar el mismo nivel de estructuración de código. Claude Opus se reserva para tareas donde la profundidad de razonamiento tiene un impacto directo en el resultado (arquitectura, revisión crítica, sistemas complejos).

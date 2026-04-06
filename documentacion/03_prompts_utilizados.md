# 03 – Prompts Utilizados

Este documento registra todos los prompts usados para generar las implementaciones con IA. Se incluye el modelo utilizado, el contexto, el prompt exacto y las observaciones sobre el resultado.

---

## Prompts para Claude Sonnet 4 (carpeta `sonnet/`)

### Prompt 1 – Generación del código principal

**Modelo:** Claude Sonnet 4  
**Objetivo:** Generar la aplicación React completa desde el enunciado

**Prompt:**
```
Actúa como un desarrollador senior de React. Tenés que resolver el siguiente challenge técnico 
para un puesto de FrontEnd React Junior:

CONSIGNA:
Desarrollar en React un juego simple llamado "JuegoContador" donde el usuario pueda competir 
contra sí mismo haciendo la mayor cantidad de clics posible en un botón durante 5 segundos.

La app debe mostrar siempre:
- Dos botones: uno para iniciar el juego y otro para clickear durante el mismo
- Un indicador de puntaje máximo iniciado en 0

Al presionar iniciar:
- El botón de inicio se deshabilita
- Se muestra una cuenta regresiva: "Preparados" → "Listos" → "Ya" (1 segundo cada uno)

Al mostrar "Ya":
- El botón de click se habilita por 5 segundos
- Se muestra el tiempo restante y el contador actual

Al terminar:
- El botón de click se deshabilita
- El botón de inicio se habilita
- Si se superó el puntaje máximo, se actualiza

REQUISITOS:
- Componentes funcionales
- Estados internos con useState
- Buenas prácticas: cleanup de timers, nombres descriptivos, código mantenible
- CSS simple pero prolijo
- Separar la lógica del juego en un custom hook (useGame)
- Separar componentes: Countdown, GameControls, ScoreDisplay
- Generar también el README con instrucciones para correr en local

Usá Vite + React como base del proyecto. No uses librerías de componentes externas (solo React puro y CSS propio). Devolvé todos los archivos necesarios.
```

**Resultado obtenido:** Código completo con hook `useGame`, componentes separados, CSS propio y README. Ver carpeta `sonnet/`.

**Observaciones:**
- El modelo generó la estructura de carpetas correcta sin pedirla explícitamente
- Incluyó cleanup de timers en todos los `useEffect`
- El CSS fue minimalista pero prolijo, con variables CSS
- El README incluyó instrucciones paso a paso para correr en local

---

### Prompt 2 – Ajuste de estilos

**Modelo:** Claude Sonnet 4  
**Objetivo:** Mejorar la apariencia visual del juego

**Prompt:**
```
El código funciona bien. Ahora mejorá los estilos CSS para que el juego sea más atractivo visualmente. 
Quiero:
- Fondo oscuro (dark theme)
- El mensaje de cuenta regresiva grande y centrado con animación de fade
- El botón "Clickear" debe tener un efecto visual cuando está activo (pulsación / escala)
- Los botones deben tener estados visuales claros: habilitado, deshabilitado, hover
- Que se vea bien en mobile también
No cambies la lógica, solo el CSS.
```

**Resultado obtenido:** CSS actualizado con dark theme, animaciones, y diseño responsive. Los cambios se integraron directamente en `App.css`.

**Observaciones:**
- El modelo respetó la restricción de no tocar la lógica
- Las transiciones CSS aplicadas son suaves y no afectan la usabilidad
- El dark theme mejora notablemente la experiencia visual

---

### Prompt 3 – Revisión y mejoras de código

**Modelo:** Claude Sonnet 4  
**Objetivo:** Auditar el código generado y sugerir mejoras

**Prompt:**
```
Revisá el código del hook useGame que generaste. ¿Hay algún edge case que no esté cubierto? 
¿Hay alguna mejora de performance o de buenas prácticas que agregarías? 
Por ejemplo: ¿qué pasa si el usuario abre y cierra la pestaña durante el juego?
```

**Resultado obtenido:** El modelo identificó:
- Necesidad de usar `document.visibilitychange` para pausar el timer si la pestaña se oculta
- Retorno temprano en el handler de clicks si `gameActive` es false (defensa extra)
- Sugerencia de `useCallback` para el handler del click para evitar re-renders del botón

**Observaciones:**
- Este tipo de preguntas de seguimiento es lo que convierte a Sonnet en un colaborador real y no solo en un generador de código
- Las mejoras sugeridas no eran necesarias para satisfacer el challenge pero elevan la calidad

---

## Prompts para Claude Opus (carpeta `opus/`)

> **PENDIENTE** – Esta sección se completará cuando se ejecute el experimento con Opus.

**Prompt planeado:**
```
[Mismo prompt base que Sonnet 1]

Adicionalmente:
- Explicá las decisiones de arquitectura que tomaste
- ¿Qué consideraciones de accesibilidad incluirías?
- ¿Cómo escalarías este componente si hubiera múltiples usuarios compitiendo en tiempo real?
```

---

## Prompts para GPT-4 (referencia comparativa)

> **Nota:** Los resultados con GPT-4 se documentan como referencia comparativa. No se incluye una carpeta de código separada para GPT.

### Prompt utilizado (idéntico al Prompt 1 de Sonnet)

**Prompt:**
```
[Mismo prompt que Sonnet Prompt 1]
```

**Resultado observado (descripción):**
- GPT-4 generó código funcional pero en un solo archivo `App.jsx` sin separar componentes
- No creó el custom hook `useGame` sin pedirlo explícitamente
- El CSS generado fue más verboso y con menos uso de variables
- El README generado fue más extenso pero con menos foco en las instrucciones de instalación

**Observaciones comparativas vs. Sonnet:**
- Para obtener el mismo nivel de separación de componentes con GPT-4, fue necesario un prompt de seguimiento explicitando la estructura esperada
- Sonnet "infirió" la separación correcta a partir de la mención de "buenas prácticas" en el prompt
- Ambos modelos generaron código funcional en el primer intento

---

## Lecciones sobre el prompt engineering para este challenge

### Lo que funcionó bien

1. **Incluir el enunciado completo**: Copiar la consigna textualmente evitó ambigüedades
2. **Especificar el stack**: Mencionar Vite + React sin librerías externas acotó la solución
3. **Pedir buenas prácticas explícitamente**: Sin esta instrucción, el resultado fue más básico
4. **Pedir el README en el mismo prompt**: Ahorra un turno de conversación

### Lo que se puede mejorar

1. **No pedir todo en un prompt**: Para proyectos más grandes, separar lógica, estilos y documentación en prompts distintos da mejores resultados
2. **Iterar sobre el código generado**: Las preguntas de revisión (Prompt 3) mejoran significativamente la calidad final
3. **Especificar restricciones negativas**: Decir "no uses librerías externas" es más efectivo que solo decir "React puro"

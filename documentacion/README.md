# Challenge Técnico – JuegoContador: Documentación Completa

## Descripción del Challenge

El challenge consiste en construir una aplicación web en React llamada **"JuegoContador"**, en la que el usuario compite contra sí mismo intentando hacer la mayor cantidad de clics posible en un botón durante **5 segundos**.

### Funcionalidad requerida

| Elemento | Descripción |
|---|---|
| Botón "Iniciar" | Lanza la secuencia de cuenta regresiva |
| Botón "Clickear" | Habilitado solo durante los 5 segundos activos |
| Indicador de puntaje máximo | Muestra el mejor resultado histórico de la sesión |
| Cuenta regresiva visual | "Preparados" → "Listos" → "Ya" (1 segundo cada mensaje) |
| Tiempo restante | Visible durante los 5 segundos de juego activo |
| Contador actual | Visible durante el juego |

---

## Estructura del Repositorio

```
Challenge_Saclier/
├── documentacion/          ← Este directorio: análisis, comparaciones y conclusiones
├── junior/                 ← Implementación estilo desarrollador junior (sin IA)
├── sonnet/                 ← Implementación generada con Claude Sonnet 4
└── opus/                   ← Implementación con Claude Opus (pendiente)
```

---

## Índice de la Documentación

1. [Descripción del challenge](./01_descripcion_challenge.md)
2. [Comparación de dificultad: Con IA vs Sin IA](./02_comparacion_dificultad.md)
3. [Prompts utilizados](./03_prompts_utilizados.md)
4. [Comparación entre modelos (GPT vs Sonnet vs Opus)](./04_comparacion_modelos.md)
5. [Proceso y conclusiones](./05_proceso_y_conclusiones.md)

---

## Resumen ejecutivo

Este proyecto analiza cómo abordar el mismo challenge técnico desde tres perspectivas distintas:

- **Sin IA** (carpeta `junior/`): Simula el flujo de trabajo de un desarrollador Junior sin asistencia de modelos de lenguaje. Se evalúa el tiempo de desarrollo, las decisiones de diseño y la calidad final del código.
- **Con Claude Sonnet 4** (carpeta `sonnet/`): Se utilizó el modelo Sonnet de Anthropic como asistente principal, documentando cada prompt y analizando la calidad del código producido.
- **Con Claude Opus** (carpeta `opus/`): Pendiente de implementación. Reservado para comparar con Sonnet en términos de capacidad de razonamiento y profundidad de solución.

La comparación permite evaluar concretamente cuánto impacto tiene la IA generativa en la productividad de un desarrollador FrontEnd en un challenge de este tipo.

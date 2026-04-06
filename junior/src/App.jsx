import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [puntajeMaximo, setPuntajeMaximo] = useState(0)
  const [puntajeActual, setPuntajeActual] = useState(0)
  const [juegoEmpezado, setJuegoEmpezado] = useState(false)
  const [juegoActivo, setJuegoActivo] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tiempoRestante, setTiempoRestante] = useState(5)

  function iniciar() {
    setJuegoEmpezado(true)
    setPuntajeActual(0)
    setMensaje('Preparados')

    setTimeout(function() {
      setMensaje('Listos')
    }, 1000)

    setTimeout(function() {
      setMensaje('Ya')
    }, 2000)

    setTimeout(function() {
      setMensaje('')
      setJuegoActivo(true)
      setTiempoRestante(5)
    }, 3000)
  }

  useEffect(function() {
    if (juegoActivo == false) return

    var timer = setInterval(function() {
      setTiempoRestante(function(t) {
        if (t <= 1) {
          clearInterval(timer)
          setJuegoActivo(false)
          setJuegoEmpezado(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }, [juegoActivo])

  function sumarClick() {
    if (juegoActivo == false) return

    var nuevo = puntajeActual + 1
    setPuntajeActual(nuevo)

    if (nuevo > puntajeMaximo) {
      setPuntajeMaximo(nuevo)
    }
  }

  return (
    <div className="app">
      <h1>JuegoContador</h1>

      <div className="panel-puntaje">
        <p>Puntaje Maximo: <b>{puntajeMaximo}</b></p>
        {juegoActivo ? <p>Puntaje Actual: <b>{puntajeActual}</b></p> : null}
        {juegoActivo ? <p>Tiempo: <b>{tiempoRestante}s</b></p> : null}
      </div>

      {mensaje != '' && (
        <div className="cuenta-regresiva">{mensaje}</div>
      )}

      <div className="botones">
        <button onClick={iniciar} disabled={juegoEmpezado}>
          Iniciar Juego
        </button>

        <button onClick={sumarClick} disabled={!juegoActivo}>
          Click!
        </button>
      </div>
    </div>
  )
}

export default App

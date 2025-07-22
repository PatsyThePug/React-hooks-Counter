import React from 'react'
import './SecondsCounter.css'

function SecondsCounter({ seconds, isRunning, onStop, onResume, onReset }) {
  return (
    <div className="seconds-counter">
      <div className="header">
        <h1 className="brand">Aprendiendo con Patsy</h1>
        <p className="author">Creado por <a href="https://github.com/patsydev" target="_blank" rel="noopener noreferrer">Patsy The Pug_dev</a></p>
      </div>
      
      <div className="counter-display">
        {seconds}
      </div>
      
      <div className="controls">
        {!isRunning ? (
          <button className="btn btn-start" onClick={onResume}>
            Iniciar
          </button>
        ) : (
          <button className="btn btn-stop" onClick={onStop}>
            Detener
          </button>
        )}
        <button className="btn btn-reset" onClick={onReset}>
          Reiniciar
        </button>
      </div>
      
      <div className={`status ${isRunning ? 'running' : 'stopped'}`}>
        {isRunning ? 'Contando...' : seconds > 0 ? 'Detenido' : 'Listo para empezar'}
      </div>
      
      <div className="footer">
        <p>Contador de segundos educativo - React</p>
        <p>© 2025 Patsy The Pug_dev - Código 100% original</p>
      </div>
    </div>
  )
}

export default SecondsCounter
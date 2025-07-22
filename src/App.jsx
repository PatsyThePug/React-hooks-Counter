import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => setIsRunning(true)
  const handleStop = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
  }

  return (
    <div className="app">
      <div className="header">
        <div className="logo">
          <img src="https://via.placeholder.com/60x60/FF6B35/FFFFFF?text=P" alt="Patsy Logo" />
          <div className="logo-text">
            <div className="brand">aprendiendo con patsy</div>
            <div className="tagline">Patsy The Pug_dev</div>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="timer-panel">
          <div className="timer-header">
            <div className="timer-icon">⏱️</div>
            <h1>React Seconds Counter</h1>
            <p>Advanced timer with countdown, presets, and notifications</p>
          </div>

          <div className="timer-display">
            <div className="time">{formatTime(time)}</div>
            <div className="time-label">Hours : Minutes : Seconds</div>
            <div className="status">{isRunning ? 'Running' : 'Ready'}</div>
          </div>

          <div className="controls">
            <button 
              className="btn btn-start" 
              onClick={handleStart}
              disabled={isRunning}
            >
              Start
            </button>
            <button 
              className="btn btn-stop" 
              onClick={handleStop}
              disabled={!isRunning}
            >
              Stop/Pause
            </button>
            <button 
              className="btn btn-reset" 
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="settings-panel">
          <div className="setting-group">
            <h3>⚙️ Counter Mode</h3>
            <div className="radio-group">
              <label>
                <input type="radio" checked={true} readOnly />
                Count Up
              </label>
              <label>
                <input type="radio" checked={false} readOnly />
                Countdown
              </label>
            </div>
          </div>

          <div className="setting-group">
            <h3>⏰ Preset Time</h3>
            <input type="number" defaultValue="5" min="1" />
            <span>minutes</span>
          </div>

          <div className="setting-group">
            <h3>🚨 Alert Settings</h3>
            <p>Alert at Time (seconds)</p>
            <input type="number" defaultValue="60" />
            <label>
              <input type="checkbox" />
              Enable sound alerts
            </label>
          </div>

          <div className="setting-group">
            <h3>📊 Session Stats</h3>
            <div className="stats">
              <div>Total Sessions: <strong>1</strong></div>
              <div>Total Time: <strong>{formatTime(time)}</strong></div>
              <div>Average: <strong>0</strong></div>
              <div>Alerts Triggered: <strong>0</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div className="educational-section">
        <h2>📚 Conceptos de React - Hooks useState y useEffect</h2>
        <p>Aprende cómo funcionan los hooks principales de React en este contador de segundos</p>
        
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>🎯 El Hook useState</h3>
            <p>Permite añadir estado local a componentes funcionales. Se usa para almacenar datos que cambian con el tiempo:</p>
            <ul>
              <li><strong>Estado inicial:</strong> const [count, setCount] = useState(0)</li>
              <li><strong>Función de actualización:</strong> setCount(count + 1)</li>
              <li><strong>Múltiples estados:</strong> [name], [data], [time]</li>
              <li><strong>Renderizado automático:</strong> React actualiza la UI</li>
            </ul>
          </div>

          <div className="concept-card">
            <h3>🔄 El Hook useEffect</h3>
            <p>Maneja efectos secundarios y ciclos de vida del componente:</p>
            <ul>
              <li><strong>Efectos:</strong> Se ejecuta después del renderizado</li>
              <li><strong>Cleanup:</strong> Limpia efectos con return</li>
              <li><strong>Dependencias:</strong> Control de cuándo ejecutar</li>
              <li><strong>Intervalos:</strong> setInterval y clearInterval</li>
            </ul>
          </div>
        </div>

        <div className="functions-section">
          <h3>🔧 Funciones del Contador</h3>
          <div className="functions-grid">
            <div className="function-item">
              <div className="icon">▶️</div>
              <div>
                <h4>Cuenta Regresiva</h4>
                <p>Inicia desde un número específico y cuenta hacia atrás</p>
              </div>
            </div>
            <div className="function-item">
              <div className="icon">🔄</div>
              <div>
                <h4>Controles</h4>
                <p>Funciones de pausa, reinicio y reanudación</p>
              </div>
            </div>
            <div className="function-item">
              <div className="icon">⚠️</div>
              <div>
                <h4>Alertas</h4>
                <p>Notificaciones cuando se cumple el tiempo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="tech-stack">
          <p>Built with React and modern web technologies</p>
          <div className="tech-icons">
            <span>React</span>
            <span>JavaScript</span>
            <span>CSS3</span>
            <span>Vite</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
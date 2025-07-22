import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(0) // in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [settings, setSettings] = useState({
    mode: 'count-up',
    presetTime: 300,
    enableAlerts: false,
    alertTime: 60,
    enableSound: false
  })

  useEffect(() => {
    let interval = null
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (settings.mode === 'countdown') {
            if (prevTime <= 0) {
              setIsRunning(false)
              if (settings.enableAlerts && settings.enableSound) {
                // Play sound alert
                console.log('Time up!')
              }
              return 0
            }
            return prevTime - 1
          } else {
            return prevTime + 1
          }
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, settings.mode, settings.enableAlerts, settings.enableSound])

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
    setTime(settings.mode === 'countdown' ? settings.presetTime : 0)
  }

  const handleModeChange = (mode) => {
    setSettings(prev => ({ ...prev, mode }))
    setTime(mode === 'countdown' ? settings.presetTime : 0)
    setIsRunning(false)
  }

  return (
    <div className="app">
      {/* Header */}
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
        {/* Left Panel - Timer */}
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

        {/* Right Panel - Settings */}
        <div className="settings-panel">
          {/* Counter Mode */}
          <div className="setting-group">
            <h3>⚙️ Counter Mode</h3>
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  checked={settings.mode === 'count-up'} 
                  onChange={() => handleModeChange('count-up')}
                />
                Count Up
              </label>
              <label>
                <input 
                  type="radio" 
                  checked={settings.mode === 'countdown'} 
                  onChange={() => handleModeChange('countdown')}
                />
                Countdown
              </label>
            </div>
          </div>

          {/* Preset Time */}
          <div className="setting-group">
            <h3>⏰ Preset Time</h3>
            <input 
              type="number" 
              value={Math.floor(settings.presetTime / 60)} 
              onChange={(e) => setSettings(prev => ({
                ...prev, 
                presetTime: parseInt(e.target.value) * 60
              }))}
              min="1"
            />
            <span>minutes</span>
          </div>

          {/* Countdown Settings */}
          <div className="setting-group">
            <h3>⏳ Countdown</h3>
            <p>Countdown from target</p>
            <button className="btn-secondary">Set Countdown</button>
          </div>

          {/* Alert Settings */}
          <div className="setting-group">
            <h3>🚨 Alert Settings</h3>
            <p>Alert at Time (seconds)</p>
            <input 
              type="number" 
              value={settings.alertTime} 
              onChange={(e) => setSettings(prev => ({
                ...prev, 
                alertTime: parseInt(e.target.value)
              }))}
            />
            <label>
              <input 
                type="checkbox" 
                checked={settings.enableSound} 
                onChange={(e) => setSettings(prev => ({
                  ...prev, 
                  enableSound: e.target.checked
                }))}
              />
              Enable sound alerts
            </label>
          </div>

          {/* Session Stats */}
          <div className="setting-group">
            <h3>📊 Session Stats</h3>
            <div className="stats">
              <div>Total Sessions: <strong>1</strong></div>
              <div>Total Time: <strong>{formatTime(time)}</strong></div>
              <div>Average: <strong>0</strong></div>
              <div>Alerts Triggered: <strong>0</strong></div>
            </div>
            <button className="btn-secondary">Reset Statistics</button>
          </div>
        </div>
      </div>

      {/* Educational Section */}
      <div className="educational-section">
        <h2>📚 Conceptos de React - Hooks useState y useEffect</h2>
        <p>Aprende cómo funcionan los hooks principales de React en este contador de segundos</p>
        
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>🎯 El Hook useState</h3>
            <p>Permite añadir estado local a componentes funcionales. Se usa para almacenar datos que cambian con el tiempo:</p>
            <ul>
              <li><strong>Estado inicial:</strong> const [count, setCount] = useState(0)</li>
              <li><strong>Función de actualización:</strong> setCount(count + 1) actualiza y renderiza</li>
              <li><strong>Múltiples estados:</strong> [name], [data], [time], [settings]</li>
              <li><strong>Múltiples funciones:</strong> updateName(), updateData()</li>
            </ul>
          </div>

          <div className="concept-card">
            <h3>🔄 El Hook useEffect</h3>
            <p>Maneja efectos secundarios: ciclos de vida del componente. Se usa para llamar APIs o configurar suscripciones:</p>
            <ul>
              <li><strong>useEffect():</strong> Usa el primer campo e inspecciona al componente</li>
              <li><strong>Cleanup:</strong> Limpia efectos con return cleanup()</li>
              <li><strong>Dependencias:</strong> Se ejecuta cuando arrays varía cambian</li>
              <li><strong>useEffect:</strong> Cuando registra datos que se usan y migran</li>
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
                <p>Inicia desde un número específico y cuenta hacia atrás hasta llegar a cero con función de control</p>
              </div>
            </div>
            <div className="function-item">
              <div className="icon">🔄</div>
              <div>
                <h4>Controles</h4>
                <p>Funciones de pausa, reinicio y reanudación del contador con controles</p>
              </div>
            </div>
            <div className="function-item">
              <div className="icon">⚠️</div>
              <div>
                <h4>Alertas</h4>
                <p>Notificaciones a Tiempo que alertan cuando se cumple la duración específica</p>
              </div>
            </div>
          </div>
        </div>

        <div className="tech-stack">
          <p>Built with React and modern web technologies</p>
          <div className="tech-icons">
            <span>React</span>
            <span>JavaScript</span>
            <span>TypeScript</span>
            <span>HTML/CSS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
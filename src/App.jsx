import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning, seconds])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <img src="https://via.placeholder.com/60x40/4285f4/ffffff?text=patsy" alt="Patsy Logo" />
          <span>aprendiendo con patsy</span>
        </div>
      </div>

      <div className="main-content">
        <div className="timer-icon">⏱️</div>
        <h1>React Seconds Counter</h1>
        <p className="subtitle">Simple counter demonstrating React hooks</p>
        
        <div className="counter-card">
          <div className="time-display">
            {formatTime(seconds)}
          </div>
          
          <div className="controls">
            <button 
              className="btn btn-start" 
              onClick={handleStart}
              disabled={isRunning}
            >
              ▶ Start
            </button>
            <button 
              className="btn btn-stop" 
              onClick={handleStop}
              disabled={!isRunning}
            >
              ⏸ Stop
            </button>
            <button 
              className="btn btn-reset" 
              onClick={handleReset}
            >
              ↻ Reset
            </button>
          </div>
        </div>
      </div>

      <div className="educational-section">
        <div className="concept-header">
          <span className="hourglass">⧗</span>
          <h2>Conceptos de React - Hooks useState y useEffect</h2>
        </div>
        <p>Aprende cómo funcionan los hooks principales de React en este contador de segundos</p>
        
        <div className="footer-note">
          <img src="https://via.placeholder.com/24x24/ff6b6b/ffffff?text=🐶" alt="Patsy" />
          <span>¡Caos con patitas pero código limpio!</span>
        </div>
      </div>
    </div>
  )
}

export default App
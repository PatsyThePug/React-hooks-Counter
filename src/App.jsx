import { useState, useEffect } from 'react'
import SecondsCounter from './components/SecondsCounter'
import './App.css'

function App() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000)
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning, seconds])

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleResume = () => {
    setIsRunning(true)
  }

  const handleReset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  return (
    <div className="App">
      <SecondsCounter 
        seconds={seconds} 
        isRunning={isRunning}
        onStop={handleStop}
        onResume={handleResume}
        onReset={handleReset}
      />
    </div>
  )
}

export default App
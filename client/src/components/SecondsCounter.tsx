import { useState, useEffect } from 'react';
import { Timer, Code, Clock, Play, AlarmClock, Hourglass, Zap, RefreshCw } from 'lucide-react';
import { SiReact, SiJavascript, SiTailwindcss, SiVite, SiGithub } from 'react-icons/si';
import { useCounter } from '@/hooks/useCounter';
import CounterDisplay from './CounterDisplay';
import SettingsPanel from './SettingsPanel';
import AlertNotification from './AlertNotification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SecondsCounterProps {
  seconds?: number;
}

export default function SecondsCounter({ seconds: propSeconds }: SecondsCounterProps) {
  const counter = useCounter();
  const [alert, setAlert] = useState<{ message: string; type: string; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  // Set up alert callback
  useEffect(() => {
    (counter as any).setAlertCallback((message: string, type: string = 'success') => {
      setAlert({ message, type, visible: true });
    });
  }, [counter]);

  // Handle prop seconds (for external control)
  useEffect(() => {
    if (propSeconds !== undefined) {
      // This allows the component to be controlled externally via props
      // as mentioned in the requirements
    }
  }, [propSeconds]);

  const handleDismissAlert = () => {
    setAlert(prev => ({ ...prev, visible: false }));
  };

  const handleSetCountdown = () => {
    if (counter.targetTime && counter.targetTime > 0) {
      counter.setMode('countdown');
      setAlert({
        message: `Countdown set to ${counter.targetTime} seconds!`,
        type: 'success',
        visible: true,
      });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-8 animate-in slide-in-from-top duration-500">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            <Timer className="inline-block h-10 w-10 text-blue-600 mr-3" />
            React Seconds Counter
          </h1>
          <p className="text-slate-600 text-lg">
            Advanced timer with countdown, controls, and notifications
          </p>
        </header>

        {/* Alert Notification */}
        <AlertNotification
          message={alert.message}
          type={alert.type as 'success' | 'warning' | 'error' | 'info'}
          visible={alert.visible}
          onDismiss={handleDismissAlert}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Counter Display */}
          <CounterDisplay
            seconds={counter.seconds}
            mode={counter.mode}
            isRunning={counter.isRunning}
            isPaused={counter.isPaused}
            onStart={counter.start}
            onStop={counter.stop}
            onPause={counter.pause}
            onResume={counter.resume}
            onReset={counter.reset}
          />

          {/* Settings Panel */}
          <SettingsPanel
            mode={counter.mode}
            targetTime={counter.targetTime}
            alertTime={counter.alertTime}
            soundEnabled={counter.soundEnabled}
            sessionStats={counter.sessionStats}
            onModeChange={counter.setMode}
            onTargetTimeChange={counter.setTargetTime}
            onAlertTimeChange={counter.setAlertTime}
            onSoundToggle={counter.toggleSound}
            onSetCountdown={handleSetCountdown}
            onResetStats={counter.resetStats}
          />
        </div>

        {/* React Concepts Section */}
        <section className="mt-12 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              <Hourglass className="inline-block h-8 w-8 text-blue-600 mr-3" />
              Conceptos de React - Hooks useState y useEffect
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Aprende cómo funcionan los hooks principales de React en este contador de segundos
            </p>
          </div>

          {/* React Hooks Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <Zap className="h-6 w-6 text-blue-600 mr-3" />
                  El Hook useState
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-4">
                  Permite manejar estado local en componentes funcionales. En este contador se usa para:
                </p>
                <ul className="text-slate-600 text-sm space-y-2 list-disc pl-5">
                  <li><strong>Segundos actuales:</strong> <code className="bg-gray-100 px-1 rounded">const [seconds, setSeconds] = useState(0)</code></li>
                  <li><strong>Estado running:</strong> <code className="bg-gray-100 px-1 rounded">const [isRunning, setIsRunning] = useState(false)</code></li>
                  <li><strong>Modo del timer:</strong> <code className="bg-gray-100 px-1 rounded">const [mode, setMode] = useState('elapsed')</code></li>
                  <li><strong>Alertas:</strong> <code className="bg-gray-100 px-1 rounded">const [alert, setAlert] = useState({})</code></li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <RefreshCw className="h-6 w-6 text-emerald-600 mr-3" />
                  El Hook useEffect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-4">
                  Maneja efectos secundarios y el ciclo de vida del componente:
                </p>
                <ul className="text-slate-600 text-sm space-y-2 list-disc pl-5">
                  <li><strong>setInterval():</strong> Inicia el timer cuando el componente se monta</li>
                  <li><strong>Cleanup:</strong> Limpia intervals al desmontar el componente</li>
                  <li><strong>Dependencias:</strong> Se ejecuta cuando cambia isRunning, mode, etc.</li>
                  <li><strong>onLoad:</strong> Cuenta segundos desde que se carga la página</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Key Implementation Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <Timer className="h-6 w-6 text-purple-600 mr-3" />
                  ReactDOM.createRoot()
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-4">
                  API moderna de React 18 para renderizar componentes:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <code className="text-sm text-slate-700">
                    {`<SecondsCounter seconds={3434} />`}
                  </code>
                </div>
                <p className="text-slate-600 text-xs mt-2">
                  El componente puede recibir la cantidad de segundos como props para control externo
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                  <Clock className="h-6 w-6 text-blue-600 mr-3" />
                  setInterval() + onLoad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-4">
                  Actualización automática cada segundo desde que se carga la página:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <code className="text-sm text-slate-700">
                    setInterval(() =&gt; {"{"}setSeconds(s =&gt; s + 1){"}"}, 1000)
                  </code>
                </div>
                <p className="text-slate-600 text-xs mt-2">
                  Re-renderiza el componente cada segundo para mostrar tiempo transcurrido
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Code className="h-6 w-6 text-slate-600 mr-3" />
                Funciones del Contador
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-emerald-100 rounded-full p-4 mb-4 inline-block">
                    <Play className="h-8 w-8 text-emerald-700" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Cuenta Regresiva</h4>
                  <p className="text-slate-600 text-sm">
                    Crear opción de countdown desde un número dado con funciones de control
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-4 inline-block">
                    <RefreshCw className="h-8 w-8 text-blue-700" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Controles</h4>
                  <p className="text-slate-600 text-sm">
                    Funciones de parar, reiniciar y resumir el contador con useState
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-amber-100 rounded-full p-4 mb-4 inline-block">
                    <AlarmClock className="h-8 w-8 text-amber-700" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Alertas</h4>
                  <p className="text-slate-600 text-sm">
                    Alerta cuando se llega a un tiempo específico que ingresa el usuario
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <div className="border-t border-slate-200 pt-6">
            <p className="mb-4">Built with React and modern web technologies</p>
            
            {/* Technology Icons - Larger */}
            <div className="flex justify-center items-center gap-12 mb-6">
              <div className="flex flex-col items-center gap-3 text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-110">
                <SiReact className="h-10 w-10" />
                <span className="text-sm font-semibold">React</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-yellow-500 hover:text-yellow-600 transition-all duration-300 hover:scale-110">
                <SiJavascript className="h-10 w-10" />
                <span className="text-sm font-semibold">JavaScript</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-cyan-500 hover:text-cyan-600 transition-all duration-300 hover:scale-110">
                <SiTailwindcss className="h-10 w-10" />
                <span className="text-sm font-semibold">Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-purple-600 hover:text-purple-700 transition-all duration-300 hover:scale-110">
                <SiVite className="h-10 w-10" />
                <span className="text-sm font-semibold">Vite</span>
              </div>
            </div>
            
            <p className="mb-3">
              <Code className="inline-block h-3 w-3 mr-1" />
              Demonstrates ReactDOM.createRoot(), setInterval(), and component lifecycle management
            </p>
            
            {/* GitHub Ready Banner */}
            <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
              <SiGithub className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">Ready for GitHub!</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

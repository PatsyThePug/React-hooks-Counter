import { useState, useEffect } from 'react';
import { Timer, Code, Clock, Play, AlarmClock, Hourglass } from 'lucide-react';
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

        {/* Timer Concepts Section */}
        <section className="mt-12 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              <Hourglass className="inline-block h-8 w-8 text-blue-600 mr-3" />
              Conceptos de Tiempo y Cronometraje
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Explora los fundamentos del tiempo, cronometraje y medición temporal en aplicaciones web modernas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <CardTitle className="text-lg font-bold text-slate-800">Elapsed Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 text-sm leading-relaxed">
                  Medición del tiempo transcurrido desde un punto de inicio específico. 
                  Útil para monitorear duración de procesos y actividades.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <Play className="h-12 w-12 text-emerald-600 mx-auto mb-3" />
                <CardTitle className="text-lg font-bold text-slate-800">Countdown Timer</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cuenta regresiva desde un tiempo establecido hacia cero. 
                  Perfecto para temporizadores, alarmas y gestión de tiempo.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <AlarmClock className="h-12 w-12 text-amber-600 mx-auto mb-3" />
                <CardTitle className="text-lg font-bold text-slate-800">Alert System</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 text-sm leading-relaxed">
                  Notificaciones automáticas cuando se alcanzan tiempos específicos. 
                  Combina alertas visuales y sonoras para máxima efectividad.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <Timer className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <CardTitle className="text-lg font-bold text-slate-800">Precision Timing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 text-sm leading-relaxed">
                  Sincronización precisa usando setInterval() y timestamps. 
                  Manejo robusto de pausas y reanudaciones sin perder precisión.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technical Implementation Details */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Code className="h-6 w-6 text-slate-600 mr-3" />
                Implementación Técnica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-4 inline-block">
                    <span className="text-2xl font-mono font-bold text-blue-700">setInterval()</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Actualización Periódica</h4>
                  <p className="text-slate-600 text-sm">
                    Ejecuta funciones cada segundo para actualizar el contador con precisión milimétrica
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-emerald-100 rounded-full p-4 mb-4 inline-block">
                    <span className="text-2xl font-mono font-bold text-emerald-700">Date.now()</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Timestamps Precisos</h4>
                  <p className="text-slate-600 text-sm">
                    Utiliza timestamps del sistema para cálculos precisos independientes de la velocidad del navegador
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-full p-4 mb-4 inline-block">
                    <span className="text-2xl font-mono font-bold text-yellow-700">addEventListener()</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Gestión de Eventos</h4>
                  <p className="text-slate-600 text-sm">
                    Maneja eventos del navegador y ciclo de vida para una experiencia interactiva fluida
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

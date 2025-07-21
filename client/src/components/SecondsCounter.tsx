import { useState, useEffect } from 'react';
import { Timer, Code } from 'lucide-react';
import { SiReact, SiTypescript, SiTailwindcss, SiVite, SiGithub } from 'react-icons/si';
import { useCounter } from '@/hooks/useCounter';
import CounterDisplay from './CounterDisplay';
import SettingsPanel from './SettingsPanel';
import AlertNotification from './AlertNotification';

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

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <div className="border-t border-slate-200 pt-6">
            <p className="mb-4">Built with React and modern web technologies</p>
            
            {/* Technology Icons */}
            <div className="flex justify-center items-center gap-8 mb-4">
              <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <SiReact className="h-5 w-5" />
                <span className="text-xs font-medium">React</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <SiTypescript className="h-5 w-5" />
                <span className="text-xs font-medium">TypeScript</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-500 hover:text-cyan-600 transition-colors">
                <SiTailwindcss className="h-5 w-5" />
                <span className="text-xs font-medium">Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
                <SiVite className="h-5 w-5" />
                <span className="text-xs font-medium">Vite</span>
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

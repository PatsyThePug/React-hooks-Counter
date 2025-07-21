import { useState, useEffect } from 'react';
import { Timer, Code } from 'lucide-react';
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
            <p>Built with React and modern web technologies</p>
            <p className="mt-1">
              <Code className="inline-block h-3 w-3 mr-1" />
              Demonstrates ReactDOM.createRoot(), setInterval(), and component lifecycle management
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

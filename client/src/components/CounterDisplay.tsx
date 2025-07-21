import { Clock, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ControlButtons from '@/components/ControlButtons';
import { CounterMode } from '@/hooks/useCounter';

interface CounterDisplayProps {
  seconds: number;
  mode: CounterMode;
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export default function CounterDisplay({
  seconds,
  mode,
  isRunning,
  isPaused,
  onStart,
  onStop,
  onPause,
  onResume,
  onReset,
}: CounterDisplayProps) {
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatus = () => {
    if (isRunning && !isPaused) return { text: 'Running', color: 'bg-emerald-100 text-emerald-800', dotColor: 'bg-emerald-500' };
    if (isPaused) return { text: 'Paused', color: 'bg-amber-100 text-amber-800', dotColor: 'bg-amber-500' };
    if (!isRunning && seconds > 0) return { text: 'Stopped', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-500' };
    return { text: 'Ready', color: 'bg-slate-100 text-slate-800', dotColor: 'bg-slate-500' };
  };

  const status = getStatus();

  return (
    <div className="lg:col-span-2">
      <Card className="shadow-lg">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            {/* Mode Indicator */}
            <div className="mb-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                <Clock className="h-3 w-3 mr-1" />
                {mode === 'elapsed' ? 'Elapsed Time Mode' : 'Countdown Mode'}
              </Badge>
            </div>

            {/* Main Counter */}
            <div className="mb-6">
              <div className="text-7xl font-bold text-slate-800 mb-2 font-mono tracking-tight">
                {formatTime(seconds)}
              </div>
              <div className="text-slate-500 text-lg">
                Hours : Minutes : Seconds
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex justify-center mb-6">
              <div className={`flex items-center px-4 py-2 rounded-full ${status.color}`}>
                <div className={`w-2 h-2 ${status.dotColor} rounded-full mr-2 ${status.text === 'Running' ? 'animate-pulse' : ''}`} />
                <span className="font-medium">{status.text}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <ControlButtons
              isRunning={isRunning}
              isPaused={isPaused}
              onStart={onStart}
              onStop={onStop}
              onPause={onPause}
              onResume={onResume}
              onReset={onReset}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Play, OctagonMinus, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ControlButtonsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export default function ControlButtons({
  isRunning,
  isPaused,
  onStart,
  onStop,
  onPause,
  onResume,
  onReset,
}: ControlButtonsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {!isRunning || isPaused ? (
        <Button
          onClick={isPaused ? onResume : onStart}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Play className="h-4 w-4 mr-2" />
          {isPaused ? 'Resume' : 'Start'}
        </Button>
      ) : (
        <Button
          onClick={onPause}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Pause className="h-4 w-4 mr-2" />
          Pause
        </Button>
      )}

      <Button
        onClick={onStop}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
      >
        <OctagonMinus className="h-4 w-4 mr-2" />
        OctagonMinus
      </Button>

      <Button
        onClick={onReset}
        className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset
      </Button>
    </div>
  );
}

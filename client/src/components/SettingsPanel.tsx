import { Settings, Target, Bell, BarChart3, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { CounterMode } from '@/hooks/useCounter';

interface SettingsPanelProps {
  mode: CounterMode;
  targetTime: number | null;
  alertTime: number | null;
  soundEnabled: boolean;
  sessionStats: {
    totalRuntime: number;
    sessions: number;
    alerts: number;
  };
  onModeChange: (mode: CounterMode) => void;
  onTargetTimeChange: (time: number) => void;
  onAlertTimeChange: (time: number) => void;
  onSoundToggle: () => void;
  onSetCountdown: () => void;
  onResetStats: () => void;
}

export default function SettingsPanel({
  mode,
  targetTime,
  alertTime,
  soundEnabled,
  sessionStats,
  onModeChange,
  onTargetTimeChange,
  onAlertTimeChange,
  onSoundToggle,
  onSetCountdown,
  onResetStats,
}: SettingsPanelProps) {
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Settings className="h-5 w-5 mr-2 text-slate-600" />
            Counter Mode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={mode}
            onValueChange={(value: CounterMode) => onModeChange(value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <RadioGroupItem value="elapsed" id="elapsed" />
              <Label htmlFor="elapsed" className="flex-1 cursor-pointer">
                <div className="font-medium text-slate-800">Elapsed Time</div>
                <div className="text-sm text-slate-500">Count up from page load</div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <RadioGroupItem value="countdown" id="countdown" />
              <Label htmlFor="countdown" className="flex-1 cursor-pointer">
                <div className="font-medium text-slate-800">Countdown</div>
                <div className="text-sm text-slate-500">Count down from target</div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Countdown Settings */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Target className="h-5 w-5 mr-2 text-slate-600" />
            Countdown Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="targetTime" className="text-sm font-medium text-slate-700 mb-2 block">
              Target Time (seconds)
            </Label>
            <Input
              id="targetTime"
              type="number"
              placeholder="300"
              min="1"
              max="86400"
              value={targetTime || ''}
              onChange={(e) => onTargetTimeChange(parseInt(e.target.value) || 0)}
              className="w-full"
            />
            <p className="text-xs text-slate-500 mt-1">Maximum: 24 hours (86400 seconds)</p>
          </div>

          <Button
            onClick={onSetCountdown}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!targetTime || targetTime <= 0}
          >
            <Clock className="h-4 w-4 mr-2" />
            Set Countdown
          </Button>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Bell className="h-5 w-5 mr-2 text-slate-600" />
            Alert Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="alertTime" className="text-sm font-medium text-slate-700 mb-2 block">
              Alert at Time (seconds)
            </Label>
            <Input
              id="alertTime"
              type="number"
              placeholder="60"
              min="1"
              value={alertTime || ''}
              onChange={(e) => onAlertTimeChange(parseInt(e.target.value) || 0)}
              className="w-full"
            />
            <p className="text-xs text-slate-500 mt-1">Get notified when this time is reached</p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="soundAlert"
              checked={soundEnabled}
              onCheckedChange={onSoundToggle}
            />
            <Label htmlFor="soundAlert" className="text-sm text-slate-700">
              Enable sound alerts
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-slate-600" />
            Session Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Total Runtime</span>
            <span className="font-medium text-slate-800">{formatTime(sessionStats.totalRuntime)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Sessions</span>
            <span className="font-medium text-slate-800">{sessionStats.sessions}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-600">Alerts Triggered</span>
            <span className="font-medium text-slate-800">{sessionStats.alerts}</span>
          </div>
          
          <Button
            onClick={onResetStats}
            variant="outline"
            className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            Reset Statistics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

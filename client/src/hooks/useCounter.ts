import { useState, useEffect, useRef, useCallback } from 'react';

export type CounterMode = 'elapsed' | 'countdown';

export interface CounterState {
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  mode: CounterMode;
  targetTime: number | null;
  alertTime: number | null;
  soundEnabled: boolean;
  sessionStats: {
    totalRuntime: number;
    sessions: number;
    alerts: number;
  };
}

export interface CounterActions {
  start: () => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setMode: (mode: CounterMode) => void;
  setTargetTime: (time: number) => void;
  setAlertTime: (time: number) => void;
  toggleSound: () => void;
  resetStats: () => void;
}

export function useCounter(): CounterState & CounterActions {
  const [state, setState] = useState<CounterState>({
    seconds: 0,
    isRunning: false,
    isPaused: false,
    mode: 'elapsed',
    targetTime: null,
    alertTime: null,
    soundEnabled: true,
    sessionStats: {
      totalRuntime: 0,
      sessions: 0,
      alerts: 0,
    },
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const pausedTimeRef = useRef<number>(0);
  const alertTriggeredRef = useRef<Set<number>>(new Set());
  const onAlertRef = useRef<((message: string, type?: string) => void) | null>(null);

  // Format time helper
  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Alert callback setter
  const setAlertCallback = useCallback((callback: (message: string, type?: string) => void) => {
    onAlertRef.current = callback;
  }, []);

  // Trigger alert
  const triggerAlert = useCallback((message: string, type: string = 'success') => {
    if (onAlertRef.current) {
      onAlertRef.current(message, type);
    }
    
    if (state.soundEnabled) {
      // Play a simple beep sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.warn('Audio playback failed:', error);
      }
    }

    setState(prev => ({
      ...prev,
      sessionStats: {
        ...prev.sessionStats,
        alerts: prev.sessionStats.alerts + 1,
      },
    }));
  }, [state.soundEnabled]);

  // Check for alerts
  const checkAlerts = useCallback((currentSeconds: number) => {
    if (state.alertTime && currentSeconds >= state.alertTime && !alertTriggeredRef.current.has(state.alertTime)) {
      alertTriggeredRef.current.add(state.alertTime);
      triggerAlert(`Alert! Target time ${formatTime(state.alertTime)} reached!`, 'warning');
    }

    if (state.mode === 'countdown' && currentSeconds <= 0 && !alertTriggeredRef.current.has(0)) {
      alertTriggeredRef.current.add(0);
      triggerAlert('Countdown finished!', 'success');
    }
  }, [state.alertTime, state.mode, triggerAlert, formatTime]);

  // Main timer logic
  useEffect(() => {
    if (state.isRunning && !state.isPaused) {
      intervalRef.current = setInterval(() => {
        setState(prevState => {
          const now = Date.now();
          let newSeconds: number;

          if (prevState.mode === 'elapsed') {
            const elapsedMs = now - startTimeRef.current - pausedTimeRef.current;
            newSeconds = Math.floor(elapsedMs / 1000);
          } else {
            // Countdown mode
            const elapsedMs = now - startTimeRef.current - pausedTimeRef.current;
            const elapsed = Math.floor(elapsedMs / 1000);
            newSeconds = Math.max(0, (prevState.targetTime || 0) - elapsed);
          }

          // Check for alerts
          setTimeout(() => checkAlerts(newSeconds), 0);

          return {
            ...prevState,
            seconds: newSeconds,
            sessionStats: {
              ...prevState.sessionStats,
              totalRuntime: prevState.sessionStats.totalRuntime + 1,
            },
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isRunning, state.isPaused, state.mode, state.targetTime, checkAlerts]);

  // Actions
  const start = useCallback(() => {
    if (!state.isRunning) {
      startTimeRef.current = Date.now();
      pausedTimeRef.current = 0;
      alertTriggeredRef.current.clear();
      setState(prev => ({
        ...prev,
        isRunning: true,
        isPaused: false,
        sessionStats: {
          ...prev.sessionStats,
          sessions: prev.sessionStats.sessions + 1,
        },
      }));
    } else if (state.isPaused) {
      resume();
    }
  }, [state.isRunning, state.isPaused]);

  const stop = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
    }));
  }, []);

  const pause = useCallback(() => {
    if (state.isRunning && !state.isPaused) {
      setState(prev => ({
        ...prev,
        isPaused: true,
      }));
    }
  }, [state.isRunning, state.isPaused]);

  const resume = useCallback(() => {
    if (state.isRunning && state.isPaused) {
      const now = Date.now();
      pausedTimeRef.current += now - (startTimeRef.current + pausedTimeRef.current);
      setState(prev => ({
        ...prev,
        isPaused: false,
      }));
    }
  }, [state.isRunning, state.isPaused]);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      seconds: prev.mode === 'countdown' ? prev.targetTime || 0 : 0,
      isRunning: false,
      isPaused: false,
    }));
    startTimeRef.current = Date.now();
    pausedTimeRef.current = 0;
    alertTriggeredRef.current.clear();
  }, []);

  const setMode = useCallback((mode: CounterMode) => {
    setState(prev => ({
      ...prev,
      mode,
      seconds: mode === 'countdown' ? prev.targetTime || 0 : 0,
      isRunning: false,
      isPaused: false,
    }));
    startTimeRef.current = Date.now();
    pausedTimeRef.current = 0;
    alertTriggeredRef.current.clear();
  }, []);

  const setTargetTime = useCallback((time: number) => {
    setState(prev => ({
      ...prev,
      targetTime: time,
      seconds: prev.mode === 'countdown' ? time : prev.seconds,
    }));
  }, []);

  const setAlertTime = useCallback((time: number) => {
    setState(prev => ({
      ...prev,
      alertTime: time,
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  }, []);

  const resetStats = useCallback(() => {
    setState(prev => ({
      ...prev,
      sessionStats: {
        totalRuntime: 0,
        sessions: 0,
        alerts: 0,
      },
    }));
  }, []);

  return {
    ...state,
    start,
    stop,
    pause,
    resume,
    reset,
    setMode,
    setTargetTime,
    setAlertTime,
    toggleSound,
    resetStats,
    setAlertCallback,
  } as any;
}

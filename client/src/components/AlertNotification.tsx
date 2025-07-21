import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AlertNotificationProps {
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  visible: boolean;
  onDismiss: () => void;
}

export default function AlertNotification({ message, type, visible, onDismiss }: AlertNotificationProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!visible) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
    }
  };

  return (
    <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
      <Alert className={`${getAlertStyles()} shadow-sm`}>
        <Bell className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span className="font-medium">{message}</span>
          <button
            onClick={onDismiss}
            className="ml-4 hover:opacity-70 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

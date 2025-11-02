
import React, { useEffect } from 'react';
import { XIcon } from '../Icons';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onDismiss]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div
      className={`fixed bottom-5 right-5 ${bgColor} text-white py-3 px-5 rounded-lg shadow-xl flex items-center justify-between z-50 animate-fade-in-up`}
    >
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-4 p-1 rounded-full hover:bg-white/20">
        <XIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;

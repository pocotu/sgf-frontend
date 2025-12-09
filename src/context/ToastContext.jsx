import React, { createContext, useContext, useState, useCallback } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
             <Toast toast={toast} onClose={() => removeToast(toast.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

const Toast = ({ toast, onClose }) => {
    const variants = {
        success: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: CheckCircleIcon, iconColor: 'text-emerald-500' },
        error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: ExclamationCircleIcon, iconColor: 'text-red-500' },
        info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: InformationCircleIcon, iconColor: 'text-blue-500' },
        warning: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', icon: ExclamationCircleIcon, iconColor: 'text-orange-500' },
    };

    const style = variants[toast.type] || variants.info;
    const Icon = style.icon;

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all transform animate-slide-in ${style.bg} ${style.border}`}>
            <Icon className={`w-5 h-5 ${style.iconColor}`} />
            <p className={`text-sm font-medium ${style.text}`}>{toast.message}</p>
            <button onClick={onClose} className={`p-1 hover:bg-black/5 rounded-full ${style.text}`}>
                <XMarkIcon className="w-4 h-4" />
            </button>
        </div>
    );
};

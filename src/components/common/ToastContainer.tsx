import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none max-w-md w-full px-4">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-medium border backdrop-blur-md animate-in slide-in-from-bottom-2 duration-150 pointer-events-auto ${
            t.type === 'success'
              ? 'bg-slate-900/95 text-emerald-300 border-emerald-500/50 shadow-emerald-950/40'
              : t.type === 'error'
              ? 'bg-slate-900/95 text-rose-300 border-rose-500/50 shadow-rose-950/40'
              : 'bg-slate-900/95 text-blue-300 border-blue-500/50 shadow-blue-950/40'
          }`}
        >
          {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {t.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
          <span className="flex-1 text-slate-100">{t.message}</span>
        </div>
      ))}
    </div>
  );
};

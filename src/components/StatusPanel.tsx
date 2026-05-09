import { motion } from 'motion/react';
import { Cloud, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../services/languageContext';

export default function StatusPanel() {
  const [time, setTime] = useState(new Date());
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Claude 3.5 Sonnet', value: t.active, status: 'active' },
    { label: 'Fish Audio (TTS)', value: t.ready, status: 'active' },
    { label: 'State.DB', value: t.syncing, status: 'pending' },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        <div className="p-4 border-b border-white/5">
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">{t.localhost_port} Stack</div>
          <div className="space-y-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-light">{stat.label}</span>
                  <span className={`text-[10px] font-mono uppercase ${stat.status === 'active' ? 'text-green-400' : 'text-white/30'}`}>
                    {stat.value}
                  </span>
                </div>
                {i < stats.length - 1 && <div className="h-[1px] bg-white/10" />}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white/5 mx-4 rounded-lg border border-white/5">
          <div className="text-[10px] text-white/40 font-mono uppercase mb-2">{t.localhost_port}</div>
          <div className="text-xl font-mono tracking-tighter">3000 // {t.active.toUpperCase()}</div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between text-white/20 border-t border-white/5">
         <div className="flex items-center gap-2">
           <Clock size={12} />
           <span className="text-[10px] font-mono">
             {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </span>
         </div>
         <span className="text-[10px] font-mono">{time.toLocaleDateString([], { month: 'short', day: '2-digit' }).toUpperCase()}</span>
      </div>
    </div>
  );
}

function Sparkles({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

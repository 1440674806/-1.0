import { motion } from 'motion/react';
import { History, BookOpen, Settings, Radio, Languages } from 'lucide-react';
import { useLanguage } from '../services/languageContext';

export default function Sidebar() {
  const { language, setLanguage, t } = useLanguage();
  
  const items = [
    { icon: <Radio size={18} />, label: t.broadcast, active: true },
    { icon: <BookOpen size={18} />, label: t.collections, active: false },
    { icon: <History size={18} />, label: t.archives, active: false },
    { icon: <Settings size={18} />, label: t.system_nav, active: false },
  ];

  return (
    <div className="w-20 lg:w-64 h-full border-r border-white/5 flex flex-col items-center lg:items-stretch p-6 gap-8 bg-black/40 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
          <Radio size={18} className="text-black" />
        </div>
        <h1 className="font-serif text-xl italic hidden lg:block tracking-tight text-white/90">Claudio-FM</h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {items.map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ x: 5 }}
            className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${
              item.active 
                ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
            }`}
          >
            <span className={item.active ? 'text-white' : 'text-inherit'}>{item.icon}</span>
            <span className="hidden lg:block text-sm font-light tracking-wide">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        {/* Language Toggle */}
        <button 
          onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
          className="flex items-center gap-4 p-3 rounded-2xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all w-full"
        >
          <Languages size={18} />
          <span className="hidden lg:block text-xs font-mono uppercase tracking-[0.2em]">{language === 'en' ? '中文' : 'ENG'}</span>
        </button>

        <div className="pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/20 to-white/5 border border-white/10" />
            <div className="hidden lg:block">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{t.operator}</p>
              <p className="text-xs text-white/80">Lewis Zh.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

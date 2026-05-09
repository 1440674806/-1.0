/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Sidebar from './components/Sidebar';
import CustomCursor from './components/CustomCursor';
import Player from './components/Player';
import VoiceInterface from './components/VoiceInterface';
import StatusPanel from './components/StatusPanel';
import { History, Share2, Sparkles } from 'lucide-react';

import { useLanguage } from './services/languageContext';

export default function App() {
  const { t } = useLanguage();

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden selection:bg-white/20 selection:text-white">
      <CustomCursor />
      
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12 scroll-smooth">
        {/* Immersive Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end"
        >
          <div className="space-y-1">
            <h1 className="text-xs tracking-[0.3em] font-medium text-white/40 uppercase">{t.system}</h1>
            <div className="text-3xl font-serif italic tracking-tight">Claudio-FM</div>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">{t.context_injection}</div>
            <div className="text-sm font-medium">Cloudy &bull; 14:00 &bull; Berlin, DE</div>
          </div>
        </motion.header>

        {/* Bento Grid: 12 Cols */}
        <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[1000px] lg:h-[800px]">
          
          {/* Main Recording Area - 8 cols, 4 rows */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bento-item col-span-12 lg:col-span-8 row-span-4 p-8 flex flex-col justify-between group"
          >
            <div className="immersive-gradient" />
            <div className="flex justify-between items-start relative z-10">
              <span className="text-[10px] font-mono tracking-widest uppercase py-1.5 px-3 border border-white/20 rounded bg-white/5">{t.live_recording}</span>
              <div className="flex items-end gap-1.5 h-8">
                <div className="w-1.5 h-4 bg-white/20 animate-pulse"></div>
                <div className="w-1.5 h-8 bg-white/60 animate-pulse delay-75"></div>
                <div className="w-1.5 h-3 bg-white/40 animate-pulse delay-150"></div>
                <div className="w-1.5 h-10 bg-white animate-pulse delay-200"></div>
              </div>
            </div>

            <div className="max-w-2xl relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-serif italic mb-8 leading-tight"
              >
                “It was a quiet afternoon in the studio. The rain had just stopped...”
              </motion.h2>
              <p className="text-white/50 text-base leading-relaxed font-light max-w-xl">
                {t.broadcast_tagline}
              </p>
            </div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:scale-110 transition-transform cursor-none group-hover:border-white/40">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">{t.stop_transcription}</div>
            </div>
          </motion.div>

          {/* System Stack - 4 cols, 3 rows */}
          <motion.div 
            className="bento-item col-span-12 lg:col-span-4 row-span-3 p-6 flex flex-col justify-between"
          >
            <StatusPanel />
          </motion.div>

          {/* User Corpus - 4 cols, 3 rows */}
          <motion.div 
            className="bento-item col-span-12 lg:col-span-4 row-span-3 p-6"
          >
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-6">{t.user_corpus} // {t.taste_profile}</div>
            <div className="space-y-4">
              {[
                `${t.taste_profile}: Indie, Ambient`,
                `${t.routine}: Morning Focus`,
                `${t.location}: Workspace Home`,
                `${t.state}: Synchronized`
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                  <span className="text-xs text-white/70 uppercase tracking-tight font-light">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Voice Interface / Chat - 8 cols, 2 rows */}
          <motion.div 
            className="bento-item col-span-12 lg:col-span-8 row-span-2 overflow-hidden"
          >
            <VoiceInterface />
          </motion.div>
        </div>

        {/* Player Section - Footer-like prominence */}
        <motion.div 
          className="bento-item w-full p-8 border-white/20 h-48"
        >
          <Player />
        </motion.div>

        {/* Footer info */}
        <footer className="pt-20 pb-8 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-4 text-white/20 text-[10px] uppercase tracking-widest font-mono">
           <p>© 2026 Claudio-FM Studio</p>
           <div className="flex gap-8">
             <a href="#" className="hover:text-white transition-colors">Privacy Protocal</a>
             <a href="#" className="hover:text-white transition-colors">Frequency Status</a>
             <a href="#" className="hover:text-white transition-colors">Design by AIS</a>
           </div>
        </footer>
      </main>
    </div>
  );
}


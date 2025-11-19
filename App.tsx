import React from 'react';
import RetroBackground from './components/RetroBackground';
import CassettePlayer from './components/CassettePlayer';
import CyberChat from './components/CyberChat';
import { Music } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* 3D Background Layer */}
      <RetroBackground />

      {/* Main Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col overflow-auto">
        
        {/* Navbar / Top Bar */}
        <header className="w-full p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
           <div className="pointer-events-auto">
              <h1 className="text-5xl md:text-7xl font-['Press_Start_2P'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 glow-text" style={{ textShadow: '4px 4px 0px #000' }}>
                NEON<br className="md:hidden"/>LOUNGE
              </h1>
              <p className="text-pink-300 mt-2 font-['Orbitron'] tracking-[0.5em] text-xs md:text-sm uppercase glow-text">
                Est. 1986 // Cyber-Connect
              </p>
           </div>
           
           <div className="hidden md:flex pointer-events-auto bg-black/40 backdrop-blur border border-cyan-500/30 px-4 py-2 rounded-full items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#00ff00]"></div>
              <span className="text-cyan-400 font-mono text-sm">SERVIDORES ONLINE</span>
           </div>
        </header>

        {/* Main Interactive Area */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 p-6 lg:p-12">
          
          {/* Left Column: Music */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end space-y-6 animate-in slide-in-from-left duration-1000 fade-in">
             <div className="bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl w-full max-w-md">
                <div className="flex items-center gap-3 mb-4 text-cyan-300 border-b border-white/10 pb-2">
                   <Music size={20} />
                   <h2 className="font-['Orbitron'] font-bold">AUDIO_DECK_V1</h2>
                </div>
                <CassettePlayer />
             </div>
             
             <div className="hidden lg:block text-right max-w-sm">
                <p className="text-pink-500/80 font-mono text-sm leading-relaxed">
                  "Música é a linguagem da alma na era digital. Aumente o volume e deixe os bits fluírem."
                </p>
             </div>
          </div>

          {/* Right Column: Chat */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-6 animate-in slide-in-from-right duration-1000 fade-in delay-200">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <CyberChat />
             </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-white/30 text-xs font-mono z-20">
          <p>POWERED BY GOOGLE GEMINI 2.5 // REACT // THREE.JS</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
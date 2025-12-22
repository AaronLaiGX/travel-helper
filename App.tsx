import React, { useState } from 'react';
import { ClipboardList, Map, Plane } from 'lucide-react';
import Checklist from './components/Checklist';
import Itinerary from './components/Itinerary';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('checklist');

  return (
    <div className="min-h-screen bg-softGray font-sans text-slate-800 selection:bg-rose-100">
      {/* Hero Header */}
      <header className="bg-japanBlue text-white pt-14 pb-32 px-6 relative overflow-hidden shadow-lg">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-10 -translate-y-10 rotate-12">
          <Plane size={180} />
        </div>

        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold tracking-widest text-blue-100 mb-4 border border-white/10 uppercase">
            Travel Log
          </div>
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight drop-shadow-sm">東京之旅 <span className="text-2xl ml-1">🇯🇵</span></h1>
          <p className="text-blue-100 text-sm font-medium tracking-wide flex items-center gap-2 opacity-90">
            12/28 – 1/2 <span className="w-1 h-1 rounded-full bg-blue-300"></span> 6 天 5 夜
          </p>
        </div>
      </header>

      {/* Main Content Container - overlaps header */}
      <main className="max-w-md mx-auto -mt-[100px] relative z-20 px-2">
        {activeTab === 'checklist' ? <Checklist /> : <Itinerary />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 pb-safe shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-md mx-auto flex justify-around items-center h-[70px]">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-colors ${activeTab === 'checklist'
                ? 'text-japanBlue font-bold'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            <ClipboardList size={26} strokeWidth={activeTab === 'checklist' ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">行前清單</span>
          </button>

          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-colors ${activeTab === 'itinerary'
                ? 'text-japanRed font-bold'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            <Map size={26} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">每日行程</span>
          </button>
        </div>
      </nav>

      {/* Safe area spacer for mobile (bottom nav coverage) */}
      <div className="h-20"></div>
    </div>
  );
};

export default App;
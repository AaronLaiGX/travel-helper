import React, { useState } from 'react';
import { ClipboardList, Map, Plane } from 'lucide-react';
import Checklist from './components/Checklist';
import Itinerary from './components/Itinerary';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('checklist');

  return (
    <div className="min-h-screen bg-softGray font-sans text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-japanBlue to-gray-900 text-white pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
            <Plane size={120} />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">東京之旅 🇯🇵</h1>
          <p className="text-blue-200 text-sm">12/28 – 1/2・6 天 5 夜</p>
        </div>
      </header>

      {/* Main Content Container - overlaps header */}
      <main className="max-w-md mx-auto -mt-16 relative z-20">
        {activeTab === 'checklist' ? <Checklist /> : <Itinerary />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-md mx-auto flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === 'checklist' 
                ? 'text-japanBlue font-bold' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ClipboardList size={24} strokeWidth={activeTab === 'checklist' ? 2.5 : 2} />
            <span className="text-xs">行前清單</span>
          </button>
          
          <div className="w-px h-8 bg-gray-200"></div>

          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === 'itinerary' 
                ? 'text-japanRed font-bold' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Map size={24} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
            <span className="text-xs">每日行程</span>
          </button>
        </div>
      </nav>
      
      {/* Safe area spacer for mobile (bottom nav coverage) */}
      <div className="h-16"></div>
    </div>
  );
};

export default App;
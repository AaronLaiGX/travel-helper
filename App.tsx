import React, { useState } from 'react';
import Checklist from './components/Checklist';
import Itinerary from './components/Itinerary';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Compass, CalendarDays, Settings, Plane } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'itinerary'>('checklist');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Sidebar Component (Desktop)
  const Sidebar = () => (
    <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-100 h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 text-primary mb-8">
          <div className="p-2 bg-primary text-white rounded-lg">
            <Plane size={24} />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight">TravelLog</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('checklist')}
            className={clsx(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm",
              activeTab === 'checklist' ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <LayoutDashboard size={20} />
            任務總覽
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={clsx(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm",
              activeTab === 'itinerary' ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <Compass size={20} />
            行程地圖
          </button>
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-gray-50">
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-xs font-bold text-gray-400 uppercase mb-2">旅程倒數</p>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-black text-primary">5</span>
            <span className="text-sm font-medium text-gray-500 mb-1">天</span>
          </div>
          <div className="w-full bg-gray-200 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-accent h-full w-[80%] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 md:pl-64">
      <Sidebar />

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 h-16 flex items-center justify-between">
        <span className="font-serif text-lg font-bold text-primary">TravelLog</span>
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
          AL
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-4 md:py-12 pb-32 md:pb-12">
        {/* Page Header */}
        <div className="mb-6 md:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-serif font-black text-primary mb-1 md:mb-2"
          >
            {activeTab === 'checklist' ? '行前準備' : '東京之旅'}
          </motion.h1>
          <p className="text-gray-400 font-medium text-sm md:text-base">2025/12/28 — 2026/01/02</p>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === 'checklist' ? <Checklist /> : <Itinerary />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Floating Navigation */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 pb-safe">
        <div className="bg-slate-900 text-white rounded-2xl shadow-float p-2 flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
          <button
            onClick={() => setActiveTab('checklist')}
            className={clsx(
              "flex-1 py-3 rounded-xl font-medium text-sm flex flex-col items-center gap-1 transition-all",
              activeTab === 'checklist' ? "bg-white/20 text-white font-bold" : "text-white/60 hover:text-white"
            )}
          >
            <LayoutDashboard size={20} />
            <span className="text-[10px]">待辦事項</span>
          </button>
          <div className="w-px h-8 bg-white/10"></div>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={clsx(
              "flex-1 py-3 rounded-xl font-medium text-sm flex flex-col items-center gap-1 transition-all",
              activeTab === 'itinerary' ? "bg-white/20 text-white font-bold" : "text-white/60 hover:text-white"
            )}
          >
            <Compass size={20} />
            <span className="text-[10px]">行程地圖</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { checklistData } from '../data';
import { CheckCircle2, Circle, FileText, Backpack, Camera, Shirt, User, Briefcase, Zap, ShoppingBag, DoorOpen, RotateCcw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={20} />,
  Backpack: <Backpack size={20} />,
  Camera: <Camera size={20} />,
  Shirt: <Shirt size={20} />,
  User: <User size={20} />,
  Briefcase: <Briefcase size={20} />,
  Zap: <Zap size={20} />,
  ShoppingBag: <ShoppingBag size={20} />,
  DoorOpen: <DoorOpen size={20} />,
};

const Checklist: React.FC = () => {
  // Load initial state from local storage or default to empty
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tripChecklist');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load checklist", e);
      return {};
    }
  });

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'docs': true, // Expand important docs by default
    'final_check': true
  });

  // Save to local storage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('tripChecklist', JSON.stringify(checkedItems));
    } catch (e) {
      console.error("Failed to save checklist", e);
    }
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const calculateProgress = () => {
    let total = 0;
    let checked = 0;
    checklistData.forEach(cat => {
      cat.items.forEach(item => {
        total++;
        if (checkedItems[item.id]) checked++;
      });
    });
    return total === 0 ? 0 : Math.round((checked / total) * 100);
  };

  const progress = calculateProgress();

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (progress === 0) return;

    if (window.confirm('確定要清除所有已勾選的項目嗎？\n進度將會歸零，且無法復原。')) {
      try {
        localStorage.removeItem('tripChecklist');
      } catch (err) {
        console.error("Storage clear failed", err);
      }

      setCheckedItems({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-32 pt-6">
      {/* Progress Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-soft p-4 mb-6 rounded-b-2xl mx-1 transition-all border border-white/20">
        <div className="flex justify-between items-end mb-3">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">準備進度</h2>
          <span className={clsx("font-bold text-xl transition-colors font-mono", progress === 100 ? 'text-green-600' : 'text-japanRed')}>
            {progress}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            className={clsx("h-full rounded-full shadow-sm", progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-japanRed to-rose-400')}
          ></motion.div>
        </div>
      </div>

      <div className="space-y-4 px-4">
        {checklistData.map((category) => {
          const isExpanded = expandedCategories[category.id];
          const allChecked = category.items.length > 0 && category.items.every(item => checkedItems[item.id]);

          return (
            <motion.div
              key={category.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                "bg-white rounded-2xl overflow-hidden transition-all duration-300",
                allChecked ? 'bg-green-50/50 shadow-sm border border-green-100' : 'shadow-card border border-transparent'
              )}
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={clsx("p-2.5 rounded-xl transition-colors", allChecked ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-slate-800')}>
                    {category.icon && iconMap[category.icon] ? iconMap[category.icon] : <FileText size={20} />}
                  </div>
                  <h3 className={clsx("font-bold text-lg tracking-tight", allChecked ? 'text-green-800' : 'text-slate-800')}>
                    {category.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  className="text-gray-400"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-50/50"
                  >
                    <div className="px-2 pb-2">
                      {category.items.map((item) => (
                        <motion.div
                          key={item.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleItem(item.id)}
                          className={clsx(
                            "p-3 my-1 rounded-xl flex items-start gap-3.5 cursor-pointer transition-all select-none group",
                            checkedItems[item.id] ? "bg-transparent" : "hover:bg-gray-50 active:bg-gray-100"
                          )}
                        >
                          <div className={clsx("mt-0.5 transition-colors duration-200", checkedItems[item.id] ? 'text-green-500' : 'text-gray-300 group-hover:text-gray-400')}>
                            {checkedItems[item.id] ? <CheckCircle2 size={24} className="fill-green-50" /> : <Circle size={24} strokeWidth={1.5} />}
                          </div>
                          <span className={clsx("text-base font-medium leading-relaxed transition-all duration-200", checkedItems[item.id] ? 'text-gray-400 line-through decoration-gray-300' : 'text-slate-700')}>
                            {item.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 mb-8 px-4 text-center">
        <button
          type="button"
          onClick={handleReset}
          disabled={progress === 0}
          className={clsx(
            "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95",
            progress === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-slate-500 border border-gray-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 hover:shadow-md'
          )}
        >
          <RotateCcw size={16} />
          {progress === 0 ? '目前無已勾選項目' : '重置所有進度'}
        </button>
      </div>
    </div>
  );
};

export default Checklist;
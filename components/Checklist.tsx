import React, { useState, useEffect } from 'react';
import { checklistData } from '../data';
import { CheckCircle2, Circle, FileText, Backpack, Camera, Shirt, User, Briefcase, Zap, ShoppingBag, DoorOpen, RotateCcw } from 'lucide-react';

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
    // Prevent any default form action and bubbling
    e.preventDefault();
    e.stopPropagation();

    // If already empty, do nothing
    if (progress === 0) return;

    if (window.confirm('確定要清除所有已勾選的項目嗎？\n進度將會歸零，且無法復原。')) {
      // 1. Force clear storage immediately
      try {
        localStorage.removeItem('tripChecklist');
      } catch (err) {
        console.error("Storage clear failed", err);
      }
      
      // 2. Update state to empty object
      setCheckedItems({});
      
      // 3. Scroll to top for visual feedback
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-24">
      {/* Progress Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur shadow-sm p-4 mb-4 border-b border-gray-100 transition-all">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-lg font-bold text-gray-800">準備進度</h2>
          <span className={`font-bold transition-colors ${progress === 100 ? 'text-green-600' : 'text-japanRed'}`}>
            {progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${progress === 100 ? 'bg-green-500' : 'bg-japanRed'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4 px-4">
        {checklistData.map((category) => {
          const isExpanded = expandedCategories[category.id];
          const allChecked = category.items.every(item => checkedItems[item.id]);
          
          return (
            <div key={category.id} className={`bg-white rounded-xl shadow-sm border ${allChecked ? 'border-green-100 bg-green-50/30' : 'border-gray-200'} overflow-hidden transition-all duration-300`}>
              <button 
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${allChecked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                    {category.icon && iconMap[category.icon] ? iconMap[category.icon] : <FileText size={20} />}
                  </div>
                  <h3 className={`font-semibold ${allChecked ? 'text-green-800' : 'text-gray-800'}`}>
                    {category.title}
                  </h3>
                </div>
                <div className="text-gray-400">
                  {isExpanded ? '−' : '+'}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100 divide-y divide-gray-50">
                  {category.items.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => toggleItem(item.id)}
                      className="p-4 flex items-start gap-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors select-none"
                    >
                      <div className={`mt-0.5 transition-colors duration-200 ${checkedItems[item.id] ? 'text-green-500' : 'text-gray-300'}`}>
                        {checkedItems[item.id] ? <CheckCircle2 size={22} className="fill-green-100" /> : <Circle size={22} />}
                      </div>
                      <span className={`text-base leading-relaxed transition-all duration-200 ${checkedItems[item.id] ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-700'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 mb-8 px-4 text-center">
        <button 
          type="button"
          onClick={handleReset}
          disabled={progress === 0}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all shadow-sm ${
            progress === 0 
              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-70' 
              : 'bg-white border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 active:scale-95'
          }`}
        >
          <RotateCcw size={16} className={progress === 0 ? '' : 'text-current'} />
          {progress === 0 ? '目前無已勾選項目' : '重置所有進度'}
        </button>
      </div>
    </div>
  );
};

export default Checklist;
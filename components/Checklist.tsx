import React, { useState, useEffect } from 'react';
import { checklistData } from '../data';
import { Circle, CheckCircle2, RefreshCcw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import * as Icons from 'lucide-react';

const Checklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('checklist-state');
    return saved ? JSON.parse(saved) : {};
  });

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    localStorage.setItem('checklist-state', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      // Find current open state for this specific category to toggle correctly
      // We need to access the derived state logic here, but since we can't easily, 
      // we assume the user intends to toggle from the *current visual state*.
      // However, simplified approach: If it's undefined, we set it to the inverse of the default logic.
      // But we don't have access to 'isAllChecked' here easily without passing it.
      // Better approach: Just set boolean directly if it exists, or initialize.

      // Actually, simplest fix is to just let the component handle the "next state" logic 
      // by passing the `isOpen` logic into the handler if possible, OR just make the handler smarter.
      // Since I can't change the signature easily in `replace_file_content` without changing usage sites...
      // Let's rely on the fact that if it was undefined:
      // If incomplete (Default: Open) -> User clicked -> Wants Close (false)
      // If complete (Default: Closed) -> User clicked -> Wants Open (true)

      // Does this component have access to data to check completion? Yes, 'checklistData' and 'checkedItems'.
      const category = checklistData.find(c => c.id === id);
      if (!category) return prev;

      const catTotal = category.items.length;
      const catCompleted = category.items.filter(i => checkedItems[i.id]).length;
      const isAllChecked = catTotal > 0 && catCompleted === catTotal;

      const currentIsOpen = prev[id] !== undefined ? prev[id] : !isAllChecked;
      return { ...prev, [id]: !currentIsOpen };
    });
  };

  const resetChecklist = () => {
    if (confirm('確定要重置所有項目嗎？')) {
      setCheckedItems({});
      localStorage.removeItem('checklist-state');
    }
  };

  // Calculate Progress
  const totalItems = checklistData.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="py-2">
      {/* Compact Progress Header */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 w-full text-center sm:text-left">
          <h2 className="text-xl font-bold text-primary mb-1">準備進度</h2>
          <p className="text-gray-400 text-sm">已完成 {completedItems} / {totalItems} 項任務</p>
        </div>

        <div className="w-full sm:w-64">
          <div className="flex justify-end text-xs font-bold text-gray-400 mb-2">
            <span className="text-accent">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {checklistData.map((category) => {
          const Icon = Icons[category.icon as keyof typeof Icons] as any;
          const catTotal = category.items.length;
          const catCompleted = category.items.filter(i => checkedItems[i.id]).length;
          const isAllChecked = catTotal > 0 && catCompleted === catTotal;
          // Logic: If user has interacted, use state. Otherwise, default to Open if incomplete, Closed if complete.
          const isExpandedState = expandedCategories[category.id];
          const isOpen = isExpandedState !== undefined ? isExpandedState : !isAllChecked;

          return (
            <motion.div
              key={category.id}
              layout
              className={clsx(
                "group bg-white rounded-2xl overflow-hidden transition-all duration-300 border",
                isAllChecked ? "border-gray-100 opacity-60 hover:opacity-100" : "shadow-sm border-gray-100/50 hover:shadow-lg hover:border-gray-200"
              )}
            >
              {/* Header Clickable */}
              <div
                onClick={() => toggleCategory(category.id)}
                className="p-6 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-5">
                  {/* Icon removed as per user request */}
                  <div className="pl-2">
                    <h3 className={clsx("text-lg font-bold transition-colors", isAllChecked ? "text-gray-400" : "text-primary")}>
                      {category.title}
                    </h3>
                    {/* Mini progress bar for category */}
                    {!isAllChecked && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${(catCompleted / catTotal) * 100}%` }}></div>
                        </div>
                        <span className="text-xs font-medium text-gray-400">{catCompleted}/{catTotal}</span>
                      </div>
                    )}
                  </div>
                </div>
                <ChevronDown className={clsx("text-gray-300 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
              </div>

              {/* Items List */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-6 pb-6 pt-0 grid grid-cols-1 gap-2">
                      {category.items.map((item) => (
                        <motion.button
                          key={item.id}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => toggleItem(item.id)}
                          className={clsx(
                            "w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all duration-200 group/item",
                            checkedItems[item.id]
                              ? "bg-gray-50/50 text-gray-400"
                              : "bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm text-gray-700"
                          )}
                        >
                          <div className={clsx("shrink-0 transition-colors", checkedItems[item.id] ? "text-green-500" : "text-gray-300 group-hover/item:text-accent")}>
                            {checkedItems[item.id] ? <CheckCircle2 size={24} className="fill-green-50" /> : <Circle size={24} strokeWidth={2} />}
                          </div>
                          <span className={clsx("text-[15px] font-medium leading-relaxed", checkedItems[item.id] && "line-through decoration-gray-300")}>
                            {item.text}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center mt-12 mb-8">
        <button
          onClick={resetChecklist}
          className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 font-bold text-sm transition-all"
        >
          <RefreshCcw size={16} />
          重置清單
        </button>
      </div>
    </div>
  );
};

export default Checklist;
import React from 'react';
import { itineraryData } from '../data';
import { MapPin, Calendar, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const Itinerary: React.FC = () => {
  const openMap = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pb-32 pt-8 px-4">
      <div className="relative border-l-2 border-dashed border-gray-200 ml-4 md:ml-0 md:border-l-0 space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
        {itineraryData.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-0"
          >
            {/* Timeline Dot (Mobile only) */}
            <div className="absolute -left-[11px] top-6 h-5 w-5 rounded-full bg-japanBlue border-2 border-white shadow-md z-10 md:hidden"></div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-card hover:shadow-float transition-shadow duration-300 overflow-hidden border border-gray-100 group h-full flex flex-col">
              <div className="p-5 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-japanBlue transition-colors">{day.title}</h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 text-japanBlue text-xs font-bold rounded-md shadow-sm whitespace-nowrap">
                  <Calendar size={12} />
                  {day.date}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                {/* Activities List */}
                <ul className="space-y-4 mb-6 flex-1">
                  {day.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-start gap-3 text-slate-700">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 shadow-sm"></span>
                      <span className="leading-relaxed font-medium">{activity}</span>
                    </li>
                  ))}
                </ul>

                {/* Map Buttons */}
                {day.locations.length > 0 && (
                  <div className="space-y-3 pt-4 mt-auto border-t border-dashed border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Map Navigation</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {day.locations.map((loc, locIndex) => (
                        <button
                          key={locIndex}
                          onClick={() => openMap(loc.query)}
                          className="flex items-center justify-between px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <MapPin size={16} className="text-indigo-600" />
                            <span className="truncate">{loc.name}</span>
                          </div>
                          <Navigation size={14} className="text-indigo-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm font-serif italic tracking-wider">Bon Voyage ✨</p>
      </div>
    </div>
  );
};

export default Itinerary;
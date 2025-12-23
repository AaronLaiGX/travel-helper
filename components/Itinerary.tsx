import React from 'react';
import { ItineraryDay } from '../types';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ItineraryProps {
  data: ItineraryDay[];
}

const Itinerary: React.FC<ItineraryProps> = ({ data }) => {
  const openMap = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="py-2">
      <div className="relative">
        {/* Continuous hairline */}
        <div className="absolute left-[19px] top-4 bottom-0 w-[1px] bg-gray-200"></div>

        <div className="space-y-8 md:space-y-12">
          {data.map((day, index) => {
            // Extract "12/28" and "（日）"
            const match = day.date.match(/(\d+\/\d+)(.*)/);
            const dateNum = match ? match[1] : day.date;
            const dateDay = match ? match[2] : '';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative pl-12"
              >
                {/* Simple Dot Node */}
                <div className="absolute left-0 top-3 w-10.5 h-3 flex items-center justify-center bg-white z-10">
                  <div className="w-3 h-3 rounded-full bg-accent/20 border-2 border-accent"></div>
                </div>

                {/* Header */}
                <div className="flex items-baseline gap-3 mb-4">
                  <h2 className="text-2xl font-serif font-bold text-primary tracking-tight">
                    {dateNum}
                    <span className="text-base font-sans font-medium text-gray-400 ml-2">{dateDay}</span>
                  </h2>
                </div>

                {/* Content Card - Frameless Glass Effect */}
                <div className="group bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 border border-gray-100/50">
                  <h3 className="text-xl font-bold text-primary mb-6">
                    {day.title}
                  </h3>

                  {/* Activities with custom bullets */}
                  <ul className="space-y-4 mb-8">
                    {day.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-600 leading-relaxed font-medium">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Location Chips */}
                  {day.locations.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-dashed border-gray-50">
                      {day.locations.map((loc, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); openMap(loc.query); }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-50 hover:bg-white text-gray-500 hover:text-accent font-medium text-xs transition-all duration-300 hover:shadow-md border border-transparent hover:border-gray-100 group/btn"
                        >
                          <MapPin size={13} className="opacity-50 group-hover/btn:opacity-100" />
                          {loc.name}
                          <ArrowUpRight size={13} className="opacity-0 group-hover/btn:opacity-100 -ml-2 group-hover/btn:ml-0 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
import React from 'react';
import { itineraryData } from '../data';
import { MapPin, ExternalLink, Calendar, Navigation } from 'lucide-react';

const Itinerary: React.FC = () => {
  const openMap = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pb-24 px-4 pt-4">
      <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
        {itineraryData.map((day, index) => (
          <div key={index} className="relative pl-8">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-japanBlue border-4 border-white shadow-sm"></div>
            
            {/* Date Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
                <Calendar size={14} />
                {day.date}
              </span>
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900">{day.title}</h3>
              </div>
              
              <div className="p-4">
                {/* Activities List */}
                <ul className="space-y-3 mb-6">
                  {day.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-start gap-2.5 text-gray-700">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-japanRed flex-shrink-0"></span>
                      <span className="leading-relaxed">{activity}</span>
                    </li>
                  ))}
                </ul>

                {/* Map Buttons */}
                {day.locations.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">主要地點導航</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {day.locations.map((loc, locIndex) => (
                        <button
                          key={locIndex}
                          onClick={() => openMap(loc.query)}
                          className="flex items-center justify-between px-3 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors border border-blue-100 group"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <MapPin size={16} className="text-blue-500" />
                            <span className="truncate">{loc.name}</span>
                          </div>
                          <Navigation size={14} className="text-blue-400 group-hover:text-blue-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center text-gray-400 text-sm italic">
        Have a safe trip! ✈️
      </div>
    </div>
  );
};

export default Itinerary;
export interface ChecklistItem {
  id: string;
  text: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  icon?: string;
  items: ChecklistItem[];
}

export interface Location {
  name: string;
  query: string; // The query string for Google Maps
}

export interface ItineraryDay {
  date: string;
  title: string;
  activities: string[];
  locations: Location[];
}

export type Tab = 'checklist' | 'itinerary';
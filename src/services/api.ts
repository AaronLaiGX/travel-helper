import { ChecklistCategory, ItineraryDay } from '../../types';
import { checklistData as defaultChecklist, itineraryData as defaultItinerary } from '../../data';

const GAS_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL;

export interface TravelData {
    checklist: ChecklistCategory[];
    itinerary: ItineraryDay[];
}

export const fetchTravelData = async (): Promise<TravelData> => {
    const GAS_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL;

    if (!GAS_URL) {
        console.warn('VITE_GOOGLE_APP_SCRIPT_URL not set, using default data');
        return {
            checklist: defaultChecklist,
            itinerary: defaultItinerary
        };
    }

    try {
        const response = await fetch(GAS_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Simple validation/transformation if needed
        // Assuming the GAS returns { checklist: ..., itinerary: ... } structure directly
        // If the structure differs, we would map it here.

        return {
            checklist: data.checklist || defaultChecklist,
            itinerary: data.itinerary || defaultItinerary
        };
    } catch (error) {
        console.error('Failed to fetch travel data:', error);
        // Fallback to local data on error
        return {
            checklist: defaultChecklist,
            itinerary: defaultItinerary
        };
    }
};

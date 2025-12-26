function doGet(e) {
  try {
    const checklist = buildChecklist_();
    const itinerary = buildItinerary_();
    const data = {
      checklist: checklist,
      itinerary: itinerary
    };
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      error: err.toString(),
      stack: err.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

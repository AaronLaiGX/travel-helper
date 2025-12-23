function buildChecklist_() {
  const categories = firestoreFetchCollection_('categories')
    .map(mapDoc_)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const items = firestoreFetchCollection_('items')
    .map(mapDoc_);

  return categories.map(cat => ({
    id: cat.id,
    title: cat.title || '',
    icon: cat.icon || '',
    items: items
      .filter(item => item.categoryId === cat.id)
      .map(item => ({
        id: item.id,
        text: item.text || '',
      })),
  }));
}
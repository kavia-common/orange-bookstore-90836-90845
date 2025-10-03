export function formatPrice(value) {
  if (typeof value !== 'number') return '$0.00';
  return value.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export function sortBooks(books, sortKey) {
  switch (sortKey) {
    case 'price-asc':
      return [...books].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...books].sort((a, b) => b.price - a.price);
    case 'popularity-desc':
      return [...books].sort((a, b) => b.popularity - a.popularity);
    case 'popularity-asc':
      return [...books].sort((a, b) => a.popularity - b.popularity);
    default:
      return books;
  }
}

export function uniqueSorted(arr) {
  return [...new Set(arr)].sort((a, b) => a.localeCompare(b));
}

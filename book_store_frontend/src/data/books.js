export const books = [
  { id: 'b1', title: 'The Ocean Between', author: 'Ava Summers', genre: 'Romance', price: 14.99, popularity: 90, badge: 'Popular' },
  { id: 'b2', title: 'Deep Blue Algorithms', author: 'Liam Carter', genre: 'Technology', price: 29.99, popularity: 75, badge: 'New' },
  { id: 'b3', title: 'Amber Waves', author: 'Nora Blake', genre: 'Fiction', price: 18.5, popularity: 82 },
  { id: 'b4', title: 'Modern UI Design', author: 'Isaac Lee', genre: 'Design', price: 34.0, popularity: 65 },
  { id: 'b5', title: 'Seaside Mysteries', author: 'Maya Chen', genre: 'Mystery', price: 16.0, popularity: 88, badge: 'Trending' },
  { id: 'b6', title: 'Winds of Code', author: 'Ethan Park', genre: 'Technology', price: 24.99, popularity: 78 },
  { id: 'b7', title: 'Sailing North', author: 'Ava Summers', genre: 'Adventure', price: 12.99, popularity: 54 },
  { id: 'b8', title: 'The Amber Key', author: 'Nora Blake', genre: 'Mystery', price: 19.99, popularity: 92, badge: 'Bestseller' },
  { id: 'b9', title: 'Design Systems', author: 'Isaac Lee', genre: 'Design', price: 39.0, popularity: 61 },
  { id: 'b10', title: 'Calm Waters', author: 'Maya Chen', genre: 'Self-Help', price: 15.25, popularity: 70 },
  { id: 'b11', title: 'Data Tides', author: 'Liam Carter', genre: 'Technology', price: 27.5, popularity: 73 },
  { id: 'b12', title: 'Edge of the Map', author: 'Ethan Park', genre: 'Adventure', price: 13.75, popularity: 58 }
];

export const allGenres = Array.from(new Set(books.map(b => b.genre))).sort();
export const allAuthors = Array.from(new Set(books.map(b => b.author))).sort();

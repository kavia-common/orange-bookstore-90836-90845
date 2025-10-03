import React from 'react';
import BookCard from './BookCard';

export default function BookGrid({ books = [], loading = false }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 16
      }}
      aria-label="Books grid"
      aria-busy={loading}
    >
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
    </div>
  );
}

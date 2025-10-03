import React from 'react';
import BookCard from './BookCard';

// PUBLIC_INTERFACE
export default function BookGrid({ books }) {
  /** Grid list of books */
  return (
    <div className="grid" role="list">
      {books.map((b) => (
        <div key={b.id} className="col-3" role="listitem">
          <BookCard book={b} />
        </div>
      ))}
    </div>
  );
}

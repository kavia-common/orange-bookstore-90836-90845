import React from 'react';
import { useCart } from '../context/CartContext';

// PUBLIC_INTERFACE
export default function BookCard({ book }) {
  /** Card UI for a single book */
  const { add } = useCart();

  return (
    <div className="book">
      <div className="book-cover" aria-label={`${book.title} cover`}>
        {book.badge && <div className="book-badge">{book.badge}</div>}
      </div>
      <div className="book-body">
        <div className="book-title">{book.title}</div>
        <div className="book-meta">
          <span>{book.author}</span>
          <span className="mini">{book.genre}</span>
        </div>
        <div className="book-meta">
          <span className="price">${book.price.toFixed(2)}</span>
          <span className="mini">⭐ {book.popularity}</span>
        </div>
        <button className="btn btn-primary" onClick={() => add(book)} aria-label={`Add ${book.title} to cart`}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

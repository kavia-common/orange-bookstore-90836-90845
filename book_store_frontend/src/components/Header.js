import React from 'react';
import { useCart } from '../context/CartContext';

// PUBLIC_INTERFACE
export default function Header({ onSearch }) {
  /** App header with search and cart trigger */
  const { count, setOpen } = useCart();
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true" />
          <div>
            <div className="brand-title">Ocean Books</div>
            <div className="brand-sub">Modern Online Book Store</div>
          </div>
        </div>

        <div className="search" role="search">
          <span style={{ color: 'var(--muted)' }} aria-hidden>🔍</span>
          <input
            type="search"
            placeholder="Search by title, author, or genre..."
            onChange={(e) => onSearch?.(e.target.value)}
            aria-label="Search books"
          />
        </div>

        <div className="actions">
          <button className="btn" onClick={() => window.location.hash = '#/checkout'}>
            Checkout
          </button>
          <button className="btn btn-primary cart-toggle" onClick={() => setOpen(true)} aria-label="Open cart">
            Cart
            {count > 0 && <span className="badge" aria-label={`${count} items in cart`}>{count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

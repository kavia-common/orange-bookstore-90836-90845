import React from 'react';
import { theme } from '../theme';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';

const card = {
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.lg,
  boxShadow: theme.shadow.md,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transition
};

export default function BookCard({ book }) {
  const { add } = useCart();

  return (
    <div style={card} role="article" aria-label={book.title}>
      <div
        style={{
          width: '100%',
          height: 180,
          background: `url(${book.cover}) center/cover no-repeat`
        }}
      />
      <div style={{ padding: 14, display: 'grid', gap: 8 }}>
        <div style={{ fontWeight: 700, color: theme.colors.text }}>{book.title}</div>
        <div style={{ color: theme.colors.mutedText, fontSize: 14 }}>{book.author}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, color: theme.colors.secondary }}>{formatPrice(book.price)}</span>
          <button
            onClick={() => add(book)}
            style={{
              border: 'none',
              background: theme.colors.primary,
              color: '#fff',
              borderRadius: theme.radii.md,
              padding: '8px 12px',
              cursor: 'pointer',
              boxShadow: theme.shadow.sm
            }}
            aria-label={`Add ${book.title} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

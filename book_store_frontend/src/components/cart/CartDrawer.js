import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { theme } from '../../theme';
import { formatPrice } from '../../utils/format';

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, setQty, remove } = useCart();
  const navigate = useNavigate();

  return (
    <div
      role="dialog"
      aria-label="Shopping cart"
      aria-hidden={!open}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: open ? 'auto' : 'none',
        zIndex: 50
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(17,24,39,0.4)',
          opacity: open ? 1 : 0,
          transition: 'opacity 200ms ease'
        }}
      />
      {/* Panel */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: 380,
          maxWidth: '100%',
          background: theme.colors.surface,
          borderLeft: `1px solid ${theme.colors.border}`,
          boxShadow: theme.shadow.lg,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 240ms ease',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ padding: 16, borderBottom: `1px solid ${theme.colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>Cart</strong>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} aria-label="Close cart">
            ✕
          </button>
        </div>
        <div style={{ padding: 16, overflowY: 'auto', flex: 1 }}>
          {items.length === 0 && <div style={{ color: theme.colors.mutedText }}>Your cart is empty.</div>}
          {items.map((it) => (
            <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 12, marginBottom: 12, alignItems: 'center' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: `url(${it.cover}) center/cover no-repeat`,
                  borderRadius: theme.radii.md,
                  border: `1px solid ${theme.colors.border}`
                }}
              />
              <div style={{ display: 'grid', gap: 4 }}>
                <div style={{ fontWeight: 600 }}>{it.title}</div>
                <div style={{ color: theme.colors.mutedText, fontSize: 12 }}>{formatPrice(it.price)}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    aria-label={`Decrease quantity of ${it.title}`}
                    onClick={() => setQty(it.id, it.qty - 1)}
                    style={qtyBtn}
                  >
                    −
                  </button>
                  <span aria-live="polite">{it.qty}</span>
                  <button
                    aria-label={`Increase quantity of ${it.title}`}
                    onClick={() => setQty(it.id, it.qty + 1)}
                    style={qtyBtn}
                  >
                    +
                  </button>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 6, justifyItems: 'end' }}>
                <div style={{ fontWeight: 700 }}>{formatPrice(it.qty * it.price)}</div>
                <button onClick={() => remove(it.id)} style={removeBtn} aria-label={`Remove ${it.title} from cart`}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 16, borderTop: `1px solid ${theme.colors.border}`, display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <button
            onClick={() => {
              onClose();
              navigate('/checkout');
            }}
            style={{
              border: 'none',
              background: theme.colors.secondary,
              color: '#111827',
              fontWeight: 700,
              borderRadius: theme.radii.md,
              padding: '10px 12px',
              cursor: 'pointer',
              boxShadow: theme.shadow.md
            }}
          >
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

const qtyBtn = {
  border: `1px solid ${theme.colors.border}`,
  background: '#fff',
  width: 28,
  height: 28,
  borderRadius: theme.radii.sm,
  cursor: 'pointer'
};

const removeBtn = {
  border: 'none',
  background: 'transparent',
  color: theme.colors.error,
  cursor: 'pointer',
  fontSize: 12
};

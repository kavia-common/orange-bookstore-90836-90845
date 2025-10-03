import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { theme } from '../theme';
import { formatPrice } from '../utils/format';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';

export default function CheckoutPage() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  async function placeOrder() {
    setPlacing(true);
    setError('');
    setConfirmation('');
    try {
      const order = {
        items: items.map((it) => ({ id: it.id, qty: it.qty, price: it.price })),
        subtotal,
        tax,
        total,
      };
      const res = await apiClient.submitOrder(order);
      if (res?.ok && res?.data?.confirmation) {
        setConfirmation(res.data.confirmation);
        clear();
      } else {
        setError('Unable to place order. Please try again.');
      }
    } catch (e) {
      setError(e?.message || 'Unable to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  }

  return (
    <main style={{ maxWidth: 960, margin: '24px auto', padding: '0 20px', display: 'grid', gap: 20 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: theme.colors.primary, textDecoration: 'none', fontWeight: 600 }}>{'← Continue shopping'}</Link>
        <h1 style={{ margin: 0 }}>Checkout</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <section
          style={{
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radii.lg,
            boxShadow: theme.shadow.md,
            padding: 16
          }}
        >
          {items.length === 0 ? (
            <div style={{ color: theme.colors.mutedText }}>
              {confirmation ? (
                <div role="status" style={{ color: theme.colors.text }}>
                  Order placed successfully! Confirmation: <strong>{confirmation}</strong>
                </div>
              ) : (
                'Your cart is empty.'
              )}
            </div>
          ) : (
            items.map((it) => (
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
                <div style={{ display: 'grid', gap: 6 }}>
                  <div style={{ fontWeight: 700 }}>{it.title}</div>
                  <div style={{ color: theme.colors.mutedText, fontSize: 12 }}>{it.author}</div>
                  <div style={{ color: theme.colors.mutedText, fontSize: 12 }}>{formatPrice(it.price)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => setQty(it.id, it.qty - 1)} style={qtyBtn} aria-label={`Decrease ${it.title}`}>−</button>
                    <span>{it.qty}</span>
                    <button onClick={() => setQty(it.id, it.qty + 1)} style={qtyBtn} aria-label={`Increase ${it.title}`}>+</button>
                    <button onClick={() => remove(it.id)} style={removeBtn} aria-label={`Remove ${it.title}`}>Remove</button>
                  </div>
                </div>
                <div style={{ fontWeight: 800 }}>{formatPrice(it.qty * it.price)}</div>
              </div>
            ))
          )}
        </section>

        <aside
          style={{
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radii.lg,
            boxShadow: theme.shadow.md,
            padding: 16,
            height: 'fit-content'
          }}
        >
          <div style={{ display: 'grid', gap: 10 }}>
            <div style={row}><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div style={row}><span>Tax (7%)</span><span>{formatPrice(tax)}</span></div>
            <div style={{ ...row, fontWeight: 800 }}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            {error && <div role="alert" style={{ color: theme.colors.error }}>{error}</div>}

            <button
              style={{
                border: 'none',
                background: theme.colors.secondary,
                color: '#111827',
                fontWeight: 700,
                borderRadius: theme.radii.md,
                padding: '12px',
                cursor: 'pointer',
                boxShadow: theme.shadow.md,
                opacity: placing || items.length === 0 ? 0.75 : 1
              }}
              onClick={placeOrder}
              disabled={placing || items.length === 0}
              aria-busy={placing}
            >
              {placing ? 'Placing Order…' : 'Place Order'}
            </button>
            <button
              style={{
                border: `1px solid ${theme.colors.border}`,
                background: '#fff',
                color: theme.colors.text,
                borderRadius: theme.radii.md,
                padding: '10px',
                cursor: 'pointer'
              }}
              onClick={clear}
            >
              Clear Cart
            </button>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          main > div:nth-of-type(2) {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

const row = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

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

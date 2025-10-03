import React from 'react';
import { useCart } from '../context/CartContext';

// PUBLIC_INTERFACE
export default function CartDrawer() {
  /** Sliding drawer that displays and manages cart items */
  const { items, remove, setQty, total, open, setOpen } = useCart();

  const onCheckout = () => {
    setOpen(false);
    window.location.hash = '#/checkout';
  };

  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-label="Shopping cart">
      <div className="drawer-header">
        <div style={{ fontWeight: 800 }}>Your Cart</div>
        <button className="btn" onClick={() => setOpen(false)} aria-label="Close cart">Close</button>
      </div>
      <div className="drawer-body">
        {items.length === 0 && <div className="helper">Your cart is empty.</div>}
        {items.map(it => (
          <div key={it.id} className="cart-item">
            <div className="cart-thumb" aria-hidden="true" />
            <div>
              <div style={{ fontWeight: 700 }}>{it.title}</div>
              <div className="mini">{it.author}</div>
              <div className="price" style={{ marginTop: 6 }}>${it.price.toFixed(2)}</div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
              <div className="qty" aria-label="Quantity selector">
                <button onClick={() => setQty(it.id, it.qty - 1)} aria-label="Decrease quantity">-</button>
                <div aria-live="polite">{it.qty}</div>
                <button onClick={() => setQty(it.id, it.qty + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button className="btn" onClick={() => remove(it.id)} aria-label="Remove item">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="drawer-footer">
        <div className="total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="btn btn-primary" disabled={items.length === 0} onClick={onCheckout}>
          Go to Checkout
        </button>
      </div>
    </aside>
  );
}

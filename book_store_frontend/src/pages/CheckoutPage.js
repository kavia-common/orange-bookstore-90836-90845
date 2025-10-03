import React from 'react';
import { useCart } from '../context/CartContext';

// PUBLIC_INTERFACE
export default function CheckoutPage() {
  /** Checkout page with editable quantities and order summary */
  const { items, setQty, remove, total, clear } = useCart();

  const subtotal = total;
  const shipping = items.length > 0 ? 4.99 : 0;
  const tax = subtotal * 0.07;
  const grand = subtotal + shipping + tax;

  const placeOrder = () => {
    // Basic UX for demo
    alert('Thank you! Your order has been placed.');
    clear();
    window.location.hash = '#/';
  };

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <div className="checkout-wrap">
        <section className="card">
          <div className="card-header">
            <div style={{ fontWeight: 800 }}>Your Items</div>
            <div className="mini">Adjust quantities or remove items before proceeding</div>
          </div>
          <div className="card-body">
            {items.length === 0 ? (
              <div className="helper">Your cart is empty. Browse the catalog to add books.</div>
            ) : (
              <table className="table" role="table">
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Price</th>
                    <th style={{ width: 140 }}>Quantity</th>
                    <th style={{ textAlign:'right' }}>Line Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(it => (
                    <tr key={it.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{it.title}</div>
                        <div className="mini">{it.author}</div>
                      </td>
                      <td>${it.price.toFixed(2)}</td>
                      <td>
                        <div className="qty">
                          <button onClick={() => setQty(it.id, it.qty - 1)} aria-label="Decrease quantity">-</button>
                          <div aria-live="polite">{it.qty}</div>
                          <button onClick={() => setQty(it.id, it.qty + 1)} aria-label="Increase quantity">+</button>
                        </div>
                      </td>
                      <td style={{ textAlign:'right', fontWeight: 700 }}>${(it.price * it.qty).toFixed(2)}</td>
                      <td>
                        <button className="btn" onClick={() => remove(it.id)} aria-label="Remove item">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <aside className="card" aria-label="Order summary">
          <div className="card-header">
            <div style={{ fontWeight: 800 }}>Order Summary</div>
          </div>
          <div className="card-body" style={{ display:'flex', flexDirection:'column', gap: 10 }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span className="mini">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span className="mini">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span className="mini">Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>${grand.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" disabled={items.length === 0} onClick={placeOrder}>
              Place Order
            </button>
            <div className="mini">This is a demo checkout. No payment is processed.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

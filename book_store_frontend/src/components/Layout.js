import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import { useCart } from '../context/CartContext';
import CartDrawer from './cart/CartDrawer';

const headerStyles = {
  container: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    background: theme.colors.surface,
    borderBottom: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none'
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: theme.radii.md,
    background: `linear-gradient(135deg, ${theme.colors.primary}1a, ${theme.colors.secondary}1a)`,
    display: 'grid',
    placeItems: 'center',
    color: theme.colors.secondary,
    boxShadow: theme.shadow.sm,
    fontWeight: 700
  },
  title: {
    color: theme.colors.text,
    fontWeight: 700,
    letterSpacing: '0.2px'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  },
  cartBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: '8px 12px',
    cursor: 'pointer',
    boxShadow: theme.shadow.sm,
    transition: theme.transition
  },
  cartCount: {
    background: theme.colors.secondary,
    color: '#111827',
    borderRadius: 999,
    padding: '2px 8px',
    fontSize: 12,
    fontWeight: 700
  }
};

export default function Layout({ children }) {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <a href="#main" style={{ position: 'absolute', left: -10000, top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
        Skip to content
      </a>
      <header style={headerStyles.container}>
        <div style={headerStyles.inner}>
          <Link to="/" style={headerStyles.brand} aria-label="Book Store Home">
            <div style={headerStyles.logo}>📚</div>
            <div style={headerStyles.title}>Ocean Books</div>
          </Link>
          <div style={headerStyles.actions}>
            <Link
              to="/checkout"
              style={{
                textDecoration: 'none',
                color: theme.colors.primary,
                fontWeight: 600
              }}
            >
              Checkout
            </Link>
            <button style={headerStyles.cartBtn} onClick={() => setOpen(true)} aria-label="Open cart">
              <span>Cart</span>
              <span style={headerStyles.cartCount} aria-live="polite">{itemCount}</span>
            </button>
          </div>
        </div>
      </header>
      <div id="main">{children}</div>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

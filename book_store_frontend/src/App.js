import React, { useEffect, useMemo, useState } from 'react';
import './styles/global.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

/**
 * Root application component providing navigation, theme, and layout.
 * Implements simple hash-based routing to keep dependencies minimal.
 *
 * Routes:
 *  - "#/"          -> HomePage
 *  - "#/checkout"  -> CheckoutPage
 */
function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) window.location.hash = '#/';
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const page = useMemo(() => {
    switch (route.replace('#', '')) {
      case '/checkout': return <CheckoutPage />;
      case '/': 
      default: return <HomePage search={search} />;
    }
  }, [route, search]);

  return (
    <CartProvider>
      <div>
        <Header onSearch={setSearch} />
        {page}
        <CartDrawer />
        <footer className="container" style={{ padding: 20, color: 'var(--muted)' }}>
          <div className="card" style={{ padding: 16 }}>
            <div><strong>Ocean Books</strong> — Crafted with a modern, minimalist design using blue waves and amber accents.</div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application that sets up routing and provides cart context.
   * Routes:
   * - "/" Home with filters, sorting, grid and cart drawer
   * - "/checkout" Dedicated checkout management page
   */
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

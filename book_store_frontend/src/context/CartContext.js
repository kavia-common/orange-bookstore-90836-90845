import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(undefined);

// PUBLIC_INTERFACE
export function useCart() {
  /** Access the cart context with items and operations. */
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Provides cart state and operations */
  const [items, setItems] = useState([]); // [{id, title, price, qty}...]
  const [open, setOpen] = useState(false);

  const add = (book) => {
    setItems(prev => {
      const found = prev.find(it => it.id === book.id);
      if (found) {
        return prev.map(it => it.id === book.id ? { ...it, qty: it.qty + 1 } : it);
      }
      return [...prev, { id: book.id, title: book.title, price: book.price, author: book.author, qty: 1 }];
    });
    setOpen(true);
  };

  const remove = (id) => setItems(prev => prev.filter(it => it.id !== id));

  const setQty = (id, qty) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, qty) } : it));
  };

  const clear = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);
  const count = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);

  const value = { items, add, remove, setQty, clear, total, count, open, setOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

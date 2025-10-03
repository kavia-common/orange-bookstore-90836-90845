import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: {} // id -> { id, title, price, cover, qty }
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload ?? state;
    case 'ADD': {
      const { book } = action;
      const existing = state.items[book.id];
      const qty = existing ? existing.qty + 1 : 1;
      return { ...state, items: { ...state.items, [book.id]: { ...book, qty } } };
    }
    case 'REMOVE': {
      const items = { ...state.items };
      delete items[action.id];
      return { ...state, items };
    }
    case 'SET_QTY': {
      const { id, qty } = action;
      if (qty <= 0) {
        const items = { ...state.items };
        delete items[id];
        return { ...state, items };
      }
      const item = state.items[id];
      if (!item) return state;
      return { ...state, items: { ...state.items, [id]: { ...item, qty } } };
    }
    case 'CLEAR':
      return { ...state, items: {} };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart_state');
      if (raw) {
        dispatch({ type: 'INIT', payload: JSON.parse(raw) });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart_state', JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const api = useMemo(() => {
    const itemsArray = Object.values(state.items);
    const itemCount = itemsArray.reduce((acc, it) => acc + it.qty, 0);
    const subtotal = itemsArray.reduce((acc, it) => acc + it.qty * it.price, 0);
    return {
      items: itemsArray,
      itemCount,
      subtotal,
      add: (book) => dispatch({ type: 'ADD', book }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' })
    };
  }, [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Get access to the shopping cart API (items, add/remove, setQty, subtotal). */
  return useContext(CartContext);
}

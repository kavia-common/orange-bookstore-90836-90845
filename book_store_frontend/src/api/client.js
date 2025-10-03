import { books as localBooks } from "../data/books";

//
// PUBLIC INTERFACE
// A minimal API client abstraction for the Orange Bookstore frontend.
// In this demo, it uses local data and in-memory "cart" operations,
// but the same surface can be swapped to real HTTP endpoints later.
//
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Error type for API client to standardize thrown errors.
 */
export class ApiError extends Error {
  constructor(message, status = 500, payload = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Local in-memory store for cart when using mock API (non-persistent).
 * The UI continues to use CartContext localStorage persistence for UX,
 * while this API is used to demonstrate abstraction and for future backend swap.
 */
let inMemoryCart = {};

/**
 * Simulate a failure randomly if enabled.
 */
function maybeFail(prob = 0) {
  if (Math.random() < prob) {
    throw new ApiError("Network error, please try again.", 503);
  }
}

/**
 * Apply filters and sorting on the server side (mocked).
 */
function applyFiltersAndSort(books, { genre = [], author = [], sort = "" } = {}) {
  let result = books;
  if (genre.length) {
    result = result.filter((b) => genre.includes(b.genre));
  }
  if (author.length) {
    result = result.filter((b) => author.includes(b.author));
  }
  if (sort) {
    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "popularity-desc":
        result = [...result].sort((a, b) => b.popularity - a.popularity);
        break;
      case "popularity-asc":
        result = [...result].sort((a, b) => a.popularity - b.popularity);
        break;
      default:
        break;
    }
  }
  return result;
}

// PUBLIC_INTERFACE
export const apiClient = {
  /** Fetch list of books, optionally filtered and sorted. */
  async getBooks(params = {}) {
    // Simulate latency and possible recoverable errors (low prob)
    await delay(200);
    try {
      // maybeFail(0.02);
      const data = applyFiltersAndSort(localBooks, params);
      return { ok: true, data };
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw new ApiError("Failed to load books.", 500);
    }
  },

  /** Fetch distinct genres and authors (for filters). */
  async getMeta() {
    await delay(120);
    try {
      const genres = [...new Set(localBooks.map((b) => b.genre))].sort((a, b) => a.localeCompare(b));
      const authors = [...new Set(localBooks.map((b) => b.author))].sort((a, b) => a.localeCompare(b));
      return { ok: true, data: { genres, authors } };
    } catch {
      throw new ApiError("Failed to load metadata.", 500);
    }
  },

  /** Add an item to the in-memory cart (mock). */
  async addToCart(bookId, qty = 1) {
    await delay(100);
    const book = localBooks.find((b) => b.id === String(bookId));
    if (!book) {
      throw new ApiError("Book not found.", 404);
    }
    const existing = inMemoryCart[book.id] || { ...book, qty: 0 };
    inMemoryCart[book.id] = { ...existing, qty: existing.qty + qty };
    return { ok: true, data: Object.values(inMemoryCart) };
  },

  /** Update quantity in cart (mock). */
  async updateCartItem(bookId, qty) {
    await delay(100);
    const existing = inMemoryCart[bookId];
    if (!existing) throw new ApiError("Item not in cart.", 404);
    if (qty <= 0) {
      delete inMemoryCart[bookId];
    } else {
      inMemoryCart[bookId] = { ...existing, qty };
    }
    return { ok: true, data: Object.values(inMemoryCart) };
  },

  /** Remove item from cart (mock). */
  async removeFromCart(bookId) {
    await delay(100);
    delete inMemoryCart[bookId];
    return { ok: true, data: Object.values(inMemoryCart) };
  },

  /** Clear cart (mock). */
  async clearCart() {
    await delay(100);
    inMemoryCart = {};
    return { ok: true, data: [] };
  },

  /** Submit order (mock). */
  async submitOrder(order) {
    await delay(300);
    if (!order || !Array.isArray(order.items) || order.items.length === 0) {
      throw new ApiError("Cannot place an empty order.", 400);
    }
    // Return a simple confirmation number
    const confirmation = "OB-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    return { ok: true, data: { confirmation } };
  },
};

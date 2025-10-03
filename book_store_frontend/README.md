# Ocean Books – React Frontend

A modern, minimal React frontend for an online book store with blue & amber accents.

## Features
- Homepage with book grid
- Sidebar filters for genre and author
- Sorting dropdown (price and popularity)
- Shopping cart side panel with quantities
- Dedicated checkout page with totals and quantity management
- Clean UI with subtle shadows, rounded corners, and smooth transitions
- API Client abstraction (src/api/client.js) ready to swap to a real backend

## Tech
- React 18 (Create React App)
- React Router v6
- No heavy UI framework (pure CSS and inline styles)

## API Client
- Located at `src/api/client.js`
- Provides methods:
  - `getBooks({ genre, author, sort })`
  - `getMeta()`
  - `addToCart`, `updateCartItem`, `removeFromCart`, `clearCart`
  - `submitOrder(order)`
- Currently uses local data and in-memory cart as a mock. Replace with real fetch calls as needed.

## Scripts
- `npm start` – run dev server
- `npm run build` – production build
- `npm test` – tests

## Project Structure
- `src/pages` – Home and Checkout
- `src/components` – Layout, filters, sorting, book grid, cart drawer
- `src/context` – Cart context and provider
- `src/data/books.js` – Sample catalog
- `src/api/client.js` – API abstraction

No environment variables are required.

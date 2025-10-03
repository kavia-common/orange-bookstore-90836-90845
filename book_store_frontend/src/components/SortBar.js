import React from 'react';

// PUBLIC_INTERFACE
export default function SortBar({ total, sort, setSort }) {
  /** Sorting bar for the catalog list */
  return (
    <div className="sortbar" role="region" aria-label="Sort and meta">
      <div>
        <strong>{total}</strong> results
        <div className="mini">Use filters and sorting to refine list</div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
        <label className="mini" htmlFor="sort">Sort by</label>
        <select
          id="sort"
          className="select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="popularity_desc">Popularity (High to Low)</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
          <option value="title_asc">Title (A-Z)</option>
        </select>
      </div>
    </div>
  );
}

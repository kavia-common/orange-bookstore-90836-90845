import React from 'react';
import { theme } from '../theme';

const wrap = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.md,
  padding: '8px 10px',
  boxShadow: theme.shadow.sm
};

export default function SortDropdown({ sort, setSort }) {
  return (
    <div style={wrap}>
      <span style={{ color: theme.colors.mutedText, fontSize: 14 }}>Sort by</span>
      <select
        aria-label="Sort books"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: theme.colors.text,
          fontWeight: 600
        }}
      >
        <option value="">Default</option>
        <option value="price-asc">Price: Low to high</option>
        <option value="price-desc">Price: High to low</option>
        <option value="popularity-desc">Popularity: High to low</option>
        <option value="popularity-asc">Popularity: Low to high</option>
      </select>
    </div>
  );
}

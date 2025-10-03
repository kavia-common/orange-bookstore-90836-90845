import React from 'react';

// PUBLIC_INTERFACE
export default function SidebarFilters({ genres, authors, selectedGenres, selectedAuthors, onToggleGenre, onToggleAuthor, onClear }) {
  /** Sidebar filters for genres and authors */
  return (
    <aside className="sidebar" aria-label="Filters">
      <div className="card-header">
        <div style={{ fontWeight: 800 }}>Filters</div>
        <div className="mini">Refine by genre and author</div>
      </div>
      <div className="card-body">
        <div className="filter-group">
          <div className="filter-title">Genres</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {genres.map(g => {
              const active = selectedGenres.includes(g);
              return (
                <button
                  key={g}
                  className={`filter-chip ${active ? 'active' : ''}`}
                  onClick={() => onToggleGenre(g)}
                  aria-pressed={active}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-title">Authors</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {authors.map(a => {
              const active = selectedAuthors.includes(a);
              return (
                <button
                  key={a}
                  className={`filter-chip ${active ? 'active' : ''}`}
                  onClick={() => onToggleAuthor(a)}
                  aria-pressed={active}
                >
                  {a}
                </button>
              );
            })}
          </div>
        </div>

        <button className="btn" onClick={onClear}>Reset filters</button>
      </div>
    </aside>
  );
}

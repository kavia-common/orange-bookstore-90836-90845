import React, { useMemo, useState } from 'react';
import { books as allBooks } from '../data/books';
import SidebarFilters from '../components/SidebarFilters';
import SortDropdown from '../components/SortDropdown';
import BookGrid from '../components/BookGrid';
import { sortBooks } from '../utils/format';
import { theme } from '../theme';

export default function HomePage() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [sort, setSort] = useState('');

  const filtered = useMemo(() => {
    let result = allBooks;
    if (selectedGenres.length > 0) {
      result = result.filter((b) => selectedGenres.includes(b.genre));
    }
    if (selectedAuthors.length > 0) {
      result = result.filter((b) => selectedAuthors.includes(b.author));
    }
    return sortBooks(result, sort);
  }, [selectedGenres, selectedAuthors, sort]);

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: '24px auto',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: 20
      }}
    >
      <SidebarFilters
        allBooks={allBooks}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedAuthors={selectedAuthors}
        setSelectedAuthors={setSelectedAuthors}
      />
      <section style={{ display: 'grid', gap: 16 }}>
        <div
          style={{
            background: `linear-gradient(120deg, ${theme.colors.primary}1a, ${theme.colors.secondary}1a)`,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radii.xl,
            padding: 16,
            boxShadow: theme.shadow.md,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontWeight: 800, color: theme.colors.text }}>Find your next read</div>
            <div style={{ color: theme.colors.mutedText, fontSize: 14 }}>
              Filter by genre and author. Sort by price or popularity.
            </div>
          </div>
          <SortDropdown sort={sort} setSort={setSort} />
        </div>
        <BookGrid books={filtered} />
      </section>
    </main>
  );
}

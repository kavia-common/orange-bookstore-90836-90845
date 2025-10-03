import React, { useEffect, useMemo, useState } from 'react';
import { books as allBooks } from '../data/books';
import SidebarFilters from '../components/SidebarFilters';
import SortDropdown from '../components/SortDropdown';
import BookGrid from '../components/BookGrid';
import { sortBooks } from '../utils/format';
import { theme } from '../theme';
import { apiClient } from '../api/client';

export default function HomePage() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [books, setBooks] = useState(allBooks);

  // This effect demonstrates an API fetch path for future backend integration.
  // For now, we still use local books; the API client is ready for replacement.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setLoadError('');
      try {
        const res = await apiClient.getBooks({});
        if (!cancelled && res?.ok && Array.isArray(res.data)) {
          setBooks(res.data);
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e?.message || 'Failed to load books.');
          // Fallback to local data already set
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    let result = books;
    if (selectedGenres.length > 0) {
      result = result.filter((b) => selectedGenres.includes(b.genre));
    }
    if (selectedAuthors.length > 0) {
      result = result.filter((b) => selectedAuthors.includes(b.author));
    }
    return sortBooks(result, sort);
  }, [books, selectedGenres, selectedAuthors, sort]);

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
        allBooks={books}
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
            alignItems: 'center',
            flexWrap: 'wrap',
            rowGap: 10
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

        {loading && (
          <div role="status" aria-live="polite" style={{ color: theme.colors.mutedText }}>
            Loading books...
          </div>
        )}
        {loadError && (
          <div role="alert" style={{ color: theme.colors.error }}>
            {loadError}
          </div>
        )}

        <BookGrid books={filtered} />
      </section>

      {/* Responsive styles via inline media query fallback with simple pattern */}
      <style>{`
        @media (max-width: 900px) {
          main {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

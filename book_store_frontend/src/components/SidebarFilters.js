import React from 'react';
import { theme } from '../theme';
import { uniqueSorted } from '../utils/format';

const styles = {
  container: {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.lg,
    boxShadow: theme.shadow.md,
    padding: 16,
    position: 'sticky',
    top: 84
  },
  group: { marginBottom: 18 },
  title: { fontWeight: 700, color: theme.colors.text, marginBottom: 8 },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    margin: '8px 0',
    cursor: 'pointer',
    userSelect: 'none'
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    border: `1px solid ${theme.colors.border}`,
    display: 'inline-block',
    marginRight: 6
  },
  clearBtn: {
    marginTop: 8,
    border: `1px solid ${theme.colors.border}`,
    background: '#fff',
    color: theme.colors.text,
    borderRadius: theme.radii.md,
    padding: '6px 10px',
    cursor: 'pointer'
  }
};

export default function SidebarFilters({
  allBooks,
  selectedGenres,
  setSelectedGenres,
  selectedAuthors,
  setSelectedAuthors
}) {
  const genres = uniqueSorted(allBooks.map((b) => b.genre));
  const authors = uniqueSorted(allBooks.map((b) => b.author));

  const toggle = (list, setter, value) => {
    if (list.includes(value)) {
      setter(list.filter((v) => v !== value));
    } else {
      setter([...list, value]);
    }
  };

  return (
    <aside style={styles.container} aria-label="Filters sidebar">
      <div style={styles.group}>
        <div style={styles.title}>Genres</div>
        {genres.map((g) => (
          <label key={g} style={styles.option}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(g)}
              onChange={() => toggle(selectedGenres, setSelectedGenres, g)}
            />
            <span>{g}</span>
          </label>
        ))}
        <button style={styles.clearBtn} onClick={() => setSelectedGenres([])}>Clear</button>
      </div>
      <div style={styles.group}>
        <div style={styles.title}>Authors</div>
        {authors.map((a) => (
          <label key={a} style={styles.option}>
            <input
              type="checkbox"
              checked={selectedAuthors.includes(a)}
              onChange={() => toggle(selectedAuthors, setSelectedAuthors, a)}
            />
            <span>{a}</span>
          </label>
        ))}
        <button style={styles.clearBtn} onClick={() => setSelectedAuthors([])}>Clear</button>
      </div>
    </aside>
  );
}

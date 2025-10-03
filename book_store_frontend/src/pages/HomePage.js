import React, { useMemo, useState } from 'react';
import SidebarFilters from '../components/SidebarFilters';
import SortBar from '../components/SortBar';
import BookGrid from '../components/BookGrid';
import { books as allBooks, allAuthors, allGenres } from '../data/books';

// PUBLIC_INTERFACE
export default function HomePage({ search }) {
  /** Homepage with filters, sorting and book grid */
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [sort, setSort] = useState('popularity_desc');

  const toggleGenre = (g) =>
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const toggleAuthor = (a) =>
    setSelectedAuthors(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const clear = () => { setSelectedAuthors([]); setSelectedGenres([]); setSort('popularity_desc'); };

  const filtered = useMemo(() => {
    const q = (search || '').trim().toLowerCase();
    let list = allBooks.filter(b => {
      const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(b.genre);
      const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(b.author);
      const matchesQuery = q.length === 0 || [b.title, b.author, b.genre].some(t => t.toLowerCase().includes(q));
      return matchesGenre && matchesAuthor && matchesQuery;
    });
    switch (sort) {
      case 'price_asc': list = list.sort((a,b)=>a.price-b.price); break;
      case 'price_desc': list = list.sort((a,b)=>b.price-a.price); break;
      case 'title_asc': list = list.sort((a,b)=>a.title.localeCompare(b.title)); break;
      default: list = list.sort((a,b)=>b.popularity-a.popularity);
    }
    return list;
  }, [selectedGenres, selectedAuthors, sort, search]);

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <div className="layout">
        <SidebarFilters
          genres={allGenres}
          authors={allAuthors}
          selectedGenres={selectedGenres}
          selectedAuthors={selectedAuthors}
          onToggleGenre={toggleGenre}
          onToggleAuthor={toggleAuthor}
          onClear={clear}
        />
        <main style={{ display:'flex', flexDirection:'column', gap: 16 }}>
          <SortBar total={filtered.length} sort={sort} setSort={setSort} />
          <BookGrid books={filtered} />
        </main>
      </div>
    </div>
  );
}

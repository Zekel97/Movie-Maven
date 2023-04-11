import { useState } from 'react';
import styles from './header.module.scss';

import { useMovieDataContext } from '@/scripts/MovieDataContext';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');
  const { search } = useMovieDataContext();

  const handleSearch = () => {
    search.setMovieName(searchValue);
  };

  return (
    <nav className={styles.navbar}>
      <h1>Movie Maven</h1>

      <div className={styles.search}>
        <input
          type="search"
          placeholder="Search by movie title"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
}

import styles from './header.module.scss';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useMovieDataContext } from '@/scripts/MovieDataContext';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');
  const { search } = useMovieDataContext();

  const debounceMovieName = useDebounce(searchValue, 200);

  useEffect(() => {
    search.setMovieName(debounceMovieName[0]);
  }, [debounceMovieName]);

  return (
    <nav className={styles.navbar}>
      <h1>Movie Maven</h1>

      <input
        type="search"
        placeholder="Search by movie title"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </nav>
  );
}

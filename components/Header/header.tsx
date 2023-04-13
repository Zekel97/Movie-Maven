import styles from './header.module.scss';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaUserAlt } from 'react-icons/fa';

import { useMovieDataContext } from '@/scripts/MovieDataContext';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');
  const { search } = useMovieDataContext();

  const router = useRouter();
  const isUserPage = router.pathname === '/user-page';

  const handleSearch = () => {
    search.setMovieName(searchValue);

    if (router.pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <nav className={styles.navbar}>
      <a href={'/'} className={styles.title}>
        Movie Maven
      </a>

      <div className={styles.search}>
        <input
          id="movie-search"
          type="search"
          placeholder="Search by movie title"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button id="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <a href="/user-page" className={`${styles.userPage} ${isUserPage && styles.activePage}`}>
        <FaUserAlt />
      </a>
    </nav>
  );
}

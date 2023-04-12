import { useState } from 'react';
import styles from './header.module.scss';

import { useMovieDataContext } from '@/scripts/MovieDataContext';
import { useRouter } from 'next/router';

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
          type="search"
          placeholder="Search by movie title"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <a href="/user-page" className={`${styles.userPage} ${isUserPage ? styles.activePage : styles.notActivePage}`}>
        User page
      </a>
    </nav>
  );
}

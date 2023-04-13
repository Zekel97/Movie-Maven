import styles from './userPageBody.module.scss';

import { useState } from 'react';

import { Tabs, useMovieDataContext } from '@/scripts/MovieDataContext';
import { normalizeRuntime } from '@utils/DataUtils';

export default function UserPageBody() {
  const { local, search } = useMovieDataContext();

  const tabs: Tabs[] = ['watchlist', 'seen'];
  const [openTab, setOpenTab] = useState<Tabs>('watchlist');

  const totalMoviesCount = Object.keys(local.localMovies[openTab]).length;

  const totalMovieRuntime = Object.keys(local.localMovies[openTab]).reduce((acc, movie) => {
    const movieDuration = local.localMovies[openTab][movie].duration;
    const runtime = movieDuration.split(' ')[0];

    if (isNaN(Number(runtime))) {
      return acc;
    }

    return acc + Number(runtime);
  }, 0);

  return (
    <div className={styles.body}>
      <h1>User page</h1>

      <div className={styles.bodyArea}>
        <div className={styles.moviesList}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${openTab === tab ? styles.activeTab : styles.notActiveTab}`}
                onClick={() => setOpenTab(tab)}
                disabled={openTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className={styles.list}>
            {Object.keys(local.localMovies[openTab]).length !== 0 ? (
              <ul>
                {Object.keys(local.localMovies[openTab]).map((movie) => (
                  <li key={local.localMovies[openTab][movie].title}>
                    <span>{local.localMovies[openTab][movie].title}</span>
                    <button onClick={() => local.removeMovieFromLocalStorage(movie, openTab)}>X</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nothing here yet</p>
            )}
          </div>
        </div>

        <div className={styles.totalInfo}>
          <div className={styles.movies}>
            <span>Total movies: </span>
            <span>{totalMoviesCount}</span>
          </div>
          <div className={styles.duration}>
            <span>Total time: </span>
            <span>
              {totalMoviesCount !== 0 && normalizeRuntime(totalMovieRuntime) === '0 minutes'
                ? 'The movies in your list have no runtime'
                : normalizeRuntime(totalMovieRuntime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

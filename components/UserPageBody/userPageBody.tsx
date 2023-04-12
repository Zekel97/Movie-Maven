import { useState } from 'react';
import styles from './userPageBody.module.scss';

export default function UserPageBody() {
  const tabs = ['watchlist', 'seen'] as const;
  const [openTab, setOpenTab] = useState<'watchlist' | 'seen'>('watchlist');

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
            {/* TODO: add real data */}
            {true ? (
              <ul>
                <li>TEST</li>
                <li>TEST</li>
                <li>TEST</li>
              </ul>
            ) : (
              <p>Nothing here yet</p>
            )}
          </div>
        </div>

        <div className={styles.totalInfo}>
          {/* TODO: add real data */}
          <div className={styles.movies}>
            <span>Total movies: </span>
            <span>12</span>
          </div>
          <div className={styles.duration}>
            <span>Total time: </span>
            <span>12 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from './movieBody.module.scss';

export default function MovieBody() {
  // TODO: temp variable to test conditional rendering
  const foundMovie = true;

  return (
    <div className={styles.body}>
      {foundMovie ? (
        <div className={styles.movie}>
          <div className={styles.movieHeader}>
            <h2>Movie Title</h2>
            <p>Movie Description</p>
          </div>
          <div className={styles.moviePoster}></div>
          <div className={styles.movieRatings}>
            <h3>Ratings:</h3>
            <ul>
              <li>IMDB: 8.5</li>
              <li>Rotten Tomatoes: 90%</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.noMovie}>
          <h2>No movie found</h2>
        </div>
      )}
    </div>
  );
}

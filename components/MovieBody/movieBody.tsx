import styles from './movieBody.module.scss';

import { useMovieDataContext } from '@/scripts/MovieDataContext';

export default function MovieBody() {
  // TODO: temp variable to test conditional rendering
  const { foundMovie } = useMovieDataContext();

  return (
    <div className={styles.body}>
      {foundMovie ? (
        <div className={styles.movie}>
          <div className={styles.movieHeader}>
            <h2>{foundMovie.title}</h2>
            <p>{foundMovie.year}</p>
          </div>

          <div className={styles.moviePoster}>
            <img src={foundMovie.poster} alt={foundMovie.title} />
          </div>

          <div className={styles.movieInfo}>
            <section>
              <h3>Plot:</h3>
              <p>{foundMovie.plot}</p>
            </section>
            <section>
              <h3>Director:</h3>
              <p>{foundMovie.director}</p>
            </section>
            <section>
              <h3>Writer:</h3>
              <p>{foundMovie.writer}</p>
            </section>
            <section>
              <h3>Actors:</h3>
              <p>{foundMovie.actors}</p>
            </section>
            <section>
              <h3>Genre:</h3>
              <p>{foundMovie.genre}</p>
            </section>
            <section>
              <h3>Runtime:</h3>
              <p>{foundMovie.runtime}</p>
            </section>
          </div>

          <div className={styles.movieRatings}>
            <h3>Ratings:</h3>
            <ul>
              <li>
                <div className={styles.ratingSource}>Metascore</div>
                <div className={styles.ratingValue}>{foundMovie.metascore}</div>
              </li>
              {foundMovie.ratings.map((rating) => (
                <li key={rating.source}>
                  <div className={styles.ratingSource}>{rating.source}</div>
                  <div className={styles.ratingValue}>{rating.value}</div>
                </li>
              ))}
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

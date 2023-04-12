import styles from './movieBody.module.scss';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { NYTimesMovieInterface, useMovieDataContext } from '@/scripts/MovieDataContext';
import { useQueryFetch } from '@/scripts/utils/QueryUtils';
import Button from '../Button/button';

export default function MovieBody() {
  const { foundMovie, search } = useMovieDataContext();

  {/* TODO: add real data */}
  const movieUserInfo = {
    seen: true,
    watchlist: false,
  };

  const movieData = useQuery(
    useQueryFetch(
      ['movieData', search.movieName],
      'https://www.omdbapi.com',
      {
        apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
        t: search.movieName,
      },
      !!search.movieName,
    ),
  );

  const newYorkTimesData = useQuery(
    useQueryFetch(
      ['newYorkTimesData', foundMovie.movie?.Title ?? ''],
      'https://api.nytimes.com/svc/movies/v2/reviews/search.json',
      {
        query: foundMovie.movie?.Title,
        'api-key': process.env.NEXT_PUBLIC_NYTIMES_API_KEY,
      },
      !!foundMovie.movie?.Title,
    ),
  );

  const nyTimesMovieData: NYTimesMovieInterface = newYorkTimesData.data?.results.find(
    (result: any) => result.display_title.toLowerCase() === foundMovie.movie?.Title.toLowerCase(),
  );

  useEffect(() => {
    if (movieData.data && movieData.data.Response === 'True') {
      foundMovie.setMovie(movieData.data);

      return;
    }

    foundMovie.setMovie(null);
  }, [movieData.data]);

  return (
    <div className={styles.body}>
      {foundMovie.movie ? (
        <div className={styles.movie}>
          <div className={styles.movieHeader}>
            <div className={styles.title}>
              <h2>{foundMovie.movie.Title}</h2>
              <p>{foundMovie.movie.Year}</p>
            </div>
            {nyTimesMovieData && (
              <div className={styles.nyTimes}>
                <a href={nyTimesMovieData.link.url} target="_blank" rel="noreferrer">
                  NYTimes
                </a>
                {nyTimesMovieData.critics_pick === 1 && <p>Critics Pick!</p>}
              </div>
            )}
            <div className={styles.userActions}>
              <Button onClick={() => {}}>{!movieUserInfo.seen ? 'Seen' : 'Not Seen'}</Button>
              <Button onClick={() => {}}>{!movieUserInfo.watchlist ? 'Add to Watchlist' : 'Remove from Watchlist'}</Button>
            </div>
          </div>

          <div className={styles.moviePoster}>
            <img src={foundMovie.movie.Poster} alt={foundMovie.movie.Title} />
          </div>

          <div className={styles.movieInfo}>
            <section>
              <h3>Plot:</h3>
              <p>{foundMovie.movie.Plot}</p>
            </section>
            <section>
              <h3>Director:</h3>
              <p>{foundMovie.movie.Director}</p>
            </section>
            <section>
              <h3>Writer:</h3>
              <p>{foundMovie.movie.Writer}</p>
            </section>
            <section>
              <h3>Actors:</h3>
              <p>{foundMovie.movie.Actors}</p>
            </section>
            <section>
              <h3>Genre:</h3>
              <p>{foundMovie.movie.Genre}</p>
            </section>
            <section>
              <h3>Runtime:</h3>
              <p>{foundMovie.movie.Runtime}</p>
            </section>
          </div>

          <div className={styles.movieRatings}>
            {foundMovie.movie.Ratings.length !== 0 ? (
              <>
                <h3>Ratings:</h3>
                <ul>
                  <li key={'metascore'}>
                    <div className={styles.ratingSource}>Metascore</div>
                    <div className={styles.ratingValue}>{foundMovie.movie.Metascore}</div>
                  </li>
                  {foundMovie.movie.Ratings.map((rating) => (
                    <li key={rating.Source}>
                      <div className={styles.ratingSource}>{rating.Source}</div>
                      <div className={styles.ratingValue}>{rating.Value}</div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>No ratings</>
            )}
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

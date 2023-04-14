import styles from './movieBody.module.scss';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { NYTimesMovieInterface, Tabs, useMovieDataContext } from '@/scripts/MovieDataContext';
import { useQueryFetch } from '@utils/QueryUtils';
import Button from '../Button/button';

const favorites = ['Shrek', 'The Matrix', 'Wolf of Wall Street'];

export default function MovieBody() {
  const { foundMovie, search, local } = useMovieDataContext();

  const movieData = useQuery(
    useQueryFetch(
      ['movieData', search.movieName],
      process.env.NEXT_PUBLIC_OMDB_URL ?? '',
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
      process.env.NEXT_PUBLIC_NYTIMES_URL ?? '',
      {
        query: foundMovie.movie?.Title,
        'api-key': process.env.NEXT_PUBLIC_NYTIMES_API_KEY,
      },
      movieData.data?.Response === 'True',
    ),
  );

  const nyTimesMovieData: NYTimesMovieInterface =
    newYorkTimesData?.data?.results?.find(
      (result: any) => result.display_title.toLowerCase() === (foundMovie.movie?.Title || '').toLowerCase(),
    ) || false;

  const toggleUserActions = (type: Tabs) => {
    local.toggleMovieInLocalStorage(
      {
        imdbID: foundMovie.movie!.imdbID,
        title: foundMovie.movie!.Title,
        runtime: foundMovie.movie!.Runtime,
      },
      type,
    );
  };

  useEffect(() => {
    if (movieData.data && movieData.data.Response === 'True') {
      foundMovie.setMovie(movieData.data);

      return;
    }

    foundMovie.setMovie(undefined);
  }, [movieData.data]);

  useEffect(() => {
    if (search.movieName === '') {
      foundMovie.setMovie(null);
    }
  }, [search.movieName]);

  return (
    <div className={styles.body}>
      {movieData.isLoading && foundMovie.movie !== null ? (
        <p className={styles.loading}>Loading...</p>
      ) : foundMovie.movie !== undefined && foundMovie.movie !== null ? (
        <div className={styles.movie}>
          <div className={styles.movieHeader}>
            <div className={styles.title}>
              <h2>{foundMovie.movie.Title}</h2>
              <p>{foundMovie.movie.Year}</p>
            </div>
            {nyTimesMovieData && (
              <div className={styles.nyTimes}>
                <a href={nyTimesMovieData.link.url} target="_blank" rel="noreferrer">
                  NYTimes Review
                </a>
                {nyTimesMovieData.critics_pick === 1 && <p>Critics Pick!</p>}
              </div>
            )}
            <div className={styles.userActions}>
              <Button onClick={() => toggleUserActions('seen')}>
                {!local.isMovieInLocalStorage(foundMovie.movie!.imdbID, 'seen') ? 'Seen' : 'Not Seen'}
              </Button>
              <Button onClick={() => toggleUserActions('watchlist')}>
                {!local.isMovieInLocalStorage(foundMovie.movie!.imdbID, 'watchlist')
                  ? 'Add to Watchlist'
                  : 'Remove from Watchlist'}
              </Button>
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
      ) : foundMovie.movie === undefined ? (
        <div className={styles.noFound}>
          <h2>No movie found</h2>
        </div>
      ) : (
        <div className={styles.noMovie}>
          <h2>Search a movie!</h2>
          <p>Or choose between our favorites:</p>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite}>
                <button onClick={() => search.setMovieName(favorite)}>{favorite}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

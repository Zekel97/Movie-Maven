import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: ReactNode;
}

interface MovieResponseInterface {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbID: string;
  Type: string;
}

export interface NYTimesMovieInterface {
  display_title: string;
  mpaa_rating: string;
  critics_pick: number;
  byline: string;
  headline: string;
  summary_short: string;
  publication_date: string;
  opening_date: string;
  date_updated: string;
  link: {
    type: string;
    url: string;
    suggested_link_text: string;
  };
}

interface LocalMoviesInterface {
  seen: {
    [key: string]: {
      title: string;
      duration: string;
    };
  };
  watchlist: {
    [key: string]: {
      title: string;
      duration: string;
    };
  };
}

interface MovieDataInterface {
  search: {
    movieName: string;
    setMovieName: (movieName: string) => void;
  };
  foundMovie: {
    movie: MovieResponseInterface | null | undefined;
    setMovie: (movie: MovieResponseInterface | null | undefined) => void;
  };
  local: {
    removeMovieFromLocalStorage: (movieImdb: string, type: Tabs) => void;
    toggleMovieInLocalStorage: (movie: { imdbID: string; title: string; runtime: string }, type: Tabs) => void;
    isMovieInLocalStorage: (movieImdb: string, type: Tabs) => boolean;
    localMovies: LocalMoviesInterface;
  };
}

const tabs = ['seen', 'watchlist'] as const;
export type Tabs = (typeof tabs)[number];

const MovieDataContext = createContext({} as MovieDataInterface);

export function useMovieDataContext() {
  return useContext(MovieDataContext);
}

export function MovieDataProvider({ children }: Props) {
  const LOCAL_STORAGE_KEY = 'localMovies';
  const [searchedMovieName, setSearchedMovieName] = useState('');
  const [foundMovie, setFoundMovie] = useState<MovieResponseInterface | null | undefined>(null);
  const [localMovies, setLocalMovies] = useState<LocalMoviesInterface>({ seen: {}, watchlist: {} });
  const queryClient = new QueryClient();

  const fetchLocalMovies = () => {
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localStorageData) {
      return JSON.parse(localStorageData) as LocalMoviesInterface;
    }

    return {
      seen: {},
      watchlist: {},
    };
  };

  const addMovieToLocalStorage = (movie: { imdbID: string; title: string; runtime: string }, type: Tabs) => {
    const localMovies = fetchLocalMovies();

    if (type === 'seen' && localMovies.watchlist[movie.imdbID]) {
      delete localMovies.watchlist[movie.imdbID];
    }

    localMovies[type][movie.imdbID] = {
      title: movie.title,
      duration: movie.runtime,
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localMovies));
    setLocalMovies(localMovies);
  };

  const removeMovieFromLocalStorage = (movieImdb: string, type: Tabs) => {
    const localMovies = fetchLocalMovies();
    if (localMovies[type][movieImdb]) {
      delete localMovies[type][movieImdb];
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localMovies));
    setLocalMovies(localMovies);
  };

  const isMovieInLocalStorage = (movieImdb: string, type: Tabs) => {
    const localMovies = fetchLocalMovies();
    return localMovies[type][movieImdb] ? true : false;
  };

  const toggleMovieInLocalStorage = (movie: { imdbID: string; title: string; runtime: string }, type: Tabs) => {
    if (isMovieInLocalStorage(movie.imdbID, type)) {
      removeMovieFromLocalStorage(movie.imdbID, type);
      return;
    }

    addMovieToLocalStorage(movie, type);
  };

  useEffect(() => {
    setLocalMovies(fetchLocalMovies());
  }, []);

  const value: MovieDataInterface = {
    search: {
      movieName: searchedMovieName,
      setMovieName: (movieName: string) => setSearchedMovieName(movieName),
    },
    foundMovie: {
      movie: foundMovie,
      setMovie: (movie: MovieResponseInterface | null | undefined) => setFoundMovie(movie),
    },
    local: {
      removeMovieFromLocalStorage,
      toggleMovieInLocalStorage,
      isMovieInLocalStorage,
      localMovies,
    },
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MovieDataContext.Provider value={value}>{children}</MovieDataContext.Provider>
      </QueryClientProvider>
    </>
  );
}

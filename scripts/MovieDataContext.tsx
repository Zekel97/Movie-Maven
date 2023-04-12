import React, { createContext, ReactNode, useContext, useState } from 'react';

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

interface MovieDataInterface {
  search: {
    movieName: string;
    setMovieName: (movieName: string) => void;
  };
  foundMovie: {
    movie: MovieResponseInterface | null;
    setMovie: (movie: MovieResponseInterface | null) => void;
  };
}

const MovieDataContext = createContext({} as MovieDataInterface);

export function useMovieDataContext() {
  return useContext(MovieDataContext);
}

export function MovieDataProvider({ children }: Props) {
  const [searchedMovieName, setSearchedMovieName] = useState('');
  const [foundMovie, setFoundMovie] = useState<MovieResponseInterface | null>(null);
  const queryClient = new QueryClient();

  const value: MovieDataInterface = {
    search: {
      movieName: searchedMovieName,
      setMovieName: (movieName: string) => setSearchedMovieName(movieName),
    },
    foundMovie: {
      movie: foundMovie,
      setMovie: (movie: MovieResponseInterface | null) => setFoundMovie(movie),
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

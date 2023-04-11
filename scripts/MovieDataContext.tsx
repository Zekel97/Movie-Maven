import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface MovieResponseInterface {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  poster: string;
  ratings: {
    source: string;
    value: string;
  }[];
  metascore: string;
  imdbID: string;
  type: string;
}

interface MovieDataInterface {
  search: {
    movieName: string;
    setMovieName: (movieName: string) => void;
  };
  foundMovie?: MovieResponseInterface;
}

const MovieDataContext = createContext({} as MovieDataInterface);

export function useMovieDataContext() {
  return useContext(MovieDataContext);
}

export function MovieDataProvider({ children }: Props) {
  const [searchedMovieName, setSearchedMovieName] = useState('');

  // TODO: dummy data
  const foundMovie: MovieResponseInterface = {
    title: 'The Matrix',
    year: '1999',
    rated: 'R',
    released: '31 Mar 1999',
    runtime: '136 min',
    genre: 'Action, Sci-Fi',
    director: 'Lana Wachowski, Lilly Wachowski',
    writer: 'Lilly Wachowski, Lana Wachowski',
    actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
    plot: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    ratings: [
      {
        source: 'Internet Movie Database',
        value: '8.7/10',
      },
    ],
    metascore: '73',
    imdbID: 'tt0133093',
    type: 'movie',
  }

  const value: MovieDataInterface = {
    search: {
      movieName: searchedMovieName,
      setMovieName: (movieName: string) => setSearchedMovieName(movieName),
    },
    foundMovie,
  };

  return <MovieDataContext.Provider value={value}>{children}</MovieDataContext.Provider>;
}

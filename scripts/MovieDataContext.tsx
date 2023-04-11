import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface MovieDataInterface {
  search: {
    movieName: string;
    setMovieName: (movieName: string) => void;
  };
}

const MovieDataContext = createContext({} as MovieDataInterface);

export function useMovieDataContext() {
  return useContext(MovieDataContext);
}

export function MovieDataProvider({ children }: Props) {
  const [searchedMovieName, setSearchedMovieName] = useState('');

  const value: MovieDataInterface = {
    search: {
      movieName: searchedMovieName,
      setMovieName: (movieName: string) => setSearchedMovieName(movieName),
    },
  };

  return <MovieDataContext.Provider value={value}>{children}</MovieDataContext.Provider>;
}

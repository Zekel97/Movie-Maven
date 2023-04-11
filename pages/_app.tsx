import '@/styles/globals.scss';

import type { AppProps } from 'next/app';

import { MovieDataProvider } from '@/scripts/MovieDataContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MovieDataProvider>
        <Component {...pageProps} />
      </MovieDataProvider>
    </>
  );
}

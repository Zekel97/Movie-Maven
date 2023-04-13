import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { MovieDataProvider } from '@/scripts/MovieDataContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />

        <title>Movie Maven</title>
        <meta name="description" content="Movie Maven" />

        <meta property="og:title" content="Movie Maven"></meta>
        <meta property="og:type" content="website"></meta>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MovieDataProvider>
        <Component {...pageProps} />
      </MovieDataProvider>
    </>
  );
}

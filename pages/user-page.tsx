import Header from '@/components/Header/header';
import UserPageBody from '@/components/UserPageBody/userPageBody';
import Head from 'next/head';

export default function UserPage() {
  return (
    <>
      <Head>
        <title>User Page - Movie Maven</title>
      </Head>

      <main>
        <Header />
        <UserPageBody />
      </main>
    </>
  );
}

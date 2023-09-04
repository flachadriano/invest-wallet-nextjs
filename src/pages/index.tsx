import Title from '@/components/title';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tá investido</title>
      </Head>
      <div>
        <Link href="/brokers">
          <Title>Corretoras</Title>
        </Link>
      </div>
    </>
  );
}

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Container } from '@mui/system';

import Header from '@/components/header';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Container sx={{ m: 3 }}>
        <Component {...pageProps} />
      </Container>
    </SessionProvider>
  );
}

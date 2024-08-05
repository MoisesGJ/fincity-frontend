import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

import { Chakra_Petch } from 'next/font/google';
import Head from 'next/head';
const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Fin City</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
        />
      </Head>
      <div className={chakra.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

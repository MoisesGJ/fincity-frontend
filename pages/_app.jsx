import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

import { Chakra_Petch } from 'next/font/google';
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
      <div className={chakra.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

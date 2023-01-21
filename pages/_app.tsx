import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import axios from 'axios';
import '../styles/globals.css';
import { AppPropsType } from 'next/dist/shared/lib/utils';
import { Session } from 'next-auth';

interface AppProps extends AppPropsType {
  pageProps: {
    session: Session;
  };
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (url, query) =>
            axios.get(url, query && { params: query }).then((res) => res.data),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}

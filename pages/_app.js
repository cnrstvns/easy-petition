import React from 'react';
import PropTypes from 'prop-types';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import axios from 'axios';

import '../styles/globals.css';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{
        fetcher: (url, query) => axios.get(
          url,
          query && { params: query },
        ).then((res) => res.data),
      }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({
    session: PropTypes.shape({}),
  }),
};

export default App;

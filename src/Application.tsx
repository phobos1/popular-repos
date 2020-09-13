import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from './api/apollo';
import { getToken } from './api/authorization';
import { ReposList } from './components/ReposList/ReposList';
import styles from './styles/main.scss';

function Application() {
  const [token, setToken] = useState<string | void>(null);

  useEffect(() => {
    getToken()
      .then((newToken) => {
        setToken(newToken);
      });
  }, [token]);

  if (!token) {
    return <div>Authorization...</div>;
  }

  return (
    <ApolloProvider client={getApolloClient(token)}>
      <div className={styles['main-container']}>
        <h1>Most popular JS repos</h1>
        <ReposList />
      </div>
    </ApolloProvider>
  );
}

export default hot(Application);

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export function getApolloClient(token: string): ApolloClient<NormalizedCacheObject> {
  const httpLink = createHttpLink({
    uri: process.env.graphqlUrl
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }));

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}

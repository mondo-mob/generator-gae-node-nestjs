import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';
import { toIdValue } from 'apollo-utilities';
import { finishLoading, startLoading } from '../components/PageProgressBar';
import { showMessage } from '../components/Toast';
import { csrfHeaders } from './csrf';

const cache: InMemoryCache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      permitById: (_, { id }) =>
        toIdValue(
          (cache as any).config.dataIdFromObject({ __typename: 'Permit', id }),
        ),
    },
  },
});

const client = new ApolloClient({
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-and-network',
    },
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          if (process.env.NODE_ENV !== 'production') {
            showMessage(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              true,
            );
          } else {
            // tslint:disable:no-console
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            );
          }
        });
      }
      if (networkError) {
        showMessage(`[Network error]: ${networkError}`, true);
      }
    }),
    new ApolloLink((operation, forward) => {
      if (forward) {
        console.log(operation.operationName);

        startLoading();
        const result = forward(operation);
        result.subscribe(
          () => {
            /* do nothing */
          },
          () => {
            /* do nothing */
          },
          () => {
            finishLoading();
          },
        );
        return result;
      }

      return null;
    }),
    new BatchHttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest', // Suppress the gray basic auth dialog in the browser on 401
        ...csrfHeaders,
      },
    }),
  ]),
  cache,
});

export default client;

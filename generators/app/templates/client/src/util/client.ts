import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';
import { finishLoading, startLoading } from '../components/PageProgressBar';
import { showMessage } from '../components/Toast';
import { getCsrfHeaders } from './csrf';

const cache: InMemoryCache = new InMemoryCache({});

const client = new ApolloClient({
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first',
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
            showMessage(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`, true);
          } else {
            // tslint:disable:no-console
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
          }
        });
      }
      if (networkError) {
        // @ts-ignore
        if (message.statusCode && message.statusCode === 403 && location.pathname !== '/signin') {
          location.href = '/signin';
        }
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
      },
      fetch: (uri, options) => {
        options!.headers = {
          ...options!.headers,
          ...getCsrfHeaders(),
        };
        return fetch(uri, options);
      },
    }),
  ]),
  cache,
});

export default client;

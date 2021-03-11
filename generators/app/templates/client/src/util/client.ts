import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { onError } from '@apollo/client/link/error';
import { isArray } from 'lodash';
import { finishLoading, startLoading } from '../components/PageProgressBar';
import { showMessage } from '../components/Toast';
import { getCsrfHeaders } from './csrf';

const cache: InMemoryCache = new InMemoryCache({});

const extractOperationNames = (options: any) => {
  const body = options?.body ? JSON.parse(options.body) : [];
  const array = isArray(body) ? body : [body];
  return array.map((operation) => operation.operationName).filter((name) => !!name);
};

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
        graphQLErrors.forEach(({ message, locations, path }) => {
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
        if (message.statusCode && message.statusCode === 403 && window.location.pathname !== '/signin') {
          window.location.href = '/signin';
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
        return fetch(`${uri}?op=${extractOperationNames(options)}`, options);
      },
    }),
  ]),
  cache,
});

export default client;

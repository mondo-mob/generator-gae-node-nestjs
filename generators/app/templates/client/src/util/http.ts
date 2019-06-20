import { getCsrfHeaders } from './csrf';

type Headers = Record<string, string>;

class RestError extends Error {
  public status?: number;
  public payload?: string;
  public type?: string;
}

const baseUrl = '';

const commonHeaders = () => ({
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache', // required so IE11 does not automatically cache all GET requests
  'X-Requested-With': 'XMLHttpRequest', // Suppress the gray basic auth dialog in the browser on 401
  ...getCsrfHeaders(),
});

export const formEncode = (obj: Record<string, string>) =>
  Object.keys(obj)
    .map(k => `${k}=${encodeURIComponent(obj[k])}`)
    .join('&');

export const request = async <T>(
  path: string,
  method: string = 'GET',
  body: string | FormData | null = null,
  headers: Headers = {},
) => {
  const url = `${baseUrl}${path}`;

  const config: RequestInit = {
    method,
    headers: { ...commonHeaders(), ...headers },
    credentials: 'same-origin',
  };

  // Edge browsers will fail silently if you give a body, even a null one, to a GET request
  if (body) {
    config.body = body;
  }

  const response = await fetch(url, config);

  if (response.ok) {
    return response;
  }

  const text = await response.text();

  let error;

  try {
    // Attempt to parse body as JSON, fallback to plain text if parsing fails
    const data = JSON.parse(text);
    error = new RestError(data.message);
    error.type = data.type;
  } catch (e) {
    // Fallback to plain text
    error = new RestError(response.statusText);
  }

  error.status = response.status;
  error.payload = text;

  throw error;
};

const hasHeader = (headers: Headers = {}, headerName: string) =>
  Object.keys(headers).some(key => key.toLowerCase() === headerName.toLowerCase());

const requestWithData = (path: string, method: string, data: FormData | object, headers: Headers = {}) => {
  const headerContentType = 'Content-Type';
  // Don't modify for FormData or request with existing content-type header set
  if (data instanceof FormData || hasHeader(headers, headerContentType)) {
    return request(path, method, data as FormData, headers);
  }
  // Otherwise default to JSON
  return request(path, method, JSON.stringify(data), {
    [headerContentType]: 'application/json',
    ...headers,
  });
};

export const requestJSON = async (path: string, method: string, data: any, headers = {}) => {
  const response = await (data ? requestWithData(path, method, data, headers) : request(path, method, null, headers));

  const text = await response.text();

  return text && JSON.parse(text);
};

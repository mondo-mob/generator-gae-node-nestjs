import Cookies from 'universal-cookie';

const cookies = new Cookies();

let csrfToken;
if (process.env.NODE_ENV !== 'production') {
  csrfToken = 'development';
} else {
  csrfToken = cookies.get('csrf-token');
}

export const csrfHeaders = {
  'x-csrf-token': csrfToken,
};

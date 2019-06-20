import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getCsrfHeaders = () => ({
  'x-csrf-token': process.env.NODE_ENV !== 'production' ? 'development' : cookies.get('csrf-token'),
});



const whitelist = [
  '/login',
  '/register',
  '/inquiry',
  '/news',
  '/categories-tree',
];

export const getWhitelist = () => {
  if (process.env.NODE_ENV === 'development') {
    return [...whitelist, '/products'];
  } else {
    return whitelist;
  }
}
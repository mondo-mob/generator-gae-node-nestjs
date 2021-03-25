const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use('/api', createProxyMiddleware({ target: 'http://localhost:8080' }));
  app.use('/auth', createProxyMiddleware({ target: 'http://localhost:8080' }));
  app.use('/tasks', createProxyMiddleware({ target: 'http://localhost:8080' }));
  app.use('/system', createProxyMiddleware({ target: 'http://localhost:8080' }));
};

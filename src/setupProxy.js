const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy for webhook-test endpoints
  app.use(
    '/webhook-test',
    createProxyMiddleware({
      target: 'http://localhost:5678',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );

  // Proxy for webhook endpoints
  app.use(
    '/webhook',
    createProxyMiddleware({
      target: 'http://localhost:5678',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};

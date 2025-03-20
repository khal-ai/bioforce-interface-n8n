const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/webhook-test',
    createProxyMiddleware({
      target: 'http://localhost:5678',
      changeOrigin: true,
      pathRewrite: {
        '^/webhook-test': '/webhook-test', // No rewrite needed
      },
    })
  );
};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "https://ksserver-496b.onrender.com",
            changeOrigin: true,
            secure: false,
            cookieDomainRewrite: {
                "*": ""
            },
            onProxyRes: (proxyRes) => {
                proxyRes.headers['Access-Control-Allow-Origin'] = 'https://ksserver-496b.onrender.com';
                proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
                proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
                proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
            }
        })
    );
};
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

app.use(express.json({ limit: '64mb' }));

const proxyOptions = {
  target: 'http://localhost:3000',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Host', req.headers.host);
    proxyReq.setHeader('X-Forwarded-For', req.connection.remoteAddress);
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Content-Encoding'] = 'gzip';
  },
  onProxyReqWs: (proxyReq, req, socket, options, head) => {
    proxyReq.setHeader('X-Forwarded-For', req.connection.remoteAddress);
  },
};

app.use('/', createProxyMiddleware(proxyOptions));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

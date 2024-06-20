const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 443; // Use port 443 for HTTPS

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

app.use((req, res, next) => {
  if (req.hostname === 'ai.livecdn.website') {
    createProxyMiddleware(proxyOptions)(req, res, next);
  } else {
    res.status(404).send('Not Found');
  }
});

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/ai.livecdn.website/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/ai.livecdn.website/fullchain.pem')
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});

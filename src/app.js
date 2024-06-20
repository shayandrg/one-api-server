const express = require('express');
const httpProxy = require('http-proxy');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 443;
const proxy = httpProxy.createProxyServer();

app.use(express.json({ limit: '64mb' }));

app.use((req, res, next) => {
  console.log(`Request received for ${req.hostname} ${req.method} ${req.url}`);
  if (req.hostname === 'ai.livecdn.website') {
    proxy.web(req, res, { target: 'http://one-api:3000', changeOrigin: true }, next);
  } else {
    res.status(404).send('Not Found');
  }
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
  proxyReq.setHeader('Host', req.headers.host);
  proxyReq.setHeader('X-Forwarded-For', req.connection.remoteAddress);
});

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/ai.livecdn.website/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/ai.livecdn.website/fullchain.pem')
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});

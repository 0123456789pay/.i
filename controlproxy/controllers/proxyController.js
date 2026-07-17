const express = require('express');
const httpProxy = require('http-proxy');
const fs = require('fs');
const path = require('path');

class ControlProxy {
  constructor(configPath) {
    this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    this.app = express();
    this.proxy = httpProxy.createProxyServer({});
    this.routes = new Map();
    this.activeConnections = 0;
    this.requestCount = 0;
    this.startTime = Date.now();
    
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeServices();
  }

  initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((req, res, next) => {
      req.startTime = Date.now();
      this.requestCount++;
      next();
    });
  }

  initializeRoutes() {
    // Browser Search Proxy
    this.app.use('/search', require('./routes/browserSearch')(this.config, this.proxy));
    
    // API Gateway
    this.app.use('/api', require('./routes/apiGateway')(this.config, this.proxy));
    
    // AI MCP Endpoint
    this.app.use('/mcp', require('./routes/aiMcp')(this.config, this.proxy));
    
    // AI System
    this.app.use('/ai', require('./routes/aiSystem')(this.config, this.proxy));
    
    // Routing System
    this.app.use('/route', require('./routes/routing')(this.config, this.proxy));
    
    // Hosting & Domain
    this.app.use('/host', require('./routes/hosting')(this.config, this.proxy));
    
    // Dashboard
    this.app.use('/dashboard', require('./routes/dashboard')(this.config));
    
    // Static files for dashboard
    this.app.use('/public', express.static(path.join(__dirname, '../public')));
  }

  initializeServices() {
    // Initialize background services
    require('./services/healthCheck')(this.config);
    require('./services/logRotator')(this.config);
  }

  start() {
    const { port, host } = this.config.proxy;
    this.app.listen(port, host, () => {
      console.log(`ControlProxy started on ${host}:${port}`);
      console.log(`Dashboard available at http://${host}:${this.config.dashboard.port}`);
    });
  }
}

module.exports = ControlProxy;

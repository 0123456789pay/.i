const express = require('express');
const router = express.Router();

module.exports = (config, proxy) => {
  const apiConfig = config.api_gateway;

  // API Gateway main endpoint
  router.all('/*', async (req, res) => {
    if (!apiConfig.enabled) {
      return res.status(503).json({ error: 'API Gateway is disabled' });
    }

    // Check authentication if required
    if (apiConfig.auth_required && !req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization required' });
    }

    // Route to appropriate backend service
    const targetService = determineBackendService(req.path);
    
    try {
      proxy.web(req, res, {
        target: targetService,
        changeOrigin: true,
        secure: false
      }, (err) => {
        res.status(500).json({ error: 'API Gateway error', details: err.message });
      });
    } catch (error) {
      res.status(500).json({ error: 'Request failed', details: error.message });
    }
  });

  // Get API status
  router.get('/status', (req, res) => {
    res.json({
      enabled: apiConfig.enabled,
      version: apiConfig.version,
      endpoints: apiConfig.endpoints,
      auth_required: apiConfig.auth_required
    });
  });

  return router;
};

function determineBackendService(path) {
  // Simple routing logic - can be extended
  if (path.startsWith('/users')) {
    return 'http://localhost:3001';
  } else if (path.startsWith('/data')) {
    return 'http://localhost:3002';
  }
  return 'http://localhost:3000';
}

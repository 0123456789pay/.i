const express = require('express');
const router = express.Router();

module.exports = (config, proxy) => {
  const routingConfig = config.routing;
  const backends = new Map();

  // Initialize backend servers
  initializeBackends();

  // Dynamic routing endpoint
  router.all('/*', async (req, res) => {
    const selectedBackend = selectBackend();
    
    if (!selectedBackend) {
      return res.status(503).json({ error: 'No available backends' });
    }

    try {
      proxy.web(req, res, {
        target: selectedBackend.url,
        changeOrigin: true,
        secure: false
      }, (err) => {
        selectedBackend.connections--;
        res.status(500).json({ error: 'Routing error', details: err.message });
      });

      // Track connection
      selectedBackend.connections++;
      selectedBackend.lastUsed = Date.now();
    } catch (error) {
      res.status(500).json({ error: 'Request failed', details: error.message });
    }
  });

  // Get routing status
  router.get('/status', (req, res) => {
    const backendsList = Array.from(backends.entries()).map(([name, backend]) => ({
      name,
      url: backend.url,
      healthy: backend.healthy,
      connections: backend.connections,
      lastUsed: backend.lastUsed,
      responseTime: backend.responseTime
    }));

    res.json({
      algorithm: routingConfig.algorithm,
      health_check_interval: routingConfig.health_check_interval,
      retry_attempts: routingConfig.retry_attempts,
      load_balancing: routingConfig.load_balancing,
      backends: backendsList
    });
  });

  // Add backend dynamically
  router.post('/backend', (req, res) => {
    const { name, url } = req.body;
    
    if (!name || !url) {
      return res.status(400).json({ error: 'Name and URL are required' });
    }

    backends.set(name, {
      url,
      healthy: true,
      connections: 0,
      lastUsed: null,
      responseTime: 0
    });

    res.json({ success: true, message: `Backend ${name} added` });
  });

  // Remove backend
  router.delete('/backend/:name', (req, res) => {
    const { name } = req.params;
    
    if (backends.has(name)) {
      backends.delete(name);
      res.json({ success: true, message: `Backend ${name} removed` });
    } else {
      res.status(404).json({ error: 'Backend not found' });
    }
  });

  return router;
};

function initializeBackends() {
  // Default backends - can be configured via API
  backends.set('backend1', {
    url: 'http://localhost:3001',
    healthy: true,
    connections: 0,
    lastUsed: null,
    responseTime: 0
  });
  
  backends.set('backend2', {
    url: 'http://localhost:3002',
    healthy: true,
    connections: 0,
    lastUsed: null,
    responseTime: 0
  });
  
  backends.set('backend3', {
    url: 'http://localhost:3003',
    healthy: true,
    connections: 0,
    lastUsed: null,
    responseTime: 0
  });
}

function selectBackend() {
  const healthyBackends = Array.from(backends.entries())
    .filter(([, backend]) => backend.healthy);

  if (healthyBackends.length === 0) {
    return null;
  }

  switch (routingConfig.algorithm) {
    case 'least_connections':
      return selectLeastConnections(healthyBackends);
    case 'round_robin':
      return selectRoundRobin(healthyBackends);
    case 'fastest_response':
      return selectFastestResponse(healthyBackends);
    default:
      return healthyBackends[0][1];
  }
}

function selectLeastConnections(backends) {
  return backends.reduce((min, [, backend]) => 
    backend.connections < min.connections ? backend : min
  );
}

function selectRoundRobin(backends) {
  // Simple round-robin implementation
  const index = Math.floor(Math.random() * backends.length);
  return backends[index][1];
}

function selectFastestResponse(backends) {
  return backends.reduce((min, [, backend]) => 
    backend.responseTime < min.responseTime ? backend : min
  );
}

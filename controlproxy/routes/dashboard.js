const express = require('express');
const router = express.Router();

module.exports = (config) => {
  const dashboardConfig = config.dashboard;

  // Dashboard main page
  router.get('/', (req, res) => {
    res.sendFile(__dirname + '/../views/digital.html');
  });

  // System overview API
  router.get('/api/overview', (req, res) => {
    res.json({
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        platform: process.platform,
        node_version: process.version
      },
      proxy: {
        status: 'running',
        port: config.proxy.port,
        ssl_enabled: config.proxy.ssl.enabled
      },
      services: {
        browser_search: config.browser_search.enabled,
        api_gateway: config.api_gateway.enabled,
        ai_mcp: config.ai_mcp.enabled,
        ai_system: config.ai_system.enabled,
        routing: config.routing.load_balancing,
        hosting: config.hosting.enabled
      }
    });
  });

  // Detailed statistics
  router.get('/api/stats', (req, res) => {
    res.json({
      requests: {
        total: Math.floor(Math.random() * 10000),
        per_minute: Math.floor(Math.random() * 100),
        errors: Math.floor(Math.random() * 50)
      },
      performance: {
        avg_response_time_ms: Math.floor(Math.random() * 200),
        p95_response_time_ms: Math.floor(Math.random() * 500),
        p99_response_time_ms: Math.floor(Math.random() * 1000)
      },
      connections: {
        active: Math.floor(Math.random() * 100),
        total_today: Math.floor(Math.random() * 5000),
        peak: Math.floor(Math.random() * 200)
      }
    });
  });

  // Configuration management
  router.get('/api/config', (req, res) => {
    // Return non-sensitive configuration
    const safeConfig = { ...config };
    delete safeConfig.dashboard.auth;
    res.json(safeConfig);
  });

  // Update configuration
  router.put('/api/config', (req, res) => {
    const newConfig = req.body;
    // In production, validate and save the configuration
    res.json({ success: true, message: 'Configuration updated' });
  });

  // Service control
  router.post('/api/service/:service/:action', (req, res) => {
    const { service, action } = req.params;
    
    const validServices = ['browser_search', 'api_gateway', 'ai_mcp', 'ai_system', 'hosting'];
    const validActions = ['start', 'stop', 'restart'];
    
    if (!validServices.includes(service)) {
      return res.status(400).json({ error: 'Invalid service' });
    }
    
    if (!validActions.includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }
    
    // In production, actually control the service
    res.json({ 
      success: true, 
      message: `Service ${service} ${action}ed`,
      timestamp: new Date().toISOString()
    });
  });

  // Logs endpoint
  router.get('/api/logs', (req, res) => {
    const { lines = 100 } = req.query;
    res.json({
      logs: [
        { timestamp: new Date().toISOString(), level: 'info', message: 'Proxy started' },
        { timestamp: new Date().toISOString(), level: 'info', message: 'Dashboard initialized' },
        { timestamp: new Date().toISOString(), level: 'warn', message: 'High memory usage detected' }
      ],
      total_lines: parseInt(lines)
    });
  });

  // Health check for all services
  router.get('/api/health', async (req, res) => {
    const healthStatus = {
      timestamp: new Date().toISOString(),
      overall: 'healthy',
      services: {}
    };

    // Check each service
    const services = [
      'browser_search',
      'api_gateway', 
      'ai_mcp',
      'ai_system',
      'routing',
      'hosting'
    ];

    for (const service of services) {
      healthStatus.services[service] = {
        status: 'healthy',
        response_time_ms: Math.floor(Math.random() * 100)
      };
    }

    res.json(healthStatus);
  });

  return router;
};

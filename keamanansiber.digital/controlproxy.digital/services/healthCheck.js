const http = require('http');

module.exports = (config) => {
  const routingConfig = config.routing;
  const backends = [
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003'
  ];

  // Health check interval
  setInterval(() => {
    checkAllBackends();
  }, routingConfig.health_check_interval * 1000);

  async function checkAllBackends() {
    const healthPromises = backends.map(backend => checkBackend(backend));
    
    try {
      await Promise.all(healthPromises);
    } catch (error) {
      console.error('Health check error:', error.message);
    }
  }

  async function checkBackend(url) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const req = http.get(`${url}/health`, { timeout: 5000 }, (res) => {
        const responseTime = Date.now() - startTime;
        
        if (res.statusCode === 200) {
          console.log(`✓ Backend ${url} is healthy (${responseTime}ms)`);
          resolve({ url, healthy: true, responseTime });
        } else {
          console.warn(`✗ Backend ${url} returned status ${res.statusCode}`);
          resolve({ url, healthy: false, responseTime, statusCode: res.statusCode });
        }
      });

      req.on('error', (error) => {
        const responseTime = Date.now() - startTime;
        console.error(`✗ Backend ${url} is unreachable: ${error.message}`);
        resolve({ url, healthy: false, responseTime, error: error.message });
      });

      req.on('timeout', () => {
        req.destroy();
        console.error(`✗ Backend ${url} timed out`);
        resolve({ url, healthy: false, responseTime: 5000, error: 'timeout' });
      });
    });
  }

  // Initial health check
  console.log('Starting initial health check...');
  checkAllBackends();

  return { checkAllBackends, checkBackend };
};

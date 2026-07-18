const ControlProxy = require('./controllers/proxyController');
const path = require('path');

// Load configuration
const configPath = path.join(__dirname, 'config', 'settings.json');

// Initialize and start the proxy
console.log('🚀 Starting ControlProxy System...');
console.log('📁 Loading configuration from:', configPath);

try {
  const proxy = new ControlProxy(configPath);
  proxy.start();
  
  console.log('\n✅ ControlProxy successfully started!');
  console.log('\n📊 Available Services:');
  console.log('   - Browser Search Proxy: /search');
  console.log('   - API Gateway: /api');
  console.log('   - AI MCP Endpoint: /mcp');
  console.log('   - AI System: /ai');
  console.log('   - Routing System: /route');
  console.log('   - Hosting & Domain: /host');
  console.log('   - Dashboard: /dashboard');
  console.log('\n🌐 Dashboard URL: http://localhost:3000/dashboard');
  console.log('🔧 Main Proxy Port: 8080\n');
} catch (error) {
  console.error('❌ Failed to start ControlProxy:', error.message);
  process.exit(1);
}

/**
 * SoutheastApp API Routes
 * Sistem API unik untuk wilayah Asia Tenggara
 */

export const routes = {
  // Component Management
  'GET /api/components': 'List all components',
  'GET /api/components/:name': 'Get component by name',
  'POST /api/components': 'Register new component',
  
  // Storage Operations
  'GET /api/storage': 'List all stored items',
  'GET /api/storage/:key': 'Retrieve stored data',
  'POST /api/storage': 'Store new data',
  'DELETE /api/storage/:key': 'Delete stored data',
  'GET /api/storage/stats': 'Get storage statistics',
  
  // Regional Services
  'GET /api/regions': 'List supported regions',
  'GET /api/regions/:code': 'Get region details',
  'GET /api/locales': 'List supported locales',
  
  // System Status
  'GET /api/status': 'Get system status',
  'GET /api/health': 'Health check endpoint'
};

export const apiVersion = '1.0.0';
export const apiName = 'SoutheastApp API';

export default routes;

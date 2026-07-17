const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

module.exports = (config, proxy) => {
  const hostingConfig = config.hosting;
  const domainConfig = config.domain;

  // Serve static files for managed domains
  router.get('/', (req, res) => {
    if (!hostingConfig.enabled) {
      return res.status(503).json({ error: 'Hosting service is disabled' });
    }

    const host = req.headers.host || 'localhost';
    const domain = extractDomain(host);
    
    if (!domainConfig.managed_domains.includes(domain)) {
      return res.status(404).json({ error: 'Domain not managed' });
    }

    const indexPath = path.join(hostingConfig.root_dir, hostingConfig.index_files[0]);
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ error: 'Index file not found' });
    }
  });

  // Serve any static file
  router.get('/*', (req, res) => {
    if (!hostingConfig.enabled) {
      return res.status(503).json({ error: 'Hosting service is disabled' });
    }

    const filePath = path.join(hostingConfig.root_dir, req.path);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  });

  // Get hosting configuration
  router.get('/config', (req, res) => {
    res.json({
      enabled: hostingConfig.enabled,
      root_dir: hostingConfig.root_dir,
      index_files: hostingConfig.index_files,
      directory_listing: hostingConfig.directory_listing,
      managed_domains: domainConfig.managed_domains,
      ssl_auto_renew: domainConfig.ssl_auto_renew,
      dns_provider: domainConfig.dns_provider
    });
  });

  // List managed domains
  router.get('/domains', (req, res) => {
    const domains = domainConfig.managed_domains.map(domain => ({
      domain,
      ssl_enabled: domainConfig.ssl_auto_renew,
      dns_provider: domainConfig.dns_provider
    }));
    
    res.json({ domains });
  });

  // Add domain dynamically
  router.post('/domain', (req, res) => {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    if (!domainConfig.managed_domains.includes(domain)) {
      domainConfig.managed_domains.push(domain);
      res.json({ success: true, message: `Domain ${domain} added` });
    } else {
      res.status(409).json({ error: 'Domain already exists' });
    }
  });

  // Remove domain
  router.delete('/domain/:domain', (req, res) => {
    const { domain } = req.params;
    const index = domainConfig.managed_domains.indexOf(domain);
    
    if (index !== -1) {
      domainConfig.managed_domains.splice(index, 1);
      res.json({ success: true, message: `Domain ${domain} removed` });
    } else {
      res.status(404).json({ error: 'Domain not found' });
    }
  });

  return router;
};

function extractDomain(host) {
  // Remove port if present
  return host.split(':')[0];
}

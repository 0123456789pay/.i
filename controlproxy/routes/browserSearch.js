const express = require('express');
const router = express.Router();

module.exports = (config, proxy) => {
  const searchConfig = config.browser_search;

  // Search endpoint
  router.get('/', async (req, res) => {
    const { q, engine = 'google' } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
      let searchUrl;
      switch (engine.toLowerCase()) {
        case 'google':
          searchUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
          break;
        case 'bing':
          searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(q)}`;
          break;
        case 'duckduckgo':
          searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(q)}`;
          break;
        default:
          return res.status(400).json({ error: 'Unsupported search engine' });
      }

      // Proxy the search request
      proxy.web(req, res, {
        target: searchUrl,
        changeOrigin: true,
        secure: false
      }, (err) => {
        res.status(500).json({ error: 'Proxy error', details: err.message });
      });
    } catch (error) {
      res.status(500).json({ error: 'Search failed', details: error.message });
    }
  });

  // Get available search engines
  router.get('/engines', (req, res) => {
    res.json({
      engines: searchConfig.engines,
      rate_limit: searchConfig.rate_limit,
      cache_ttl: searchConfig.cache_ttl
    });
  });

  return router;
};

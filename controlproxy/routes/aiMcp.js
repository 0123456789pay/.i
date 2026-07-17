const express = require('express');
const router = express.Router();

module.exports = (config, proxy) => {
  const mcpConfig = config.ai_mcp;

  // MCP endpoint for AI model communication
  router.post('/', async (req, res) => {
    if (!mcpConfig.enabled) {
      return res.status(503).json({ error: 'MCP service is disabled' });
    }

    const { prompt, max_tokens, temperature } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      const response = await fetch(mcpConfig.model_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          max_tokens: max_tokens || mcpConfig.max_tokens,
          temperature: temperature || mcpConfig.temperature
        })
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'MCP request failed', details: error.message });
    }
  });

  // Get MCP configuration
  router.get('/config', (req, res) => {
    res.json({
      enabled: mcpConfig.enabled,
      model_endpoint: mcpConfig.model_endpoint,
      max_tokens: mcpConfig.max_tokens,
      temperature: mcpConfig.temperature
    });
  });

  // Health check
  router.get('/health', async (req, res) => {
    try {
      const response = await fetch(`${mcpConfig.model_endpoint}/health`, {
        method: 'GET',
        timeout: 5000
      });
      
      if (response.ok) {
        res.json({ status: 'healthy', endpoint: mcpConfig.model_endpoint });
      } else {
        res.status(503).json({ status: 'unhealthy', endpoint: mcpConfig.model_endpoint });
      }
    } catch (error) {
      res.status(503).json({ status: 'unreachable', error: error.message });
    }
  });

  return router;
};

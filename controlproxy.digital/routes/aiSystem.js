const express = require('express');
const router = express.Router();

module.exports = (config, proxy) => {
  const aiConfig = config.ai_system;

  // Multi-model AI routing
  router.post('/chat', async (req, res) => {
    if (!aiConfig.enabled) {
      return res.status(503).json({ error: 'AI System is disabled' });
    }

    const { message, model = 'gpt-4', context = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      const selectedModel = selectModel(model, aiConfig.models);
      const response = await callAIModel(selectedModel, message, context);
      res.json(response);
    } catch (error) {
      // Fallback to another model if enabled
      if (aiConfig.fallback_enabled) {
        try {
          const fallbackModel = getFallbackModel(model, aiConfig.models);
          const response = await callAIModel(fallbackModel, message, context);
          res.json({ ...response, fallback_used: true, original_model: model });
        } catch (fallbackError) {
          res.status(500).json({ error: 'All AI models failed', details: fallbackError.message });
        }
      } else {
        res.status(500).json({ error: 'AI request failed', details: error.message });
      }
    }
  });

  // Get available models
  router.get('/models', (req, res) => {
    res.json({
      enabled: aiConfig.enabled,
      models: aiConfig.models,
      fallback_enabled: aiConfig.fallback_enabled,
      context_window: aiConfig.context_window
    });
  });

  // Model comparison endpoint
  router.post('/compare', async (req, res) => {
    const { message, models = aiConfig.models } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      const results = await Promise.all(
        models.map(async (model) => {
          try {
            const response = await callAIModel(model, message, []);
            return { model, response, success: true };
          } catch (error) {
            return { model, error: error.message, success: false };
          }
        })
      );
      res.json({ results });
    } catch (error) {
      res.status(500).json({ error: 'Comparison failed', details: error.message });
    }
  });

  return router;
};

function selectModel(requestedModel, availableModels) {
  if (availableModels.includes(requestedModel)) {
    return requestedModel;
  }
  return availableModels[0];
}

function getFallbackModel(currentModel, availableModels) {
  const currentIndex = availableModels.indexOf(currentModel);
  if (currentIndex === -1 || currentIndex === availableModels.length - 1) {
    return availableModels[0];
  }
  return availableModels[currentIndex + 1];
}

async function callAIModel(model, message, context) {
  // Simulated AI model call - replace with actual API calls
  return {
    model,
    response: `Response from ${model} for: ${message}`,
    context_length: context.length,
    timestamp: new Date().toISOString()
  };
}

# AI Proxy Server

This is a lightweight Node.js Express proxy for routing AI requests to multiple providers (OpenAI, Anthropic, Azure OpenAI, or a local model endpoint). It demonstrates secure API key usage via environment variables, basic quota handling, and an admin-controlled "unlimited" flag. THIS IS A REFERENCE IMPLEMENTATION — audit and secure before production.

Requirements
- Node.js 18+
- npm install

Environment variables (example):
- OPENAI_API_KEY
- ANTHROPIC_API_KEY
- AZURE_OPENAI_API_KEY
- AZURE_OPENAI_ENDPOINT
- LOCAL_AI_ENDPOINT
- ADMIN_SECRET - secret to protect admin endpoints

Usage
1. Copy `.env` values into environment (do not commit secrets).
2. npm install
3. node index.js

Endpoints
- POST /api/ai/chat
  Body: { provider, model, prompt }
  Headers: x-user-id (optional) or Authorization: Bearer <token>

- POST /api/admin/unlimited
  Body: { enable: true }
  Header: x-admin-secret: <ADMIN_SECRET>

Note: This proxy DOES NOT implement production-level rate limiting or billing — you must add billing controls before enabling high-volume access.

# AI Proxy peladen

ini is a lightweight Node.js Express proxy untuk routing AI requests to multiple providers (OpenAI, Anthropic, Azure OpenAI, atau a local model endpoint). It demonstrates secure API kunci usage via environment variables, basic quota handling, dan an pengelola-controlled "tak terbatas" flag. ini IS A REFERENCE IMPLEMENTATION — audit dan secure before production.

Requirements
- Node.js 18+
- npm install

Environment variables (contoh):
- OPENAI_API_KEY
- ANTHROPIC_API_KEY
- AZURE_OPENAI_API_KEY
- AZURE_OPENAI_ENDPOINT
- LOCAL_AI_ENDPOINT
- ADMIN_SECRET - rahasia to protect pengelola endpoints

Usage
1. Copy `.env` values into environment (do bukan commit secrets).
2. npm install
3. node indeks.js

Endpoints
- POST /api/ai/chat
  Body: { provider, model, sapa }
  Headers: x-pengguna-id (optional) atau Authorization: Bearer <token>

- POST /api/pengelola/tak terbatas
  Body: { enable: benar }
  kepala: x-pengelola-rahasia: <ADMIN_SECRET>

catatan: ini proxy DOES bukan implement production-level rate limiting atau billing — you must add billing controls before enabling high-volume access.

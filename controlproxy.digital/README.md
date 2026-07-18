# ControlProxy - Advanced Proxy System

ControlProxy adalah sistem proxy canggih yang menggabungkan berbagai fungsionalitas dalam satu platform terpadu.

## 🚀 Fitur Utama

### 1. **Browser Search Proxy** (`/search`)
- Proxy pencarian untuk multiple search engines (Google, Bing, DuckDuckGo)
- Rate limiting dan caching
- Support multi-engine

### 2. **API Gateway** (`/api`)
- Gateway terpusat untuk semua API endpoints
- Authentication & Authorization
- Request routing ke backend services

### 3. **AI MCP** (`/mcp`)
- Model Context Protocol endpoint
- Integrasi dengan AI models
- Configurable tokens dan temperature

### 4. **AI System** (`/ai`)
- Multi-model AI routing (GPT-4, Claude-3, Llama-3)
- Fallback mechanism
- Model comparison endpoint

### 5. **Routing System** (`/route`)
- Load balancing dengan multiple algorithms:
  - Least Connections
  - Round Robin
  - Fastest Response
- Health checking otomatis
- Dynamic backend management

### 6. **Hosting & Domain** (`/host`)
- Static file hosting
- Multi-domain support
- SSL auto-renewal integration

### 7. **Dashboard** (`/dashboard`)
- Real-time system monitoring
- Service management (start/stop/restart)
- Configuration management
- Log viewer
- Statistics & analytics

## 📁 Struktur Folder

```
controlproxy/
├── config/
│   └── settings.json          # Konfigurasi utama
├── controllers/
│   └── proxyController.js     # Main controller
├── routes/
│   ├── browserSearch.js       # Browser search routes
│   ├── apiGateway.js          # API gateway routes
│   ├── aiMcp.js              # AI MCP routes
│   ├── aiSystem.js           # AI system routes
│   ├── routing.js            # Routing system routes
│   ├── hosting.js            # Hosting & domain routes
│   └── dashboard.js          # Dashboard routes
├── services/
│   ├── healthCheck.js        # Health check service
│   └── logRotator.js         # Log rotation service
├── views/
│   └── dashboard.html        # Dashboard UI
├── public/
│   ├── css/
│   │   └── dashboard.css     # Dashboard styles
│   └── js/
│       └── dashboard.js      # Dashboard JavaScript
├── logs/                      # Log files directory
├── index.js                   # Entry point
└── package.json              # Dependencies
```

## 🔧 Instalasi

```bash
cd controlproxy
npm install
```

## 🏃 Menjalankan Aplikasi

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## ⚙️ Konfigurasi

Edit file `config/settings.json` untuk menyesuaikan:

- **Proxy Settings**: Port, host, timeout, SSL
- **Browser Search**: Search engines, rate limits
- **API Gateway**: Version, authentication
- **AI MCP**: Model endpoint, tokens, temperature
- **AI System**: Models, fallback settings
- **Routing**: Algorithm, health check interval
- **Hosting**: Root directory, managed domains
- **Logging**: Level, rotation settings
- **Dashboard**: Port, authentication

## 📊 Dashboard Features

Dashboard tersedia di `http://localhost:3000/dashboard` dengan fitur:

1. **Overview**: System status, uptime, connections, requests
2. **Services**: Control services (start/stop/restart)
3. **Statistics**: Response times, request volume
4. **Configuration**: Edit system configuration
5. **Logs**: View system logs in real-time
6. **Settings**: Dashboard preferences

## 🔐 Keamanan

- Authentication untuk API endpoints
- SSL/TLS support
- Rate limiting
- Request validation
- Secure headers (Helmet)

## 📝 Logging

Sistem logging otomatis dengan:
- Log rotation berdasarkan ukuran file
- Multiple log levels (error, warn, info, debug)
- JSON format untuk easy parsing
- Console output

## 🛠️ API Endpoints

### Search
- `GET /search?q=query&engine=google`
- `GET /search/engines`

### API Gateway
- `ALL /api/*`
- `GET /api/status`

### AI MCP
- `POST /mcp`
- `GET /mcp/config`
- `GET /mcp/health`

### AI System
- `POST /ai/chat`
- `GET /ai/models`
- `POST /ai/compare`

### Routing
- `ALL /route/*`
- `GET /route/status`
- `POST /route/backend`
- `DELETE /route/backend/:name`

### Hosting
- `GET /host/*`
- `GET /host/config`
- `GET /host/domains`
- `POST /host/domain`
- `DELETE /host/domain/:domain`

### Dashboard
- `GET /dashboard`
- `GET /dashboard/api/overview`
- `GET /dashboard/api/stats`
- `GET /dashboard/api/config`
- `PUT /dashboard/api/config`
- `POST /dashboard/api/service/:service/:action`
- `GET /dashboard/api/logs`
- `GET /dashboard/api/health`

## 📄 License

MIT License

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Version**: 1.0.0  
**Author**: ControlProxy Team  
**Created**: 2024

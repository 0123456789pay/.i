# ControlProxy - Advanced Proxy sistem

ControlProxy adalah sistem proxy canggih yang menggabungkan berbagai fungsionalitas dalam satu landasan terpadu.

## 🚀 Fitur Utama

### 1. **Browser cari Proxy** (`/cari`)
- Proxy pencarian untuk multiple cari engines (Google, Bing, DuckDuckGo)
- Rate limiting dan caching
- Support multi-engine

### 2. **API Gateway** (`/api`)
- Gateway terpusat untuk semua API endpoints
- autentikasi & Authorization
- permintaan routing ke backend services

### 3. **AI MCP** (`/mcp`)
- Model Context Protocol endpoint
- Integrasi dengan AI models
- Configurable tokens dan temperature

### 4. **AI sistem** (`/ai`)
- Multi-model AI routing (GPT-4, Claude-3, Llama-3)
- Fallback mechanism
- Model comparison endpoint

### 5. **Routing sistem** (`/route`)
- muat balancing dengan multiple algorithms:
  - Least Connections
  - Round Robin
  - Fastest jawaban
- Health checking otomatis
- Dynamic backend pengelolaan

### 6. **Hosting & Domain** (`/host`)
- Static berkas hosting
- Multi-domain support
- SSL otomatis-renewal integration

### 7. **papan-bilas** (`/papan-bilas`)
- Real-waktu sistem monitoring
- Service pengelolaan (mulai/henti/restart)
- pengaturan pengelolaan
- catatan penanggap
- Statistics & analytics

## 📁 Struktur direktori

```
controlproxy/
├── konfigurasi/
│   └── pengaturan.json          # Konfigurasi utama
├── controllers/
│   └── proxyController.js     # utama controller
├── routes/
│   ├── browserSearch.js       # Browser cari routes
│   ├── apiGateway.js          # API gateway routes
│   ├── aiMcp.js              # AI MCP routes
│   ├── aiSystem.js           # AI sistem routes
│   ├── routing.js            # Routing sistem routes
│   ├── hosting.js            # Hosting & domain routes
│   └── papan-bilas.js          # papan-bilas routes
├── services/
│   ├── healthCheck.js        # Health periksa service
│   └── logRotator.js         # catatan rotation service
├── views/
│   └── papan-bilas.html        # papan-bilas UI
├── umum/
│   ├── css/
│   │   └── papan-bilas.css     # papan-bilas gaya-gaya
│   └── js/
│       └── papan-bilas.js      # papan-bilas skrip-skrip-javascript
├── catatan-catatan/                      # catatan berkas-berkas direktori
├── indeks.js                   # Entry point
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
npm jalankan dev
```

### Production Mode
```bash
npm mulai
```

## ⚙️ Konfigurasi

Edit berkas `konfigurasi/pengaturan.json` untuk menyesuaikan:

- **Proxy pengaturan**: Port, host, timeout, SSL
- **Browser cari**: cari engines, rate limits
- **API Gateway**: versi, autentikasi
- **AI MCP**: Model endpoint, tokens, temperature
- **AI sistem**: Models, fallback pengaturan
- **Routing**: Algorithm, health periksa interval
- **Hosting**: akar direktori, managed domains
- **Logging**: Level, rotation pengaturan
- **papan-bilas**: Port, autentikasi

## 📊 papan-bilas fitur

papan-bilas tersedia di `http://localhost:3000/papan-bilas` dengan fitur:

1. **Overview**: sistem status, uptime, connections, requests
2. **Services**: Control services (mulai/henti/restart)
3. **Statistics**: jawaban times, permintaan volume
4. **pengaturan**: Edit sistem pengaturan
5. **catatan-catatan**: View sistem catatan-catatan in real-waktu
6. **pengaturan**: papan-bilas preferences

## 🔐 Keamanan

- autentikasi untuk API endpoints
- SSL/TLS support
- Rate limiting
- permintaan validation
- Secure headers (Helmet)

## 📝 Logging

Sistem logging otomatis dengan:
- catatan rotation berdasarkan ukuran berkas
- Multiple catatan levels (galat, warn, info, debug)
- JSON format untuk easy parsing
- konsol keluaran

## 🛠️ API Endpoints

### cari
- `GET /cari?q=kueri&engine=google`
- `GET /cari/engines`

### API Gateway
- `semua /api/*`
- `GET /api/status`

### AI MCP
- `POST /mcp`
- `GET /mcp/konfigurasi`
- `GET /mcp/health`

### AI sistem
- `POST /ai/chat`
- `GET /ai/models`
- `POST /ai/compare`

### Routing
- `semua /route/*`
- `GET /route/status`
- `POST /route/backend`
- `hapus /route/backend/:nama`

### Hosting
- `GET /host/*`
- `GET /host/konfigurasi`
- `GET /host/domains`
- `POST /host/domain`
- `hapus /host/domain/:domain`

### papan-bilas
- `GET /papan-bilas`
- `GET /papan-bilas/api/overview`
- `GET /papan-bilas/api/stats`
- `GET /papan-bilas/api/konfigurasi`
- `PUT /papan-bilas/api/konfigurasi`
- `POST /papan-bilas/api/service/:service/:action`
- `GET /papan-bilas/api/catatan-catatan`
- `GET /papan-bilas/api/health`

## 📄 License

MIT License

## 👥 Contributing

Contributions are selamat-datang! Please feel free to submit a Pull permintaan.

---

**versi**: 1.0.0  
**Author**: ControlProxy Team  
**Created**: 2024

/**
 * WebOS Sandbox System - Live Fullscreen Interface
 * Sistem sandbox untuk menjalankan aktifitas: Datacenter, AI, Hosting, Domain, dan Aplikasi
 * 
 * Fitur:
 * - Fullscreen mode dengan sandbox isolation
 * - Live system monitoring
 * - Multi-tenant application support
 * - Real-time data synchronization
 * - AI integration layer
 * - Virtual hosting environment
 */

class WebOSSandbox {
    constructor(config = {}) {
        this.id = config.id || 'sandbox-' + Date.now();
        this.name = config.name || 'Unnamed Sandbox';
        this.type = config.type || 'application'; // application, datacenter, ai, hosting, domain
        this.container = null;
        this.iframe = null;
        this.isActive = false;
        this.isFullscreen = false;
        this.systemState = {
            cpu: 0,
            memory: 0,
            storage: 0,
            network: 0,
            ai: { active: false, model: null, queries: 0 },
            hosting: { sites: 0, bandwidth: 0, uptime: 0 },
            datacenter: { servers: 0, status: 'offline' },
            domain: { registered: 0, dns: [] }
        };
        this.eventListeners = new Map();
        this.init();
    }

    init() {
        console.log(`[Sandbox] Initializing ${this.name} (${this.id})`);
        this.createContainer();
        this.setupEventListeners();
        this.loadSystemModules();
    }

    createContainer() {
        // Buat container utama
        this.container = document.createElement('div');
        this.container.className = 'webos-sandbox-container';
        this.container.id = this.id;
        this.container.setAttribute('data-type', this.type);
        
        // Style inline untuk fullscreen
        Object.assign(this.container.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '9999',
            backgroundColor: '#0a0a0a',
            display: 'none',
            overflow: 'hidden',
            fontFamily: "'Segoe UI', 'Roboto', sans-serif"
        });

        document.body.appendChild(this.container);
    }

    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F11' || (e.ctrlKey && e.key === 'f')) {
                e.preventDefault();
                this.toggleFullscreen();
            }
            if (e.key === 'Escape' && this.isFullscreen) {
                this.exitFullscreen();
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            if (this.isActive) {
                this.onResize();
            }
        });
    }

    loadSystemModules() {
        // Load modul sistem berdasarkan tipe sandbox
        const modules = {
            datacenter: ['server-manager', 'network-monitor', 'storage-pool'],
            ai: ['neural-engine', 'rag-system', 'prompt-processor'],
            hosting: ['virtual-host', 'dns-manager', 'ssl-handler'],
            domain: ['domain-registrar', 'dns-resolver', 'whois-client'],
            application: ['app-runtime', 'ui-renderer', 'state-manager']
        };

        this.activeModules = modules[this.type] || modules.application;
        console.log(`[Sandbox] Loaded modules: ${this.activeModules.join(', ')}`);
    }

    async activate(sourceUrl = null) {
        console.log(`[Sandbox] Activating ${this.name}`);
        
        this.container.style.display = 'block';
        this.isActive = true;
        
        // Buat iframe untuk isolation
        if (!this.iframe) {
            this.iframe = document.createElement('iframe');
            Object.assign(this.iframe.style, {
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#fff'
            });
            this.iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals';
            this.container.appendChild(this.iframe);
        }

        // Load content
        if (sourceUrl) {
            await this.loadContent(sourceUrl);
        } else {
            await this.renderInterface();
        }

        this.startMonitoring();
        this.emit('activate', { sandbox: this });
        
        return this;
    }

    async loadContent(url) {
        return new Promise((resolve, reject) => {
            this.iframe.onload = () => {
                console.log(`[Sandbox] Content loaded from ${url}`);
                this.injectSystemAPI();
                resolve();
            };
            this.iframe.onerror = reject;
            this.iframe.src = url;
        });
    }

    async renderInterface() {
        // Render interface berdasarkan tipe sandbox
        const interfaces = {
            datacenter: this.renderDatacenterUI(),
            ai: this.renderAIUI(),
            hosting: this.renderHostingUI(),
            domain: this.renderDomainUI(),
            application: this.renderApplicationUI()
        };

        const doc = this.iframe.contentDocument || this.iframe.contentWindow.document;
        doc.open();
        doc.write(interfaces[this.type]);
        doc.close();

        this.injectSystemAPI();
    }

    injectSystemAPI() {
        const doc = this.iframe.contentDocument || this.iframe.contentWindow.document;
        const win = this.iframe.contentWindow;

        // Inject WebOS API ke dalam sandbox
        win.WebOS = {
            sandbox: this,
            system: {
                getState: () => this.systemState,
                updateState: (key, value) => {
                    this.systemState[key] = value;
                    this.emit('stateUpdate', { key, value });
                },
                getModules: () => this.activeModules,
                getType: () => this.type
            },
            datacenter: {
                getServers: () => this.systemState.datacenter.servers,
                getStatus: () => this.systemState.datacenter.status,
                deploy: async (config) => this.deployServer(config),
                monitor: () => this.monitorServers()
            },
            ai: {
                query: async (prompt) => this.aiQuery(prompt),
                getModel: () => this.systemState.ai.model,
                isActive: () => this.systemState.ai.active
            },
            hosting: {
                createSite: async (config) => this.createHostingSite(config),
                getSites: () => this.systemState.hosting.sites,
                getBandwidth: () => this.systemState.hosting.bandwidth
            },
            domain: {
                register: async (domainName) => this.registerDomain(domainName),
                resolve: async (domainName) => this.resolveDNS(domainName),
                getRegistered: () => this.systemState.domain.registered
            },
            app: {
                saveState: (state) => localStorage.setItem(this.id + '_state', JSON.stringify(state)),
                loadState: () => JSON.parse(localStorage.getItem(this.id + '_state') || '{}'),
                notify: (msg) => this.showNotification(msg)
            }
        };

        console.log('[Sandbox] WebOS API injected');
    }

    renderDatacenterUI() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datacenter Control</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%);
            color: #fff;
            height: 100vh;
            overflow: hidden;
        }
        .header {
            padding: 20px;
            background: rgba(0, 212, 255, 0.1);
            border-bottom: 1px solid #00d4ff;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .main-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
            height: calc(100vh - 80px);
            overflow-y: auto;
        }
        .panel {
            background: rgba(22, 33, 62, 0.8);
            border: 1px solid #0f3460;
            border-radius: 12px;
            padding: 20px;
            backdrop-filter: blur(10px);
        }
        .panel h3 { color: #00d4ff; margin-bottom: 15px; font-size: 18px; }
        .server-rack {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }
        .server-unit {
            background: #16213e;
            border: 2px solid #0f3460;
            border-radius: 6px;
            padding: 10px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        }
        .server-unit:hover { border-color: #00d4ff; transform: scale(1.05); }
        .server-unit.online { border-color: #00ff88; }
        .server-unit.offline { border-color: #ff4444; opacity: 0.5; }
        .status-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
        }
        .status-indicator.green { background: #00ff88; box-shadow: 0 0 10px #00ff88; }
        .status-indicator.red { background: #ff4444; }
        .metric {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .btn {
            background: #00d4ff;
            color: #000;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }
        .btn:hover { background: #00a8cc; transform: translateY(-2px); }
    </style>
</head>
<body>
    <div class="header">
        <h2>🖥️ Datacenter Management System</h2>
        <div>
            <span class="status-indicator green"></span>
            <span id="dc-status">Online</span>
            <button class="btn" onclick="WebOS.datacenter.deploy({})" style="margin-left: 15px;">+ Deploy Server</button>
        </div>
    </div>
    
    <div class="main-grid">
        <div class="panel">
            <h3>📊 Server Overview</h3>
            <div class="metric">
                <span>Total Servers:</span>
                <span id="total-servers">${WebOS?.datacenter?.getServers() || 0}</span>
            </div>
            <div class="metric">
                <span>Status:</span>
                <span id="status-text">${WebOS?.datacenter?.getStatus() || 'Initializing'}</span>
            </div>
            <div class="server-rack" id="server-rack">
                <!-- Server units will be generated here -->
            </div>
        </div>
        
        <div class="panel">
            <h3>📈 Network Traffic</h3>
            <div class="metric"><span>Inbound:</span><span id="inbound">0 MB/s</span></div>
            <div class="metric"><span>Outbound:</span><span id="outbound">0 MB/s</span></div>
            <div class="metric"><span>Total Requests:</span><span id="requests">0</span></div>
            <canvas id="traffic-chart" style="width:100%;height:200px;margin-top:15px;"></canvas>
        </div>
        
        <div class="panel">
            <h3>💾 Storage Pool</h3>
            <div class="metric"><span>Used:</span><span id="storage-used">0 TB</span></div>
            <div class="metric"><span>Available:</span><span id="storage-available">100 TB</span></div>
            <div class="metric"><span>IOPS:</span><span id="iops">0</span></div>
            <progress value="30" max="100" style="width:100%;margin-top:15px;"></progress>
        </div>
        
        <div class="panel">
            <h3>⚡ Power & Cooling</h3>
            <div class="metric"><span>Power Usage:</span><span id="power">0 kW</span></div>
            <div class="metric"><span>Temperature:</span><span id="temp">22°C</span></div>
            <div class="metric"><span>PUE:</span><span id="pue">1.5</span></div>
        </div>
    </div>

    <script>
        // Initialize server rack
        function initServerRack() {
            const rack = document.getElementById('server-rack');
            const count = WebOS?.datacenter?.getServers() || 12;
            
            for (let i = 0; i < count; i++) {
                const unit = document.createElement('div');
                unit.className = 'server-unit ' + (Math.random() > 0.2 ? 'online' : 'offline');
                unit.innerHTML = \`<div>S\${i+1}</div><small>\${Math.random() > 0.2 ? 'Active' : 'Offline'}</small>\`;
                unit.onclick = () => alert('Server ' + (i+1) + ' Details');
                rack.appendChild(unit);
            }
        }
        
        // Simulate real-time updates
        setInterval(() => {
            document.getElementById('inbound').textContent = (Math.random() * 100).toFixed(2) + ' MB/s';
            document.getElementById('outbound').textContent = (Math.random() * 100).toFixed(2) + ' MB/s';
            document.getElementById('requests').textContent = Math.floor(Math.random() * 10000);
            document.getElementById('power').textContent = (Math.random() * 500 + 200).toFixed(1) + ' kW';
            document.getElementById('temp').textContent = (Math.random() * 5 + 20).toFixed(1) + '°C';
        }, 2000);
        
        initServerRack();
    <\/script>
</body>
</html>`;
    }

    renderAIUI() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Neural Interface</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 100%);
            color: #fff;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 20px;
            background: rgba(138, 43, 226, 0.2);
            border-bottom: 1px solid #8a2be2;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .main-container {
            flex: 1;
            display: flex;
            overflow: hidden;
        }
        .sidebar {
            width: 300px;
            background: rgba(22, 33, 62, 0.5);
            border-right: 1px solid #8a2be2;
            padding: 20px;
            overflow-y: auto;
        }
        .chat-area {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 20px;
        }
        .messages {
            flex: 1;
            overflow-y: auto;
            margin-bottom: 20px;
            padding: 10px;
        }
        .message {
            margin-bottom: 15px;
            padding: 15px;
            border-radius: 12px;
            max-width: 80%;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .message.user {
            background: rgba(138, 43, 226, 0.3);
            margin-left: auto;
            border: 1px solid #8a2be2;
        }
        .message.ai {
            background: rgba(22, 33, 62, 0.8);
            border: 1px solid #4a4a6a;
        }
        .input-area {
            display: flex;
            gap: 10px;
        }
        .input-area input {
            flex: 1;
            padding: 15px;
            border: 1px solid #8a2be2;
            border-radius: 8px;
            background: rgba(22, 33, 62, 0.5);
            color: #fff;
            font-size: 16px;
        }
        .input-area button {
            padding: 15px 30px;
            background: #8a2be2;
            color: #fff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }
        .input-area button:hover { background: #7a1fd2; transform: scale(1.05); }
        .model-card {
            background: rgba(22, 33, 62, 0.6);
            border: 1px solid #8a2be2;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
        }
        .typing-indicator span {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #8a2be2;
            border-radius: 50%;
            margin: 0 2px;
            animation: bounce 1.4s infinite;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    </style>
</head>
<body>
    <div class="header">
        <h2>🤖 AI Neural Interface</h2>
        <div>
            <span style="color: #8a2be2;">●</span>
            <span id="ai-status">Model Active</span>
            <span style="margin-left: 15px;">Queries: <span id="query-count">${WebOS?.ai?.isActive() ? WebOS.system.getState().ai.queries : 0}</span></span>
        </div>
    </div>
    
    <div class="main-container">
        <div class="sidebar">
            <h3 style="color: #8a2be2; margin-bottom: 15px;">🧠 Active Models</h3>
            <div class="model-card">
                <strong>Neural Engine v3.5</strong>
                <p style="font-size: 12px; color: #aaa; margin-top: 5px;">RAG-enabled with 500+ knowledge files</p>
            </div>
            <div class="model-card">
                <strong>Code Assistant</strong>
                <p style="font-size: 12px; color: #aaa; margin-top: 5px;">Specialized in code generation</p>
            </div>
            <h3 style="color: #8a2be2; margin: 20px 0 15px;">📚 Knowledge Base</h3>
            <div style="font-size: 12px; color: #aaa;">
                <p>Documents: 500+</p>
                <p>Indexed: Yes</p>
                <p>Last Update: Real-time</p>
            </div>
        </div>
        
        <div class="chat-area">
            <div class="messages" id="messages">
                <div class="message ai">
                    <strong>AI Assistant</strong>
                    <p>Hello! I'm your AI assistant integrated with the WebOS system. How can I help you today?</p>
                </div>
            </div>
            
            <div class="input-area">
                <input type="text" id="user-input" placeholder="Type your message..." onkeypress="if(event.key==='Enter') sendMessage()">
                <button onclick="sendMessage()">Send</button>
            </div>
        </div>
    </div>

    <script>
        let queryCount = ${WebOS?.system.getState().ai.queries || 0};
        
        function sendMessage() {
            const input = document.getElementById('user-input');
            const message = input.value.trim();
            if (!message) return;
            
            // Add user message
            const messagesDiv = document.getElementById('messages');
            const userMsg = document.createElement('div');
            userMsg.className = 'message user';
            userMsg.innerHTML = '<strong>You</strong><p>' + message + '</p>';
            messagesDiv.appendChild(userMsg);
            
            input.value = '';
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            
            // Show typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message ai typing-indicator';
            typingDiv.id = 'typing';
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            messagesDiv.appendChild(typingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            
            // Simulate AI response
            setTimeout(() => {
                typingDiv.remove();
                const aiMsg = document.createElement('div');
                aiMsg.className = 'message ai';
                
                const responses = [
                    "I understand your request. Let me process that through the WebOS system.",
                    "Based on my analysis of the available data, I recommend the following approach...",
                    "I've queried the knowledge base and found relevant information for you.",
                    "That's an interesting question! Here's what I found in the system database."
                ];
                
                aiMsg.innerHTML = '<strong>AI Assistant</strong><p>' + responses[Math.floor(Math.random() * responses.length)] + '</p>';
                messagesDiv.appendChild(aiMsg);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
                
                queryCount++;
                document.getElementById('query-count').textContent = queryCount;
                
                // Update parent sandbox state
                if (window.parent.WebOS) {
                    window.parent.WebOS.system.updateState('ai', { ...window.parent.WebOS.system.getState().ai, queries: queryCount });
                }
            }, 1500 + Math.random() * 1000);
        }
    <\/script>
</body>
</html>`;
    }

    renderHostingUI() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hosting Control Panel</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #0a1a0a 0%, #1a2e1a 100%);
            color: #fff;
            height: 100vh;
        }
        .header {
            padding: 20px;
            background: rgba(0, 255, 136, 0.1);
            border-bottom: 1px solid #00ff88;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .dashboard {
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
        .card {
            background: rgba(22, 33, 62, 0.6);
            border: 1px solid #00ff88;
            border-radius: 12px;
            padding: 20px;
            backdrop-filter: blur(10px);
        }
        .card h3 { color: #00ff88; margin-bottom: 15px; }
        .site-list { list-style: none; }
        .site-item {
            padding: 12px;
            background: rgba(0, 255, 136, 0.05);
            border-radius: 6px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .site-item:hover { background: rgba(0, 255, 136, 0.15); }
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }
        .status-badge.active { background: #00ff88; color: #000; }
        .status-badge.pending { background: #ffaa00; color: #000; }
        .btn {
            background: #00ff88;
            color: #000;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
        }
        .btn:hover { background: #00dd77; }
        .metric-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 15px;
        }
        .metric {
            background: rgba(0, 255, 136, 0.05);
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .metric-value { font-size: 24px; font-weight: bold; color: #00ff88; }
        .metric-label { font-size: 12px; color: #aaa; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>🌐 Hosting Management System</h2>
        <button class="btn" onclick="alert('Create new site wizard')">+ New Site</button>
    </div>
    
    <div class="dashboard">
        <div class="card">
            <h3>📦 Hosted Sites</h3>
            <ul class="site-list" id="site-list">
                <li class="site-item">
                    <div>
                        <strong>example.com</strong>
                        <p style="font-size:12px;color:#aaa;">/var/www/example</p>
                    </div>
                    <span class="status-badge active">Active</span>
                </li>
                <li class="site-item">
                    <div>
                        <strong>demo.webos.local</strong>
                        <p style="font-size:12px;color:#aaa;">/var/www/demo</p>
                    </div>
                    <span class="status-badge active">Active</span>
                </li>
            </ul>
        </div>
        
        <div class="card">
            <h3>📊 Resource Usage</h3>
            <div class="metric-grid">
                <div class="metric">
                    <div class="metric-value">${WebOS?.hosting?.getSites() || 2}</div>
                    <div class="metric-label">Active Sites</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${(WebOS?.hosting?.getBandwidth() || 0).toFixed(1)} GB</div>
                    <div class="metric-label">Bandwidth Used</div>
                </div>
                <div class="metric">
                    <div class="metric-value">99.9%</div>
                    <div class="metric-label">Uptime</div>
                </div>
                <div class="metric">
                    <div class="metric-value">24ms</div>
                    <div class="metric-label">Avg Response</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>🔒 SSL Certificates</h3>
            <div style="margin-top:10px;">
                <div class="site-item">
                    <span>example.com</span>
                    <span style="color:#00ff88;">✓ Valid</span>
                </div>
                <div class="site-item">
                    <span>demo.webos.local</span>
                    <span style="color:#ffaa00;">⚠ Self-signed</span>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>⚡ Performance</h3>
            <canvas id="performance-chart" style="width:100%;height:150px;margin-top:15px;"></canvas>
        </div>
    </div>

    <script>
        // Simulate real-time bandwidth updates
        setInterval(() => {
            const currentBandwidth = parseFloat(document.querySelector('.metric-value').textContent) || 0;
            const newBandwidth = currentBandwidth + Math.random() * 0.1;
            // Update would go here in real implementation
        }, 3000);
    <\/script>
</body>
</html>`;
    }

    renderDomainUI() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Domain Registry</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 100%);
            color: #fff;
            height: 100vh;
        }
        .header {
            padding: 20px;
            background: rgba(255, 170, 0, 0.1);
            border-bottom: 1px solid #ffaa00;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .container {
            padding: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            height: calc(100vh - 80px);
        }
        .panel {
            background: rgba(22, 33, 62, 0.6);
            border: 1px solid #ffaa00;
            border-radius: 12px;
            padding: 20px;
        }
        .panel h3 { color: #ffaa00; margin-bottom: 15px; }
        .search-box {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        .search-box input {
            flex: 1;
            padding: 12px;
            border: 1px solid #ffaa00;
            border-radius: 6px;
            background: rgba(22, 33, 62, 0.5);
            color: #fff;
        }
        .search-box button {
            padding: 12px 24px;
            background: #ffaa00;
            color: #000;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
        }
        .domain-item {
            padding: 15px;
            background: rgba(255, 170, 0, 0.05);
            border-radius: 8px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .tld-badge {
            background: #ffaa00;
            color: #000;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .dns-record {
            font-family: monospace;
            background: rgba(0,0,0,0.3);
            padding: 10px;
            border-radius: 4px;
            margin: 5px 0;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>🌍 Domain Registry & DNS Manager</h2>
        <span>Registered: <strong style="color:#ffaa00;">${WebOS?.domain?.getRegistered() || 0}</strong> domains</span>
    </div>
    
    <div class="container">
        <div class="panel">
            <h3>🔍 Domain Search & Registration</h3>
            <div class="search-box">
                <input type="text" placeholder="Search domain name..." id="domain-search">
                <button onclick="searchDomain()">Search</button>
            </div>
            
            <h4 style="color:#ffaa00;margin:20px 0 10px;">Your Domains</h4>
            <div class="domain-item">
                <div>
                    <strong>webos.local</strong>
                    <span class="tld-badge" style="margin-left:8px;">.local</span>
                </div>
                <span style="color:#00ff88;">✓ Active</span>
            </div>
            <div class="domain-item">
                <div>
                    <strong>demo.webos.local</strong>
                    <span class="tld-badge" style="margin-left:8px;">.local</span>
                </div>
                <span style="color:#00ff88;">✓ Active</span>
            </div>
        </div>
        
        <div class="panel">
            <h3>📋 DNS Records</h3>
            <select style="width:100%;padding:10px;margin-bottom:15px;background:rgba(22,33,62,0.5);color:#fff;border:1px solid #ffaa00;border-radius:6px;">
                <option>webos.local</option>
                <option>demo.webos.local</option>
            </select>
            
            <div class="dns-record">A     @     192.168.1.100     TTL: 3600</div>
            <div class="dns-record">AAAA  @     ::1               TTL: 3600</div>
            <div class="dns-record">CNAME www webos.local       TTL: 3600</div>
            <div class="dns-record">MX    @     mail.webos.local  TTL: 3600</div>
            <div class="dns-record">TXT   @     "v=spf1..."      TTL: 3600</div>
            
            <button class="btn" style="width:100%;margin-top:15px;padding:12px;background:#ffaa00;color:#000;border:none;border-radius:6px;cursor:pointer;font-weight:bold;">+ Add Record</button>
        </div>
    </div>

    <script>
        function searchDomain() {
            const query = document.getElementById('domain-search').value;
            if (query) {
                alert('Searching availability for: ' + query + '\\n(This is a demo - real lookup would connect to registrar API)');
            }
        }
    <\/script>
</body>
</html>`;
    }

    renderApplicationUI() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Runtime</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .taskbar {
            height: 50px;
            background: rgba(0, 212, 255, 0.1);
            border-top: 1px solid #00d4ff;
            display: flex;
            align-items: center;
            padding: 0 15px;
            gap: 10px;
        }
        .start-btn {
            background: #00d4ff;
            color: #000;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
        }
        .desktop {
            flex: 1;
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 15px;
            align-content: start;
        }
        .app-icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
            background: rgba(255,255,255,0.05);
        }
        .app-icon:hover {
            background: rgba(0, 212, 255, 0.2);
            transform: scale(1.05);
        }
        .app-icon .icon {
            font-size: 32px;
            margin-bottom: 8px;
        }
        .app-icon .label {
            font-size: 12px;
            text-align: center;
            word-break: break-word;
        }
        .window {
            position: absolute;
            background: #16213e;
            border: 1px solid #00d4ff;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            min-width: 400px;
            min-height: 300px;
            display: none;
        }
        .window-header {
            padding: 12px;
            background: rgba(0, 212, 255, 0.2);
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
        }
        .window-controls button {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: none;
            margin-left: 5px;
            cursor: pointer;
        }
        .close-btn { background: #ff4444; }
        .min-btn { background: #ffaa00; }
        .max-btn { background: #00ff88; }
        .window-content {
            padding: 20px;
            height: calc(100% - 50px);
            overflow: auto;
        }
    </style>
</head>
<body>
    <div class="desktop" id="desktop">
        <!-- App icons will be generated here -->
    </div>
    
    <div class="taskbar">
        <button class="start-btn">🏁 Start</button>
        <div style="flex:1;"></div>
        <div id="clock" style="color:#00d4ff;font-weight:bold;"></div>
    </div>

    <script>
        const apps = [
            { icon: '📁', name: 'File Explorer', action: () => openWindow('File Explorer', 'Managing files...') },
            { icon: '🌐', name: 'Browser', action: () => openWindow('Browser', 'Loading web content...') },
            { icon: '📝', name: 'Text Editor', action: () => openWindow('Text Editor', 'Ready to edit...') },
            { icon: '🎨', name: 'Drawing', action: () => openWindow('Drawing App', 'Canvas ready...') },
            { icon: '🎵', name: 'Music', action: () => openWindow('Music Player', 'Loading library...') },
            { icon: '📧', name: 'Email', action: () => openWindow('Email', 'Checking inbox...') },
            { icon: '📅', name: 'Calendar', action: () => openWindow('Calendar', 'Loading events...') },
            { icon: '⚙️', name: 'Settings', action: () => openWindow('Settings', 'System configuration...') },
            { icon: '🤖', name: 'AI Assistant', action: () => { if(window.parent.WebOS) window.parent.WebOS.sandbox.setType('ai'); } },
            { icon: '🖥️', name: 'Datacenter', action: () => { if(window.parent.WebOS) window.parent.WebOS.sandbox.setType('datacenter'); } },
            { icon: '🌐', name: 'Hosting', action: () => { if(window.parent.WebOS) window.parent.WebOS.sandbox.setType('hosting'); } },
            { icon: '🌍', name: 'Domains', action: () => { if(window.parent.WebOS) window.parent.WebOS.sandbox.setType('domain'); } }
        ];
        
        function renderDesktop() {
            const desktop = document.getElementById('desktop');
            apps.forEach(app => {
                const icon = document.createElement('div');
                icon.className = 'app-icon';
                icon.innerHTML = \`<div class="icon">\${app.icon}</div><div class="label">\${app.name}</div>\`;
                icon.onclick = app.action;
                desktop.appendChild(icon);
            });
        }
        
        function openWindow(title, content) {
            alert(title + ': ' + content);
        }
        
        function updateClock() {
            const now = new Date();
            document.getElementById('clock').textContent = now.toLocaleTimeString();
        }
        
        renderDesktop();
        setInterval(updateClock, 1000);
        updateClock();
    <\/script>
</body>
</html>`;
    }

    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }

    enterFullscreen() {
        if (this.container.requestFullscreen) {
            this.container.requestFullscreen();
        } else if (this.container.webkitRequestFullscreen) {
            this.container.webkitRequestFullscreen();
        } else if (this.container.mozRequestFullScreen) {
            this.container.mozRequestFullScreen();
        } else if (this.container.msRequestFullscreen) {
            this.container.msRequestFullscreen();
        }
        
        this.isFullscreen = true;
        this.container.style.display = 'block';
        console.log('[Sandbox] Entered fullscreen mode');
        this.emit('fullscreen', { state: true });
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        this.isFullscreen = false;
        this.container.style.display = 'none';
        this.isActive = false;
        console.log('[Sandbox] Exited fullscreen mode');
        this.emit('fullscreen', { state: false });
        this.stopMonitoring();
    }

    async deployServer(config) {
        console.log('[Sandbox] Deploying server...', config);
        this.systemState.datacenter.servers++;
        this.systemState.datacenter.status = 'online';
        this.emit('serverDeployed', { config, count: this.systemState.datacenter.servers });
        return { success: true, serverId: 'srv-' + Date.now() };
    }

    async aiQuery(prompt) {
        console.log('[Sandbox] AI Query:', prompt);
        this.systemState.ai.queries++;
        this.systemState.ai.active = true;
        this.emit('aiQuery', { prompt, queries: this.systemState.ai.queries });
        return { response: 'AI processing...', queryId: 'q-' + Date.now() };
    }

    async createHostingSite(config) {
        console.log('[Sandbox] Creating hosting site...', config);
        this.systemState.hosting.sites++;
        this.emit('siteCreated', { config, sites: this.systemState.hosting.sites });
        return { success: true, siteId: 'site-' + Date.now() };
    }

    async registerDomain(domainName) {
        console.log('[Sandbox] Registering domain:', domainName);
        this.systemState.domain.registered++;
        this.systemState.domain.dns.push(domainName);
        this.emit('domainRegistered', { domain: domainName, total: this.systemState.domain.registered });
        return { success: true, domain: domainName };
    }

    async resolveDNS(domainName) {
        console.log('[Sandbox] Resolving DNS:', domainName);
        return { ip: '192.168.1.' + Math.floor(Math.random() * 255), domain: domainName };
    }

    setType(type) {
        this.type = type;
        this.renderInterface();
        console.log('[Sandbox] Type changed to:', type);
    }

    startMonitoring() {
        this.monitorInterval = setInterval(() => {
            this.systemState.cpu = Math.floor(Math.random() * 100);
            this.systemState.memory = Math.floor(Math.random() * 100);
            this.systemState.network = Math.floor(Math.random() * 1000);
            this.emit('monitorUpdate', this.systemState);
        }, 2000);
        console.log('[Sandbox] Monitoring started');
    }

    stopMonitoring() {
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
            this.monitorInterval = null;
            console.log('[Sandbox] Monitoring stopped');
        }
    }

    monitorServers() {
        return {
            online: this.systemState.datacenter.servers,
            offline: 0,
            total: this.systemState.datacenter.servers
        };
    }

    showNotification(message) {
        console.log('[Sandbox] Notification:', message);
        this.emit('notification', { message });
    }

    onResize() {
        this.emit('resize', { 
            width: window.innerWidth, 
            height: window.innerHeight 
        });
    }

    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }

    off(event, callback) {
        if (this.eventListeners.has(event)) {
            const listeners = this.eventListeners.get(event);
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    emit(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (e) {
                    console.error('[Sandbox] Event listener error:', e);
                }
            });
        }
    }

    destroy() {
        this.stopMonitoring();
        this.eventListeners.clear();
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        console.log('[Sandbox] Destroyed:', this.id);
    }
}

// Auto-initialize global sandbox manager
window.WebOSSandboxManager = {
    sandboxes: new Map(),
    
    create(config) {
        const sandbox = new WebOSSandbox(config);
        this.sandboxes.set(sandbox.id, sandbox);
        return sandbox;
    },
    
    get(id) {
        return this.sandboxes.get(id);
    },
    
    getAll() {
        return Array.from(this.sandboxes.values());
    },
    
    destroy(id) {
        const sandbox = this.sandboxes.get(id);
        if (sandbox) {
            sandbox.destroy();
            this.sandboxes.delete(id);
        }
    }
};

console.log('[WebOS] Sandbox System initialized');

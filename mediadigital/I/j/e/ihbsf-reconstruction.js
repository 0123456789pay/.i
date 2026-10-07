/**
 * IHBSF - Iconer Hierarchical dasar sistem Framework
 * Sistem rekonstruksi untuk ALLUNIVERS ICONER
 * Mengintegrasikan semua menu, tampilan, dan konfigurasi
 */

export class IHBSF {
  constructor(config = {}) {
    this.config = config;
    this.modules = new Map();
    this.tabs = new Map();
    this.activeTab = null;
    this.theme = 'luxury-modern-elite';
    this.initialized = false;
    
    // Three unified display jenis-jenis
    this.displayTypes = {
      luxury: {
        gradients: ['linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'],
        shadows: ['0 20px 60px rgba(102, 126, 234, 0.3)', '0 15px 40px rgba(118, 75, 162, 0.4)'],
        animations: ['ease-out', 'cubic-bezier(0.4, 0, 0.2, 1)'],
        borders: ['2px solid rgba(255,255,255,0.2)', '3px solid rgba(102, 126, 234, 0.3)']
      },
      modern: {
        gradients: ['linear-gradient(135deg, #0066ff 0%, #0047b3 100%)', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'],
        shadows: ['0 10px 40px rgba(0, 102, 255, 0.2)', '0 15px 30px rgba(102, 126, 234, 0.3)'],
        animations: ['ease-in-out', 'cubic-bezier(0.4, 0, 0.6, 1)'],
        borders: ['2px solid #e2e8f0', '2px solid #0066ff']
      },
      elite: {
        gradients: ['linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)', 'linear-gradient(135deg, #b8860b 0%, #daa520 100%)'],
        shadows: ['0 25px 50px rgba(255, 215, 0, 0.3)', '0 20px 40px rgba(184, 134, 11, 0.4)'],
        animations: ['ease', 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'],
        borders: ['3px solid rgba(255, 215, 0, 0.5)', '4px solid #ffd700']
      }
    };
  }

  async initialize() {
    console.log('[IHBSF] Initializing reconstruction system...');
    await this.loadCoreModules();
    await this.createTabSystem();
    await this.applyTheme();
    this.initialized = true;
    console.log('[IHBSF] System initialized successfully');
    return this;
  }

  async loadCoreModules() {
    const coreModules = [
      'menu-system', 'display-engine', 'configuration-manager',
      'feature-loader', 'tab-controller', 'theme-applier',
      'package-handler', 'component-registry', 'style-manager'
    ];
    
    coreModules.forEach(module => {
      this.modules.set(module, { name: module, loaded: true });
    });
    
    console.log(`[IHBSF] Loaded ${coreModules.length} core modules`);
  }

  async createTabSystem() {
    const tabs = [
      { id: 'cahaya-iconer', name: 'Cahaya Iconer', url: 'https.cahayaiconer', icon: 'fa-lightbulb' },
      { id: 'desain', name: 'Desain Studio', url: 'https.desain', icon: 'fa-palette' },
      { id: 'market-iconer', name: 'Market Iconer', url: 'https.marketiconer', icon: 'fa-store' }
    ];
    
    tabs.forEach(tab => {
      this.tabs.set(tab.id, tab);
    });
    
    this.activeTab = tabs[0].id;
    console.log('[IHBSF] Tab system created');
  }

  async applyTheme() {
    const theme = this.displayTypes[this.theme.split('-')[0]];
    console.log(`[IHBSF] Applied ${this.theme} theme`);
    return theme;
  }

  reconstructSystem(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('[IHBSF] Container not found');
      return;
    }

    const html = `
      <div class="ihbsf-container">
        <div class="ihbsf-header">
          <h1><i class="fas fa-cube"></i> ALLUNIVERS ICONER</h1>
          <p>Sistem Terintegrasi - Tampilan Mewah Modern Elit</p>
        </div>
        
        <div class="ihbsf-tabs">
          ${Array.from(this.tabs.values()).map(tab => `
            <button class="ihbsf-tab ${tab.id === this.activeTab ? 'active' : ''}" data-tab="${tab.id}">
              <i class="fas ${tab.icon}"></i>
              <span>${tab.name}</span>
            </button>
          `).join('')}
        </div>
        
        <div class="ihbsf-content">
          ${Array.from(this.tabs.values()).map(tab => `
            <div class="ihbsf-tab-panel ${tab.id === this.activeTab ? 'active' : ''}" id="panel-${tab.id}">
              <!-- Content loaded from folder -->
            </div>
          `).join('')}
        </div>
        
        <div class="ihbsf-footer">
          <p>IHBSF System v1.0 | Ribuan Fitur Canggih | Konfigurasi Lengkap</p>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const tabs = document.querySelectorAll('.ihbsf-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabId = e.currentTarget.dataset.tab;
        this.switchTab(tabId);
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    
    document.querySelectorAll('.ihbsf-tab').forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.tab === tabId) {
        tab.classList.add('active');
      }
    });
    
    document.querySelectorAll('.ihbsf-tab-panel').forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === `panel-${tabId}`) {
        panel.classList.add('active');
      }
    });
    
    this.loadTabContent(tabId);
  }

  async loadTabContent(tabId) {
    const panel = document.getElementById(`panel-${tabId}`);
    const tab = this.tabs.get(tabId);
    
    if (!panel || !tab) return;
    
    panel.innerHTML = `
      <div class="loading-content">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading ${tab.name}...</p>
      </div>
    `;
    
    // Simulate loading isi dari direktori
    await new Promise(resolve => setTimeout(resolve, 500));
    
    panel.innerHTML = `
      <div class="tab-content-wrapper">
        <h2><i class="fas ${tab.icon}"></i> ${tab.name}</h2>
        <p>Loaded from: ${tab.url}</p>
        <div class="features-grid">
          <div class="feature-card">
            <i class="fas fa-magic"></i>
            <h3>Fitur Mewah</h3>
            <p>Ribuan fitur canggih terintegrasi</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-layer-group"></i>
            <h3>Sistem Lapisan</h3>
            <p>Konfigurasi puluhan file</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-bolt"></i>
            <h3>Performa Tinggi</h3>
            <p>Optimasi maksimal</p>
          </div>
        </div>
      </div>
    `;
  }

  getStyle(type) {
    return this.displayTypes[type] || this.displayTypes.luxury;
  }

  generateCSS() {
    return `
      .ihbsf-container {
        font-family: 'Segoe UI', system-ui, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        padding: 2rem;
      }
      
      .ihbsf-header {
        text-align: center;
        color: white;
        margin-bottom: 2rem;
        text-shadow: 0 4px 20px rgba(0,0,0,0.3);
      }
      
      .ihbsf-header h1 {
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 0.5rem;
      }
      
      .ihbsf-tabs {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }
      
      .ihbsf-tab {
        padding: 1rem 2rem;
        background: rgba(255,255,255,0.1);
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 12px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }
      
      .ihbsf-tab:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-5px);
      }
      
      .ihbsf-tab.active {
        background: white;
        color: #667eea;
        border-color: white;
        box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
      }
      
      .ihbsf-content {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        min-height: 500px;
      }
      
      .ihbsf-tab-panel {
        display: none;
        animation: fadeIn 0.5s ease;
      }
      
      .ihbsf-tab-panel.active {
        display: block;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .loading-content {
        text-align: center;
        padding: 4rem;
        color: #667eea;
      }
      
      .loading-content i {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      
      .tab-content-wrapper h2 {
        color: #667eea;
        margin-bottom: 1rem;
      }
      
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
      }
      
      .feature-card {
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        padding: 2rem;
        border-radius: 16px;
        text-align: center;
        border: 2px solid #e2e8f0;
        transition: all 0.3s ease;
      }
      
      .feature-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
      }
      
      .feature-card i {
        font-size: 3rem;
        color: #667eea;
        margin-bottom: 1rem;
      }
      
      .ihbsf-footer {
        text-align: center;
        color: rgba(255,255,255,0.8);
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 2px solid rgba(255,255,255,0.2);
      }
    `;
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = this.generateCSS();
    document.head.appendChild(style);
  }
}

// Export singleton instance
const ihbsf = new IHBSF();
export default ihbsf;

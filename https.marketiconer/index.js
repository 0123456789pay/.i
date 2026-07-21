/**
 * Market Iconer - Main Entry Point
 * Pusat sistem marketplace untuk icon dan aset digital
 */

export class MarketIconer {
  constructor() {
    this.name = 'Market Iconer';
    this.version = '1.0.0';
    this.products = new Map();
    this.categories = new Map();
    this.initialized = false;
  }

  async initialize() {
    console.log('[MarketIconer] Initializing...');
    
    await this.loadProducts();
    await this.loadCategories();
    
    this.initialized = true;
    console.log('[MarketIconer] Initialized successfully');
    return this;
  }

  async loadProducts() {
    const products = [
      { id: 1, name: 'Premium Icon Pack', price: '$29', category: 'icons' },
      { id: 2, name: 'Vector Bundle', price: '$49', category: 'vectors' },
      { id: 3, name: 'UI Kit Pro', price: '$79', category: 'ui-kits' },
      { id: 4, name: 'Animation Pack', price: '$39', category: 'animations' },
      { id: 5, name: '3D Icons', price: '$59', category: '3d' },
      { id: 6, name: 'Template Collection', price: '$99', category: 'templates' }
    ];
    
    products.forEach(product => {
      this.products.set(product.id, product);
    });
    
    console.log(`[MarketIconer] Loaded ${products.length} products`);
  }

  async loadCategories() {
    const categories = [
      { id: 'icons', name: 'Icons', icon: 'fa-icons' },
      { id: 'vectors', name: 'Vectors', icon: 'fa-vector-square' },
      { id: 'ui-kits', name: 'UI Kits', icon: 'fa-layer-group' },
      { id: 'animations', name: 'Animations', icon: 'fa-film' },
      { id: '3d', name: '3D Assets', icon: 'fa-cube' },
      { id: 'templates', name: 'Templates', icon: 'fa-file-image' }
    ];
    
    categories.forEach(cat => {
      this.categories.set(cat.id, cat);
    });
    
    console.log(`[MarketIconer] Loaded ${categories.length} categories`);
  }

  renderContent() {
    return `
      <div class="market-iconer-content">
        <div class="market-header">
          <h2><i class="fas fa-store"></i> Market Iconer</h2>
          <p>Marketplace Icon & Aset Digital Premium</p>
        </div>
        
        <div class="market-categories">
          ${Array.from(this.categories.values()).map(cat => `
            <button class="category-btn">
              <i class="fas ${cat.icon}"></i>
              <span>${cat.name}</span>
            </button>
          `).join('')}
        </div>
        
        <div class="products-grid">
          ${Array.from(this.products.values()).map(product => `
            <div class="product-card">
              <div class="product-image">
                <i class="fas fa-image"></i>
              </div>
              <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="btn-buy">
                  <i class="fas fa-shopping-cart"></i>
                  <span>Beli Sekarang</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="market-features">
          <h3>Keunggulan Market Iconer</h3>
          <div class="feature-list">
            <div class="feature-box">
              <i class="fas fa-download"></i>
              <h4>Download Instan</h4>
              <p>Akses langsung setelah pembelian</p>
            </div>
            <div class="feature-box">
              <i class="fas fa-infinity"></i>
              <h4>Lisensi Seumur Hidup</h4>
              <p>Gunakan selamanya tanpa batas</p>
            </div>
            <div class="feature-box">
              <i class="fas fa-sync-alt"></i>
              <h4>Update Gratis</h4>
              <p>Dapatkan update terbaru secara gratis</p>
            </div>
            <div class="feature-box">
              <i class="fas fa-headset"></i>
              <h4>Support 24/7</h4>
              <p>Bantuan kapan saja Anda butuhkan</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getStyle() {
    return `
      .market-iconer-content {
        padding: 1rem;
      }
      
      .market-header {
        text-align: center;
        margin-bottom: 2rem;
        background: linear-gradient(135deg, #ffd700, #b8860b);
        color: white;
        padding: 2rem;
        border-radius: 16px;
      }
      
      .market-categories {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
        justify-content: center;
      }
      
      .category-btn {
        padding: 0.8rem 1.5rem;
        background: white;
        border: 2px solid #ffd700;
        color: #b8860b;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 600;
      }
      
      .category-btn:hover {
        background: #ffd700;
        color: white;
        transform: translateY(-3px);
      }
      
      .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      
      .product-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        border: 2px solid #e2e8f0;
        transition: all 0.3s;
      }
      
      .product-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(255, 215, 0, 0.3);
        border-color: #ffd700;
      }
      
      .product-image {
        height: 200px;
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .product-image i {
        font-size: 4rem;
        color: #ffd700;
      }
      
      .product-info {
        padding: 1.5rem;
      }
      
      .product-info h3 {
        color: #1e293b;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
      }
      
      .product-price {
        color: #b8860b;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      .btn-buy {
        width: 100%;
        padding: 0.8rem;
        background: linear-gradient(135deg, #ffd700, #b8860b);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .btn-buy:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
      }
      
      .market-features {
        background: linear-gradient(135deg, #1e293b, #334155);
        color: white;
        padding: 2rem;
        border-radius: 16px;
        text-align: center;
      }
      
      .feature-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }
      
      .feature-box {
        background: rgba(255,255,255,0.1);
        padding: 1.5rem;
        border-radius: 12px;
        backdrop-filter: blur(10px);
      }
      
      .feature-box i {
        font-size: 2.5rem;
        color: #ffd700;
        margin-bottom: 1rem;
      }
      
      .feature-box h4 {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }
      
      .feature-box p {
        font-size: 0.9rem;
        opacity: 0.8;
      }
    `;
  }
}

const marketIconer = new MarketIconer();
export default marketIconer;

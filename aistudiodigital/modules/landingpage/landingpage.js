// Landing Page Builder Logic
class LandingPageBuilder {
    constructor() {
        this.initialized = false;
        this.components = [];
        this.canvas = null;
    }

    init() {
        console.log('Initializing Landing Page Builder...');
        this.canvas = document.getElementById('landingCanvas');
        this.setupDragDrop();
        this.loadSavedPage();
        this.initialized = true;
    }

    setupDragDrop() {
        const items = document.querySelectorAll('.component-item');
        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('type', item.dataset.type);
            });
        });
    }

    allowDrop(e) {
        e.preventDefault();
    }

    drop(e) {
        e.preventDefault();
        const type = e.dataTransfer.getData('type');
        if (type) {
            this.addComponent(type);
        }
    }

    addComponent(type) {
        const component = this.createComponent(type);
        this.components.push(component);
        this.renderComponent(component);
        this.savePage();
    }

    createComponent(type) {
        const components = {
            hero: `
                <div class="component hero" style="padding: 60px 20px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; text-align: center;">
                    <h1 style="font-size: 48px; margin-bottom: 20px;">Welcome to Our Product</h1>
                    <p style="font-size: 18px; margin-bottom: 30px;">Build amazing landing pages with our drag-and-drop builder</p>
                    <button style="padding: 15px 30px; background: white; color: #6366f1; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">Get Started</button>
                </div>
            `,
            features: `
                <div class="component features" style="padding: 60px 20px; background: #f8fafc;">
                    <h2 style="text-align: center; margin-bottom: 40px; color: #1e293b;">Features</h2>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width: 1200px; margin: 0 auto;">
                        <div style="text-align: center; padding: 20px;">
                            <i class="fas fa-rocket" style="font-size: 48px; color: #6366f1; margin-bottom: 15px;"></i>
                            <h3 style="color: #1e293b;">Fast Performance</h3>
                            <p style="color: #64748b;">Lightning fast loading times</p>
                        </div>
                        <div style="text-align: center; padding: 20px;">
                            <i class="fas fa-shield-alt" style="font-size: 48px; color: #6366f1; margin-bottom: 15px;"></i>
                            <h3 style="color: #1e293b;">Secure</h3>
                            <p style="color: #64748b;">Enterprise-grade security</p>
                        </div>
                        <div style="text-align: center; padding: 20px;">
                            <i class="fas fa-mobile-alt" style="font-size: 48px; color: #6366f1; margin-bottom: 15px;"></i>
                            <h3 style="color: #1e293b;">Responsive</h3>
                            <p style="color: #64748b;">Works on all devices</p>
                        </div>
                    </div>
                </div>
            `,
            testimonials: `
                <div class="component testimonials" style="padding: 60px 20px; background: white;">
                    <h2 style="text-align: center; margin-bottom: 40px; color: #1e293b;">What Our Customers Say</h2>
                    <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                        <p style="font-size: 24px; font-style: italic; color: #64748b; margin-bottom: 20px;">"This builder changed the way we create landing pages. Highly recommended!"</p>
                        <p style="font-weight: bold; color: #1e293b;">- John Doe, CEO</p>
                    </div>
                </div>
            `,
            cta: `
                <div class="component cta" style="padding: 60px 20px; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; text-align: center;">
                    <h2 style="font-size: 36px; margin-bottom: 20px;">Ready to Get Started?</h2>
                    <p style="font-size: 18px; margin-bottom: 30px;">Join thousands of satisfied customers today</p>
                    <button style="padding: 15px 30px; background: white; color: #ec4899; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">Sign Up Now</button>
                </div>
            `,
            footer: `
                <div class="component footer" style="padding: 40px 20px; background: #1e293b; color: #94a3b8; text-align: center;">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                    <div style="margin-top: 20px;">
                        <i class="fab fa-facebook" style="margin: 0 10px; cursor: pointer;"></i>
                        <i class="fab fa-twitter" style="margin: 0 10px; cursor: pointer;"></i>
                        <i class="fab fa-instagram" style="margin: 0 10px; cursor: pointer;"></i>
                    </div>
                </div>
            `
        };
        
        return { type, html: components[type] || '' };
    }

    renderComponent(component) {
        if (!this.canvas) return;
        
        const emptyMessage = this.canvas.querySelector('.empty-canvas-message');
        if (emptyMessage) {
            emptyMessage.remove();
        }
        
        const div = document.createElement('div');
        div.innerHTML = component.html;
        div.style.position = 'relative';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: #ef4444; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer;';
        deleteBtn.onclick = () => {
            div.remove();
            this.components = this.components.filter(c => c !== component);
            this.savePage();
        };
        
        div.appendChild(deleteBtn);
        this.canvas.appendChild(div);
    }

    clearCanvas() {
        if (this.canvas) {
            this.canvas.innerHTML = `
                <div class="empty-canvas-message">
                    <i class="fas fa-mouse-pointer"></i>
                    <p>Drag components here to build your landing page</p>
                </div>
            `;
        }
        this.components = [];
        this.savePage();
    }

    savePage() {
        localStorage.setItem('landingpage_components', JSON.stringify(this.components));
    }

    loadSavedPage() {
        const saved = localStorage.getItem('landingpage_components');
        if (saved) {
            this.components = JSON.parse(saved);
            this.components.forEach(component => this.renderComponent(component));
        }
    }

    previewPage() {
        const previewWindow = window.open('', '_blank');
        const content = this.canvas.innerHTML;
        previewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Landing Page Preview</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            </head>
            <body style="margin: 0; font-family: 'Segoe UI', sans-serif;">
                ${content.replace(/<button.*?<\/button>/g, match => match.replace(/onclick="[^"]*"/g, ''))}
            </body>
            </html>
        `);
        previewWindow.document.close();
    }
}

let builder;
document.addEventListener('DOMContentLoaded', () => {
    builder = new LandingPageBuilder();
    builder.init();
});

function allowDrop(e) {
    if (builder) builder.allowDrop(e);
}

function drop(e) {
    if (builder) builder.drop(e);
}

function clearCanvas() {
    if (builder) builder.clearCanvas();
}

function savePage() {
    if (builder) builder.savePage();
}

function previewPage() {
    if (builder) builder.previewPage();
}

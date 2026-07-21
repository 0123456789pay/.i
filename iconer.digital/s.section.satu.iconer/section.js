/**
 * ALLUNIVERS ICONER - Section Satu Module
 * First section component handler
 */

class IconerSectionSatu {
    constructor() {
        this.title = 'Welcome to ALLUNIVERS ICONER';
        this.subtitle = 'Create Amazing Icons Easily';
        this.features = [];
        this.ctaText = 'Get Started';
        this.ctaLink = '#';
    }

    setFeatures(featureList) {
        this.features = featureList;
        this.render();
    }

    setCTA(text, link) {
        this.ctaText = text;
        this.ctaLink = link;
        this.render();
    }

    render() {
        const section = document.getElementById('iconer-section-satu');
        if (!section) return;

        section.innerHTML = `
            <div class="section-satu-container">
                <div class="hero-content">
                    <h1 class="hero-title">${this.title}</h1>
                    <p class="hero-subtitle">${this.subtitle}</p>
                    
                    ${this.features.length > 0 ? `
                        <div class="features-grid">
                            ${this.features.map(feature => `
                                <div class="feature-card">
                                    <div class="feature-icon">${feature.icon}</div>
                                    <h3>${feature.title}</h3>
                                    <p>${feature.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <a href="${this.ctaLink}" class="cta-button">${this.ctaText}</a>
                </div>
            </div>
        `;
    }
}

// Auto-initialize
if (typeof window !== 'undefined') {
    window.IconerSectionSatu = new IconerSectionSatu();
}

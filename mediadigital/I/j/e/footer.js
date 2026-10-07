/**
 * ALLUNIVERS ICONER - kaki Module
 * Handles kaki components dan tautan
 */

class IconerFooter {
    constructor() {
        this.companyName = 'ALLUNIVERS ICONER';
        this.links = [];
        this.socialMedia = [];
        this.copyrightYear = new Date().getFullYear();
    }

    setLinks(linkCategories) {
        this.links = linkCategories;
        this.render();
    }

    setSocialMedia(socialList) {
        this.socialMedia = socialList;
        this.render();
    }

    render() {
        const footer = document.getElementById('iconer-footer');
        if (!footer) return;

        footer.innerHTML = `
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-section company-info">
                        <h3>${this.companyName}</h3>
                        <p>Platform pembuatan dan marketplace icon terbaik untuk kebutuhan digital Anda.</p>
                    </div>
                    
                    ${this.links.map(category => `
                        <div class="footer-section">
                            <h4>${category.title}</h4>
                            <ul>
                                ${category.items.map(item => `
                                    <li><a href="${item.href}">${item.label}</a></li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                    
                    <div class="footer-section">
                        <h4>Follow Us</h4>
                        <div class="social-links">
                            ${this.socialMedia.map(social => `
                                <a href="${social.url}" class="social-link" target="_blank">
                                    ${social.icon}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${this.copyrightYear} ${this.companyName}. All rights reserved.</p>
                </div>
            </div>
        `;
    }
}

// otomatis-mulai
if (typeof window !== 'undefined') {
    window.IconerFooter = new IconerFooter();
}

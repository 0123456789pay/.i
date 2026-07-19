// Digital Application - Simbol Akar Core System
class SimbolAkarDigital {
    constructor() {
        this.rootSymbol = '√';
        this.binaryConfig = '10101000 01010101 00101010';
        this.regexPatterns = {
            root: /^\\u221A|sqrt|akar|root$/i,
            number: /[0-9]+\\.[0-9]+/g,
            symbol: /[√∛∜∑∏∫]/g
        };
        this.secureMode = true;
        this.init();
    }

    init() {
        console.log('Sistem Simbol Akar Digital Diaktifkan');
        this.activateRootSymbol();
        this.bindEvents();
        this.checkSecureStatus();
    }

    activateRootSymbol() {
        const rootElements = document.querySelectorAll('.root-symbol-large, .symbol-root');
        rootElements.forEach(el => {
            el.textContent = this.rootSymbol;
            el.setAttribute('data-active', 'true');
        });
        console.log('Simbol akar √ teraktifkan di browser');
    }

    bindEvents() {
        document.querySelectorAll('.symbol-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const symbol = e.target.textContent;
                this.copyToClipboard(symbol);
                this.showNotification(`Simbol ${symbol} disalin!`);
            });
        });

        // Scroll animation
        window.addEventListener('scroll', () => {
            this.animateOnScroll();
        });
    }

    animateOnScroll() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Disalin:', text);
        }).catch(err => {
            console.error('Gagal menyalin:', err);
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #00ff88;
            color: #0a0a0a;
            padding: 1rem 2rem;
            border-radius: 5px;
            font-weight: bold;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    checkSecureStatus() {
        const statusIndicator = document.querySelector('.status-indicator');
        if (this.secureMode && statusIndicator) {
            statusIndicator.classList.add('active');
            console.log('Mode aman aktif - sistem terenkripsi');
        }
    }

    evaluateFormula(formula) {
        try {
            // Safe evaluation untuk formula matematika
            const sanitized = formula.replace(/[^0-9+\\-*/().√Math]/g, '');
            return eval(sanitized);
        } catch (error) {
            console.error('Error evaluasi formula:', error);
            return null;
        }
    }

    getBinaryRepresentation() {
        return this.binaryConfig.split(' ').map(byte => {
            return parseInt(byte, 2);
        });
    }

    renderSymbols() {
        const symbols = ['√', '∛', '∜', '∑', '∏', '∫'];
        return symbols.map(symbol => {
            return `<div class="symbol-item">${symbol}</div>`;
        }).join('');
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SimbolAkarDigital();
});

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('Digital Core Loaded - Simbol Akar System Ready');

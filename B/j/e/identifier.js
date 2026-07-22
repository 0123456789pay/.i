/**
 * ALLUNIVERS ICONER - Identifier Module
 * Handles unique identification for iframe components
 */

class IconerIdentifier {
    constructor() {
        this.prefix = 'iconer_';
        this.timestamp = Date.now();
        this.counter = 0;
    }

    generateId(type = 'default') {
        this.counter++;
        return `${this.prefix}${type}_${this.timestamp}_${this.counter}`;
    }

    validateId(id) {
        const pattern = /^iconer_[a-z]+_\d+_\d+$/;
        return pattern.test(id);
    }

    parseId(id) {
        if (!this.validateId(id)) return null;
        const parts = id.split('_');
        return {
            prefix: parts[0],
            type: parts[1],
            timestamp: parseInt(parts[2]),
            counter: parseInt(parts[3])
        };
    }
}

// Export untuk penggunaan di browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IconerIdentifier;
}

// Auto-initialize di browser
if (typeof window !== 'undefined') {
    window.IconerIdentifier = new IconerIdentifier();
}

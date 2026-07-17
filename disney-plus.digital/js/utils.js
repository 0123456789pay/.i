// Utility functions untuk disney-plus
const Utils = {
    formatDate: function(date) {
        return new Intl.DateTimeFormat('id-ID').format(new Date(date));
    },
    
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    },
    
    storage: {
        get: function(key) {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        set: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
};

export default Utils;

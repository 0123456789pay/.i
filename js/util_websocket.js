/**
 * WebSocket - Koneksi WebSocket
 * Komponen untuk SoutheastApp Desktop Launcher
 * 
 * @module util-websocket
 * @version 1.0.0
 */

(function() {
    'use strict';

    // === KONFIGURASI ===
    const CONFIG = {
        name: 'util-websocket',
        version: '1.0.0',
        enabled: true,
        dependencies: []
    };

    // === STATE ===
    let state = {
        initialized: false,
        data: null,
        listeners: []
    };

    // === FUNGSI UTAMA ===
    
    /**
     * Inisialisasi komponen
     */
    function init(options = {}) {
        if (state.initialized) {
            console.warn('[util-websocket] Sudah diinisialisasi');
            return;
        }

        console.log('[util-websocket] Menginisialisasi...');
        
        state.data = options.data || {};
        state.initialized = true;
        
        dispatch('init', { options });
        
        return this;
    }

    /**
     * Destroy komponen
     */
    function destroy() {
        console.log('[util-websocket] Destroying...');
        
        state.listeners = [];
        state.data = null;
        state.initialized = false;
        
        dispatch('destroy', {});
    }

    /**
     * Subscribe ke event
     */
    function subscribe(event, callback) {
        state.listeners.push({ event, callback });
        return () => unsubscribe(event, callback);
    }

    /**
     * Unsubscribe dari event
     */
    function unsubscribe(event, callback) {
        state.listeners = state.listeners.filter(
            l => !(l.event === event && l.callback === callback)
        );
    }

    /**
     * Dispatch event
     */
    function dispatch(event, payload) {
        state.listeners
            .filter(l => l.event === event)
            .forEach(l => l.callback(payload));
        
        // Dispatch ke global event bus jika ada
        if (window.SoutheastApp && window.SoutheastApp.eventBus) {
            window.SoutheastApp.eventBus.dispatch(`${CONFIG.name}:${event}`, payload);
        }
    }

    /**
     * Update state
     */
    function updateState(newData) {
        const previous = { ...state.data };
        state.data = { ...state.data, ...newData };
        dispatch('update', { previous, current: state.data });
    }

    /**
     * Get state
     */
    function getState(key) {
        if (key) {
            return state.data ? state.data[key] : undefined;
        }
        return state.data;
    }

    // === EXPORT PUBLIC API ===
    const publicAPI = {
        init,
        destroy,
        subscribe,
        unsubscribe,
        dispatch,
        updateState,
        getState,
        getConfig: () => ({ ...CONFIG }),
        isInitialized: () => state.initialized
    };

    // Register ke global namespace jika tersedia
    if (typeof window !== 'undefined') {
        if (!window.SoutheastApp) {
            window.SoutheastApp = {};
        }
        if (!window.SoutheastApp.components) {
            window.SoutheastApp.components = {};
        }
        window.SoutheastApp.components['util-websocket'] = publicAPI;
    }

    // Auto-init jika ada attribute data-auto-init
    if (typeof document !== 'undefined') {
        const autoInitElement = document.querySelector(`[data-component="${CONFIG.name}"]`);
        if (autoInitElement) {
            const options = JSON.parse(autoInitElement.dataset.options || '{}');
            init(options);
        }
    }

    // Export untuk module systems
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = publicAPI;
    } else if (typeof define === 'function' && define.amd) {
        define(() => publicAPI);
    }

})();

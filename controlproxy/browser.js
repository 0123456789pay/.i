/**
 * App Browser - Main JavaScript
 * Handles URL loading, proxy management, and iframe container functionality
 */

// ============================================
// GLOBAL STATE
// ============================================

const BrowserState = {
    currentUrl: 'https://coder.qwen.ai',
    proxyEnabled: true,
    userEmail: 'logreg197@gmail.com',
    history: [],
    historyIndex: -1,
    isLoading: false
};

// ============================================
// DOM ELEMENTS
// ============================================

let elements = {};

function initializeElements() {
    elements = {
        urlInput: document.getElementById('urlInput'),
        goBtn: document.getElementById('goBtn'),
        proxyToggle: document.getElementById('proxyToggle'),
        proxyStatus: document.getElementById('proxyStatus'),
        userBtn: document.getElementById('userBtn'),
        userBadge: document.getElementById('userBadge'),
        refreshBtn: document.getElementById('refreshBtn'),
        homeBtn: document.getElementById('homeBtn'),
        contentFrame: document.getElementById('contentFrame'),
        loadingIndicator: document.getElementById('loadingIndicator'),
        fallbackMessage: document.getElementById('fallbackMessage'),
        fallbackReason: document.getElementById('fallbackReason'),
        tryProxyBtn: document.getElementById('tryProxyBtn'),
        openNewTabBtn: document.getElementById('openNewTabBtn'),
        backBtn: document.getElementById('backBtn'),
        bookmarksBar: document.querySelector('.bookmarks-bar')
    };
}

// ============================================
// INITIALIZATION
// ============================================

async function initializeBrowser() {
    console.log('[Browser] Initializing...');
    
    // Load configuration
    await ProxyConfig.load();
    
    // Initialize DOM elements
    initializeElements();
    
    // Load user email from localStorage or use default
    loadUserEmail();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial URL
    loadUrl(BrowserState.currentUrl);
    
    console.log('[Browser] Initialization complete');
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Go button
    elements.goBtn.addEventListener('click', () => {
        const url = elements.urlInput.value.trim();
        if (url) loadUrl(url);
    });
    
    // Enter key in URL input
    elements.urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const url = elements.urlInput.value.trim();
            if (url) loadUrl(url);
        }
    });
    
    // Proxy toggle
    elements.proxyToggle.addEventListener('click', toggleProxy);
    
    // User button
    elements.userBtn.addEventListener('click', changeUser);
    
    // Refresh button
    elements.refreshBtn.addEventListener('click', refreshPage);
    
    // Home button
    elements.homeBtn.addEventListener('click', goHome);
    
    // Fallback buttons
    elements.tryProxyBtn.addEventListener('click', () => {
        BrowserState.proxyEnabled = true;
        updateProxyUI();
        loadUrl(BrowserState.currentUrl);
    });
    
    elements.openNewTabBtn.addEventListener('click', () => {
        window.open(BrowserState.currentUrl, '_blank');
    });
    
    elements.backBtn.addEventListener('click', goBack);
    
    // Bookmarks
    elements.bookmarksBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('bookmark-item')) {
            const url = e.target.dataset.url;
            if (url) loadUrl(url);
        }
    });
    
    // Iframe load events
    elements.contentFrame.addEventListener('load', handleFrameLoad);
    elements.contentFrame.addEventListener('error', handleFrameError);
}

// ============================================
// URL LOADING
// ============================================

function loadUrl(url, useProxy = null) {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    BrowserState.currentUrl = url;
    elements.urlInput.value = url;
    
    // Add to history
    addToHistory(url);
    
    // Show loading indicator
    showLoading(true);
    hideFallback();
    
    // Determine if proxy should be used
    const shouldUseProxy = useProxy !== null ? useProxy : 
                          (BrowserState.proxyEnabled && ProxyConfig.requiresProxy(url));
    
    console.log('[Browser] Loading URL:', url, 'Proxy:', shouldUseProxy);
    
    // Set iframe attributes based on domain
    configureIframe(url);
    
    // Load URL in iframe
    if (shouldUseProxy) {
        const proxyUrl = ProxyConfig.getProxyUrl(url);
        console.log('[Browser] Using proxy:', proxyUrl);
        elements.contentFrame.src = proxyUrl;
    } else {
        elements.contentFrame.src = url;
    }
    
    // Start timeout for error detection
    setTimeout(() => {
        if (BrowserState.isLoading) {
            // Check if frame loaded successfully
            try {
                const frameDoc = elements.contentFrame.contentDocument || elements.contentFrame.contentWindow.document;
                if (frameDoc && frameDoc.body.innerHTML.trim() === '') {
                    showFallback('Empty response received. This site may block embedding.');
                }
            } catch (e) {
                // Cross-origin restriction - assume it's loading
                console.log('[Browser] Frame is loading (cross-origin)');
            }
        }
    }, 5000);
}

function configureIframe(url) {
    const sandbox = ProxyConfig.getSandboxAttributes(url);
    const permissions = ProxyConfig.buildPermissionString();
    
    elements.contentFrame.setAttribute('sandbox', sandbox);
    elements.contentFrame.setAttribute('allow', permissions);
    
    console.log('[Browser] Iframe configured - Sandbox:', sandbox);
}

// ============================================
// PROXY MANAGEMENT
// ============================================

function toggleProxy() {
    BrowserState.proxyEnabled = !BrowserState.proxyEnabled;
    updateProxyUI();
    
    // Reload current URL with new proxy setting
    loadUrl(BrowserState.currentUrl);
    
    console.log('[Browser] Proxy toggled:', BrowserState.proxyEnabled);
}

function updateProxyUI() {
    if (BrowserState.proxyEnabled) {
        elements.proxyToggle.classList.remove('inactive');
        elements.proxyToggle.classList.add('active');
        elements.proxyStatus.textContent = 'ON';
    } else {
        elements.proxyToggle.classList.remove('active');
        elements.proxyToggle.classList.add('inactive');
        elements.proxyStatus.textContent = 'OFF';
    }
}

// ============================================
// USER MANAGEMENT
// ============================================

function loadUserEmail() {
    const stored = localStorage.getItem(ProxyConfig.config?.user?.storageKey || 'browserUserEmail');
    if (stored) {
        BrowserState.userEmail = stored;
    } else {
        // Get default from config
        BrowserState.userEmail = ProxyConfig.config?.user?.defaultEmail || 'logreg197@gmail.com';
        saveUserEmail();
    }
    updateUserBadge();
}

function saveUserEmail() {
    localStorage.setItem(ProxyConfig.config?.user?.storageKey || 'browserUserEmail', BrowserState.userEmail);
}

function updateUserBadge() {
    elements.userBadge.textContent = `👤 ${BrowserState.userEmail}`;
}

function changeUser() {
    const newEmail = prompt('Enter your email address:', BrowserState.userEmail);
    if (newEmail && newEmail.trim()) {
        BrowserState.userEmail = newEmail.trim();
        saveUserEmail();
        updateUserBadge();
        alert(`User changed to: ${BrowserState.userEmail}`);
    }
}

// ============================================
// NAVIGATION
// ============================================

function addToHistory(url) {
    // Remove any forward history
    BrowserState.history = BrowserState.history.slice(0, BrowserState.historyIndex + 1);
    BrowserState.history.push(url);
    BrowserState.historyIndex++;
}

function goBack() {
    if (BrowserState.historyIndex > 0) {
        BrowserState.historyIndex--;
        loadUrl(BrowserState.history[BrowserState.historyIndex]);
    }
}

function refreshPage() {
    loadUrl(BrowserState.currentUrl);
}

function goHome() {
    loadUrl('https://coder.qwen.ai');
}

// ============================================
// LOADING & ERROR HANDLING
// ============================================

function showLoading(show) {
    BrowserState.isLoading = show;
    if (show) {
        elements.loadingIndicator.classList.remove('hidden');
    } else {
        elements.loadingIndicator.classList.add('hidden');
    }
}

function showFallback(reason) {
    showLoading(false);
    elements.fallbackReason.textContent = reason;
    elements.fallbackMessage.classList.remove('hidden');
}

function hideFallback() {
    elements.fallbackMessage.classList.add('hidden');
}

function handleFrameLoad() {
    console.log('[Browser] Frame loaded successfully');
    showLoading(false);
    hideFallback();
}

function handleFrameError() {
    console.error('[Browser] Frame failed to load');
    showLoading(false);
    showFallback('Failed to load the page. The server may be unreachable or blocking access.');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function extractDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch (e) {
        return url;
    }
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// ============================================
// START APPLICATION
// ============================================

document.addEventListener('DOMContentLoaded', initializeBrowser);

// Expose functions globally for debugging
window.Browser = {
    loadUrl,
    toggleProxy,
    changeUser,
    refreshPage,
    goHome,
    goBack,
    state: BrowserState
};

console.log('[Browser] Module loaded');

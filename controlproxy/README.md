# Proxy Configuration System for AppBrowser

## Overview
This directory contains the proxy configuration system that enables appbrowser.html to run external URLs within an iframe container without redirecting to other browser tabs.

## Directory Structure

```
/controlproxy/
├── proxyconfig.json    # Main configuration file
├── proxymanager.js     # Proxy management module
├── browser.css         # App Browser styles
├── browser.js          # App Browser main JavaScript
└── README.md           # This documentation
```

## Files

### 1. `proxyconfig.json`
Main configuration file containing:
- Proxy endpoints (allorigins, corsproxy, thingproxy)
- Domain-specific rules for Google, Facebook, Twitter, GitHub, etc.
- Iframe sandbox settings and permissions
- Security policies
- User default settings (default email: logreg197@gmail.com)

### 2. `proxymanager.js`
JavaScript module that provides:
- `ProxyConfig.load()` - Load configuration from JSON
- `ProxyConfig.getProxyUrl(url)` - Get proxied URL
- `ProxyConfig.requiresProxy(url)` - Check if domain needs proxy
- `ProxyConfig.allowsIframe(url)` - Check if domain allows iframe embedding
- `ProxyConfig.getSandboxAttributes(url)` - Get domain-specific sandbox settings
- `ProxyConfig.getDefaultUser(url)` - Get default user email for domain
- `ProxyConfig.shouldBypassProxy(url)` - Check bypass rules
- `ProxyConfig.buildPermissionString()` - Build permission string for iframe

### 3. `browser.css`
Complete styling for the App Browser interface:
- Responsive header with URL bar
- Proxy toggle button with visual states
- User badge display
- Loading indicators and spinners
- Fallback error messages
- Quick bookmarks bar
- Mobile-responsive design

### 4. `browser.js`
Main application logic:
- URL loading with automatic protocol detection
- Proxy mode toggle functionality
- User email management with localStorage persistence
- Navigation history (back/forward)
- Iframe configuration based on domain rules
- Error handling and fallback mechanisms
- Bookmark management

## Usage in appbrowser.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>App Browser</title>
    <link rel="stylesheet" href="/controlproxy/browser.css">
</head>
<body>
    <!-- Header with URL bar -->
    <header class="browser-header">
        <div class="url-bar-container">
            <input type="text" id="urlInput" value="https://coder.qwen.ai">
            <button id="goBtn">🚀 Go</button>
            <button id="proxyToggle">🛡️ Proxy: ON</button>
            <button id="userBtn">👤 User</button>
        </div>
    </header>
    
    <!-- Iframe container -->
    <iframe id="contentFrame" class="content-frame"></iframe>
    
    <!-- Load scripts -->
    <script src="/controlproxy/proxymanager.js"></script>
    <script src="/controlproxy/browser.js"></script>
</body>
</html>
```

## Features

### 1. Proxy Mode
- Automatically routes requests through CORS proxy when needed
- Toggle on/off with button in header
- Required for sites like accounts.google.com that block iframe embedding
- Uses api.allorigins.win as primary proxy service

### 2. Domain-Specific Rules
| Domain | Proxy Required | Notes |
|--------|---------------|-------|
| accounts.google.com | ✅ Yes | Google login requires proxy |
| coder.qwen.ai | ❌ No | Default user: logreg197@gmail.com |
| github.com | ❌ No | Allows direct embedding |
| youtube.com | ❌ No | Allows direct embedding |
| facebook.com | ✅ Yes | Requires proxy |
| twitter.com/x.com | ✅ Yes | Requires proxy |

### 3. User Management
- Default email: `logreg197@gmail.com`
- Email stored in localStorage for persistence
- Change email via "👤 User" button
- Per-domain default user support

### 4. Fallback Handling
- Detects when content cannot be embedded
- Offers "Try with Proxy Mode" option
- Offers "Open in New Tab" as last resort
- Automatic error detection with timeout

### 5. Security
- Configurable sandbox attributes per domain
- Permission API support (geolocation, camera, microphone, etc.)
- Content Security Policy configuration
- Bypass rules for localhost and *.github.io

### 6. Quick Bookmarks
Pre-configured bookmarks for quick access:
- 🤖 Coder Qwen
- 🔍 Google
- 🔐 Google Login
- 🐙 GitHub
- 📚 Stack Overflow
- 📺 YouTube

## Configuration Example

To add a new domain rule, edit `proxyconfig.json`:

```json
"mydomain": {
  "patterns": ["mydomain.com", "www.mydomain.com"],
  "requireProxy": false,
  "allowIframe": true,
  "sandbox": "allow-same-origin allow-scripts allow-forms"
}
```

## Testing

1. Open `https://southeastapp.github.io/view/appbrowser.html`
2. Default URL loads: `https://coder.qwen.ai`
3. Click "🚀 Go" to load any URL in iframe container
4. For Google login: Ensure "🛡️ Proxy: ON" is enabled
5. Click "👤 User" to change email (default: logreg197@gmail.com)
6. Use quick bookmarks for instant access to common sites

## API Reference

### BrowserState Object
```javascript
{
    currentUrl: 'https://coder.qwen.ai',
    proxyEnabled: true,
    userEmail: 'logreg197@gmail.com',
    history: [],
    historyIndex: -1,
    isLoading: false
}
```

### Global Functions
```javascript
// Load URL in iframe
Browser.loadUrl('https://example.com');

// Toggle proxy mode
Browser.toggleProxy();

// Change user email
Browser.changeUser();

// Refresh current page
Browser.refreshPage();

// Go to home (coder.qwen.ai)
Browser.goHome();

// Go back in history
Browser.goBack();
```

## Troubleshooting

### Site doesn't load in iframe
1. Enable Proxy Mode (🛡️ Proxy: ON)
2. Click "Try with Proxy" in fallback message
3. Some sites completely block embedding - use "Open in New Tab"

### Google login not working
1. Ensure Proxy Mode is ON
2. Clear browser cache
3. Try accounts.google.com directly via bookmark

### User email not persisting
1. Check browser localStorage is enabled
2. Verify no ad blockers blocking storage access
3. Re-enter email via "👤 User" button

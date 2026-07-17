# Proxy Configuration System for AppBrowser

## Overview
This directory contains the proxy configuration system that enables appbrowser.html to run external URLs within an iframe container without redirecting to other browser tabs.

## Files

### 1. `proxyconfig.json`
Main configuration file containing:
- Proxy endpoints (allorigins, corsproxy, thingproxy)
- Domain-specific rules for Google, Facebook, Twitter, GitHub, etc.
- Iframe sandbox settings and permissions
- Security policies
- User default settings

### 2. `proxymanager.js`
JavaScript module that provides:
- `ProxyConfig.load()` - Load configuration from JSON
- `ProxyConfig.getProxyUrl(url)` - Get proxied URL
- `ProxyConfig.requiresProxy(url)` - Check if domain needs proxy
- `ProxyConfig.allowsIframe(url)` - Check if domain allows iframe embedding
- `ProxyConfig.getSandboxAttributes(url)` - Get domain-specific sandbox settings
- `ProxyConfig.getDefaultUser(url)` - Get default user email for domain
- `ProxyConfig.shouldBypassProxy(url)` - Check bypass rules

## Usage in appbrowser.html

```html
<!-- Include the proxy manager -->
<script src="/controlproxy/proxymanager.js"></script>

<!-- Toggle proxy mode -->
<button onclick="toggleProxyMode()">🔒 Proxy: ON/OFF</button>

<!-- Load URL in iframe -->
<button onclick="loadUrl()">🚀 Go</button>
```

## Features

### 1. Proxy Mode
- Automatically routes requests through CORS proxy when needed
- Toggle on/off with button in header
- Required for sites like accounts.google.com that block iframe embedding

### 2. Domain-Specific Rules
- **Google**: Requires proxy, allows iframe with special sandbox
- **Coder Qwen**: No proxy needed, default user: logreg197@gmail.com
- **GitHub**: No proxy needed
- **YouTube**: No proxy needed

### 3. Fallback Handling
- Detects when content cannot be embedded
- Offers "Try with Proxy Mode" option
- Offers "Open in New Tab" as last resort

### 4. Security
- Configurable sandbox attributes per domain
- Permission API support (geolocation, camera, microphone, etc.)
- Content Security Policy configuration

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
2. Enter URL: `https://coder.qwen.ai`
3. Click "🚀 Go" - loads in iframe container
4. For Google login: Enable "🔒 Proxy: ON" first
5. Click "👤 User" to set email (default: logreg197@gmail.com)

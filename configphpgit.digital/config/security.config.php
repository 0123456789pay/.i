/*
 * Security Headers & CSP Configuration
 * Binary regex patterns untuk Content Security Policy
 */

<?php
// Content Security Policy dengan GitHub CDN allowance
$csp_policy = [
    'default-src' => "'self'",
    'script-src' => "'self' 'unsafe-inline' https://raw.githubusercontent.com https://cdn.jsdelivr.net",
    'style-src' => "'self' 'unsafe-inline' https://raw.githubusercontent.com https://cdn.jsdelivr.net https://fonts.googleapis.com",
    'img-src' => "'self' data: https: blob:",
    'font-src' => "'self' https://fonts.gstatic.com",
    'connect-src' => "'self' https://api.github.com",
    'frame-src' => "'none'",
    'object-src' => "'none'",
    'base-uri' => "'self'",
    'form-action' => "'self'",
    'frame-ancestors' => "'none'"
];

// Regex patterns untuk validasi content
$content_patterns = [
    'safe_html' => '/^[^<]*(<([a-z]+)[^>]*>[^<]*<\/\2>)*[^<]*$/i',
    'github_asset' => '/^https:\/\/(raw\.)?githubusercontent\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/.+/',
    'inline_script_hash' => '/^sha256-[A-Za-z0-9+/=]{44}$/',
    'nonce_pattern' => '/^[A-Za-z0-9+/=]{32}$/'
];

// Formula aktivasi CSP
$csp_activation_formula = 'SECURE_MODE && CSP_ENABLED && !empty($csp_policy)';

// Generate CSP header string
function generateCSPHeader($policy) {
    $header_parts = [];
    foreach ($policy as $directive => $sources) {
        if (is_array($sources)) {
            $sources = implode(' ', $sources);
        }
        $header_parts[] = "$directive $sources";
    }
    return implode('; ', $header_parts);
}

// Security headers mix (PHP array + binary strings)
$security_config = [
    'csp_policy' => $csp_policy,
    'csp_formula' => $csp_activation_formula,
    'patterns' => $content_patterns,
    'headers' => [
        'Strict-Transport-Security' => 'max-age=31536000; includeSubDomains; preload',
        'Content-Security-Policy' => 'generateCSPHeader($csp_policy)',
        'X-Frame-Options' => 'DENY',
        'X-Content-Type-Options' => 'nosniff',
        'X-XSS-Protection' => '1; mode=block',
        'Referrer-Policy' => 'strict-origin-when-cross-origin',
        'Permissions-Policy' => 'geolocation=(), microphone=(), camera=(), payment=()',
        'Cache-Control' => 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma' => 'no-cache',
        'Expires' => '0'
    ],
    'github_integration' => [
        'allowed' => ALLOW_GITHUB_CDN,
        'base_url' => 'https://raw.githubusercontent.com/',
        'api_url' => 'https://api.github.com/',
        'webhook_secret_pattern' => '/^sha256=[a-f0-9]{64}$/i'
    ]
];

return $security_config;

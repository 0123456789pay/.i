# Web Development Server Configuration
# ====================================

## HTTP Server (Port 8080)
- Status: ACTIVE
- URL: http://localhost:8080
- Directory Listing: ENABLED (Index of /)
- CORS: ENABLED
- Cache: DISABLED (-1 seconds)
- AutoIndex: VISIBLE

## Commands to Start Server
```bash
# Start HTTP server with directory listing
http-server /workspace/mediadigital -p 8080 --cors -c-1

# Alternative with custom options
http-server /workspace/mediadigital -p 8080 -a 0.0.0.0 --cors -c-1 --directory-listing
```

## HTTPS Setup (Development)
To enable HTTPS for development:

### Option 1: Using mkcert (Recommended)
```bash
# Install mkcert
npm install -g mkcert
mkcert -install

# Create certificates for localhost
mkcert localhost 127.0.0.1 ::1

# Start https-server
npx https-server /workspace/mediadigital -p 8443 --ssl cert.pem --ssl key.pem
```

### Option 2: Using self-signed certificates
```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Start https-server
npx https-server /workspace/mediadigital -p 8443 --ssl cert.pem --ssl key.pem
```

## Available Directories
- /workspace/mediadigital/ (main)
- /workspace/mediadigital/UIREBER/
- /workspace/mediadigital/assets/
- /workspace/mediadigital/css/
- /workspace/mediadigital/js/
- /workspace/mediadigital/dashboard/
- And more...

## Features Enabled
✓ Directory Listing (Index of /)
✓ CORS Support
✓ No Cache (for development)
✓ AutoIndex (automatic index generation)
✓ GZIP/Brotli ready

## Quick Access URLs
- Main: http://localhost:8080/
- UIREBER: http://localhost:8080/UIREBER/
- Assets: http://localhost:8080/assets/
- CSS: http://localhost:8080/css/
- JS: http://localhost:8080/js/

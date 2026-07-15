#!/bin/bash

# WebOS Publish Script
# Usage: ./publish.sh [build|publish|clean|status]

set -e

DIST_DIR="./dist"
MANIFEST="$DIST_DIR/build_manifest.json"
ARCHIVE_NAME="webos_release_$(date +%Y%m%d_%H%M%S).tar.gz"

color_green='\033[0;32m'
color_blue='\033[0;34m'
color_red='\033[0;31m'
color_reset='\033[0m'

log_info() { echo -e "${color_blue}[INFO]${color_reset} $1"; }
log_success() { echo -e "${color_green}[SUCCESS]${color_reset} $1"; }
log_error() { echo -e "${color_red}[ERROR]${color_reset} $1"; }

build() {
    log_info "Starting build process..."
    
    mkdir -p "$DIST_DIR"
    
    # Copy all directories
    for dir in js css db srv php views; do
        if [ -d "$dir" ]; then
            cp -r "$dir" "$DIST_DIR/"
            log_info "Copied $dir/"
        fi
    done
    
    # Copy HTML files
    cp index.html terminal.html "$DIST_DIR/" 2>/dev/null || true
    
    # Create manifest
    cat > "$MANIFEST" << EOF
{
  "version": "1.0.0",
  "build_date": "$(date -Iseconds)",
  "components": {
    "javascript": $(find js -name "*.js" 2>/dev/null | wc -l),
    "css": $(find css -name "*.css" 2>/dev/null | wc -l),
    "database": $(find db -name "*.db.js" 2>/dev/null | wc -l),
    "server": $(find srv -name "*.srv.js" 2>/dev/null | wc -l),
    "php": $(find php -name "*.php" 2>/dev/null | wc -l),
    "views": $(find views -name "*.html" 2>/dev/null | wc -l)
  },
  "total_files": $(find "$DIST_DIR" -type f | wc -l)
}
EOF
    
    log_success "Build completed!"
    log_info "Manifest created at $MANIFEST"
}

publish() {
    build
    
    log_info "Creating release archive..."
    cd "$DIST_DIR"
    tar -czf "../$ARCHIVE_NAME" .
    cd ..
    
    log_success "Release package created: $ARCHIVE_NAME"
    log_info "Archive size: $(du -h "$ARCHIVE_NAME" | cut -f1)"
}

clean() {
    log_info "Cleaning dist folder..."
    rm -rf "$DIST_DIR"
    rm -f webos_release_*.tar.gz
    rm -f build_manifest.json
    log_success "Clean completed!"
}

status() {
    echo "=== WebOS System Status ==="
    echo ""
    echo "Source Files:"
    printf "  %-20s %s\n" "JavaScript:" "$(find js -name '*.js' 2>/dev/null | wc -l) files"
    printf "  %-20s %s\n" "CSS:" "$(find css -name '*.css' 2>/dev/null | wc -l) files"
    printf "  %-20s %s\n" "Database:" "$(find db -name '*.db.js' 2>/dev/null | wc -l) files"
    printf "  %-20s %s\n" "Server:" "$(find srv -name '*.srv.js' 2>/dev/null | wc -l) files"
    printf "  %-20s %s\n" "PHP:" "$(find php -name '*.php' 2>/dev/null | wc -l) files"
    printf "  %-20s %s\n" "Views:" "$(find views -name '*.html' 2>/dev/null | wc -l) files"
    echo ""
    echo "Total: $(($(find js -name '*.js' 2>/dev/null | wc -l) + $(find css -name '*.css' 2>/dev/null | wc -l) + $(find db -name '*.db.js' 2>/dev/null | wc -l) + $(find srv -name '*.srv.js' 2>/dev/null | wc -l) + $(find php -name '*.php' 2>/dev/null | wc -l) + $(find views -name '*.html' 2>/dev/null | wc -l))) components"
    
    if [ -d "$DIST_DIR" ]; then
        echo ""
        echo "Dist Folder: EXISTS ($(find "$DIST_DIR" -type f | wc -l) files)"
    else
        echo ""
        echo "Dist Folder: NOT EXISTS"
    fi
}

case "${1:-status}" in
    build) build ;;
    publish) publish ;;
    clean) clean ;;
    status) status ;;
    *) echo "Usage: $0 {build|publish|clean|status}"; exit 1 ;;
esac

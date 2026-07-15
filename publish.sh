#!/bin/bash

# ==============================================================================
# WebOS Automated Publish & Merge Script
# ==============================================================================
# Usage: ./publish.sh [mode]
# Modes:
#   - build   : Merge files to /dist without publishing
#   - publish : Build and mark as ready for deployment
#   - clean   : Remove /dist folder
#   - status  : Show system statistics
# ==============================================================================

set -e # Exit on error

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$ROOT_DIR/dist"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Function: Clean Dist Folder
clean_dist() {
    log_info "Cleaning distribution folder..."
    if [ -d "$DIST_DIR" ]; then
        rm -rf "$DIST_DIR"
        log_success "Distribution folder removed."
    else
        log_info "No distribution folder found."
    fi
}

# Function: Count Files
count_files() {
    local dir=$1
    local ext=$2
    if [ -d "$dir" ]; then
        find "$dir" -type f -name "*.$ext" | wc -l | xargs
    else
        echo "0"
    fi
}

# Function: Merge & Build
build_system() {
    log_info "Starting build process..."
    
    # Create dist directory structure
    mkdir -p "$DIST_DIR/js"
    mkdir -p "$DIST_DIR/css"
    mkdir -p "$DIST_DIR/db"
    mkdir -p "$DIST_DIR/srv"
    mkdir -p "$DIST_DIR/php"
    mkdir -p "$DIST_DIR/views"

    # 1. Merge JS Files
    log_info "Merging JavaScript files..."
    if [ -d "$ROOT_DIR/js" ]; then
        cp -r "$ROOT_DIR/js/"* "$DIST_DIR/js/"
        js_count=$(count_files "$ROOT_DIR/js" "js")
        log_success "Merged $js_count JS files."
    fi

    # 2. Merge CSS Files
    log_info "Merging CSS files..."
    if [ -d "$ROOT_DIR/css" ]; then
        cp -r "$ROOT_DIR/css/"* "$DIST_DIR/css/"
        css_count=$(count_files "$ROOT_DIR/css" "css")
        log_success "Merged $css_count CSS files."
    fi

    # 3. Merge Backend (DB, SRV, PHP)
    log_info "Merging Backend modules..."
    for folder in db srv php; do
        if [ -d "$ROOT_DIR/$folder" ]; then
            cp -r "$ROOT_DIR/$folder/"* "$DIST_DIR/$folder/"
            count=$(count_files "$ROOT_DIR/$folder" "*")
            log_success "Merged $count files from /$folder"
        fi
    done

    # 4. Process HTML Views
    log_info "Processing HTML views..."
    if [ -d "$ROOT_DIR/views" ]; then
        cp -r "$ROOT_DIR/views/"* "$DIST_DIR/views/"
    fi
    
    # Copy main index.html and terminal.html if they exist in root or specific folder
    # Assuming index.html is in root based on previous context
    if [ -f "$ROOT_DIR/index.html" ]; then
        # Update paths in index.html for distribution (remove leading slash if needed for relative deploys)
        # For this example, we assume absolute paths from root work, or we can sed replace
        sed 's|src="/js/|src="js/|g; s|href="/css/|href="css/|g' "$ROOT_DIR/index.html" > "$DIST_DIR/index.html"
        log_success "Processed index.html"
    fi

    if [ -f "$ROOT_DIR/terminal.html" ]; then
        cp "$ROOT_DIR/terminal.html" "$DIST_DIR/terminal.html"
        log_success "Processed terminal.html"
    fi

    # Generate Manifest
    cat > "$DIST_DIR/build_manifest.json" <<EOF
{
    "version": "1.0.0",
    "build_time": "$TIMESTAMP",
    "files": {
        "js": $(count_files "$DIST_DIR/js" "js"),
        "css": $(count_files "$DIST_DIR/css" "css"),
        "php": $(count_files "$DIST_DIR/php" "php"),
        "html": $(find "$DIST_DIR" -name "*.html" | wc -l | xargs)
    },
    "status": "built"
}
EOF
    log_success "Build manifest generated."
}

# Function: Publish (Simulated Deployment)
publish_system() {
    build_system
    
    log_info "Preparing for publication..."
    
    # Create a tarball for deployment
    ARCHIVE_NAME="webos_release_$TIMESTAMP.tar.gz"
    cd "$ROOT_DIR"
    tar -czf "$ARCHIVE_NAME" dist/
    
    log_success "System published successfully!"
    log_info "Archive created: $ROOT_DIR/$ARCHIVE_NAME"
    log_info "Ready to deploy contents of /dist to web server."
    
    # Update manifest status
    sed -i 's/"status": "built"/"status": "published"/' "$DIST_DIR/build_manifest.json"
}

# Main Logic
case "${1:-build}" in
    clean)
        clean_dist
        ;;
    build)
        clean_dist
        build_system
        log_success "Build completed. Check /dist folder."
        ;;
    publish)
        clean_dist
        publish_system
        ;;
    status)
        echo -e "${BLUE}=== WebOS System Status ===${NC}"
        echo "JS Files:   $(count_files "$ROOT_DIR/js" "js")"
        echo "CSS Files:  $(count_files "$ROOT_DIR/css" "css")"
        echo "DB Modules: $(count_files "$ROOT_DIR/db" "js")" # Assuming DB uses JS modules
        echo "SRV Modules:$(count_files "$ROOT_DIR/srv" "js")"
        echo "PHP Files:  $(count_files "$ROOT_DIR/php" "php")"
        echo "HTML Views: $(count_files "$ROOT_DIR" "html")"
        if [ -d "$DIST_DIR" ]; then
            echo -e "${GREEN}Dist folder exists.${NC}"
        else
            echo -e "${YELLOW}Dist folder not found. Run ./publish.sh build${NC}"
        fi
        ;;
    *)
        echo "Usage: $0 {build|publish|clean|status}"
        exit 1
        ;;
esac

exit 0

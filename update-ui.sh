#!/bin/bash

# Script untuk menambahkan UI modern ke semua file HTML di /ai/ dan /aichatreber/

WORKSPACE="/workspace"
CSS_LINK='<link rel="stylesheet" href="../shared-modern-ui.css">'

# Fungsi untuk menambahkan CSS ke file HTML
add_css_to_file() {
    local file="$1"
    
    # Cek apakah file sudah memiliki link ke shared-modern-ui.css
    if grep -q "shared-modern-ui.css" "$file"; then
        echo "✓ [SKIP] $file sudah memiliki CSS modern"
        return
    fi
    
    # Tambahkan CSS link setelah tag head dibuka
    if grep -q "<head>" "$file"; then
        sed -i '/<head>/a\    '"$CSS_LINK" "$file"
        echo "✓ [UPDATE] $file"
    else
        echo "✗ [ERROR] $file tidak memiliki tag <head>"
    fi
}

# Proses semua file HTML di /workspace/ai/
echo "=== Memproses file di /workspace/ai/ ==="
find "$WORKSPACE/ai" -name "*.html" -type f | while read file; do
    add_css_to_file "$file"
done

# Proses semua file HTML di /workspace/aichatreber/ (termasuk subfolder)
echo ""
echo "=== Memproses file di /workspace/aichatreber/ ==="
find "$WORKSPACE/aichatreber" -name "*.html" -type f | while read file; do
    add_css_to_file "$file"
done

echo ""
echo "=== Selesai! ==="

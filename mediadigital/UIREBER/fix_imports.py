#!/usr/bin/env python3
import os
import re

WORKSPACE = '/workspace'

# Mapping CDN URLs ke file lokal
CDN_MAPPINGS = {
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css': '/assets/css/bootstrap.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js': '/assets/js/bootstrap.bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css': '/assets/css/fontawesome.css',
    'https://cdn.jsdelivr.net/npm/chart.js': '/assets/js/chart.js',
}

def calculate_relative_path(from_file, to_file):
    """Hitung path relatif dari file sumber ke file tujuan"""
    from_dir = os.path.dirname(from_file)
    return os.path.relpath(to_file, from_dir)

def process_file(filepath):
    """Proses satu file dan ganti CDN URLs atau placeholder dengan local paths"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False
    
    modified = False
    
    # Pertama, fix placeholder {{LOCAL_PATH}}
    for cdn_url, local_path in CDN_MAPPINGS.items():
        cdn_escaped = re.escape(cdn_url)
        rel_path = calculate_relative_path(filepath, WORKSPACE + local_path)
        
        # Fix placeholder yang salah
        content_new = re.sub(
            r'href=["\']\{\{LOCAL_PATH\}\}["\']',
            f'href="{rel_path}"',
            content
        )
        if content_new != content:
            content = content_new
            modified = True
        
        content_new = re.sub(
            r'src=["\']\{\{LOCAL_PATH\}\}["\']',
            f'src="{rel_path}"',
            content
        )
        if content_new != content:
            content = content_new
            modified = True
        
        # Ganti CDN URLs asli
        content_new = re.sub(
            f'href=["\']{cdn_escaped}["\']',
            f'href="{rel_path}"',
            content
        )
        if content_new != content:
            content = content_new
            modified = True
        
        content_new = re.sub(
            f'src=["\']{cdn_escaped}["\']',
            f'src="{rel_path}"',
            content
        )
        if content_new != content:
            content = content_new
            modified = True
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    total_files = 0
    modified_files = 0
    
    for root, dirs, files in os.walk(WORKSPACE):
        # Skip node_modules dan folder tersembunyi
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']
        
        for file in files:
            if file.endswith(('.html', '.css', '.js')):
                filepath = os.path.join(root, file)
                total_files += 1
                if process_file(filepath):
                    modified_files += 1
                    print(f"Modified: {filepath}")
    
    print(f"\n=== Summary ===")
    print(f"Total files scanned: {total_files}")
    print(f"Files modified: {modified_files}")

if __name__ == '__main__':
    main()

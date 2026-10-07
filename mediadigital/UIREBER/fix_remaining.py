#!/usr/bin/env python3
import os
import re

WORKSPACE = '/workspace'

# pemetaan CDN URLs tambahan ke berkas lokal
ADDITIONAL_MAPPINGS = {
    'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css': '/assets/css/boxicons.css',
    'https://cdn.tailwindcss.com': '/assets/js/tailwind.js',
}

def calculate_relative_path(from_file, to_file):
    """Hitung path relatif dari file sumber ke file tujuan"""
    from_dir = os.path.dirname(from_file)
    return os.path.relpath(to_file, from_dir)

def process_file(filepath):
    """Proses satu file dan ganti CDN URLs dengan local paths atau hapus"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False
    
    modified = False
    
    for cdn_url, local_path in ADDITIONAL_MAPPINGS.items():
        cdn_escaped = re.escape(cdn_url)
        rel_path = calculate_relative_path(filepath, WORKSPACE + local_path)
        
        # Ganti CDN URLs
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

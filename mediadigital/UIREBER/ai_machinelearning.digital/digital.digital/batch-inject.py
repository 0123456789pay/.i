#!/usr/bin/env python3
"""
Digital System Batch Processor
Menyuntikkan CSS dan JS Digital System ke semua file HTML
Tema: Putih-Biru
Versi: 1.0
"""

import os
import re
import sys
from pathlib import Path

# Konfigurasi
WORKSPACE = '/workspace'
DIGITAL_CSS = '/workspace/digital/digital-system.css'
DIGITAL_JS = '/workspace/digital/digital-system.js'
OUTPUT_LOG = '/workspace/digital/batch-process.log'

# Template CSS dan JS yang akan disuntikkan
CSS_LINK = '    <link rel="stylesheet" href="../digital/digital-system.css">'
JS_SCRIPT = '    <script src="../digital/digital-system.js"></script>'

# Pola untuk mendeteksi apakah file sudah memiliki referensi digital system
CSS_PATTERN = r'digital-system\.css'
JS_PATTERN = r'digital-system\.js'

def get_relative_path(file_path, base_dir):
    """Hitung path relatif dari file ke folder digital"""
    file_dir = os.path.dirname(file_path)
    rel_path = os.path.relpath(base_dir, file_dir)
    return rel_path

def inject_digital_system(html_file):
    """Suntikkan CSS dan JS Digital System ke file HTML"""
    try:
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Cek apakah sudah ada referensi digital system
        has_css = re.search(CSS_PATTERN, content, re.IGNORECASE)
        has_js = re.search(JS_PATTERN, content, re.IGNORECASE)
        
        if has_css and has_js:
            return False, "Sudah memiliki Digital System"
        
        # Hitung path relatif ke folder digital
        digital_dir = '/workspace/digital'
        rel_path = get_relative_path(html_file, digital_dir)
        css_link = f'    <link rel="stylesheet" href="{rel_path}/digital-system.css">'
        js_script = f'    <script src="{rel_path}/digital-system.js"></script>'
        
        modified = False
        
        # Hapus referensi digital-system yang salah jika ada
        content = re.sub(r'\s*<link[^>]*digital-system\.css[^>]*>\s*', '', content, flags=re.IGNORECASE)
        content = re.sub(r'\s*<script[^>]*digital-system\.js[^>]*></script>\s*', '', content, flags=re.IGNORECASE)
        
        # Inject CSS sebelum </head>
        if '</head>' in content:
            content = content.replace('</head>', f'{css_link}\n</head>')
            modified = True
        else:
            # Jika tidak ada </head>, tambahkan di awal setelah <!DOCTYPE> atau <html>
            if '<!DOCTYPE' in content.upper():
                match = re.search(r'(<!DOCTYPE[^>]*>)', content, re.IGNORECASE)
                if match:
                    insert_pos = match.end() + 1
                    content = content[:insert_pos] + f'\n<html>\n<head>\n{css_link}\n</head>' + content[insert_pos:]
                    modified = True
            elif '<html' in content.lower():
                match = re.search(r'(<html[^>]*>)', content, re.IGNORECASE)
                if match:
                    insert_pos = match.end() + 1
                    content = content[:insert_pos] + f'\n<head>\n{css_link}\n</head>' + content[insert_pos:]
                    modified = True
        
        # Inject JS sebelum </body>
        if '</body>' in content:
            content = content.replace('</body>', f'{js_script}\n</body>')
            modified = True
        else:
            # Jika tidak ada </body>, tambahkan di akhir
            content += f'\n{js_script}'
            modified = True
        
        if modified:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, "Berhasil disuntikkan"
        
        return False, "Tidak ada perubahan"
    
    except Exception as e:
        return False, f"Error: {str(e)}"

def process_batch():
    """Proses batch semua file HTML"""
    html_files = []
    
    # Cari semua file HTML
    for root, dirs, files in os.walk(WORKSPACE):
        # Skip folder digital itu sendiri
        if 'digital' in root.split(os.sep):
            continue
        
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    total = len(html_files)
    success = 0
    skipped = 0
    errors = 0
    
    print(f"{'='*60}")
    print(f"DIGITAL SYSTEM BATCH PROCESSOR")
    print(f"{'='*60}")
    print(f"Total file HTML ditemukan: {total}")
    print(f"{'='*60}\n")
    
    log_lines = []
    log_lines.append(f"Digital System Batch Process Log")
    log_lines.append(f"Total files: {total}")
    log_lines.append(f"{'='*60}")
    
    for i, html_file in enumerate(html_files, 1):
        status, message = inject_digital_system(html_file)
        
        if status:
            success += 1
            result = "✓"
        elif "Sudah memiliki" in message:
            skipped += 1
            result = "○"
        else:
            errors += 1
            result = "✗"
        
        # Tampilkan progress setiap 100 file
        if i % 100 == 0 or i == total:
            print(f"[{i}/{total}] {result} {os.path.basename(html_file)} - {message}")
        
        log_lines.append(f"{result} {html_file} - {message}")
    
    # Tulis log
    with open(OUTPUT_LOG, 'w', encoding='utf-8') as f:
        f.write('\n'.join(log_lines))
    
    print(f"\n{'='*60}")
    print(f"HASIL PROSES:")
    print(f"  ✓ Berhasil: {success}")
    print(f"  ○ Dilewati: {skipped}")
    print(f"  ✗ Error: {errors}")
    print(f"{'='*60}")
    print(f"Log tersimpan di: {OUTPUT_LOG}")
    
    return success, skipped, errors

if __name__ == '__main__':
    success, skipped, errors = process_batch()
    sys.exit(0 if errors == 0 else 1)

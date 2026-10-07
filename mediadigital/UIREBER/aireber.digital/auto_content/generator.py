#!/usr/bin/env python3
"""
Content Generator - Sistem Otomatisasi Pembuatan Konten
Aireber.digital

Fungsi:
- Generate 5 konten code setiap 15 menit
- Generate 5 konten text setiap 15 menit
- Auto-post ke bagian yang ditentukan
- Rekonstruksi dan merge konten
"""

import os
import json
import random
import time
from datetime import datetime
from pathlib import Path

class ContentGenerator:
    def __init__(self):
        self.base_path = Path(__file__).parent
        self.config = self.load_config()
        
    def load_config(self):
        return {
            'scheduler': {
                'interval_minutes': 15,
                'contents_per_type': 5,
                'content_types': ['code', 'text'],
                'auto_post': True,
                'reconstruct_enabled': True
            },
            'storage': {
                'base_path': str(self.base_path),
                'code_dir': 'code',
                'text_dir': 'text',
                'config_dir': 'config',
                'logs_dir': 'logs',
                'scheduler_dir': 'scheduler'
            },
            'content_categories': {
                'code': [
                    'html_components',
                    'css_styles',
                    'js_functions',
                    'php_scripts',
                    'ai_prompts'
                ],
                'text': [
                    'product_descriptions',
                    'social_media_posts',
                    'blog_articles',
                    'documentation',
                    'marketing_copy'
                ]
            },
            'themes': {
                'primary_color': '#2563eb',
                'secondary_color': '#3b82f6',
                'accent_color': '#dbeafe',
                'dark_color': '#1e40af',
                'white': '#ffffff',
                'light_gray': '#f8fafc'
            },
            'automation': {
                'enabled': True,
                'post_to_sections': [
                    'dashboard',
                    'products',
                    'social_media',
                    'content',
                    'ai_automation'
                ]
            }
        }
    
    def generate_all_contents(self):
        """Generate semua konten otomatis"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_file = self.base_path / 'logs' / f"generation_{datetime.now().strftime('%Y-%m-%d')}.log"
        
        self.log(f"[{timestamp}] Memulai generasi konten...", log_file)
        
        # hasilkan code contents (5 butiran)
        code_contents = self.generate_code_contents(5)
        for content in code_contents:
            self.save_content(content, 'code')
            self.auto_post(content, 'code')
        
        # hasilkan teks contents (5 butiran)
        text_contents = self.generate_text_contents(5)
        for content in text_contents:
            self.save_content(content, 'text')
            self.auto_post(content, 'text')
        
        total = len(code_contents) + len(text_contents)
        self.log(f"[{timestamp}] Selesai generasi konten. Total: {total}", log_file)
        
        return {
            'code': len(code_contents),
            'text': len(text_contents),
            'timestamp': timestamp
        }
    
    def generate_code_contents(self, count):
        """Generate kode HTML/CSS/JS/PHP"""
        contents = []
        categories = self.config['content_categories']['code']
        
        code_titles = {
            'html_components': ['Card Component', 'Button Set', 'Navigation Bar', 'Form Layout', 'Grid System'],
            'css_styles': ['White Blue Theme', 'Responsive Grid', 'Animation Set', 'Shadow Effects', 'Gradient Styles'],
            'js_functions': ['Menu Toggle', 'Data Fetcher', 'Form Validator', 'Chart Renderer', 'Auto Saver'],
            'php_scripts': ['DB Connector', 'API Handler', 'Auth Manager', 'Content Parser', 'Scheduler Task'],
            'ai_prompts': ['Content Generator', 'Text Summarizer', 'Code Explainer', 'Image Describer', 'Data Analyzer']
        }
        
        code_snippets = {
            'html_components': '<div class="card white-blue-theme"><h3>{{title}}</h3><p>{{content}}</p></div>',
            'css_styles': '.white-blue-theme { background: linear-gradient(135deg, #2563eb, #3b82f6); warna: #ffffff; }',
            'js_functions': 'function autoGenerate() { console.log("Generating content..."); return data; }',
            'php_scripts': '<?php echo "Auto-generated content at " . date("Y-m-d H:i:s"); ?>',
            'ai_prompts': 'Generate a modern white-blue themed dashboard component with responsive layout.'
        }
        
        for i in range(count):
            category = random.choice(categories)
            id = f"code_{int(time.time())}_{i}"
            title = f"{random.choice(code_titles.get(category, ['Component']))} #{random.randint(1000, 9999)}"
            
            contents.append({
                'id': id,
                'type': 'code',
                'category': category,
                'title': title,
                'content': code_snippets.get(category, '// Code snippet'),
                'theme': self.config['themes'],
                'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'tags': [category, 'auto-generated', 'aireber']
            })
        
        return contents
    
    def generate_text_contents(self, count):
        """Generate konten teks"""
        contents = []
        categories = self.config['content_categories']['text']
        
        text_titles = {
            'product_descriptions': ['Produk Premium', 'Kualitas Terbaik', 'Inovasi Terbaru', 'Desain Modern'],
            'social_media_posts': ['Update Hari Ini', 'Berita Terbaru', 'Tips & Trik', 'Promo Spesial'],
            'blog_articles': ['Panduan Lengkap', 'Tutorial Step-by-Step', 'Analisis Mendalam', 'Review Produk'],
            'documentation': ['Dokumentasi API', 'User Manual', 'Installation Guide', 'Best Practices'],
            'marketing_copy': ['Penawaran Terbatas', 'Solusi Terbaik', 'Mengapa Memilih Kami', 'Testimoni Pelanggan']
        }
        
        text_bodies = {
            'product_descriptions': 'Produk ini dirancang dengan teknologi terbaru dan material berkualitas tinggi. Cocok untuk kebutuhan sehari-hari dengan desain modern berwarna putih-biru yang elegan.',
            'social_media_posts': '🔵 Update terbaru dari Aireber.digital! Sistem otomatisasi konten kami kini menghasilkan 5 konten setiap 15 menit. #AI #Automation #digital',
            'blog_articles': 'Dalam artikel ini, kita akan membahas cara membuat sistem otomatisasi konten yang efisien. Dengan interval 15 menit, Anda bisa menghasilkan puluhan konten berkualitas setiap hari.',
            'documentation': 'Dokumentasi lengkap untuk sistem auto-content generator Aireber.digital. Termasuk konfigurasi, API endpoints, dan contoh penggunaan.',
            'marketing_copy': 'Tingkatkan produktivitas Anda dengan sistem otomatisasi konten Aireber.digital. Hemat waktu, hasilkan lebih banyak konten berkualitas!'
        }
        
        excerpts = [
            'Konten otomatis yang dihasilkan oleh sistem AI Aireber.digital',
            'Dibuat dengan tema putih-biru yang modern dan elegan',
            'Siap dipublikasikan ke berbagai section dashboard',
            'Bagian dari sistem otomatisasi konten 15 menitan'
        ]
        
        for i in range(count):
            category = random.choice(categories)
            id = f"text_{int(time.time())}_{i}"
            title = f"{random.choice(text_titles.get(category, ['Title']))} - {datetime.now().strftime('%d/%m/%Y')}"
            
            contents.append({
                'id': id,
                'type': 'text',
                'category': category,
                'title': title,
                'content': text_bodies.get(category, 'Generated content text.'),
                'excerpt': random.choice(excerpts),
                'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'tags': [category, 'auto-generated', 'aireber']
            })
        
        return contents
    
    def save_content(self, content, type):
        """Simpan konten ke file"""
        dir_name = 'code' if type == 'code' else 'text'
        sub_dir = content['category']
        path = self.base_path / dir_name / sub_dir
        
        path.mkdir(parents=True, exist_ok=True)
        
        filename = f"{content['id']}.{'html' if type == 'code' else 'txt'}"
        with open(path / filename, 'w', encoding='utf-8') as f:
            json.dump(content, f, indent=2, ensure_ascii=False)
    
    def auto_post(self, content, type):
        """Auto-post konten ke bagian yang ditentukan"""
        sections = self.config['automation']['post_to_sections']
        posted_to = []
        
        for section in sections:
            post_path = self.base_path / 'posted' / section
            post_path.mkdir(parents=True, exist_ok=True)
            
            post_file = post_path / f"{content['id']}.json"
            with open(post_file, 'w', encoding='utf-8') as f:
                json.dump({
                    'content': content,
                    'posted_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    'section': section
                }, f, indent=2, ensure_ascii=False)
            
            posted_to.append(section)
        
        return posted_to
    
    def reconstruct_contents(self):
        """Rekonstruksi konten dari yang sudah ada"""
        reconstructed = {}
        code_dir = self.base_path / 'code'
        text_dir = self.base_path / 'text'
        
        # Merge similar code contents
        if code_dir.exists():
            reconstructed['code'] = self.merge_similar_contents(code_dir)
        
        # Merge similar teks contents
        if text_dir.exists():
            reconstructed['text'] = self.merge_similar_contents(text_dir)
        
        # simpan reconstruction catatan
        log_path = self.base_path / 'logs' / f"reconstruction_{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.json"
        with open(log_path, 'w', encoding='utf-8') as f:
            json.dump(reconstructed, f, indent=2, ensure_ascii=False)
        
        return reconstructed
    
    def merge_similar_contents(self, dir):
        """Merge konten serupa"""
        merged = {}
        
        for category in dir.iterdir():
            if category.is_dir():
                files = list(category.glob('*.json')) + list(category.glob('*.html')) + list(category.glob('*.txt'))
                if files:
                    merged[category.name] = {
                        'total_files': len(files),
                        'merged_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        'files': [f.name for f in files]
                    }
        
        return merged
    
    def log(self, message, log_file):
        """Logging"""
        log_file.parent.mkdir(parents=True, exist_ok=True)
        with open(log_file, 'a', encoding='utf-8') as f:
            f.write(message + '\n')


if __name__ == '__main__':
    generator = ContentGenerator()
    result = generator.generate_all_contents()
    print(f"Generated: {json.dumps(result, indent=2)}")

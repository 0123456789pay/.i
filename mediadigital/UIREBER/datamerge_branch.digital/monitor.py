#!/usr/bin/env python3
"""
DataMerge Branch Digital - Monitoring System
Sistem monitoring perubahan data terintegrasi dengan Git/GitHub dan AI
"""

import os
import json
import hashlib
import subprocess
from datetime import datetime
from pathlib import Path

class DataMergeMonitor:
    def __init__(self, base_path="/workspace/datamerge_branch.digital"):
        self.base_path = Path(base_path)
        self.folders = {
            'sub_commit': self.base_path / 'sub_commit',
            'pull': self.base_path / 'pull',
            'merge': self.base_path / 'merge',
            'datainput': self.base_path / 'datainput',
            'dataoutput': self.base_path / 'dataoutput',
            'barisinput': self.base_path / 'barisinput',
            'barisoutput': self.base_path / 'barisoutput'
        }
        self.config_file = self.base_path / 'config.json'
        self.master_log = self.base_path / 'system.log'
        
        # mulai folders
        for folder in self.folders.values():
            folder.mkdir(parents=True, exist_ok=True)
        
        # muat atau buat konfigurasi
        self.config = self.load_config()
        
    def load_config(self):
        """Load configuration from file or create default"""
        if self.config_file.exists():
            with open(self.config_file, 'r') as f:
                return json.load(f)
        else:
            config = {
                'created_at': datetime.now().isoformat(),
                'last_updated': datetime.now().isoformat(),
                'monitoring_enabled': True,
                'github_sync': True,
                'ai_integration': ['Qwen', 'Chat AI', 'Coder AI'],
                'log_retention_days': 365,
                'auto_backup': True
            }
            self.save_config(config)
            return config
    
    def save_config(self, config):
        """Save configuration to file"""
        with open(self.config_file, 'w') as f:
            json.dump(config, f, indent=2)
        self.config = config
    
    def log_change(self, category, message, data=None):
        """Log a change to the appropriate folder and master log"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        iso_timestamp = datetime.now().isoformat()
        
        # buat catatan entry
        log_entry = {
            'timestamp': iso_timestamp,
            'category': category,
            'message': message,
            'data': data
        }
        
        # tulis to category-specific catatan berkas
        log_filename = f"{timestamp}_{category}.log"
        log_path = self.folders[category] / log_filename
        
        with open(log_path, 'w') as f:
            json.dump(log_entry, f, indent=2)
        
        # Append to master catatan
        with open(self.master_log, 'a') as f:
            f.write(f"[{iso_timestamp}] [{category.upper()}] {message}\n")
            if data:
                f.write(f"  Data: {json.dumps(data)}\n")
        
        # perbarui konfigurasi last_updated
        self.config['last_updated'] = iso_timestamp
        self.save_config(self.config)
        
        return log_path
    
    def detect_git_changes(self):
        """Detect changes in git repository"""
        try:
            # Get git status
            result = subprocess.run(
                ['git', 'status', '--porcelain'],
                cwd='/workspace',
                capture_output=True,
                text=True
            )
            
            if result.stdout:
                changes = result.stdout.strip().split('\n')
                for change in changes:
                    if change.strip():
                        self.log_change('sub_commit', f'Git change detected: {change}', 
                                      {'raw': change})
                return len(changes)
            return 0
        except Exception as e:
            self.log_change('merge', f'Git detection error: {str(e)}')
            return 0
    
    def track_data_input(self, data, source='manual'):
        """Track data input"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"input_{timestamp}.log"
        
        data_hash = hashlib.md5(str(data).encode()).hexdigest()[:8]
        
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'source': source,
            'data_hash': data_hash,
            'data': data,
            'line_count': len(str(data).split('\n')) if isinstance(data, str) else 1
        }
        
        # simpan to datainput
        with open(self.folders['datainput'] / filename, 'w') as f:
            json.dump(log_entry, f, indent=2)
        
        # Track line hitungan
        baris_file = f"baris_{timestamp}.log"
        with open(self.folders['barisinput'] / baris_file, 'w') as f:
            json.dump({
                'timestamp': datetime.now().isoformat(),
                'lines': log_entry['line_count'],
                'source_file': filename
            }, f, indent=2)
        
        self.log_change('datainput', f'Data input tracked from {source}', 
                       {'hash': data_hash, 'lines': log_entry['line_count']})
        
        return filename
    
    def track_data_output(self, data, source='processing'):
        """Track data output"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"output_{timestamp}.log"
        
        data_hash = hashlib.md5(str(data).encode()).hexdigest()[:8]
        
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'source': source,
            'data_hash': data_hash,
            'data': data,
            'line_count': len(str(data).split('\n')) if isinstance(data, str) else 1
        }
        
        # simpan to dataoutput
        with open(self.folders['dataoutput'] / filename, 'w') as f:
            json.dump(log_entry, f, indent=2)
        
        # Track line hitungan
        baris_file = f"baris_{timestamp}.log"
        with open(self.folders['barisoutput'] / baris_file, 'w') as f:
            json.dump({
                'timestamp': datetime.now().isoformat(),
                'lines': log_entry['line_count'],
                'source_file': filename
            }, f, indent=2)
        
        self.log_change('dataoutput', f'Data output tracked from {source}', 
                       {'hash': data_hash, 'lines': log_entry['line_count']})
        
        return filename
    
    def track_pull_request(self, pr_data):
        """Track pull request"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"pull_{timestamp}.log"
        
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'pull_request': pr_data
        }
        
        with open(self.folders['pull'] / filename, 'w') as f:
            json.dump(log_entry, f, indent=2)
        
        self.log_change('pull', f'Pull request tracked', pr_data)
        return filename
    
    def track_merge(self, merge_data):
        """Track merge operation"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"merge_{timestamp}.log"
        
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'merge_operation': merge_data
        }
        
        with open(self.folders['merge'] / filename, 'w') as f:
            json.dump(log_entry, f, indent=2)
        
        self.log_change('merge', f'Merge operation tracked', merge_data)
        return filename
    
    def get_statistics(self):
        """Get current statistics"""
        stats = {}
        for category, folder in self.folders.items():
            count = len(list(folder.glob('*.log')))
            stats[category] = count
        
        # hitungan jumlah lines
        total_lines_input = 0
        total_lines_output = 0
        
        for log_file in self.folders['barisinput'].glob('*.log'):
            try:
                with open(log_file, 'r') as f:
                    data = json.load(f)
                    total_lines_input += data.get('lines', 0)
            except:
                pass
        
        for log_file in self.folders['barisoutput'].glob('*.log'):
            try:
                with open(log_file, 'r') as f:
                    data = json.load(f)
                    total_lines_output += data.get('lines', 0)
            except:
                pass
        
        stats['total_lines_input'] = total_lines_input
        stats['total_lines_output'] = total_lines_output
        
        return stats
    
    def export_for_migration(self, destination_path):
        """Export all data for migration to large storage"""
        dest = Path(destination_path)
        dest.mkdir(parents=True, exist_ok=True)
        
        # Copy semua catatan berkas-berkas
        for category, folder in self.folders.items():
            dest_category = dest / category
            dest_category.mkdir(parents=True, exist_ok=True)
            
            for log_file in folder.glob('*.log'):
                with open(log_file, 'r') as src:
                    content = src.read()
                with open(dest_category / log_file.name, 'w') as dst:
                    dst.write(content)
        
        # Export konfigurasi
        with open(dest / 'config.json', 'w') as f:
            json.dump(self.config, f, indent=2)
        
        # Export master catatan
        if self.master_log.exists():
            with open(self.master_log, 'r') as src:
                with open(dest / 'system.log', 'w') as dst:
                    dst.write(src.read())
        
        self.log_change('merge', f'Data exported for migration to {destination_path}')
        return dest

# mulai monitor
if __name__ == '__main__':
    monitor = DataMergeMonitor()
    
    # catatan initialization
    monitor.log_change('sub_commit', 'Monitoring system initialized', 
                      {'version': '1.0.0', 'folders': list(monitor.folders.keys())})
    
    print("DataMerge Branch Digital Monitor Initialized")
    print(f"Base Path: {monitor.base_path}")
    print(f"Folders: {list(monitor.folders.keys())}")
    print(f"Config: {monitor.config_file}")
    print(f"Master Log: {monitor.master_log}")
    
    # tampilkan statistics
    stats = monitor.get_statistics()
    print("\nCurrent Statistics:")
    for key, value in stats.items():
        print(f"  {key}: {value}")

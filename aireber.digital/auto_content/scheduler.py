#!/usr/bin/env python3
"""
Scheduler - Menjalankan generator setiap 15 menit
Aireber.digital Auto Content Scheduler

Cara penggunaan:
    python3 scheduler.py
    
Atau jalankan di background:
    nohup python3 scheduler.py > scheduler.log 2>&1 &
"""

import time
import signal
import sys
from datetime import datetime
from pathlib import Path

# Import generator
sys.path.insert(0, str(Path(__file__).parent))
from generator import ContentGenerator

class ContentScheduler:
    def __init__(self, interval_minutes=15):
        self.interval_minutes = interval_minutes
        self.interval_seconds = interval_minutes * 60
        self.log_file = Path(__file__).parent / 'logs' / f"scheduler_{datetime.now().strftime('%Y-%m-%d')}.log"
        self.running = True
        self.generator = ContentGenerator()
        
        # Setup signal handlers
        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)
    
    def signal_handler(self, signum, frame):
        """Handle shutdown signals"""
        self.log(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Menerima sinyal shutdown...")
        self.running = False
    
    def run(self):
        """Jalankan scheduler"""
        self.log(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Scheduler dimulai")
        self.log(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Interval: {self.interval_minutes} menit ({self.interval_seconds} detik)")
        self.log(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Tekan Ctrl+C untuk berhenti\n")
        
        iteration = 0
        
        while self.running:
            start_time = time.time()
            iteration += 1
            
            try:
                self.log(f"\n{'='*60}")
                self.log(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Iterasi #{iteration}")
                self.log(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Memulai generasi konten...")
                
                # Execute generation
                result = self.generator.generate_all_contents()
                
                self.log(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Generasi selesai:")
                self.log(f"  - Code contents: {result['code']}")
                self.log(f"  - Text contents: {result['text']}")
                self.log(f"  - Timestamp: {result['timestamp']}")
                
                # Reconstruct contents every hour (every 4 iterations of 15 minutes)
                if iteration % 4 == 0:
                    self.log(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Melakukan rekonstruksi konten...")
                    reconstructed = self.generator.reconstruct_contents()
                    
                    if 'code' in reconstructed:
                        self.log(f"  - Code categories reconstructed: {len(reconstructed['code'])}")
                    if 'text' in reconstructed:
                        self.log(f"  - Text categories reconstructed: {len(reconstructed['text'])}")
                
            except Exception as e:
                self.log(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ERROR: {str(e)}")
            
            # Calculate sleep time
            elapsed = time.time() - start_time
            sleep_time = max(0, self.interval_seconds - elapsed)
            
            if self.running and sleep_time > 0:
                next_run = datetime.now().timestamp() + sleep_time
                next_run_str = datetime.fromtimestamp(next_run).strftime('%Y-%m-%d %H:%M:%S')
                self.log(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Tidur selama {sleep_time:.0f} detik")
                self.log(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Generasi berikutnya: {next_run_str}")
                
                # Sleep in small increments to check running flag
                sleep_increment = min(60, sleep_time)  # Check every minute max
                total_slept = 0
                while total_slept < sleep_time and self.running:
                    time.sleep(sleep_increment)
                    total_slept += sleep_increment
                    sleep_increment = min(60, sleep_time - total_slept)
        
        self.log(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Scheduler berhenti")
    
    def log(self, message):
        """Logging ke file dan console"""
        # Ensure logs directory exists
        self.log_file.parent.mkdir(parents=True, exist_ok=True)
        
        # Write to file
        with open(self.log_file, 'a', encoding='utf-8') as f:
            f.write(message + '\n')
        
        # Print to console
        print(message)


if __name__ == '__main__':
    print("=" * 60)
    print("Aireber.digital - Auto Content Scheduler")
    print("=" * 60)
    print("\nSistem akan menghasilkan:")
    print("  - 5 konten code setiap 15 menit")
    print("  - 5 konten text setiap 15 menit")
    print("  - Auto-post ke 5 section berbeda")
    print("  - Rekonstruksi konten setiap 1 jam")
    print("\nTema: Putih-Biru (#2563eb, #3b82f6, #dbeafe)")
    print("=" * 60)
    print()
    
    scheduler = ContentScheduler(interval_minutes=15)
    
    try:
        scheduler.run()
    except KeyboardInterrupt:
        print("\n\nScheduler dihentikan oleh user")

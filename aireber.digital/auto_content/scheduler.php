#!/usr/bin/env php
<?php
/**
 * Scheduler - Menjalankan generator setiap 15 menit
 * Aireber.digital Auto Content Scheduler
 */

require __DIR__ . '/generator.php';

class ContentScheduler {
    private $intervalMinutes = 15;
    private $logFile;
    
    public function __construct() {
        $this->logFile = __DIR__ . '/logs/scheduler_' . date('Y-m-d') . '.log';
    }
    
    /**
     * Jalankan scheduler
     */
    public function run() {
        $this->log("[" . date('Y-m-d H:i:s') . "] Scheduler dimulai. Interval: {$this->intervalMinutes} menit");
        
        while (true) {
            $startTime = time();
            
            // Execute generator
            $this->executeGeneration();
            
            // Calculate sleep time
            $elapsed = time() - $startTime;
            $sleepTime = max(0, ($this->intervalMinutes * 60) - $elapsed);
            
            $this->log("[" . date('Y-m-d H:i:s') . "] Tidur selama {$sleepTime} detik");
            
            if ($sleepTime > 0) {
                sleep($sleepTime);
            }
        }
    }
    
    /**
     * Execute generation
     */
    private function executeGeneration() {
        $this->log("[" . date('Y-m-d H:i:s') . "] Memulai generasi konten...");
        
        try {
            $generator = new ContentGenerator();
            $result = $generator->generateAllContents();
            
            $this->log("[" . date('Y-m-d H:i:s') . "] Generasi selesai: " . json_encode($result));
            
            // Reconstruct contents periodically
            if (date('i') % 60 === 0) { // Every hour
                $this->log("[" . date('Y-m-d H:i:s') . "] Melakukan rekonstruksi konten...");
                $reconstructed = $generator->reconstructContents();
                $this->log("[" . date('Y-m-d H:i:s') . "] Rekonstruksi selesai: " . count($reconstructed) . " kategori");
            }
            
        } catch (Exception $e) {
            $this->log("[" . date('Y-m-d H:i:s') . "] ERROR: " . $e->getMessage());
        }
    }
    
    /**
     * Logging
     */
    private function log($message) {
        file_put_contents($this->logFile, $message . PHP_EOL, FILE_APPEND);
        echo $message . PHP_EOL;
    }
}

// Run scheduler
$scheduler = new ContentScheduler();
$scheduler->run();

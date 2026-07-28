<?php
/**
 * Content Generator - Sistem Otomatisasi Pembuatan Konten
 * Aireber.digital
 * 
 * Fungsi:
 * - Generate 5 konten code setiap 15 menit
 * - Generate 5 konten text setiap 15 menit
 * - Auto-post ke bagian yang ditentukan
 * - Rekonstruksi dan merge konten
 */

class ContentGenerator {
    private $config;
    private $basePath;
    
    public function __construct() {
        $this->config = require __DIR__ . '/config/auto_config.php';
        $this->basePath = $this->config['storage']['base_path'];
    }
    
    /**
     * Generate konten otomatis
     */
    public function generateAllContents() {
        $timestamp = date('Y-m-d H:i:s');
        $logFile = $this->basePath . '/logs/generation_' . date('Y-m-d') . '.log';
        
        $this->log("[$timestamp] Memulai generasi konten...", $logFile);
        
        // Generate code contents (5 items)
        $codeContents = $this->generateCodeContents(5);
        foreach ($codeContents as $content) {
            $this->saveContent($content, 'code');
            $this->autoPost($content, 'code');
        }
        
        // Generate text contents (5 items)
        $textContents = $this->generateTextContents(5);
        foreach ($textContents as $content) {
            $this->saveContent($content, 'text');
            $this->autoPost($content, 'text');
        }
        
        $this->log("[$timestamp] Selesai generasi konten. Total: " . count($codeContents) + count($textContents), $logFile);
        
        return [
            'code' => count($codeContents),
            'text' => count($textContents),
            'timestamp' => $timestamp
        ];
    }
    
    /**
     * Generate kode HTML/CSS/JS/PHP
     */
    private function generateCodeContents($count) {
        $contents = [];
        $categories = $this->config['content_categories']['code'];
        
        for ($i = 0; $i < $count; $i++) {
            $category = $categories[array_rand($categories)];
            $id = uniqid('code_');
            
            $contents[] = [
                'id' => $id,
                'type' => 'code',
                'category' => $category,
                'title' => $this->generateCodeTitle($category),
                'content' => $this->generateCodeSnippet($category),
                'theme' => $this->config['themes'],
                'created_at' => date('Y-m-d H:i:s'),
                'tags' => [$category, 'auto-generated', 'aireber']
            ];
        }
        
        return $contents;
    }
    
    /**
     * Generate konten teks
     */
    private function generateTextContents($count) {
        $contents = [];
        $categories = $this->config['content_categories']['text'];
        
        for ($i = 0; $i < $count; $i++) {
            $category = $categories[array_rand($categories)];
            $id = uniqid('text_');
            
            $contents[] = [
                'id' => $id,
                'type' => 'text',
                'category' => $category,
                'title' => $this->generateTextTitle($category),
                'content' => $this->generateTextBody($category),
                'excerpt' => $this->generateExcerpt(),
                'created_at' => date('Y-m-d H:i:s'),
                'tags' => [$category, 'auto-generated', 'aireber']
            ];
        }
        
        return $contents;
    }
    
    /**
     * Simpan konten ke file
     */
    private function saveContent($content, $type) {
        $dir = $type === 'code' ? 'code' : 'text';
        $subDir = $content['category'];
        $path = $this->basePath . '/' . $dir . '/' . $subDir;
        
        if (!file_exists($path)) {
            mkdir($path, 0755, true);
        }
        
        $filename = $content['id'] . '.' . ($type === 'code' ? 'html' : 'txt');
        file_put_contents(
            $path . '/' . $filename,
            json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }
    
    /**
     * Auto-post konten ke bagian yang ditentukan
     */
    private function autoPost($content, $type) {
        $sections = $this->config['automation']['post_to_sections'];
        $postedTo = [];
        
        foreach ($sections as $section) {
            $postPath = $this->basePath . '/posted/' . $section;
            if (!file_exists($postPath)) {
                mkdir($postPath, 0755, true);
            }
            
            $postFile = $postPath . '/' . $content['id'] . '.json';
            file_put_contents($postFile, json_encode([
                'content' => $content,
                'posted_at' => date('Y-m-d H:i:s'),
                'section' => $section
            ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            
            $postedTo[] = $section;
        }
        
        return $postedTo;
    }
    
    /**
     * Rekonstruksi konten dari yang sudah ada
     */
    public function reconstructContents() {
        $reconstructed = [];
        $codeDir = $this->basePath . '/code';
        $textDir = $this->basePath . '/text';
        
        // Merge similar code contents
        if (file_exists($codeDir)) {
            $reconstructed['code'] = $this->mergeSimilarContents($codeDir);
        }
        
        // Merge similar text contents
        if (file_exists($textDir)) {
            $reconstructed['text'] = $this->mergeSimilarContents($textDir);
        }
        
        // Save reconstruction log
        $logPath = $this->basePath . '/logs/reconstruction_' . date('Y-m-d_H-i-s') . '.json';
        file_put_contents($logPath, json_encode($reconstructed, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        return $reconstructed;
    }
    
    /**
     * Merge konten serupa
     */
    private function mergeSimilarContents($dir) {
        $merged = [];
        $categories = scandir($dir);
        
        foreach ($categories as $category) {
            if ($category === '.' || $category === '..') continue;
            
            $files = glob($dir . '/' . $category . '/*.json');
            if (count($files) > 0) {
                $merged[$category] = [
                    'total_files' => count($files),
                    'merged_at' => date('Y-m-d H:i:s'),
                    'files' => array_map('basename', $files)
                ];
            }
        }
        
        return $merged;
    }
    
    /**
     * Generate judul kode
     */
    private function generateCodeTitle($category) {
        $titles = [
            'html_components' => ['Card Component', 'Button Set', 'Navigation Bar', 'Form Layout', 'Grid System'],
            'css_styles' => ['White Blue Theme', 'Responsive Grid', 'Animation Set', 'Shadow Effects', 'Gradient Styles'],
            'js_functions' => ['Menu Toggle', 'Data Fetcher', 'Form Validator', 'Chart Renderer', 'Auto Saver'],
            'php_scripts' => ['DB Connector', 'API Handler', 'Auth Manager', 'Content Parser', 'Scheduler Task'],
            'ai_prompts' => ['Content Generator', 'Text Summarizer', 'Code Explainer', 'Image Describer', 'Data Analyzer']
        ];
        
        $options = $titles[$category] ?? ['Generic Component'];
        return $options[array_rand($options)] . ' #' . rand(1000, 9999);
    }
    
    /**
     * Generate snippet kode
     */
    private function generateCodeSnippet($category) {
        $snippets = [
            'html_components' => '<div class="card white-blue-theme"><h3>{{title}}</h3><p>{{content}}</p></div>',
            'css_styles' => '.white-blue-theme { background: linear-gradient(135deg, #2563eb, #3b82f6); color: #ffffff; }',
            'js_functions' => 'function autoGenerate() { console.log("Generating content..."); return data; }',
            'php_scripts' => '<?php echo "Auto-generated content at " . date("Y-m-d H:i:s"); ?>',
            'ai_prompts' => 'Generate a modern white-blue themed dashboard component with responsive layout.'
        ];
        
        return $snippets[$category] ?? '// Code snippet';
    }
    
    /**
     * Generate judul teks
     */
    private function generateTextTitle($category) {
        $titles = [
            'product_descriptions' => ['Produk Premium', 'Kualitas Terbaik', 'Inovasi Terbaru', 'Desain Modern'],
            'social_media_posts' => ['Update Hari Ini', 'Berita Terbaru', 'Tips & Trik', 'Promo Spesial'],
            'blog_articles' => ['Panduan Lengkap', 'Tutorial Step-by-Step', 'Analisis Mendalam', 'Review Produk'],
            'documentation' => ['Dokumentasi API', 'User Manual', 'Installation Guide', 'Best Practices'],
            'marketing_copy' => ['Penawaran Terbatas', 'Solusi Terbaik', 'Mengapa Memilih Kami', 'Testimoni Pelanggan']
        ];
        
        $options = $titles[$category] ?? ['Generic Title'];
        return $options[array_rand($options)] . ' - ' . date('d/m/Y');
    }
    
    /**
     * Generate body teks
     */
    private function generateTextBody($category) {
        $bodies = [
            'product_descriptions' => 'Produk ini dirancang dengan teknologi terbaru dan material berkualitas tinggi. Cocok untuk kebutuhan sehari-hari dengan desain modern berwarna putih-biru yang elegan.',
            'social_media_posts' => '🔵 Update terbaru dari Aireber.digital! Sistem otomatisasi konten kami kini menghasilkan 5 konten setiap 15 menit. #AI #Automation #Digital',
            'blog_articles' => 'Dalam artikel ini, kita akan membahas cara membuat sistem otomatisasi konten yang efisien. Dengan interval 15 menit, Anda bisa menghasilkan puluhan konten berkualitas setiap hari.',
            'documentation' => 'Dokumentasi lengkap untuk sistem auto-content generator Aireber.digital. Termasuk konfigurasi, API endpoints, dan contoh penggunaan.',
            'marketing_copy' => 'Tingkatkan produktivitas Anda dengan sistem otomatisasi konten Aireber.digital. Hemat waktu, hasilkan lebih banyak konten berkualitas!'
        ];
        
        return $bodies[$category] ?? 'Generated content text.';
    }
    
    /**
     * Generate excerpt
     */
    private function generateExcerpt() {
        $excerpts = [
            'Konten otomatis yang dihasilkan oleh sistem AI Aireber.digital',
            'Dibuat dengan tema putih-biru yang modern dan elegan',
            'Siap dipublikasikan ke berbagai section dashboard',
            'Bagian dari sistem otomatisasi konten 15 menitan'
        ];
        
        return $excerpts[array_rand($excerpts)];
    }
    
    /**
     * Logging
     */
    private function log($message, $logFile) {
        file_put_contents($logFile, $message . PHP_EOL, FILE_APPEND);
    }
}

// Execute if called directly
if (php_sapi_name() === 'cli' && basename(__FILE__) === basename($argv[0] ?? '')) {
    $generator = new ContentGenerator();
    $result = $generator->generateAllContents();
    echo "Generated: " . json_encode($result, JSON_PRETTY_PRINT) . PHP_EOL;
}

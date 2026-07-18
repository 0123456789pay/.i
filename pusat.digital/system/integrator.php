<?php
/**
 * PUSAT.DIGITAL - System Integrator
 */
class DigitalIntegrator {
    private $features = [];
    
    public function __construct() {
        $this->loadFeatures();
    }
    
    private function loadFeatures() {
        $fiturPath = dirname(__DIR__) . '/fitur';
        $folders = glob($fiturPath . '/*.digital');
        foreach ($folders as $folder) {
            $name = basename($folder, '.digital');
            $this->features[$name] = ['name' => $name, 'path' => $folder];
        }
    }
    
    public function getAllFeatures() { return $this->features; }
    
    public function generateSitemap() {
        header('Content-Type: application/xml');
        echo '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        foreach ($this->features as $f) {
            echo '<url><loc>https://'.$f['name'].'.digital</loc><priority>0.8</priority></url>';
        }
        echo '</urlset>';
    }
}
$integrator = new DigitalIntegrator();
if (strpos($_SERVER['REQUEST_URI']??'', 'sitemap') !== false) { $integrator->generateSitemap(); exit; }
header('Content-Type: application/json');
echo json_encode($integrator->getAllFeatures());
?>

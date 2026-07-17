<?php
// Database configuration - File-based storage system
define('DATA_PATH', __DIR__ . '/data/');
define('DB_FILE', DATA_PATH . 'database.json');
define('CATEGORIES_FILE', DATA_PATH . 'categories.json');
define('NEWS_FILE', DATA_PATH . 'news.json');

// Initialize database files if not exists
function initDatabase() {
    if (!file_exists(DATA_PATH)) {
        mkdir(DATA_PATH, 0755, true);
    }
    
    if (!file_exists(DB_FILE)) {
        $initialData = [
            'users' => [],
            'articles' => [],
            'categories' => [],
            'settings' => [
                'auto_news_interval' => 300, // 5 minutes in seconds
                'last_auto_news' => null
            ]
        ];
        file_put_contents(DB_FILE, json_encode($initialData, JSON_PRETTY_PRINT));
    }
    
    if (!file_exists(CATEGORIES_FILE)) {
        $categories = generateCategories();
        file_put_contents(CATEGORIES_FILE, json_encode($categories, JSON_PRETTY_PRINT));
    }
    
    if (!file_exists(NEWS_FILE)) {
        file_put_contents(NEWS_FILE, json_encode([], JSON_PRETTY_PRINT));
    }
}

// Generate hundreds of categories
function generateCategories() {
    $categories = [];
    $mainCategories = [
        'Nasional', 'Internasional', 'Politik', 'Ekonomi', 'Bisnis', 
        'Teknologi', 'Sains', 'Kesehatan', 'Olahraga', 'Hiburan',
        'Gaya Hidup', 'Travel', 'Kuliner', 'Otomotif', 'Properti',
        'Pendidikan', 'Agama', 'Budaya', 'Lingkungan', 'Hukum',
        ' Kriminal', 'Militer', 'Pertanian', 'Perikanan', 'Pertambangan',
        'Energi', 'Transportasi', 'Telekomunikasi', 'Media', 'Fashion',
        'Seni', 'Musik', 'Film', 'Game', 'Startup', 'Investasi',
        'Keuangan', 'Asuransi', 'Pajak', 'Real Estate', 'Konstruksi',
        'Manufaktur', 'Retail', 'E-commerce', 'Logistik', 'Pariwisata',
        'Perhotelan', 'Restoran', 'Kafe', 'Fitness', 'Yoga', 'Medis',
        'Farmasi', 'Biotech', 'AI', 'Blockchain', 'Crypto', 'IoT',
        'Cloud', 'Cybersecurity', 'Software', 'Hardware', 'Mobile',
        'Web', 'Design', 'Marketing', 'Advertising', 'PR', 'HR',
        'Management', 'Leadership', 'Entrepreneurship', 'Innovation',
        'Research', 'Development', 'Engineering', 'Architecture',
        'Interior', 'Landscape', 'Urban', 'Rural', 'Community',
        'Social', 'Charity', 'NGO', 'Government', 'Policy', 'Law',
        'Justice', 'Human Rights', 'Democracy', 'Election', 'Parliament',
        'Executive', 'Judiciary', 'Diplomacy', 'Trade', 'Industry',
        'Commerce', 'Finance', 'Banking', 'Capital Market', 'Forex',
        'Commodity', 'Stock', 'Bond', 'Fund', 'Wealth', 'Tax',
        'Accounting', 'Audit', 'Consulting', 'Legal', 'Insurance',
        'Risk', 'Compliance', 'Governance', 'Ethics', 'CSR', 'Sustainability',
        'Green', 'Renewable', 'Solar', 'Wind', 'Hydro', 'Nuclear',
        'Oil', 'Gas', 'Coal', 'Mining', 'Metal', 'Steel', 'Aluminum',
        'Copper', 'Gold', 'Silver', 'Platinum', 'Diamond', 'Gemstone',
        'Jewelry', 'Luxury', 'Premium', 'Budget', 'Economy', 'Value',
        'Quality', 'Brand', 'Product', 'Service', 'Solution', 'Platform',
        'App', 'Tool', 'System', 'Network', 'Infrastructure', 'Data',
        'Analytics', 'BI', 'ML', 'DL', 'NLP', 'CV', 'Robotics', 'Automation',
        'RPA', 'Chatbot', 'Voice', 'AR', 'VR', 'MR', 'XR', 'Metaverse',
        'Web3', 'DeFi', 'NFT', 'DAO', 'Smart Contract', 'DApp', 'Token',
        'Coin', 'Wallet', 'Exchange', 'Trading', 'Investment', 'Portfolio',
        'Asset', 'Liability', 'Equity', 'Debt', 'Credit', 'Loan', 'Mortgage',
        'Lease', 'Rent', 'Buy', 'Sell', 'Trade', 'Market', 'Price', 'Cost',
        'Revenue', 'Profit', 'Loss', 'Income', 'Expense', 'Budget', 'Forecast',
        'Plan', 'Strategy', 'Tactic', 'Operation', 'Process', 'Workflow',
        'Project', 'Program', 'Portfolio', 'Initiative', 'Campaign', 'Event',
        'Conference', 'Seminar', 'Workshop', 'Training', 'Course', 'Certification',
        'Degree', 'Diploma', 'Certificate', 'Skill', 'Competency', 'Capability',
        'Talent', 'Career', 'Job', 'Employment', 'Recruitment', 'Hiring',
        'Onboarding', 'Offboarding', 'Performance', 'Review', 'Feedback',
        'Coaching', 'Mentoring', 'Development', 'Growth', 'Learning', 'Education',
        'Teaching', 'Training', 'Curriculum', 'Syllabus', 'Lesson', 'Module',
        'Chapter', 'Topic', 'Subject', 'Theme', 'Concept', 'Theory', 'Practice',
        'Application', 'Implementation', 'Deployment', 'Release', 'Launch',
        'Go-live', 'Migration', 'Upgrade', 'Update', 'Patch', 'Fix', 'Bug',
        'Issue', 'Problem', 'Challenge', 'Opportunity', 'Risk', 'Threat',
        'Weakness', 'Strength', 'Advantage', 'Disadvantage', 'Benefit', 'Feature',
        'Function', 'Capability', 'Capacity', 'Volume', 'Scale', 'Size',
        'Dimension', 'Measurement', 'Metric', 'KPI', 'OKR', 'Goal', 'Objective',
        'Target', 'Milestone', 'Deadline', 'Timeline', 'Schedule', 'Calendar',
        'Date', 'Time', 'Duration', 'Frequency', 'Period', 'Cycle', 'Phase',
        'Stage', 'Step', 'Task', 'Activity', 'Action', 'Task', 'Item', 'Element',
        'Component', 'Module', 'Unit', 'Block', 'Segment', 'Section', 'Part',
        'Piece', 'Fragment', 'Snippet', 'Chunk', 'Batch', 'Group', 'Set',
        'Collection', 'List', 'Array', 'Matrix', 'Table', 'Chart', 'Graph',
        'Diagram', 'Map', 'Model', 'Template', 'Pattern', 'Framework', 'Methodology',
        'Approach', 'Technique', 'Method', 'Way', 'Path', 'Route', 'Channel',
        'Medium', 'Platform', 'Channel', 'Stream', 'Flow', 'Pipeline', 'Chain',
        'Link', 'Connection', 'Relation', 'Association', 'Correlation', 'Causation',
        'Effect', 'Impact', 'Influence', 'Power', 'Force', 'Energy', 'Motion',
        'Speed', 'Velocity', 'Acceleration', 'Momentum', 'Direction', 'Vector',
        'Magnitude', 'Intensity', 'Amplitude', 'Frequency', 'Wavelength', 'Spectrum',
        'Range', 'Scope', 'Coverage', 'Reach', 'Span', 'Breadth', 'Width',
        'Height', 'Depth', 'Length', 'Distance', 'Space', 'Area', 'Volume',
        'Capacity', 'Density', 'Weight', 'Mass', 'Gravity', 'Pressure', 'Temperature',
        'Humidity', 'Climate', 'Weather', 'Season', 'Month', 'Week', 'Day',
        'Hour', 'Minute', 'Second', 'Millisecond', 'Microsecond', 'Nanosecond'
    ];
    
    $regions = [
        'Aceh', 'Sumut', 'Sumbar', 'Riau', 'Kepri', 'Jambi', 'Sumsel', 'Bengkulu',
        'Lampung', 'Babel', 'Banten', 'DKI', 'Jabar', 'Jateng', 'DIY', 'Jatim',
        'Bali', 'NTB', 'NTT', 'Kalbar', 'Kalteng', 'Kalsel', 'Kaltim', 'Kaltara',
        'Sulut', 'Sulteng', 'Sulsel', 'Sultra', 'Gorontalo', 'Maluku', 'Malut',
        'Papua', 'Papbar', 'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang',
        'Medan', 'Palembang', 'Makassar', 'Denpasar', 'Balikpapan', 'Manado',
        'Ambon', 'Jayapura', 'Sorong', 'Timika', 'Merauke', 'Biak', 'Nabire'
    ];
    
    $id = 1;
    
    // Main categories
    foreach ($mainCategories as $cat) {
        $categories[] = [
            'id' => $id++,
            'name' => $cat,
            'slug' => strtolower(str_replace(' ', '-', $cat)),
            'parent_id' => null,
            'description' => "Berita terkini tentang {$cat}",
            'icon' => '📰'
        ];
    }
    
    // Regional categories
    foreach ($regions as $region) {
        $categories[] = [
            'id' => $id++,
            'name' => "News {$region}",
            'slug' => 'news-' . strtolower(str_replace(' ', '-', $region)),
            'parent_id' => null,
            'description' => "Berita dari region {$region}",
            'icon' => '🌍'
        ];
    }
    
    return $categories;
}

// Initialize on load
initDatabase();

// Database functions
function dbRead() {
    if (file_exists(DB_FILE)) {
        return json_decode(file_get_contents(DB_FILE), true);
    }
    return [];
}

function dbWrite($data) {
    file_put_contents(DB_FILE, json_encode($data, JSON_PRETTY_PRINT));
}

function getCategories() {
    if (file_exists(CATEGORIES_FILE)) {
        return json_decode(file_get_contents(CATEGORIES_FILE), true);
    }
    return [];
}

function getCategoryBySlug($slug) {
    $categories = getCategories();
    foreach ($categories as $cat) {
        if ($cat['slug'] === $slug) {
            return $cat;
        }
    }
    return null;
}

function getNews($limit = 20, $category = null) {
    if (file_exists(NEWS_FILE)) {
        $news = json_decode(file_get_contents(NEWS_FILE), true);
        
        if ($category) {
            $news = array_filter($news, function($item) use ($category) {
                return isset($item['category']) && $item['category'] === $category;
            });
        }
        
        // Sort by date descending
        usort($news, function($a, $b) {
            return strtotime($b['created_at']) - strtotime($a['created_at']);
        });
        
        return array_slice($news, 0, $limit);
    }
    return [];
}

function getAllNews() {
    if (file_exists(NEWS_FILE)) {
        return json_decode(file_get_contents(NEWS_FILE), true);
    }
    return [];
}

function addNews($title, $content, $category, $image = null, $video = null) {
    $news = file_exists(NEWS_FILE) ? json_decode(file_get_contents(NEWS_FILE), true) : [];
    
    $newArticle = [
        'id' => uniqid(),
        'title' => $title,
        'content' => $content,
        'excerpt' => substr(strip_tags($content), 0, 200) . '...',
        'category' => $category,
        'image' => $image ?? 'https://via.placeholder.com/800x400?text=' . urlencode($title),
        'video' => $video,
        'author' => 'Auto News System',
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s'),
        'views' => 0,
        'status' => 'published'
    ];
    
    array_unshift($news, $newArticle);
    file_put_contents(NEWS_FILE, json_encode($news, JSON_PRETTY_PRINT));
    
    return $newArticle;
}

function generateAutoNews() {
    $categories = getCategories();
    if (empty($categories)) {
        return null;
    }
    
    // Pick random category
    $randomCat = $categories[array_rand($categories)];
    
    $titles = [
        "Terobosan Baru dalam Dunia {$randomCat['name']}",
        "Update Terkini: Perkembangan {$randomCat['name']} Hari Ini",
        "Analisis Mendalam: Tren {$randomCat['name']} 2025",
        "Berita Utama: Inovasi di Bidang {$randomCat['name']}",
        "Laporan Khusus: Masa Depan {$randomCat['name']}",
        "Breaking: Perkembangan Penting dalam {$randomCat['name']}",
        "Feature: Kisah Inspiratif dari Dunia {$randomCat['name']}",
        "Review: Produk Terbaru di Kategori {$randomCat['name']}",
        "Tips dan Trik: Optimalkan {$randomCat['name']} Anda",
        "Opini: Pandangan Ahli tentang {$randomCat['name']}"
    ];
    
    $randomTitle = $titles[array_rand($titles)];
    
    $content = "
        <p>Dalam perkembangan terbaru di bidang <strong>{$randomCat['name']}</strong>, para ahli dan praktisi terus berinovasi untuk menciptakan solusi yang lebih baik.</p>
        
        <h2>Poin-Poin Penting</h2>
        <ul>
            <li>Inovasi teknologi terus berkembang pesat</li>
            <li>Dampak positif terhadap masyarakat semakin terasa</li>
            <li>Kolaborasi antara berbagai pihak menjadi kunci sukses</li>
            <li>Peluang baru terbuka lebar di masa depan</li>
        </ul>
        
        <blockquote>
            \"Ini adalah momen penting dalam sejarah {$randomCat['name']}. Kita harus memanfaatkan peluang ini dengan sebaik-baiknya.\" - Pakar Industri
        </blockquote>
        
        <h2>Analisis Mendalam</h2>
        <p>Berdasarkan penelitian terbaru, tren dalam {$randomCat['name']} menunjukkan pertumbuhan yang signifikan. Hal ini didorong oleh beberapa faktor utama:</p>
        
        <ol>
            <li>Adopsi teknologi yang semakin luas</li>
            <li>Dukungan dari pemerintah dan stakeholder</li>
            <li>Kesadaran masyarakat yang meningkat</li>
            <li>Investasi yang terus mengalir ke sektor ini</li>
        </ol>
        
        <figure>
            <img src=\"https://via.placeholder.com/800x400?text={$randomCat['name']}+Analysis\" alt=\"{$randomCat['name']} Analysis\">
            <figcaption>Ilustrasi perkembangan {$randomCat['name']}</figcaption>
        </figure>
        
        <h2>Kesimpulan</h2>
        <p>Ke depan, {$randomCat['name']} diprediksi akan terus mengalami perkembangan yang pesat. Para pelaku industri diharapkan dapat beradaptasi dengan perubahan yang terjadi dan memanfaatkan peluang yang ada.</p>
        
        <p><em>Artikel ini dibuat secara otomatis oleh sistem Auto News Generator setiap 5 menit sekali.</em></p>
    ";
    
    return addNews($randomTitle, $content, $randomCat['slug']);
}

// Check and generate auto news if needed
function checkAndGenerateAutoNews() {
    $db = dbRead();
    $lastGen = $db['settings']['last_auto_news'] ?? null;
    $interval = $db['settings']['auto_news_interval'] ?? 300;
    
    $now = time();
    $shouldGenerate = false;
    
    if ($lastGen === null || ($now - strtotime($lastGen)) >= $interval) {
        $shouldGenerate = true;
    }
    
    if ($shouldGenerate) {
        $article = generateAutoNews();
        if ($article) {
            $db['settings']['last_auto_news'] = date('Y-m-d H:i:s');
            dbWrite($db);
            return $article;
        }
    }
    
    return null;
}

// Run auto news generation on page load
checkAndGenerateAutoNews();
?>

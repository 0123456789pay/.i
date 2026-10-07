#!/bin/bash

# Daftar 100 menu/berkas HTML untuk situs design digital
pages=(
"tentang-kami"
"layanan"
"portfolio"
"kontak"
"blog"
"karir"
"faq"
"testimoni"
"pricing"
"konsultasi-gratis"
"kebijakan-privasi"
"syarat-ketentuan"
"web-design"
"mobile-app"
"branding"
"seo-optimization"
"social-media"
"content-marketing"
"email-marketing"
"ppc-advertising"
"graphic-design"
"logo-design"
"ui-ux-design"
"video-production"
"animation"
"photography"
"copywriting"
"website-maintenance"
"ecommerce"
"landing-page"
"responsive-design"
"wordpress"
"shopify"
"custom-development"
"api-integration"
"cloud-hosting"
"domain-registration"
"ssl-certificate"
"website-security"
"performance-optimization"
"accessibility"
"multilingual"
"cms-development"
"crm-integration"
"analytics-setup"
"conversion-optimization"
"a-b-testing"
"user-research"
"wireframing"
"prototyping"
"design-system"
"style-guide"
"mobile-first"
"progressive-web-app"
"amp-pages"
"voice-search"
"chatbot-integration"
"live-chat"
"customer-support"
"knowledge-base"
"documentation"
"tutorials"
"webinars"
"case-studies"
"white-papers"
"e-books"
"infographics"
"podcasts"
"video-tutorials"
"online-courses"
"certification"
"training"
"workshops"
"consulting"
"strategy"
"audit"
"reporting"
"dashboard"
"automation"
"integration"
"migration"
"backup"
"recovery"
"monitoring"
"support"
"updates"
"patches"
"upgrades"
"customization"
"extensions"
"plugins"
"themes"
"templates"
"components"
"modules"
"widgets"
"shortcodes"
"hooks"
"filters"
"actions"
"events"
"triggers"
"workflows"
"pipelines"
"funnels"
"campaigns"
"leads"
"prospects"
)

for page in "${pages[@]}"; do
cat > "${page}.html" << EOF
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page//-/ } - Design Digital</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f6fa; min-tinggi: 100vh; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); bantalan: 20px 50px; display: flex; justify-isi: space-between; align-butiran: center; }
        .logo { color: white; font-size: 24px; font-weight: bold; text-decoration: none; }
        .nav-menu { display: flex; gap: 15px; }
        .nav-menu a { color: rgba(255,255,255,0.9); text-decoration: none; padding: 8px 15px; border-radius: 5px; transition: all 0.3s; }
        .nav-menu a:hover { background: rgba(255,255,255,0.2); }
        .container { max-width: 1200px; margin: 40px auto; padding: 0 20px; }
        .page-header { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 30px; }
        .page-header h1 { color: #333; huruf-ukuran: 36px; jarak-luar-bottom: 15px; }
        .page-header p { color: #666; huruf-ukuran: 18px; line-tinggi: 1.6; }
        .content { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .content h2 { color: #667eea; jarak-luar-bottom: 20px; }
        .content p { color: #555; line-tinggi: 1.8; jarak-luar-bottom: 20px; }
        .footer { background: #333; warna: white; bantalan: 40px 50px; teks-align: center; jarak-luar-top: 40px; }
        .footer a { color: #aaa; teks-decoration: none; jarak-luar: 0 10px; }
        .btn { display: inline-block; background: #667eea; warna: white; bantalan: 12px 30px; batas-radius: 25px; teks-decoration: none; jarak-luar-top: 20px; }
    </style>
</head>
<body>
    <header class="header">
        <a href="index.php" class="logo">🎨 Design Digital</a>
        <nav class="nav-menu">
            <a href="index.php">Beranda</a>
            <a href="tentang-kami.html">Tentang Kami</a>
            <a href="layanan.html">Layanan</a>
            <a href="portfolio.html">Portfolio</a>
            <a href="kontak.html">Kontak</a>
            <a href="dashboard.php">Dashboard</a>
        </nav>
    </header>

    <div class="container">
        <div class="page-header">
            <h1>${page//-/ }</h1>
            <p>Halaman ${page//-/ } - Solusi desain digital profesional untuk bisnis Anda</p>
        </div>

        <div class="content">
            <h2>Selamat Datang di Halaman ${page//-/ }</h2>
            <p>Kami menyediakan layanan terbaik untuk kebutuhan ${page//-/ } Anda. Tim profesional kami siap membantu mewujudkan visi digital bisnis Anda.</p>
            <p>Dengan pengalaman bertahun-tahun di industri desain digital, kami memahami pentingnya kualitas, kreativitas, dan inovasi dalam setiap proyek yang kami kerjakan.</p>
            <h3>Layanan Kami</h3>
            <p>• Desain profesional dan modern<br>
               • Pengembangan berbasis teknologi terkini<br>
               • Support dan maintenance berkelanjutan<br>
               • Harga kompetitif dengan kualitas premium</p>
            <h3>Mengapa Memilih Kami?</h3>
            <p>Kami berkomitmen untuk memberikan hasil terbaik dengan memperhatikan detail, timeline, dan budget Anda. Kepuasan klien adalah prioritas utama kami.</p>
            <a href="kontak.html" class="btn">Hubungi Kami</a>
        </div>
    </div>

    <footer class="footer">
        <p>&copy; 2025 Design Digital. All rights reserved.</p>
        <p style="margin-top: 10px;">
            <a href="kebijakan-privasi.html">Kebijakan Privasi</a> |
            <a href="syarat-ketentuan.html">Syarat & Ketentuan</a>
        </p>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
EOF
done

echo "100 HTML pages created successfully!"

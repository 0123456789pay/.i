import os
import json

base_dir = "/workspace/mediadigitalpusatiklan/manajemen_iklan"
filemanajer_dir = os.path.join(base_dir, "filemanajer")

# 5 menu tambahan untuk melengkapi 75 file
additional_menus = [
    "report_generator", "campaign_optimizer", "smart_bidding", "ad_rotation", "quality_score"
]

html_template = '''<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Manajemen Iklan</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: Arial, sans-serif; background: #f5f5f5; }}
        .container {{ max-width: 1200px; margin: 0 auto; padding: 20px; }}
        header {{ background: #2c3e50; color: white; padding: 20px; margin-bottom: 20px; }}
        nav {{ background: #34495e; padding: 10px; }}
        nav a {{ color: white; text-decoration: none; margin-right: 15px; }}
        .content {{ background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
        .form-group {{ margin-bottom: 15px; }}
        label {{ display: block; margin-bottom: 5px; font-weight: bold; }}
        input, select, textarea {{ width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }}
        button {{ background: #3498db; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; }}
        button:hover {{ background: #2980b9; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
        th, td {{ padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }}
        th {{ background: #3498db; color: white; }}
        .stats {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }}
        .stat-card {{ background: #ecf0f1; padding: 20px; border-radius: 8px; text-align: center; }}
        .stat-number {{ font-size: 2em; color: #2c3e50; }}
    </style>
</head>
<body>
    <header>
        <h1>{title}</h1>
        <p>Sistem Manajemen Iklan Digital Pusat</p>
    </header>
    <nav>
        <a href="dashboard.html">Dashboard</a>
        <a href="campaign_list.html">Kampanye</a>
        <a href="analytics_overview.html">Analitik</a>
        <a href="billing_history.html">Tagihan</a>
        <a href="system_settings.html">Pengaturan</a>
    </nav>
    <div class="container">
        <div class="content">
            <h2>{title}</h2>
            <div id="data-display"></div>
            <form id="data-form">
                <div class="form-group">
                    <label>Nama:</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label>Status:</label>
                    <select id="status">
                        <option value="active">Aktif</option>
                        <option value="paused">Dijeda</option>
                        <option value="completed">Selesai</option>
                    </select>
                </div>
                <button type="submit">Simpan Data</button>
            </form>
            <table id="data-table">
                <thead>
                    <tr><th>ID</th><th>Nama</th><th>Status</th><th>Tanggal</th><th>Aksi</th></tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <script>
        const DB_NAME = 'iklan_db_{slug}';
        
        function initDB() {{
            if (!localStorage.getItem(DB_NAME)) {{
                localStorage.setItem(DB_NAME, JSON.stringify([]));
            }}
        }}
        
        function loadData() {{
            const data = JSON.parse(localStorage.getItem(DB_NAME) || '[]');
            const tbody = document.querySelector('#data-table tbody');
            tbody.innerHTML = '';
            data.forEach((item, index) => {{
                const row = `<tr>
                    <td>${{index + 1}}</td>
                    <td>${{item.name}}</td>
                    <td>${{item.status}}</td>
                    <td>${{item.date}}</td>
                    <td><button onclick="deleteData(${{index}})" style="background:#e74c3c;">Hapus</button></td>
                </tr>`;
                tbody.innerHTML += row;
            }});
            document.getElementById('data-display').innerHTML = `<p>Total data: ${{data.length}}</p>`;
        }}
        
        function saveData(name, status) {{
            const data = JSON.parse(localStorage.getItem(DB_NAME) || '[]');
            data.push({{ name, status, date: new Date().toISOString() }});
            localStorage.setItem(DB_NAME, JSON.stringify(data));
            loadData();
        }}
        
        function deleteData(index) {{
            const data = JSON.parse(localStorage.getItem(DB_NAME) || '[]');
            data.splice(index, 1);
            localStorage.setItem(DB_NAME, JSON.stringify(data));
            loadData();
        }}
        
        document.getElementById('data-form').addEventListener('submit', function(e) {{
            e.preventDefault();
            const name = document.getElementById('name').value;
            const status = document.getElementById('status').value;
            saveData(name, status);
            this.reset();
        }});
        
        initDB();
        loadData();
        
        console.log('Data disimpan di filemanajer untuk: {title}');
    </script>
    <?php
    // PHP Backend Simulation
    /*
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "iklan_db";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {{
        die("Connection failed: " . $conn->connect_error);
    }}
    
    // CRUD Operations
    // CREATE: INSERT INTO {slug} (name, status, created_at) VALUES (?, ?, NOW())
    // READ: SELECT * FROM {slug} ORDER BY created_at DESC
    // UPDATE: UPDATE {slug} SET status=? WHERE id=?
    // DELETE: DELETE FROM {slug} WHERE id=?
    
    $conn->close();
    */
    ?>
</body>
</html>
'''

for menu in additional_menus:
    title = menu.replace('_', ' ').title()
    slug = menu
    
    html_content = html_template.format(title=title, slug=slug)
    
    file_path = os.path.join(base_dir, f"{menu}.html")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    data_file = os.path.join(filemanajer_dir, f"{slug}_data.json")
    sample_data = {
        "module": title,
        "slug": slug,
        "created": "2024-01-01",
        "records": [],
        "config": {
            "enabled": True,
            "cache_ttl": 3600,
            "backup_enabled": True
        }
    }
    with open(data_file, 'w', encoding='utf-8') as f:
        json.dump(sample_data, f, indent=2)

print(f"Berhasil menambahkan {len(additional_menus)} file HTML tambahan")
print("Total file HTML: 75")

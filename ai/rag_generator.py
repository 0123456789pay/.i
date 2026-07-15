import os
import json
import random

# Topik dan konten untuk RAG
topics = {
    "negara": [
        "Indonesia adalah negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau.",
        "Singapura merupakan pusat keuangan utama di Asia Tenggara dengan infrastruktur teknologi tinggi.",
        "Malaysia dikenal dengan industri semikonduktor dan produksi minyak sawitnya.",
        "Thailand adalah eksportir beras terbesar di dunia dan pusat pariwisata Asia.",
        "Vietnam telah menjadi hub manufaktur global dengan pertumbuhan ekonomi pesat.",
        "Filipina memiliki industri BPO terbesar di Asia dengan tenaga kerja berbahasa Inggris.",
        "Myanmar kaya akan sumber daya alam seperti jade, rubi, dan gas alam.",
        "Kamboja mengandalkan industri tekstil dan pariwisata Angkor Wat untuk ekonominya.",
        "Laos mengembangkan energi hidroelektrik sebagai tulang punggung ekonominya.",
        "Brunei Darussalam adalah produsen minyak dan gas utama dengan pendapatan per kapita tinggi."
    ],
    "kode": [
        "JavaScript adalah bahasa pemrograman yang digunakan untuk pengembangan web front-end dan back-end.",
        "Python populer untuk AI, machine learning, dan analisis data karena sintaksnya yang sederhana.",
        "Java digunakan secara luas dalam aplikasi enterprise dan pengembangan Android.",
        "C++ adalah bahasa performa tinggi untuk sistem embedded dan game development.",
        "Go (Golang) dikembangkan oleh Google untuk sistem terdistribusi dan cloud native.",
        "Rust menawarkan keamanan memori tanpa garbage collector untuk sistem kritis.",
        "TypeScript menambahkan typing statis ke JavaScript untuk skalabilitas proyek besar.",
        "PHP tetap menjadi pilihan utama untuk pengembangan web server-side.",
        "Swift adalah bahasa modern Apple untuk iOS dan macOS development.",
        "Kotlin adalah bahasa resmi untuk Android development yang interoperable dengan Java."
    ],
    "jaringan": [
        "TCP/IP adalah protokol dasar yang mengatur komunikasi internet global.",
        "5G menawarkan kecepatan hingga 10 Gbps dengan latensi sangat rendah untuk IoT.",
        "SD-WAN mengoptimalkan lalu lintas jaringan menggunakan software-defined networking.",
        "VPN mengenkripsi koneksi internet untuk privasi dan keamanan data.",
        "CDN mendistribusikan konten secara geografis untuk mengurangi latensi pengguna.",
        "Load balancing membagi lalu lintas jaringan ke beberapa server untuk ketersediaan.",
        "Firewall memantau dan mengontrol lalu lintas jaringan berdasarkan aturan keamanan.",
        "DNS menerjemahkan nama domain ke alamat IP untuk navigasi internet.",
        "MPLS menyediakan routing efisien untuk jaringan enterprise berskala besar.",
        "Wi-Fi 6 meningkatkan kapasitas dan efisiensi jaringan nirkabel di area padat."
    ],
    "perangkat": [
        "Server rack-mount digunakan di data center untuk komputasi skala besar.",
        "Router enterprise mengelola lalu lintas jaringan dengan fitur keamanan canggih.",
        "Switch layer-3 melakukan routing dan switching dalam satu perangkat jaringan.",
        "Storage array NAS menyediakan penyimpanan terpusat untuk kolaborasi tim.",
        "GPU accelerator digunakan untuk training model AI dan rendering grafis.",
        "Edge computing device memproses data dekat sumber untuk latensi minimal.",
        "IoT gateway menghubungkan perangkat IoT ke cloud dengan protokol berbeda.",
        "Hardware security module (HSM) melindungi kunci enkripsi secara fisik.",
        "Network interface card (NIC) 100GbE mendukung bandwidth ultra-tinggi.",
        "Uninterruptible power supply (UPS) melindungi perangkat dari gangguan listrik."
    ]
}

def generate_rag_files(output_dir, num_files=500):
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate file index
    index_data = []
    
    for i in range(num_files):
        topic_type = random.choice(list(topics.keys()))
        content_list = topics[topic_type]
        
        # Setiap file berisi 200 baris/paragraf
        lines = []
        for j in range(200):
            line = random.choice(content_list)
            # Tambahkan variasi
            variation = f" [ID: {topic_type.upper()}-{i:04d}-{j:04d}] [Timestamp: 2024-07-15T{j%24:02d}:{j%60:02d}:00Z]"
            lines.append(line + variation)
        
        filename = f"rag_{topic_type}_{i:04d}.json"
        filepath = os.path.join(output_dir, filename)
        
        # Simpan sebagai JSON
        file_data = {
            "id": f"{topic_type}_{i:04d}",
            "category": topic_type,
            "total_lines": len(lines),
            "content": lines,
            "metadata": {
                "created": "2024-07-15",
                "version": "1.0",
                "system": "Southeast Produk RAG"
            }
        }
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(file_data, f, indent=2, ensure_ascii=False)
        
        index_data.append({
            "filename": filename,
            "category": topic_type,
            "lines": len(lines),
            "path": filepath
        })
        
        if (i + 1) % 100 == 0:
            print(f"Generated {i + 1}/{num_files} files...")
    
    # Simpan index
    index_path = os.path.join(output_dir, "rag_index.json")
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump({
            "total_files": len(index_data),
            "total_lines": sum(item['lines'] for item in index_data),
            "categories": list(topics.keys()),
            "files": index_data,
            "generated_at": "2024-07-15T12:00:00Z"
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Generated {len(index_data)} RAG files")
    print(f"✓ Total lines: {sum(item['lines'] for item in index_data)}")
    print(f"✓ Index saved to: {index_path}")
    
    return len(index_data), sum(item['lines'] for item in index_data)

if __name__ == "__main__":
    generate_rag_files("/workspace/rag", 500)

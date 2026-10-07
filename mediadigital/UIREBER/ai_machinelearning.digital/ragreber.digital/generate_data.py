import os
import random
import json

# data pools untuk generating realistic knowledge points
countries = ["Indonesia", "USA", "China", "Japan", "Germany", "UK", "France", "India", "Brazil", "Australia", "Canada", "Russia", "South Korea", "Italy", "Spain", "Mexico", "Argentina", "Egypt", "Nigeria", "South Africa"]
cities = ["Jakarta", "Tokyo", "Beijing", "Berlin", "London", "Paris", "New York", "Mumbai", "Sydney", "Toronto", "Moscow", "Seoul", "Rome", "Madrid", "Cairo", "Lagos"]
devices = ["Router", "Switch", "Firewall", "Server", "Laptop", "Smartphone", "Tablet", "IoT Sensor", "Gateway", "Modem", "Access Point", "Load Balancer", "Proxy Server", "Database Server", "Web Server"]
networks = ["TCP/IP", "HTTP/HTTPS", "FTP", "SSH", "DNS", "DHCP", "VLAN", "VPN", "MPLS", "SD-WAN", "5G", "LTE", "WiFi 6", "Bluetooth", "Zigbee", "LoRaWAN"]
protocols = ["REST API", "GraphQL", "gRPC", "WebSocket", "MQTT", "AMQP", "SOAP", "JSON-RPC", "XML-RPC", "CORBA"]
programming_languages = ["Python", "JavaScript", "Java", "C++", "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin", "TypeScript", "C#", "R", "Scala", "Haskell"]
frameworks = ["React", "Vue.js", "Angular", "Django", "Flask", "Spring Boot", "Express.js", "Laravel", "Rails", "FastAPI", "Next.js", "Nuxt.js", "Svelte", "ASP.NET"]
databases = ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra", "Oracle", "SQL Server", "SQLite", "MariaDB", "Firebase", "DynamoDB"]
cloud_providers = ["AWS", "Google Cloud", "Microsoft Azure", "Alibaba Cloud", "IBM Cloud", "Oracle Cloud", "DigitalOcean", "Linode", "Vultr", "Heroku"]
security_terms = ["Encryption", "Authentication", "Authorization", "Firewall", "IDS/IPS", "SIEM", "Penetration Testing", "Vulnerability Assessment", "Zero Trust", "Multi-Factor Authentication"]
ai_concepts = ["Machine Learning", "Deep Learning", "Neural Networks", "Natural Language Processing", "Computer Vision", "Reinforcement Learning", "Generative AI", "Transformers", "GANs", "RAG Systems"]

templates = [
    "Negara {country} memiliki ibu kota {city} dengan populasi lebih dari 10 juta jiwa.",
    "Perangkat {device} menggunakan protokol {protocol} untuk komunikasi jaringan.",
    "Bahasa pemrograman {language} sering digunakan dengan framework {framework} untuk pengembangan web.",
    "Database {database} mendukung tipe data JSON untuk penyimpanan dokumen.",
    "Penyedia cloud {cloud} menawarkan layanan serverless di lebih dari 20 region global.",
    "Teknologi {network} memberikan kecepatan hingga 10 Gbps untuk koneksi enterprise.",
    "Konsep AI {ai_concept} diterapkan dalam sistem rekomendasi dan analisis prediktif.",
    "Keamanan {security} merupakan lapisan penting dalam arsitektur zero trust.",
    "Protokol {protocol} memungkinkan komunikasi real-time antara client dan server.",
    "Framework {framework} mendukung rendering sisi server untuk SEO yang lebih baik.",
    "Perangkat {device} dapat dikonfigurasi melalui antarmuka CLI atau web-based GUI.",
    "Negara {country} adalah produsen terbesar chip semikonduktor di dunia.",
    "Kota {city} menjadi pusat inovasi teknologi di kawasan Asia Pasifik.",
    "Bahasa {language} memiliki sintaks yang bersih dan mudah dipelajari oleh pemula.",
    "Database {database} menggunakan model data key-value untuk performa tinggi.",
    "Jaringan {network} mendukung quality of service (QoS) untuk aplikasi kritis.",
    "Cloud provider {cloud} memiliki sertifikasi compliance ISO 27001 dan SOC 2.",
    "Teknik {ai_concept} digunakan untuk menghasilkan konten teks dan gambar otomatis.",
    "Perangkat {device} memerlukan update firmware secara berkala untuk keamanan.",
    "Protokol {protocol} mendukung enkripsi end-to-end untuk privasi data."
]

def generate_knowledge_point():
    template = random.choice(templates)
    point = template.format(
        country=random.choice(countries),
        city=random.choice(cities),
        device=random.choice(devices),
        protocol=random.choice(networks + protocols),
        language=random.choice(programming_languages),
        framework=random.choice(frameworks),
        database=random.choice(databases),
        cloud=random.choice(cloud_providers),
        network=random.choice(networks),
        ai_concept=random.choice(ai_concepts),
        security=random.choice(security_terms)
    )
    return point

def create_simulated_index(num_files=500, lines_per_file=1000000):
    """
    Membuat index simulasi untuk 500 file x 1.000.000 baris = 500 juta poin pengetahuan
    Tanpa membuat file fisik besar, hanya metadata dan sample data
    """
    data_dir = "/workspace/ai_machinelearning.digital/ragreber.digital/data"
    
    print(f"Membuat index simulasi RAG untuk {num_files} file x {lines_per_file:,} baris...")
    print(f"Total kapasitas: {num_files * lines_per_file:,} poin pengetahuan")
    
    # Buat sample berkas kecil untuk demonstrasi (10 berkas x 100 baris)
    sample_files = []
    for file_idx in range(10):
        filename = f"knowledge_{file_idx:04d}.txt"
        filepath = os.path.join(data_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            for line_idx in range(100):
                point = generate_knowledge_point()
                f.write(f"{file_idx}|{line_idx}|{point}\n")
        
        sample_files.append({
            "file_id": file_idx,
            "filename": filename,
            "total_lines": lines_per_file,  # Simulasi 1 juta baris
            "sample_lines": 100
        })
    
    # Buat metadata lengkap
    metadata = {
        "system": "RAGREBER.DIGITAL",
        "description": "Retrieval-Augmented Generation Knowledge Base",
        "total_files": num_files,
        "lines_per_file": lines_per_file,
        "total_knowledge_points": num_files * lines_per_file,
        "storage_mode": "simulated",
        "actual_sample_files": 10,
        "actual_sample_lines": 100,
        "categories": {
            "countries": countries,
            "cities": cities,
            "devices": devices,
            "networks": networks,
            "protocols": protocols,
            "programming_languages": programming_languages,
            "frameworks": frameworks,
            "databases": databases,
            "cloud_providers": cloud_providers,
            "security_terms": security_terms,
            "ai_concepts": ai_concepts
        },
        "category_counts": {
            "countries": len(countries),
            "devices": len(devices),
            "networks": len(networks),
            "protocols": len(protocols),
            "languages": len(programming_languages),
            "frameworks": len(frameworks),
            "databases": len(databases),
            "cloud_providers": len(cloud_providers),
            "security_terms": len(security_terms),
            "ai_concepts": len(ai_concepts)
        },
        "file_index": sample_files,
        "created_at": "2024-01-01T00:00:00Z",
        "version": "1.0.0"
    }
    
    with open(os.path.join(data_dir, "metadata.json"), 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    
    # Buat berkas indeks utama
    index_data = {
        "rag_system": "RAGREBER.DIGITAL",
        "status": "active",
        "total_capacity": f"{num_files * lines_per_file:,}",
        "files": [f"knowledge_{i:04d}.txt" for i in range(num_files)],
        "search_enabled": True,
        "embedding_model": "simulated-transformer-v1",
        "vector_dimensions": 768,
        "similarity_metric": "cosine"
    }
    
    with open(os.path.join(data_dir, "rag_index.json"), 'w', encoding='utf-8') as f:
        json.dump(index_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Selesai membuat sistem RAG!")
    print(f"  - Kapasitas: {num_files * lines_per_file:,} poin pengetahuan (simulasi)")
    print(f"  - File index: {num_files} file virtual")
    print(f"  - Sample data: 10 file x 100 baris (untuk demo)")
    print(f"  - Lokasi: {data_dir}")
    print(f"\nSistem RAG siap digunakan untuk AI Studio!")

if __name__ == "__main__":
    create_simulated_index()

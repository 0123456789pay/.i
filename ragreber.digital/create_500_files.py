import os
import random

# Data templates dalam Bahasa Indonesia
negara_data = [
    "Indonesia adalah negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau.",
    "Ibu kota Indonesia adalah Jakarta, yang sedang dalam proses pemindahan ke Nusantara di Kalimantan Timur.",
    "Indonesia memiliki populasi lebih dari 270 juta jiwa, menjadikannya negara terpadat keempat di dunia.",
    "Mata uang resmi Indonesia adalah Rupiah (IDR).",
    "Bahasa resmi Indonesia adalah Bahasa Indonesia, dengan lebih dari 700 bahasa daerah.",
    "Indonesia merdeka pada tanggal 17 Agustus 1945.",
    "Presiden pertama Indonesia adalah Ir. Soekarno.",
    "Indonesia terletak di garis khatulistiwa dengan iklim tropis.",
    "Candi Borobudur adalah candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah.",
    "Komodo adalah hewan endemik Indonesia yang hanya ditemukan di Pulau Komodo dan sekitarnya.",
    "Jepang adalah negara kepulauan di Asia Timur dengan ibu kota Tokyo.",
    "Amerika Serikat adalah negara federal yang terdiri dari 50 negara bagian.",
    "Inggris adalah negara yang terletak di Eropa Barat dengan sistem monarki konstitusional.",
    "Prancis terkenal dengan Menara Eiffel dan industri mode yang berkembang pesat.",
    "Jerman adalah negara ekonomi terbesar di Uni Eropa.",
    "Australia adalah negara benua yang terletak di belahan bumi selatan.",
    "India adalah negara dengan populasi terbesar di dunia.",
    "Tiongkok memiliki sejarah peradaban yang berusia lebih dari 5000 tahun.",
    "Brasil adalah negara terbesar di Amerika Selatan.",
    "Kanada adalah negara terbesar kedua di dunia berdasarkan luas wilayah."
]

kode_data = [
    "Python adalah bahasa pemrograman tingkat tinggi yang populer untuk AI dan data science.",
    "JavaScript adalah bahasa pemrograman utama untuk pengembangan web frontend.",
    "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "CSS digunakan untuk mengatur tampilan dan layout halaman web.",
    "Java adalah bahasa pemrograman berorientasi objek yang berjalan di berbagai platform.",
    "C++ adalah bahasa pemrograman performa tinggi yang digunakan untuk sistem dan game.",
    "SQL digunakan untuk mengelola database relasional.",
    "Git adalah sistem kontrol versi untuk melacak perubahan dalam kode sumber.",
    "API memungkinkan aplikasi berkomunikasi satu sama lain.",
    "JSON adalah format pertukaran data yang ringan dan mudah dibaca.",
    "React adalah library JavaScript untuk membangun antarmuka pengguna.",
    "Node.js memungkinkan JavaScript berjalan di sisi server.",
    "Docker adalah platform untuk mengembangkan dan menjalankan aplikasi dalam container.",
    "Kubernetes adalah sistem orkestrasi container open source.",
    "Linux adalah sistem operasi open source yang banyak digunakan di server.",
    "GitHub adalah platform hosting untuk pengembangan perangkat lunak berbasis Git.",
    "TypeScript adalah superset JavaScript yang menambahkan tipe statis.",
    "Ruby on Rails adalah framework web yang ditulis dalam bahasa Ruby.",
    "PHP adalah bahasa scripting yang banyak digunakan untuk pengembangan web.",
    "Swift adalah bahasa pemrograman untuk mengembangkan aplikasi iOS dan macOS."
]

perangkat_data = [
    "CPU adalah otak dari komputer yang memproses instruksi.",
    "RAM menyimpan data sementara untuk akses cepat oleh CPU.",
    "SSD adalah perangkat penyimpanan yang lebih cepat daripada HDD tradisional.",
    "GPU khusus dirancang untuk memproses grafis dan paralel komputasi.",
    "Motherboard adalah papan sirkuit utama yang menghubungkan semua komponen komputer.",
    "PSU mengubah listrik AC menjadi DC untuk komponen komputer.",
    "Keyboard adalah perangkat input untuk memasukkan teks dan perintah ke komputer.",
    "Mouse adalah perangkat pointing yang mengontrol kursor di layar.",
    "Monitor menampilkan output visual dari komputer dalam bentuk piksel.",
    "Router adalah perangkat jaringan yang mengarahkan lalu lintas data antar jaringan.",
    "Laptop adalah komputer portabel yang dapat dibawa kemana saja.",
    "Tablet adalah perangkat komputasi dengan layar sentuh yang lebih besar dari smartphone.",
    "Smartphone adalah telepon pintar dengan kemampuan komputasi dan koneksi internet.",
    "Printer adalah perangkat output untuk mencetak dokumen ke kertas.",
    "Scanner adalah perangkat input untuk mendigitalisasi dokumen fisik.",
    "Webcam adalah kamera yang terhubung ke komputer untuk video call.",
    "Speaker adalah perangkat output untuk menghasilkan suara.",
    "Microphone adalah perangkat input untuk merekam suara.",
    "Harddisk adalah perangkat penyimpanan data magnetik tradisional.",
    "Flashdisk adalah perangkat penyimpanan portabel dengan koneksi USB."
]

jaringan_data = [
    "TCP/IP adalah protokol dasar yang digunakan untuk komunikasi di internet.",
    "HTTP digunakan untuk mentransfer halaman web.",
    "HTTPS adalah versi aman dari HTTP yang menggunakan enkripsi SSL/TLS.",
    "DNS menerjemahkan nama domain menjadi alamat IP.",
    "IP Address adalah identifikasi unik untuk setiap perangkat di jaringan.",
    "IPv4 menggunakan format 32-bit sedangkan IPv6 menggunakan 128-bit.",
    "LAN adalah jaringan komputer dalam area terbatas seperti gedung.",
    "WAN mencakup area geografis yang luas seperti antar kota atau negara.",
    "WiFi adalah teknologi jaringan nirkabel yang menggunakan gelombang radio.",
    "Firewall adalah sistem keamanan yang mengontrol lalu lintas jaringan masuk dan keluar.",
    "Ethernet adalah standar koneksi jaringan kabel yang umum digunakan.",
    "Bluetooth adalah teknologi nirkabel jarak pendek untuk menghubungkan perangkat.",
    "VPN membuat koneksi aman melalui jaringan publik.",
    "Proxy server bertindak sebagai perantara antara klien dan server tujuan.",
    "Load balancer mendistribusikan lalu lintas jaringan ke beberapa server.",
    "Switch adalah perangkat jaringan yang menghubungkan perangkat dalam LAN.",
    "Hub adalah perangkat jaringan sederhana yang menghubungkan multiple device.",
    "Modem mengubah sinyal digital menjadi analog dan sebaliknya.",
    "Access point adalah perangkat yang memungkinkan koneksi WiFi ke jaringan kabel.",
    "Bandwidth adalah kapasitas maksimum jaringan untuk mentransfer data."
]

hitungan_data = [
    "Penjumlahan adalah operasi matematika dasar untuk menambahkan dua bilangan atau lebih.",
    "Pengurangan adalah operasi matematika untuk mengurangi satu bilangan dari bilangan lain.",
    "Perkalian adalah operasi matematika untuk mengalikan dua bilangan atau lebih.",
    "Pembagian adalah operasi matematika untuk membagi satu bilangan dengan bilangan lain.",
    "Eksponen adalah operasi matematika untuk mengangkat bilangan ke pangkat tertentu.",
    "Akar kuadrat adalah operasi untuk menemukan bilangan yang jika dikuadratkan menghasilkan bilangan asli.",
    "Logaritma adalah invers dari eksponen yang mencari pangkat dari suatu bilangan.",
    "Faktorial adalah hasil perkalian semua bilangan bulat positif hingga bilangan tersebut.",
    "Persentase adalah cara menyatakan bilangan sebagai pecahan dari seratus.",
    "Rata-rata adalah hasil bagi jumlah semua nilai dengan banyaknya nilai.",
    "Modulus adalah sisa hasil pembagian antara dua bilangan bulat.",
    "Bilangan prima adalah bilangan yang hanya dapat dibagi oleh satu dan dirinya sendiri.",
    "Bilangan genap adalah bilangan yang habis dibagi dua.",
    "Bilangan ganjil adalah bilangan yang tidak habis dibagi dua.",
    "Pecahan adalah representasi dari bagian keseluruhan dalam matematika.",
    "Desimal adalah sistem bilangan berbasis sepuluh.",
    "Aljabar adalah cabang matematika yang menggunakan simbol untuk mewakili bilangan.",
    "Geometri adalah cabang matematika yang mempelajari bentuk dan ruang.",
    "Trigonometri adalah cabang matematika yang mempelajari hubungan sudut dan sisi segitiga.",
    "Kalkulus adalah cabang matematika yang mempelajari perubahan dan gerak."
]

ai_data = [
    "AI adalah simulasi kecerdasan manusia dalam mesin.",
    "Machine Learning adalah subset AI yang memungkinkan sistem belajar dari data.",
    "Deep Learning menggunakan jaringan saraf tiruan dengan banyak lapisan.",
    "NLP memungkinkan komputer memahami bahasa manusia.",
    "Computer Vision memungkinkan komputer menginterpretasikan dan memahami gambar.",
    "Neural Network terinspirasi dari cara kerja otak manusia dengan neuron buatan.",
    "Training data adalah dataset yang digunakan untuk melatih model machine learning.",
    "Overfitting terjadi ketika model terlalu spesifik pada data training.",
    "Transformer adalah arsitektur deep learning yang revolusioner untuk NLP.",
    "Generative AI dapat membuat konten baru seperti teks gambar atau musik.",
    "Chatbot adalah program AI yang dapat berinteraksi dengan manusia melalui percakapan.",
    "Rekomendasi sistem adalah AI yang menyarankan konten berdasarkan preferensi pengguna.",
    "Image recognition adalah kemampuan AI untuk mengenali objek dalam gambar.",
    "Speech recognition adalah teknologi yang mengubah ucapan menjadi teks.",
    "Autonomous vehicle adalah kendaraan yang dapat beroperasi tanpa pengemudi manusia.",
    "Robotics adalah bidang yang menggabungkan AI dengan mesin fisik.",
    "Predictive analytics menggunakan AI untuk memprediksi tren masa depan.",
    "Natural language generation adalah AI yang menghasilkan teks seperti manusia.",
    "Sentiment analysis adalah teknik untuk menganalisis emosi dalam teks.",
    "Anomaly detection adalah metode AI untuk mengidentifikasi pola yang tidak biasa."
]

def generate_filename(category, index):
    """Generate filename tanpa simbol '-' atau angka nomor file"""
    # Mapping kategori ke kata yang lebih deskriptif
    category_names = {
        'negara': 'negarakode',
        'kode': 'kodeprogram',
        'perangkat': 'perangkatkeras',
        'jaringan': 'jaringankomputer',
        'hitungan': 'hitunganmatematika',
        'ai': 'kecerdasanbuatan'
    }
    
    # Gunakan kata acak dari data untuk variasi nama file
    base_name = category_names.get(category, category)
    return f"{base_name}{index}.nz"

def main():
    print("🚀 Memulai pembuatan 500 file pengetahuan RAGREBER.DIGITAL...")
    print("=" * 60)
    
    # Gabungkan semua kategori data
    all_categories = {
        'negara': negara_data,
        'kode': kode_data,
        'perangkat': perangkat_data,
        'jaringan': jaringan_data,
        'hitungan': hitungan_data,
        'ai': ai_data
    }
    
    categories = list(all_categories.keys())
    files_per_category = 83  # 83 * 6 = 498, ditambah 2 file ekstra = 500
    total_target = 500
    
    created_files = []
    file_counter = 0
    
    for category in categories:
        print(f"\n📁 Membuat file untuk kategori: {category.upper()}")
        data_list = all_categories[category]
        
        for i in range(files_per_category):
            if file_counter >= total_target:
                break
                
            # Pilih konten secara acak untuk variasi
            selected_content = random.sample(data_list, min(len(data_list), random.randint(5, 15)))
            
            # Generate filename unik tanpa angka urut yang terlihat
            unique_id = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=3))
            filename = f"{category}{unique_id}.nz"
            
            # Pastikan filename unik
            while filename in [f['filename'] for f in created_files]:
                unique_id = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=3))
                filename = f"{category}{unique_id}.nz"
            
            filepath = f"/workspace/ragreber.digital/{filename}"
            
            with open(filepath, 'w', encoding='utf-8') as f:
                # Tulis header
                f.write(f"# RAGREBER.DIGITAL - Basis Pengetahuan\n")
                f.write(f"# Kategori: {category.upper()}\n")
                f.write(f"# Format: Topik Pengetahuan Umum\n")
                f.write(f"# =================================================================\n\n")
                
                # Tulis konten
                for idx, content in enumerate(selected_content, 1):
                    f.write(f"{idx}. {content}\n")
                
                f.write(f"\n# Total poin pengetahuan: {len(selected_content)}\n")
                f.write(f"# File dibuat untuk sistem RAGREBER.DIGITAL\n")
            
            created_files.append({
                'filename': filename,
                'category': category,
                'path': filepath,
                'content_count': len(selected_content)
            })
            
            file_counter += 1
            
            # Progress indicator
            if file_counter % 50 == 0:
                print(f"   Progress: {file_counter}/{total_target} file selesai...")
        
        if file_counter >= total_target:
            break
    
    # Tambahkan file ekstra jika belum mencapai 500
    while file_counter < total_target:
        category = random.choice(categories)
        data_list = all_categories[category]
        selected_content = random.sample(data_list, min(len(data_list), random.randint(5, 15)))
        
        unique_id = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=3))
        filename = f"{category}{unique_id}.nz"
        
        while filename in [f['filename'] for f in created_files]:
            unique_id = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=3))
            filename = f"{category}{unique_id}.nz"
        
        filepath = f"/workspace/ragreber.digital/{filename}"
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(f"# RAGREBER.DIGITAL - Basis Pengetahuan\n")
            f.write(f"# Kategori: {category.upper()}\n")
            f.write(f"# Format: Topik Pengetahuan Umum\n")
            f.write(f"# =================================================================\n\n")
            
            for idx, content in enumerate(selected_content, 1):
                f.write(f"{idx}. {content}\n")
            
            f.write(f"\n# Total poin pengetahuan: {len(selected_content)}\n")
            f.write(f"# File dibuat untuk sistem RAGREBER.DIGITAL\n")
        
        created_files.append({
            'filename': filename,
            'category': category,
            'path': filepath,
            'content_count': len(selected_content)
        })
        
        file_counter += 1
    
    print("\n" + "=" * 60)
    print("✅ PEMBUATAN 500 FILE SELESAI!")
    print("=" * 60)
    print(f"📂 Lokasi: /workspace/ragreber.digital/")
    print(f"📄 Total file dibuat: {len(created_files)} file")
    print(f"📝 Ekstensi file: .nz")
    print(f"🏷️  Kategori: negara, kode, perangkat, jaringan, hitungan, ai")
    print(f"✏️  Judul file tanpa simbol '-' atau angka nomor file")
    print("=" * 60)

if __name__ == "__main__":
    main()

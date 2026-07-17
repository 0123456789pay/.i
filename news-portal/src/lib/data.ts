export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
}

export const newsData: NewsArticle[] = [
  {
    id: 1,
    title: "Pemerintah Umumkan Kebijakan Ekonomi Baru untuk Mendorong Pertumbuhan UMKM",
    excerpt: "Kementerian Keuangan mengumumkan serangkaian kebijakan fiskal baru yang dirancang khusus untuk mendukung pertumbuhan Usaha Mikro, Kecil, dan Menengah di seluruh Indonesia.",
    category: "Nasional",
    author: "Ahmad Rizki",
    publishedAt: "2024-01-15",
    readTime: "5 min",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Teknologi AI Terbaru Mengubah Cara Perusahaan Indonesia Beroperasi",
    excerpt: "Adopsi kecerdasan buatan di sektor korporat Indonesia meningkat drastis, dengan 70% perusahaan besar telah mengimplementasikan solusi AI dalam operasional mereka.",
    category: "Teknologi",
    author: "Siti Nurhaliza",
    publishedAt: "2024-01-15",
    readTime: "4 min",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    id: 3,
    title: "Pasar Saham Asia Tenggelam, IHSG Turun 2% di Awal Perdagangan",
    excerpt: "Indeks Harga Saham Gabungan mengalami penurunan signifikan mengikuti tren negatif dari pasar saham regional lainnya akibat ketidakpastian ekonomi global.",
    category: "Bisnis",
    author: "Budi Santoso",
    publishedAt: "2024-01-14",
    readTime: "3 min",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: 4,
    title: "Timnas Indonesia Lolos ke Putaran Final Piala Asia 2024",
    excerpt: "Kemenangan dramatis 2-1 atas Thailand memastikan langkah Timnas Indonesia ke putaran final Piala Asia, menggembirakan jutaan penggemar sepak bola tanah air.",
    category: "Olahraga",
    author: "Rina Wijaya",
    publishedAt: "2024-01-14",
    readTime: "4 min",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
  },
  {
    id: 5,
    title: "Festival Kuliner Nusantara 2024 Hadirkan 500 Lebih Makanan Tradisional",
    excerpt: "Event terbesar tahun ini menampilkan kekayaan kuliner dari 34 provinsi di Indonesia, menarik lebih dari 100.000 pengunjung di hari pertama.",
    category: "Gaya Hidup",
    author: "Dewi Lestari",
    publishedAt: "2024-01-14",
    readTime: "3 min",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  },
  {
    id: 6,
    title: "Konferensi Iklim Dunia: Indonesia Komitmen Kurangi Emisi 41% pada 2030",
    excerpt: "Presiden menegaskan komitmen Indonesia dalam perjuangan melawan perubahan iklim dengan target ambisius pengurangan emisi karbon.",
    category: "Internasional",
    author: "Hendra Gunawan",
    publishedAt: "2024-01-13",
    readTime: "6 min",
    imageUrl: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
  },
  {
    id: 7,
    title: "Startup Fintech Indonesia Raih Pendanaan Seri C Senilai $150 Juta",
    excerpt: "Perusahaan teknologi finansial lokal berhasil menarik investasi besar dari investor internasional untuk ekspansi ke pasar Asia Tenggara.",
    category: "Bisnis",
    author: "Maya Kusuma",
    publishedAt: "2024-01-13",
    readTime: "4 min",
    imageUrl: "https://images.unsplash.com/photo-1559131397-f94d7d7b9c25?w=800&q=80",
  },
  {
    id: 8,
    title: "Peluncuran Smartphone Flagship Buatan Dalam Negeri Pertama",
    excerpt: "Brand lokal memperkenalkan smartphone premium dengan spesifikasi tinggi dan harga kompetitif, menandai era baru industri teknologi Indonesia.",
    category: "Teknologi",
    author: "Andi Pratama",
    publishedAt: "2024-01-13",
    readTime: "5 min",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
  },
  {
    id: 9,
    title: "Wisata Bali Kembali Ramai, Okupansi Hotel Capai 85%",
    excerpt: "Sektor pariwisata Pulau Dewata menunjukkan pemulihan signifikan dengan kedatangan wisatawan mancanegara yang meningkat drastis.",
    category: "Gaya Hidup",
    author: "Putu Ayu",
    publishedAt: "2024-01-12",
    readTime: "3 min",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  },
  {
    id: 10,
    title: "Atlet Badminton Indonesia Juara Dunia untuk Kategori Tunggal Putra",
    excerpt: "Kemenangan bersejarah setelah 10 tahun menunggu, atlet muda Indonesia berhasil mengalahkan juara bertahan dari China di final.",
    category: "Olahraga",
    author: "Joko Susilo",
    publishedAt: "2024-01-12",
    readTime: "4 min",
    imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24de728?w=800&q=80",
  },
];

export const categories = [
  "Nasional",
  "Internasional",
  "Teknologi",
  "Bisnis",
  "Olahraga",
  "Gaya Hidup",
];

export const getFeaturedNews = () => newsData.find(article => article.featured) || newsData[0];

export const getLatestNews = (limit: number = 6) => {
  return newsData.filter(article => !article.featured).slice(0, limit);
};

export const getNewsByCategory = (category: string, limit: number = 4) => {
  return newsData.filter(article => article.category === category).slice(0, limit);
};

export const getTrendingNews = (limit: number = 5) => {
  return newsData.slice(1, limit + 1);
};

// JavaScript untuk Pengelolaan Konten
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pengelolaan Konten module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Pengelolaan Konten diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}